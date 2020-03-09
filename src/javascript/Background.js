import * as PIXI from 'pixi.js'

export default class Background {
    constructor(texture) {
        this.container = new PIXI.Container();
        this.background = texture;
        this.setBackground();
    }

    setBackground() {
        const BG = new PIXI.Sprite(this.background);
        BG.position.set(window.innerWidth/2 - 480, window.innerHeight/2 - 268);
        this.container.addChild(BG);
    }
}