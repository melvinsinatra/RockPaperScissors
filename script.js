//Model
const computerChoiceDisplay = document.getElementById('computer-choice-image');
const userChoiceDisplay = document.getElementById('user-choice-image');
const resultDisplay = document.getElementById('result');
const buttonChoices = document.querySelectorAll('.button-choices');
const scissors = 'images/scissors.svg';
const rock = 'images/rock.svg';
const paper = 'images/paper.svg';
let computerChoice;
const userScoreDisplay = document.getElementById('user-score');
const computerScoreDisplay = document.getElementById('computer-score');
let userScore = 0;
let computerScore = 0;

function generateComputerChoice() {
    computerChoice = Math.ceil(Math.random() * buttonChoices.length);
}

function setButtonClickListeners() {
    buttonChoices.forEach(element => element.addEventListener('click', onAnswerClick));
}
setButtonClickListeners();

function removeButtonClickListeners() {
    buttonChoices.forEach(element => element.removeEventListener('click', onAnswerClick));
}

//View
function changeUserImage(img) {
    userChoiceDisplay.src = img;
}

function changeComputerImage(number) {
    number===1 ? computerChoiceDisplay.src = rock
        : number === 2 ? computerChoiceDisplay.src = paper
        : computerChoiceDisplay.src = scissors
}

function setWin() {
    resultDisplay.style.backgroundColor = '#238636';
    resultDisplay.innerText = 'You Won!';
    resultDisplay.style.opacity = 1;
    increaseUserScore();
}

function setLose() {
    resultDisplay.style.backgroundColor = '#862323';
    resultDisplay.innerText = 'You Lost!';
    resultDisplay.style.opacity = 1;
    increaseComputerScore();
}

function setDraw() {
    resultDisplay.style.backgroundColor = '#C9B712';
    resultDisplay.innerText = "Draw!";
    resultDisplay.style.opacity = 1;
}

function increaseUserScore() {
    userScore++;
    userScoreDisplay.textContent = userScore;
}

function increaseComputerScore() {
    computerScore++;
    computerScoreDisplay.textContent = computerScore;
}

function dimResults() {
    resultDisplay.style.opacity = 0, 500;
}

function getResult() {
    let userChoiceImage = userChoiceDisplay.src;
    let computerChoiceImage = computerChoiceDisplay.src;

    computerChoiceImage === userChoiceImage ? result = setDraw()
        : computerChoiceImage.includes(rock) && userChoiceImage.includes(paper) ? setWin()
        : computerChoiceImage.includes(rock) && userChoiceImage.includes(scissors) ? setLose()
        : computerChoiceImage.includes(paper) && userChoiceImage.includes(scissors) ? setWin()
        : computerChoiceImage.includes(paper) && userChoiceImage.includes(rock) ? setLose()
        : computerChoiceImage.includes(scissors) && userChoiceImage.includes(rock) ? setWin()
        : setLose() //--> computerChoice.includes(scissors) && userChoice.includes(paper)   
    }

//Controller
function onAnswerClick(e) {
    //When an answer is clicked, wait 1.7 seconds until other answers are able to be clicked
    removeButtonClickListeners();

    let image;
    if(e.target.nodeName === 'BUTTON') {
        userChoice = e.target.id;
        image = document.getElementById(userChoice).firstChild.src
    } else {
        image = e.target.src;
    }
    userChoiceDisplay.src = image;
    generateComputerChoice();
    changeComputerImage(computerChoice);
    setTimeout(getResult, 100);
    setTimeout(dimResults, 1500);

    //Add the click listener again after 1.6 seconds
    setTimeout(setButtonClickListeners, 1600);
}


//ADD SCORES DI SAMPING USER SAMA COMPUTER