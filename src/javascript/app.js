import FightersView from "./fightersView"
import {fighterService} from "./services/fightersService";
import StartFightView from "./startFightView"
import HeaderTextView from "./headerText"
import * as PIXI from 'pixi.js'
import SpinButton from "./SpinButton"

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

    ];

class App {
    constructor() {
        this.startApp();
    }

    static rootElement = document.getElementById('root');
    static loadingElement = document.getElementById('loading-overlay');

    async startApp() {
        const app = new PIXI.Application({
            autoResize: true,
            resolution: devicePixelRatio,
            transparent: true,
            width: 1680,
            height: 1050
        });
        app.renderer.resize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', resize);
        resize();
        try {
            App.loadingElement.style.visibility = 'visible';
            App.rootElement.appendChild(app.view);
            app.loader.add(images)
                .on("progress", ()=>{
                    App.loadingElement.style.visibility = 'visible';
                })
                .load(()=>{
                    setTimeout(()=>{
                        App.loadingElement.style.visibility = 'hidden';

                    }, 1000);
                    let background = new PIXI.Sprite(app.loader.resources.background.texture);
                    // background.scale.set(window.innerWidth / 960, window.innerHeight / 536);
                    background.position.set(window.innerWidth/2 - 480, window.innerHeight/2 - 268);
                    app.stage.addChild(background);
                    const spin = new SpinButton(app.stage, app.loader.resources.btn_spin.texture, app.loader.resources.btn_spin_d.texture);



                });




            // const fighters = await fighterService.getFighters();
            // const fightersView = new FightersView(fighters);
            // const startButton = new StartFightView(fightersView);
            // const headerText = new HeaderTextView();
            // const headerTextElement = headerText.element;
            // const fightersElement = fightersView.element;
            // const startButtonElement = startButton.element;
            //
            // App.rootElement.appendChild(headerTextElement);
            // App.rootElement.appendChild(fightersElement);
            // App.rootElement.appendChild(startButtonElement);
        } catch (error) {
            console.log(error)
            App.rootElement.innerText = 'Failed to load data';
        } finally {
            App.loadingElement.style.visibility = 'hidden';
        }


        function resize(e) {
            // Resize the renderer
            app.renderer.resize(window.innerWidth, window.innerHeight);

        }

    }
}



export default App