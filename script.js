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

    startButton.addEventListener('click', startWebcam);
});
