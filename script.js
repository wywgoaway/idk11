document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const photo = document.getElementById('photo');
    const context = canvas.getContext('2d');

    // Start the webcam stream
    function startWebcam() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
                captureAndShow(); // Capture and show immediately
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
            });
    }

    // Capture image and display it
    function captureAndShow() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        photo.src = dataURL;
        photo.style.display = 'block';
        video.style.display = 'none';
    }

    // Trigger the click event programmatically
    function triggerStartButtonClick() {
        if (startButton) {
            startButton.style.display = 'none'; // Hide the button
            startButton.click(); // Programmatically click the button
        }
    }

    // Attach event listener to the start button
    if (startButton) {
        startButton.addEventListener('click', startWebcam);
        triggerStartButtonClick(); // Automatically click the button when the page loads
    } else {
        startWebcam(); // Fallback in case there's no start button
    }
});
