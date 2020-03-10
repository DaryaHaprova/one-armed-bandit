import * as PIXI from "pixi.js";

export default class Reel {
    constructor( resources){
        this.resources = resources;
        this.width = 236;
        this.height = 140;
        this.cached = {};
        this.animation = true;
        this.position = {
            x: 0,
            y: 0
        };
        this.delayStop = 1;
        this.singleReel = [
            { id: 0, texture: this.resources.sym_1.texture },
            { id: 1, texture: this.resources.sym_2.texture },
            { id: 2, texture: this.resources.sym_3.texture },
            { id: 3, texture: this.resources.sym_4.texture },
            { id: 4, texture: this.resources.sym_5.texture },
        ];

        this.container = new PIXI.Container();
        this.container.position.x = this.position.x;
        this.container.position.y = this.position.y;
        let reelIds = this.singleReel.map(item => item.id);

        this.createTurn(reelIds.sort(() => 0.5 - Math.random()));
        this.createReels();

    }

    createTurn(turn) {
        let i;
        let turned = [];
        for (i = 0; i < 3; i++) {
            this.singleReel.forEach(item => {
                if (item.id === turn[i]) turned.push(item)
            })
        }
        this.singleReel = turned;
    }

    createReels() {
        let i;
        let item;
        for(i = 0; i < this.singleReel.length; i++) {
            item = new PIXI.Sprite(this.singleReel[i].texture);
            item.scale.set(0.8,0.8);
            item.position.y = i * this.height;
            this.cached[`id_${this.singleReel[i].id}`] = item;
            this.container.addChild(item);
        }
    }

    startRotation(randomReel, callback) {
        this.animation = true;
        let ids = Object.keys(this.cached);
        randomReel.forEach((item, index) => {
            this.cached[ids[index]].texture = this.resources[`sym_${item+1}`].texture;
            this.singleReel[index].id = item;
        });
        this.selected = randomReel[0];
        this.stopAnimation();
        this.startAnimation(randomReel, callback);
    }

    startAnimation(reel, callback) {
        let ids = Object.keys(this.cached);
        let selectedReel = this.cached[ids[1]].position.y;

        let i;

        if (
            !this.animation &&
            selectedReel === this.height
        ){
            callback();
            return false;
        }


        for (i = 0; i < this.singleReel.length; i++) {
            let current = this.cached[ids[i]];
            current.position.y -= this.height/4;
            if (current.position.y <= -this.height) {
                current.position.y = (this.singleReel.length - 1) * this.height;
            }
        }

        requestAnimationFrame(this.startAnimation.bind(this, reel, callback));
    }

    stopAnimation() {
        let delay = 3000 + this.delayStop;
        setTimeout(() => this.animation = false, delay);
    }
}