import { Turtle } from './Turtle.js';
import { SelectTurtle } from './SelectTurtle.js';
import { PressedKeyLogic } from './PressedKeyLogic.js';
import { gameOptions, resetOptions } from '../utils/variables.js';

export class App {
    #gameType;
    #player1;
    #player2;
    #startButton = document.querySelector('.welcome-container .start-game');
    #player1selection;
    #player2selection;
    #avaibleColors = ['yellow', 'red', 'blue'];
    #computerTurtleColor;
    #welcomePage = document.querySelector('.welcome');
    #counterPage = document.querySelector('.counter');
    #counterInfo = document.querySelector('.counter p');
    #endGamePage = document.querySelector('.end-game');
    #playAgain = document.querySelector('.end-game .play-again');
    #resetSettings = document.querySelector('.end-game .reset-settings');
    #player1pressedLogic;
    #player2pressedLogic;

    #player1Keys = {
        left: 'KeyA',
        right: 'KeyD',
    }

    #player2Keys = {
        left: 'ArrowLeft',
        right: 'ArrowRight',
    }

    constructor() {
        this.#initalizeGame();
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

    #selectComputerColor = () => {
        const playerColor = this.#player1selection.getTurtleColor();
        const avaibleColors = this.#avaibleColors.filter(color => color !== playerColor);
        const index = Math.round(Math.random());

        this.#computerTurtleColor = avaibleColors[index];
        return avaibleColors[index];
    }

    #showTurtleSelectionMenu = () => {
        this.#showStartButton();
        this.#setPlayerSelections();
    }

    #setTurtlesToPlayers = () => {
        this.#player1 = new Turtle(this.#player1selection.getTurtleColor(), 'one');

        if (this.#gameType === gameOptions.playerVsPlayer)
            return this.#player2 = new Turtle(this.#player2selection.getTurtleColor(), 'two');

        return this.#player2 = new Turtle(this.#selectComputerColor(), 'two');
    }

    #closeWelcomeScreen = () => this.#welcomePage.style.display = 'none';

    #showWelcomeScreen = () => this.#welcomePage.style.display = 'flex';

    #playGame = () => {
        if (this.#gameType === gameOptions.playerVsPlayer) {
            this.#player1pressedLogic = new PressedKeyLogic(this.#player1, this.#player1Keys, this.#gameType);
            this.#player2pressedLogic = new PressedKeyLogic(this.#player2, this.#player2Keys, this.#gameType);
        }
        else {
            this.#player1pressedLogic = new PressedKeyLogic(this.#player1, this.#player1Keys, this.#gameType);
            this.#player2pressedLogic = this.#player2.moveComputerTurtle();
        }
    }

    #startTimer = () => {
        this.#counterPage.style.display = 'flex';

        setTimeout(() => this.#counterInfo.innerHTML = '3', 0);
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
        if (this.#player1selection.getTurtleColor() && (this.#gameType === gameOptions.playerVsComputer ? this.#computerTurtleColor : this.#player2selection.getTurtleColor()))
            return this.#closeWelcomeScreenAndPlayGame();

        return;
    }

    #startGame = () => {
        this.#setTurtlesToPlayers();
        this.#checkIfCanPlay();
    }

    #startGameController = () => this.#startButton.addEventListener('click', this.#startGame);

    #setDefaultValuesToPlayers = (type = resetOptions.normal) => {
        this.#player1.setDefaultValues(type);
        this.#player2.setDefaultValues(type);
    }

    #removePlayersListeners = () => {
        this.#player1pressedLogic.removeKeyPressedListening();

        if (this.#gameType === gameOptions.playerVsPlayer)
            this.#player2pressedLogic.removeKeyPressedListening();
    }

    #closeEndGamePage = () => this.#endGamePage.classList.remove('active');

    #setDefaultGame = () => {
        this.#closeEndGamePage();
        this.#startTimer();
        this.#removePlayersListeners();
        this.#setDefaultValuesToPlayers();
    }

    #newGame = () => {
        this.#closeEndGamePage();
        this.#removePlayersListeners();
        this.#setDefaultValuesToPlayers(resetOptions.all);
        this.#selectGameType();
    }

    #resetGameController = () => this.#playAgain.addEventListener('click', this.#setDefaultGame);

    #startNewGameController = () => this.#resetSettings.addEventListener('click', this.#newGame);

    #setGameTypeAndShowTurtleSelectionMenu = button => {
        this.#gameType = button.innerHTML.toLowerCase();
        this.#showTurtleSelectionMenu();
    }

    #selectGameType = () => {
        this.#showWelcomeScreen();
        const gameTypeButtons = document.querySelectorAll('.type-of-game button');
        gameTypeButtons.forEach(button => button.addEventListener('click', () => this.#setGameTypeAndShowTurtleSelectionMenu(button)));
    }

    #initalizeGame = () => {
        this.#selectGameType();
        this.#startGameController();
        this.#resetGameController();
        this.#startNewGameController();
    }
};

new App();