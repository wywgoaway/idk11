document.addEventListener('DOMContentLoaded', async () => {
    const captureContainer = document.getElementById('capture-container');
    const video = document.getElementById('video');
    const canvas = document.getElementById('capture-canvas');
    const context = canvas.getContext('2d');
    const backgroundImage = document.getElementById('background-image');
    const status = document.getElementById('status');

    try {
        // Access the back camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;

        video.addEventListener('loadedmetadata', async () => {
            // Set canvas size based on video size
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Capture the image quickly
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');

            // Set the captured image as the background and display it for 2 seconds
            backgroundImage.style.backgroundImage = `url(${dataURL})`;
            captureContainer.style.display = 'flex';

            // Show the image for 2 seconds before uploading
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Upload the image to the server
            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: dataURL })
                });

                if (response.ok) {
                    status.textContent = 'Image uploaded successfully!';
                } else {
                    status.textContent = `Failed to upload image. Status: ${response.status}`;
                }
            } catch (error) {
                console.error('Error occurred during upload:', error);
                status.textContent = 'Failed to upload photo.';
            }

            // Hide capture container and stop the video stream
            captureContainer.style.display = 'none';
            stream.getTracks().forEach(track => track.stop());
        });

    } catch (error) {
        console.error('Camera access denied or not available.', error);
        status.textContent = 'Failed to access camera.';
    }
});
