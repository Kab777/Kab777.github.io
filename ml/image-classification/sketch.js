  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/rj5ImAofP/';
  
  // Video
  let video;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    // classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    classifier = ml5.imageClassifier("MobileNet");
  }

  function setup() {
    createCanvas(640, 520);
    // Create the video
    video = createCapture(VIDEO, { flipped:true });
    video.size(640, 480);
    video.hide();

    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Flip the video for display
    image(video, 0, 0, width, 480);

    // Draw the label background
    fill(0, 0, 0, 150);
    rect(0, 480, width, 40);
    
    // Draw the label text
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(label, width / 2, 500);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    // Flip the video for the classifier
    const flipped = ml5.flipImage(video);
    classifier.classify(flipped, (error, results) => {
      // The results are in an array ordered by confidence.
      label = results[0].label;
      // Classify again!
      classifyVideo();
    });
  }