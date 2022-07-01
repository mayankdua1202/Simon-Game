var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

function playSound(soundColor) {
  var audioPath = "sounds/" + soundColor + ".mp3";
  var audioObj = new Audio(audioPath);
  audioObj.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  window.setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var recentIndex = userClickedPattern.length - 1;
  if (userClickedPattern[recentIndex] === gamePattern[recentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      window.setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    window.setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
};

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  $("h1").text("Level " + level);
  level++;
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
  userClickedPattern = [];
}

$(".btn").on("click", function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(level);
});

$(document).on("keypress", function() {
  if (gameStart === false) {
    gameStart = true;
    nextSequence();
  }
});