export class PressedKeyLogic {
    #player;
    #playerKeys;
    #lastPressedKey;

    constructor(player, playerKeys) {
        this.#player = player;
        this.#playerKeys = playerKeys;

        this.#initalizeListening();
    }

    #checkPressedKey = ({ code }) => {
        if ((code === this.#playerKeys.left || code === this.#playerKeys.right) && code !== this.#lastPressedKey) {
            this.#lastPressedKey = code;

            return this.#player.checkIfCanMove();
        }

        return;
    }

    removeKeyPressedListening = () => window.removeEventListener('keydown', this.#checkPressedKey, true)

    #initalizeListening = () => window.addEventListener('keydown', this.#checkPressedKey, true);
}