document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const captureLink = document.getElementById('capture-link');
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

    // Handle start button click
    function handleStartButtonClick() {
        startWebcam();
        video.addEventListener('loadedmetadata', () => {
            captureAndShow(); // Capture and show immediately after the metadata is loaded
        });
    }

    // Set up click event listener for the capture link
    captureLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        if (startButton) {
            startButton.click(); // Programmatically click the hidden button
        }
    });

    // Attach event listener to the hidden start button
    if (startButton) {
        startButton.addEventListener('click', handleStartButtonClick);
    }
});
