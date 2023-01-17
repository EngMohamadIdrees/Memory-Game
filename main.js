//Start The Game and Get The Input
document
  .querySelector(".control-button span")
  .addEventListener("click", function () {
    // Get User Name Input
    let userNameInput = window.prompt("please Enter Your Name");
    while (userNameInput == null || userNameInput == "") {
      userNameInput = window.prompt("please Enter Your Name");
    }
    //Delete homeScreen
    document.querySelector(".control-button").remove();
    // Change UserName In Screen
    document.querySelector(
      ".user-info .name span"
    ).textContent = `${userNameInput}`;
  });

//   Duration Time
let duration = 1000;

//  TryNumber
let tryNumber = 0;

// Game Over Div
let gameOverDiv = document.querySelector(".lose-game");

// Game Over Span
let gameOverButton = document.querySelector(".lose-game span");

let trySpan = document.querySelector(".tries span");
trySpan.innerHTML = `${tryNumber}`;

let imageContainer = document.querySelector(".images-container");
// Start Flip the image

// Create Random Number between 0 and 20 (Image Counter)
let allBoxs = Array.from(document.querySelectorAll(".images-container .box"));
let orederRange = [...Array(allBoxs.length).keys()];
function shuffle(array) {
  let cuurent = array.length,
    temp,
    random;
  while (cuurent > 0) {
    random = Math.floor(Math.random() * cuurent);
    cuurent--;
    temp = array[cuurent];
    array[cuurent] = array[random];
    array[random] = temp;
  }
  return array;
}
orederRange = shuffle(orederRange);

allBoxs.forEach((box, index) => {
  box.style.order = orederRange[index];
  box.addEventListener("click", function () {
    flipBlock(box);
  });
});
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allBoxsFlipped = document.querySelectorAll(".is-flipped");
  if (allBoxsFlipped.length === 2) {
    stopClicking();
    checkMatchedBlocks(allBoxsFlipped[0], allBoxsFlipped[1]);
  }
  let allBoxsMatched = document.querySelectorAll(".has-match");
  if (allBoxsMatched.length === orederRange.length) {
    document.querySelector(".winGame").play();
    gameOverDiv.style.display = "block";
    gameOverButton.addEventListener("click", function () {
      location.reload();
    });
  }
}
function stopClicking() {
  imageContainer.style.pointerEvents = "none";
  setTimeout(() => {
    imageContainer.style.pointerEvents = "";
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.querySelector(".winRound").play();
  } else {
    tryNumber++;
    trySpan.innerHTML = `${tryNumber}`;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    if (tryNumber === 4) {
      document.querySelector(".loseGame").play();
      gameOverDiv.style.display = "block";
      gameOverButton.addEventListener("click", function () {
        location.reload();
      });
    } else {
      document.querySelector(".loseRound").play();
    }
  }
}
