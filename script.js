document.addEventListener('DOMContentLoaded', async () => {
    const captureContainer = document.getElementById('capture-container');
    const video = document.getElementById('video');
    const canvas = document.getElementById('capture-canvas');
    const context = canvas.getContext('2d');

    try {
        // Access the back camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;

        video.addEventListener('loadedmetadata', () => {
            // Set canvas size based on video size
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Capture the image quickly
            setTimeout(() => {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/png');

                // Display the captured image (optional)
                const img = new Image();
                img.src = dataURL;
                document.body.appendChild(img);

                // Send image data to server
                fetch('/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: dataURL })
                }).then(response => {
                    if (response.ok) {
                        console.log('Image uploaded successfully!');
                    } else {
                        console.error('Failed to upload image. Status:', response.status);
                    }
                }).catch(error => {
                    console.error('Error occurred during upload:', error);
                });

                // Hide capture container
                captureContainer.style.display = 'none';
            }, 500); // Capture image after a short delay
        });

        // Show the capture container
        captureContainer.style.display = 'flex';
    } catch (error) {
        console.error('Camera access denied or not available.', error);
    }
});
