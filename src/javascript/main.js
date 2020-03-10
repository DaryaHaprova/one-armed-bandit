import * as PIXI from "pixi.js";

import Controller from "./Controller"
import Loader from "./Loader"
import Background from "./Background"
import SpinButton from "./SpinButton"
import ReelContainer from "./ReelContainer"


export default class App extends Controller {
    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.createRenderer();
        this.app = new PIXI.Application({
            autoResize: true,
            resolution: devicePixelRatio,
            transparent: true,
            width: 1680,
            height: 1050
        });

        new Loader(this.init.bind(this), this.app.loader);
    }
    static loadingElement = document.getElementById('loading-overlay');


    init() {
        this.createScene();
        this.createReels();
        this.createButton();
        this.animate();
        App.loadingElement.style.visibility = 'hidden';
    }

    createScene() {
        this.background = new Background(this.app.loader.resources.background.texture, this.hideText.bind(this));
        this.stageAdd(this.background.container);
    }

    createReels() {
        this.reels = new ReelContainer(this.stageAdd.bind(this), this.app.loader.resources, this.toogleButton.bind(this) );
        this.stageAdd(this.reels.container);
    }

    createButton() {
        this.button = new SpinButton(this.onStartSpin.bind(this), this.reels.stopAnimationImmidiatly.bind(this) ,this.app.loader.resources.btn_spin.texture, this.app.loader.resources.btn_spin_d.texture );
        this.stageAdd(this.button.container);
    }
    toogleButton() {
        this.button.buttonActiveToggle()
    }
    hideText(){
        this.reels.clearText()
    }

}