navigator.getUserMedia = navigator.getUserMedia;

let video = document.getElementById("video");
let audio = document.getElementById("audio");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let model;
handTrack.startVideo(video).then(function (status) {
  if (status) {
    navigator.getUserMedia({ video: {} }, function (stream) {
      video.srcObject = stream;
      setInterval(run, 1000);
    },function(err){});
  }
});

function run() {
  model.detect(video).then(function (pred) {
    console.log(pred);
    if(pred.length > 0){
         audio.play()
    }
  });
}

handTrack
  .load({
     flipHorizontal: true,   // flip e.g for video 
     imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
     maxNumBoxes: 20,        // maximum number of boxes to detect
     iouThreshold: 0.5,      // ioU threshold for non-max suppression
     scoreThreshold: 0.3,    // confidence threshold for predictions.
   })
  .then(function (lmodel) {
    model = lmodel;
  });
