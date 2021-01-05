export class SelectTurtle {
    #turtlesContainer;
    #turtleList;
    #turtleColor;

    constructor(number) {
        this.#turtlesContainer = document.querySelector(`.turtle-selection.${number}`);
        this.#turtleList = document.querySelectorAll(`.turtle-selection.${number} .turtle-container img`);
        this.#initalizeSelection();
    }

    #showContainer = () => this.#turtlesContainer.style.display = 'flex';

    #setActiveTurtle = turtle => {
        this.#turtleList.forEach(turtle => turtle.classList.remove('active'));

        turtle.classList.add('active');

        this.#turtleColor = turtle.alt;
    }

    #selectTurtle = () => this.#turtleList.forEach(turtle => turtle.addEventListener('click', () => this.#setActiveTurtle(turtle)));

    #initalizeSelection = () => {
        this.#showContainer();
        this.#selectTurtle();
    }

    hideContainer = () => this.#turtlesContainer.style.display = 'none';

    getTurtleColor = () => this.#turtleColor;
}