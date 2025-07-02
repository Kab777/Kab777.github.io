  let classifier;
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/rj5ImAofP/';
  
  let video;
  let uploadedImage;
  let label = "";
  let mode; // 'webcam' or 'upload'

  function preload() {
    classifier = ml5.imageClassifier("MobileNet");
  }

  function setup() {
    createCanvas(640, 520);

    const webcamButton = select('#webcamButton');
    const uploadButton = select('#uploadButton');
    const fileUpload = select('#fileUpload');

    webcamButton.mousePressed(useWebcam);
    uploadButton.mousePressed(() => fileUpload.elt.click());
    fileUpload.changed(handleFileUpload);
  }

  function draw() {
    background(0);
    if (mode === 'webcam' && video) {
      image(video, 0, 0, width, 480);
    } else if (mode === 'upload' && uploadedImage) {
      image(uploadedImage, 0, 0, width, 480);
    }

    fill(0, 0, 0, 150);
    rect(0, 480, width, 40);
    
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(label, width / 2, 500);
  }

  function useWebcam() {
    mode = 'webcam';
    uploadedImage = null;
    video = createCapture(VIDEO, { flipped: true });
    video.size(640, 480);
    video.hide();
    classifyVideo();
  }

  function handleFileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      mode = 'upload';
      if (video) {
        video.remove();
        video = null;
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        uploadedImage = createImg(e.target.result, 'uploaded image', '', () => {
          uploadedImage.hide();
          classifyStaticImage();
        });
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function classifyVideo() {
    if (mode !== 'webcam') return;
    const flipped = ml5.flipImage(video);
    classifier.classify(flipped, (error, results) => {
      if (error) {
        console.error(error);
        return;
      }
      label = results[0].label;
      classifyVideo();
    });
  }

  function classifyStaticImage() {
    if (mode !== 'upload') return;
    classifier.classify(uploadedImage, (error, results) => {
      if (error) {
        console.error(error);
        return;
      }
      label = results[0].label;
    });
  }