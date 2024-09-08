document.addEventListener('DOMContentLoaded', async () => {
    const captureContainer = document.getElementById('capture-container');
    const video = document.getElementById('video');
    const canvas = document.getElementById('capture-canvas');
    const context = canvas.getContext('2d');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            setTimeout(() => {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/png');

                // Send image data to server
                fetch('/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: dataURL })
                }).then(response => {
                    if (response.ok) {
                        alert('Image uploaded successfully!');
                    } else {
                        alert('Failed to upload image.');
                    }
                }).catch(error => {
                    alert('Error occurred during upload.');
                });

                captureContainer.style.display = 'none';
            }, 1000);
        });

        captureContainer.style.display = 'flex';
    } catch (error) {
        alert('Camera access denied or not available.');
    }
});
