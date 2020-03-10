import * as PIXI from 'pixi.js'

export default class Background {
    constructor(texture, hideText) {
        this.container = new PIXI.Container();
        this.background = texture;
        this.hideText = hideText;
        this.setBackground();
        this.container.interactive = true;
        this.container.on("click", () => {
            this.hideText()
        })
    }

    setBackground() {
        const BG = new PIXI.Sprite(this.background);
        BG.position.set(window.innerWidth/2 - 480, window.innerHeight/2 - 268);
        this.container.addChild(BG);
    }
}