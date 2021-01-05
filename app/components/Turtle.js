export class Turtle {
    #turtle;
    #xPosition = 0;
    #step = 25;

    constructor(color, number) {
        this.#turtle = document.querySelector(`.wrapper .board .${number}`);
        this.#setTurtleColor(color);
        this.#initializeTurtle();
    }

    #setTurtleColor = color => {
        this.#turtle.classList.add(color);
    }

    #setTurtleDefaultValues = () => {
        this.#xPosition = 0;
        this.#turtle.style.left = `${this.#xPosition}px`;
    }

    #initializeTurtle = () => {
        this.#setTurtleDefaultValues();
    }

    moveTurtle = () => {
        this.#xPosition += this.#step;
        this.#turtle.style.left = `${this.#xPosition}px`;
    }
}