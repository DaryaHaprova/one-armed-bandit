import Reel from './Reel';
import * as PIXI from "pixi.js";
import {randomArrayHelper, checkIfWin} from "./helpers/randomArrayHelper.js"
import Balance from './Balance'


export default class ReelContainer {
    constructor(addToStage, resources, toggleButton) {
        this.toggleButton = toggleButton;
        this.resources = resources;
        this.x = window.innerWidth/2 - 390;
        this.y = window.innerHeight/2 - 200;
        this.delayStop = 500;
        this.columnPadding = 8;
        this.textStyle = {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: '60px',
            "fill": [
                "#ffd956",
                "#ff0000"
            ],
            stroke: '#0a0a0a',
            strokeThickness: 5,
            wordWrap: true,
            wordWrapWidth: 440
        };
        this.loseTextStyle = {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: '60px',
            "fill": [
                "#c4c4c4",
                "#3f34cb"
            ],
            stroke: '#0a0a0a',
            strokeThickness: 5,
            wordWrap: true,
            wordWrapWidth: 440
        };

        this.reels = Array.from({ length: 3 }, () => new Reel(this.resources));
        this.balance = new Balance();
        this.container = new PIXI.Container();
        this.container.x = this.x;
        this.container.y = this.y;
        this.addReel();
        this.container.addChild(this.balance.container);
        this.createTextWrapper();
        this.gameResults = []
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
        if(this.balance.checkMoney()) {
            let i;
            this.finalResult = [];

            if (this.text && this.text.text) {
                this.text.text = '';
                this.textWrapper.alpha = 0;
            }
            const randomArray = randomArrayHelper(this.gameResults);

            for (i = 0; i < this.reels.length; i++) {
                let reel = this.reels[i];
                let random = randomArray[i];
                reel.startRotation(random, fn);
                this.finalResult.push(random);
                if (this.gameResults.length === 4) {
                    this.gameResults = [];
                }
            }
            this.balance.makeBet();
        }else{
            this.showLosingText();
        }
    }


    checkRows(result) {
        if (
            checkIfWin(result).result
        ) {
            this.showWinningText('YOU WON 10$!');
            this.gameResults.push(1);
            this.balance.addWin();
        }else{
            this.gameResults.push(0);
        }
    }

    createTextWrapper(){
        this.textWrapper = new PIXI.Container();
        this.textWrapper.x = -20;
        this.textWrapper.y = 0;
        this.textBG = new PIXI.Graphics();
        this.textBG.beginFill(0x143c25);
        this.textBG.drawRect(0, 0, 730, 430);
        this.textBG.endFill();
        this.textBG.alpha = 0.5;
        this.textWrapper.addChild(this.textBG);
        this.textWrapper.alpha = 0
    }

    showWinningText(text) {
        this.textWrapper.alpha = 1;
        this.text = new PIXI.Text(text, this.textStyle);
        this.text.position.x = 140;
        this.text.position.y = 165;
        this.textWrapper.addChild(this.text);
        this.container.addChild(this.textWrapper);
        this.toggleButton();
        setTimeout(()=>{
            this.clearText();
        }, 3000);
    }

    clearText(){
        if(this.text&&this.text.text) {
            this.text.text = '';
            this.textWrapper.alpha = 0;
            this.toggleButton();
        }
    }

    showLosingText(){
        this.losingText = new PIXI.Text("Game over((", this.loseTextStyle);
        this.losingText.position.x = 140;
        this.losingText.position.y = 100;
        this.tryText = new PIXI.Text("Try again!", this.textStyle);
        this.tryText.position.x = 170;
        this.tryText.position.y = 160;
        this.textWrapper.addChild(this.losingText);
        this.textWrapper.addChild(this.tryText);
        this.tryText.interactive = true;
        this.tryText.buttonMode = true;
        this.textWrapper.alpha = 1;
        this.tryText.on('click', ()=>{
            this.losingText.text = "";
            this.tryText.text = "";
            this.balance.resetBalance();
            this.toggleButton();
            this.textWrapper.alpha = 0;
        });
    }

    stopAnimationImmidiatly(){
        this.reels.reels.forEach(reel => {
            reel.animation = false
        })
    }
}