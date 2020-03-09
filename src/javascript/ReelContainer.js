import Reel from './Reel';
import * as PIXI from "pixi.js";
import {randomArrayHelper, checkIfWin} from "./helpers/randomArrayHelper.js"


export default class ReelContainer {
    constructor(addToStage, resources, toogleButton) {
        this.toogleButton = toogleButton;
        this.resources = resources;
        this.addToStage = addToStage;
        this.x = window.innerWidth/2 - 390;
        this.y = window.innerHeight/2 - 200;
        this.width = 236*3;
        this.height = 128;
        this.delayStop = 500;
        this.columnPadding = 8;
        this.reelPositions = 4;
        this.textStyle = {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: '76px',
            "fill": [
                "#ffd956",
                "#ff0000"
            ],
            stroke: '#0a0a0a',
            strokeThickness: 5,
            wordWrap: true,
            wordWrapWidth: 440
        };

        this.reelIds = [0,1,2,3,4];

        this.reels = Array.from({ length: 3 }, () => new Reel(this.shuffleReelIds(), this.resources));

        this.container = new PIXI.Container();
        this.container.x = this.x;
        this.container.y = this.y;
        this.addReel();
        this.gameResults = []
    }

    shuffleReelIds() {
        return this.reelIds.sort(() => 0.5 - Math.random());
    }

    addReel() {
        let i;
        for (i = 0; i < this.reels.length; i++) {
            let reel = this.reels[i];
            reel.delayStop = this.delayStop * i;
            reel.container.position.x = (reel.width + this.columnPadding) * i;
            this.container.addChild(reel.container);
        }
    }

    rotate(fn) {
        let i;
        this.finalResult = [];

        if (this.text && this.text.text) {
            this.text.text = '';
            this.textWrapper.alpha = 0;
        };
        const randomArray = randomArrayHelper(this.gameResults);

        for (i = 0; i < this.reels.length; i++) {
            let reel = this.reels[i];
            // let random = Math.floor(Math.random() * this.reelPositions);
            let random = randomArray[i];
            reel.startRotation(random, fn);
            this.finalResult.push(random);
            if(this.gameResults.length === 4){
                this.gameResults = [];
            }
        }
    }


    checkRows(result) {

        if (
            checkIfWin(result).result
        ) {
            this.showWinningText('YOU WON!');
            this.gameResults.push(1);
        }else{
            this.gameResults.push(0);
        }
    }

    showWinningText(text) {
        this.textWrapper = new PIXI.Container();
        this.textWrapper.x = -20;
        this.textWrapper.y = 0;

        this.textBG = new PIXI.Graphics();

        this.textBG.beginFill(0x143c25);
        this.textBG.drawRect(0, 0, 730, 430);
        this.textBG.endFill();
        this.textBG.alpha = 0.5;
        this.textWrapper.addChild(this.textBG);
        this.text = new PIXI.Text(text, this.textStyle);
        this.text.position.x = 185;
        this.text.position.y = 165;
        this.textWrapper.addChild(this.text);
        this.container.addChild(this.textWrapper);
        this.toogleButton();
        setTimeout(()=>{
            this.text.text = '';
            this.textWrapper.alpha = 0;
            this.toogleButton();
        }, 3000);
    }

    stopAnimationImmidiatly(){
        this.reels.reels.forEach(reel => {
            reel.animation = false
        })
    }
}