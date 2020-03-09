import {getImages} from "./services/imagesService";

const images = [
    {
        name: "background",
        url: "resources/BG.png"
    },
    {
        name: "btn_spin",
        url: "resources/BTN_Spin.png"
    },
    {
        name: "btn_spin_d",
        url: "resources/BTN_Spin_d.png"
    },
    {
        name: "sym_1",
        url: "resources/SYM1.png"
    },
    {
        name: "sym_2",
        url: "resources/SYM3.png"
    },
    {
        name: "sym_3",
        url: "resources/SYM5.png"
    },
    {
        name: "sym_4",
        url: "resources/SYM6.png"
    },
    {
        name: "sym_5",
        url: "resources/SYM7.png"
    },



];

export default class Loader {
    constructor(onAssetsLoaded, appLoader) {
        this.loader = appLoader;
        getImages().then(response => {
            console.log(response);
            this.loadAssets(response);
            this.loader.once('complete', onAssetsLoaded);
            this.loader.load();
        });

    }

    loadAssets(images) {
            this.loader.add(images);
    }
}