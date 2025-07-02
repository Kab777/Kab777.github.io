# Image Classification with p5.js and ml5.js

This project is a simple web application that uses `p5.js` and `ml5.js` to perform real-time image classification on a webcam feed.

## How to Run

1.  Open the `index.html` file in a web browser.
2.  Allow the browser to access your webcam.
3.  The application will start classifying the objects it sees in the webcam feed and display the predicted label at the bottom of the screen.

## Technologies Used

*   [p5.js](https://p5js.org/): A JavaScript library for creative coding.
*   [ml5.js](https://ml5js.org/): A library that provides friendly access to machine learning algorithms and models in the browser.
*   [Teachable Machine](https://teachablemachine.withgoogle.com/): A web-based tool for creating machine learning models.

## Model

The application uses a pre-trained image classification model from Teachable Machine or the MobileNet model. The model is loaded from the URL specified in the `sketch.js` file.
