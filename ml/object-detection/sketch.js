let detector;
let video;
let uploadedImage;
let detections = [];
let mode;

function preload() {
  // load model
  detector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(640, 480);

  const webcamButton = select('#webcamButton');
  const uploadButton = select('#uploadButton');
  const fileUpload = select('#fileUpload');

  webcamButton.mousePressed(useWebcam);
  uploadButton.mousePressed(() => fileUpload.elt.click());
  fileUpload.changed(handleFileUpload);
}

function draw() {
  background(0);
  // Draw video or image
  if (mode === 'webcam' && video) {
    image(video, 0, 0, width, height);
  } else if (mode === 'upload' && uploadedImage) {
    image(uploadedImage, 0, 0, width, height);
  }

  // Draw bounding boxes
  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label + " " + nfc(object.confidence * 100, 2) + "%", object.x + 10, object.y + 24);
  }
}

// Webcam mode
function useWebcam() {
  mode = 'webcam';
  detections = [];
  uploadedImage = null;

  if (video) {
    video.remove();
  }

  // Start capture and wait for it to be ready
  video = createCapture(VIDEO, () => {
    video.size(640, 480);
    video.hide();
    // Start detecting once the video is ready
    detector.detect(video, gotDetections);
  });
}

// Upload mode
function handleFileUpload(event) {
  if (event.target.files && event.target.files[0]) {
    mode = 'upload';
    detections = [];
    if (video) {
      video.remove();
      video = null;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedImage = createImg(e.target.result, 'uploaded image', '', () => {
        uploadedImage.hide();
        // Detect in static image
        detector.detect(uploadedImage, (error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          detections = results;
        });
      });
    }
    reader.readAsDataURL(event.target.files[0]);
  }
}

// Callback function for webcam detection
function gotDetections(error, results) {
  if (error) {
    console.error(error);
    return; // Stop on error
  }
  detections = results;
  // Keep detecting only if in webcam mode and video exists
  if (mode === 'webcam' && video) {
    detector.detect(video, gotDetections);
  }
}
