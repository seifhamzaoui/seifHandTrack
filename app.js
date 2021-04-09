navigator.getUserMedia = navigator.getUserMedia;

let video = document.getElementById("video");
let audio = document.getElementById("audio");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let model;
let index = 0;
let audioTracks = ['handtrack1.mp3','handtrack2.mp3','handtrack3.mp3','handtrack4.mp3']

handTrack.startVideo(video).then(function (status) {
  if (status) {
  }
});

function run() {
  model.detect(video).then(function (pred) {
    console.log(pred);
    if (pred.length > 0) {
         audio.src = audioTracks[index];
         audio.play();
         if(index == 3){
              index = 0;
         }else index++
    }else index = 0;
  });
}

handTrack
  .load({
    flipHorizontal: true, // flip e.g for video
    imageScaleFactor: 0.7, // reduce input image size for gains in speed.
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.7, // confidence threshold for predictions.
  })
  .then(function (lmodel) {
    model = lmodel;
    navigator.getUserMedia(
      { video: {} },
      function (stream) {
        video.srcObject = stream;
        setInterval(run, 8000);
      },
      function (err) {}
    );
  });
