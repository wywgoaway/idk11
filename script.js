// Access the video, canvas, and image elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const capturedImage = document.getElementById('capturedImage');

// Function to start capturing
function startCapture() {
    // Request access to the camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            video.srcObject = stream;

            // Wait for the video to load metadata
            video.onloadedmetadata = () => {
                // Set canvas dimensions to match the video
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Capture the image and handle it
                captureImage();
            };
        })
        .catch(err => {
            console.error('Error accessing camera: ', err);
        });
}

// Function to capture image
function captureImage() {
    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image data (base64)
    const imageData = canvas.toDataURL('image/png');

    // Display the captured image
    capturedImage.src = imageData;
    capturedImage.style.display = 'block'; // Make the image visible

    // Automatically upload the image to the server
    fetch('http://localhost:3000/upload', { // Replace with your actual server URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageData })
    })
    .then(response => response.text())
    .then(data => console.log('Server Response:', data))
    .catch(err => console.error('Error uploading image:', err));
}

// Start the capture process when the page loads
window.onload = startCapture;
