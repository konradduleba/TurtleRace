import { resetOptions } from '../utils/variables.js';

export class Turtle {
    #turtle;
    #xPosition = 0;
    #step = 10;
    #color;
    #number;
    #aiTurtleInterval;
    #aiMovingSpeed = 88;
    #boardDimensions = document.querySelector('.board').getBoundingClientRect();
    #endGamePage = document.querySelector('.end-game');
    #winner = document.querySelector('.end-game img');
    #scoreContainer;
    #scoreNumber = 0;

    constructor(color, number) {
        this.#turtle = document.querySelector(`.wrapper .board .${number}`);
        this.#scoreContainer = document.querySelector(`.wrapper header .score .${number}`);
        this.#number = number;
        this.#color = color;
        this.#initializeTurtle();
    }

    #setTurtleColor = () => {
        this.#turtle.classList = `turtle ${this.#number}`;
        this.#turtle.classList.add(`${this.#color}`);
    }

    setDefaultValues = (type = resetOptions.normal) => {
        this.#xPosition = 0;
        this.#turtle.style.left = `${this.#xPosition}px`;
        clearInterval(this.#aiTurtleInterval);

        if (type !== resetOptions.normal)
            this.#resetScore();
    }

    #resetScore = () => {
        this.#scoreNumber = 0;
        this.#scoreContainer.textContent = `${this.#scoreNumber}`;
    }

    #initializeTurtle = () => {
        this.#setTurtleColor();
        this.setDefaultValues();
    }

    #updateScore = () => {
        this.#scoreNumber += 1;
        this.#scoreContainer.textContent = `${this.#scoreNumber}`;
    }

    #endGame = () => {
        this.#endGamePage.classList.add('active');
        this.#winner.src = `/images/turtle_${this.#color}.png`;
        this.#updateScore();
    }

    getTurtleColor = () => this.#color;

    checkIfCanMove = () => {
        if (!this.#endGamePage.classList.contains('active'))
            return this.#moveTurtle();

        return;
    }

    #moveTurtle = () => {
        this.#xPosition += this.#step;

        if (this.#xPosition > this.#calculateEndPosition()) {
            clearInterval(this.#aiTurtleInterval);
            return this.#endGame();
        }

        return this.#turtle.style.left = `${this.#xPosition}px`;
    }

    #calculateEndPosition = () => {
        const boardWidth = this.#boardDimensions.width;
        const turtleWitdh = this.#turtle.getBoundingClientRect().width;
        const finishLineWidth = (this.#boardDimensions.width / 15.05);
        const spaceBetweenFinishLineAndBoardEnd = (this.#boardDimensions.width / 6.66);

        return boardWidth - turtleWitdh - finishLineWidth - spaceBetweenFinishLineAndBoardEnd + this.#step;
    }

    moveComputerTurtle = () => {
        this.#aiTurtleInterval = setInterval(this.checkIfCanMove, this.#aiMovingSpeed);
    }
}