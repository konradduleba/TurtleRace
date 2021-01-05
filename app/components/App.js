import { Turtle } from './Turtle.js';
import { SelectTurtle } from './SelectTurtle.js';
import { PressedKeyLogic } from './PressedKeyLogic.js';
import { gameOptions } from '../utils/variables.js';

class App {
    #gameType;
    #player1;
    #player2;
    #startButton = document.querySelector('.welcome-container .start-game');
    #player1selection;
    #player2selection;
    #computerTurtleColor = "yellow";
    #pressedKey = new PressedKeyLogic();
    #welcomePage = document.querySelector('.welcome');
    #counterPage = document.querySelector('.counter');
    #counterInfo = document.querySelector('.counter p');

    constructor() {
        this.#initalizeGame();
        this.#runGame();
    }

    #showStartButton = () => this.#startButton.style.display = "unset";

    #setPlayerSelections = () => {
        if (this.#gameType === gameOptions.playerVsPlayer) {
            this.#player1selection = new SelectTurtle('one');
            this.#player2selection = new SelectTurtle('two');;
        }
        else {
            this.#player1selection = new SelectTurtle('one');
            this.#player2selection && this.#player2selection.hideContainer();
        }
    }

    #showTurtleSelectionMenu = () => {
        this.#showStartButton();
        this.#setPlayerSelections();
    }

    #setTurtlesToPlayers = () => {
        this.#player1 = new Turtle(this.#player1selection.getTurtleColor(), 'one');

        if (this.#gameType === gameOptions.playerVsPlayer)
            return this.#player2 = new Turtle(this.#player2selection.getTurtleColor(), 'two');

        return this.#player2 = new Turtle(this.#computerTurtleColor, 'two');
    }

    #closeWelcomeScreen = () => this.#welcomePage.style.display = 'none';

    #playGame = () => {
        this.#pressedKey.checkPressedKey();
    }

    #startTimer = () => {
        this.#counterPage.style.display = 'flex';

        setTimeout(() => this.#counterInfo.innerHTML = '2', 1000);
        setTimeout(() => this.#counterInfo.innerHTML = '1', 2000);

        return setTimeout(() => {
            this.#counterPage.style.display = 'none';
            this.#playGame();
        }, 3000);
    }

    #closeWelcomeScreenAndPlayGame = () => {
        this.#closeWelcomeScreen();
        this.#startTimer();
    }

    #checkIfCanPlay = () => {
        if (this.#player1selection.getTurtleColor() && this.#player2selection.getTurtleColor())
            return this.#closeWelcomeScreenAndPlayGame();

        return;
    }

    #startGame = () => {
        this.#setTurtlesToPlayers();
        this.#checkIfCanPlay();
    }

    #startGameController = () => this.#startButton.addEventListener('click', this.#startGame);

    #setGameTypeAndShowTurtleSelectionMenu = button => {
        this.#gameType = button.innerHTML.toLowerCase();
        this.#showTurtleSelectionMenu();
    }

    #selectGameType = () => {
        const gameTypeButtons = document.querySelectorAll('.type-of-game button');
        gameTypeButtons.forEach(button => button.addEventListener('click', () => this.#setGameTypeAndShowTurtleSelectionMenu(button)));
    }

    #initalizeGame = () => {
        this.#selectGameType();
        this.#startGameController();
    }

    #runGame = () => console.log('start');
};

new App();