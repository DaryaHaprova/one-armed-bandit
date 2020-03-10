import * as PIXI from "pixi.js";

export default class Balance {
    constructor() {
        this.money = 100;
        this.bet = 5;
        this.wins = 0;
        this.width = 100;
        this.height = 100;
        this.position = {
            x: 720,
            y: 300
        };
        this.textStyle = {
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: '18px',
            "fill": [
                "#ffd956",
                "#ff0000"
            ],
            stroke: '#0a0a0a',
            strokeThickness: 3,
            wordWrap: true,
            wordWrapWidth: 440
        };

        this.container = new PIXI.Container();
        this.container.position.x = this.position.x;
        this.container.position.y = this.position.y;
        this.container.width = this.width;
        this.container.height = this.height;
        this.createBackground();
        this.createBalanceText();
        this.createWinsText();
    }
    createBackground(){
        this.BG = new PIXI.Graphics();
        this.BG.beginFill(0x143c25);
        this.BG.drawRect(0, 0, 130, 100);
        this.BG.endFill();
        this.BG.position.x = 0;
        this.BG.position.y = 0;
        this.BG.alpha = 0.7;
        this.container.addChild(this.BG);
    }

    createBalanceText(){
        this.moneyText = new PIXI.Text(`Money: ${this.money}$`, this.textStyle);
        this.moneyText.position.x = 10;
        this.moneyText.position.y = 20;
        this.container.addChild(this.moneyText);
    }

    createWinsText(){
        this.winsText = new PIXI.Text(`Wins: ${this.wins}`, this.textStyle);
        this.winsText.position.x = 10;
        this.winsText.position.y = 60;
        this.container.addChild(this.winsText);
    }

    makeBet(){
            this.money -= this.bet;
            this.moneyText.text = `Money: ${this.money}$`;
    }

    addWin(){
        this.wins++;
        this.money += this.bet*2;
        this.moneyText.text = `Money: ${this.money}$`;
        this.winsText.text = `Wins: ${this.wins}`;

    }
    checkMoney(){
        return this.money > 0
    }

    resetBalance(){
        this.money = 100;
        this.wins = 0;
        this.moneyText.text = `Money: ${this.money}$`;
        this.winsText.text = `Wins: ${this.wins}`;
    }


}