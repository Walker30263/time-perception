var timeButtons = document.getElementsByClassName("timeButton");
var scores = [];

for (let i = 0; i < timeButtons.length; i++) {
  timeButtons[i].addEventListener("click", function() {
    timeButtons[i].style.backgroundColor = "#e8ff80";
    let start = new Date();
    timeButtons[i].addEventListener("click", function() {
      let end = new Date();
      timeButtons[i].disabled = true;
      timeButtons[i].style.backgroundColor = "#00ffb7";
      timeButtons[i].style.fontSize = "20px";
      
      let yourTime = (end.getTime() - start.getTime())/1000; //time difference between end and start in seconds
      let goalTime = parseInt(timeButtons[i].id);
      let percentError = Math.round(100*(Math.abs(yourTime - goalTime)/goalTime));
      timeButtons[i].innerHTML = `<b>Goal Time:</b> ${goalTime} seconds
      <br>
      <b>Your time:</b> ${yourTime} seconds
      <br>
      <b>% Error:</b> ${percentError}%`;
      scores.push(percentError);
      checkIfGameOver();
    });
  });
}

function checkIfGameOver() {
  let gameOver = true;

  for (let i = 0; i < timeButtons.length; i++) {
    if (timeButtons[i].disabled == false) {
      gameOver = false;
      break;
    }
  }

  if (gameOver) {
    let add = (a, b) => a + b;
    let totalScore = scores.reduce(add)/6 //Add all Percent Errors, divide by 6 to take the average

    document.getElementById("score").innerHTML = `Your final score is ${(totalScore/10).toFixed(2)} (the lower the better)`;
  }
}