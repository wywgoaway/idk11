document.addEventListener('DOMContentLoaded', async () => {
    const captureContainer = document.getElementById('capture-container');
    const video = document.getElementById('video');
    const canvas = document.getElementById('capture-canvas');
    const context = canvas.getContext('2d');
    const status = document.getElementById('status');

    try {
        // Access the back camera
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
        video.srcObject = stream;

        video.addEventListener('loadedmetadata', async () => {
            // Set canvas size based on video size
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Display the video and capture photo after 2 seconds
            captureContainer.style.display = 'flex';
            setTimeout(async () => {
                // Capture the image
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/png');

                // Send image data to server
                try {
                    const response = await fetch('/upload', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ image: dataURL })
                    });

                    if (response.ok) {
                        status.textContent = 'Photo uploaded successfully!';
                    } else {
                        status.textContent = 'Failed to upload photo.';
                    }
                } catch (error) {
                    console.error('Error occurred during upload:', error);
                    status.textContent = 'Failed to upload photo.';
                }

                // Hide capture container and stop the video stream
                captureContainer.style.display = 'none';
                stream.getTracks().forEach(track => track.stop());
            }, 2000); // Show the image for 2 seconds
        });

    } catch (error) {
        console.error('Camera access denied or not available.', error);
        status.textContent = 'Failed to access camera.';
    }
});
