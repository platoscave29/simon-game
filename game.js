
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*3) + 1;
  var randomChosenColour = buttonColours[Math.floor(Math.random()*3)+1];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour);
  playSound(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#level-title").text("Level "+ level);
  level ++;

}

$(".btn").click(function(){
  userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();

}

function animatePress(currentColor) {
  var activeButton = $("#" + currentColor);
  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);

}
$(document).keypress(function() {
  nextSequence();
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
          userClickedPattern=[];
          setTimeout(function(){
          nextSequence();
          },1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}


function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern= [];
}
