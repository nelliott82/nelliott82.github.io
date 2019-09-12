/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

const guessButton = document.getElementById('Submit-btn')
const clearButton = document.getElementById('Clear-btn')
const hintButton = document.getElementById('Cheater-btn')

function generateWinningNumber(){
    let x = Math.ceil(Math.random() * 100);
    return x
}

function shuffle(array) {
    var m = array.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

class Game {
    constructor(){
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber()
    }
    difference() {
        let absValDiff = Math.abs(this.playersGuess - this.winningNumber);
        return absValDiff;
    }
    isLower() {
        if (this.playersGuess < this.winningNumber){
            return true;
        }
        return false;
    }
    playersGuessSubmission(num) {
        if (isNaN(num) || num < 1 || num > 100){
            throw 'That is an invalid guess.';
        }
        this.playersGuess = num;
        return this.checkGuess(num);
    }
    checkGuess(num){
        if (num === this.winningNumber){
            this.pastGuesses.push(num);
            return 'You Win!'
        } else if (this.pastGuesses.length === 4){
            this.pastGuesses.push(num);
            return 'You Lose.'
        } else if (this.pastGuesses.includes(num)){
            return 'You have already guessed that number.'
        } else if (this.difference() < 10){
            this.pastGuesses.push(num);
            return 'You\'re burning up!'
        } else if (this.difference() < 25){
            this.pastGuesses.push(num);
            return 'You\'re lukewarm.'
        } else if (this.difference() < 50){
            this.pastGuesses.push(num);
            return 'You\'re a bit chilly.'
        } else if (this.difference() < 100){
            this.pastGuesses.push(num);
            return 'You\'re ice cold!'
        }
    }
    provideHint() {
        let hintArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()]
        return shuffle(hintArr);
    }
}

function newGame(){
    let game = new Game();
    return game;
}

document.addEventListener('load', function() {
    newGame();
})

function makeGuess(){
    let startGame = newGame();
    guessButton.addEventListener('click', function() {
        let guess = +document.querySelector('input').value;
        document.querySelector('input').value = '';
        let guessMsg = startGame.playersGuessSubmission(guess);
        document.querySelector('#messages>h2').innerHTML = guessMsg;
        document.querySelector(`#guesses li:nth-child(${startGame.pastGuesses.length})`).innerHTML = startGame.playersGuess;
        let numberOfGuesses = 5 - startGame.pastGuesses.length
        document.querySelector('#number-of-guesses>h3').innerHTML = `You have ${numberOfGuesses} guesses left! Keep trying!`
    })
    clearButton.addEventListener('click', function() {
        document.querySelector('#messages>h2').innerHTML = '';
        document.querySelector('#hint>h2').innerHTML = '';
        document.querySelector('#number-of-guesses>h3').innerHTML = `You have 5 guesses! Good luck!`
        document.getElementById('one').innerHTML = '-';
        document.getElementById('two').innerHTML = '-';
        document.getElementById('three').innerHTML = '-';
        document.getElementById('four').innerHTML = '-';
        let startGame = newGame();
    })
    hintButton.addEventListener('click', function() {
        let hintArr = startGame.provideHint();
        document.querySelector('#hint>h2').innerHTML = `The correct number is either ${hintArr[0]}, ${hintArr[1]}, or ${hintArr[2]}!`;
    })
}


makeGuess();
