import "phaser";
import BootScene from "./scenes/BootScene";
import GameScene from "./scenes/GameScene";
import PauseScene from "./scenes/PauseScene";
import TitleScene from "./scenes/TitleScene";

let titleScene = new TitleScene();

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    parent: "content",
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.DOM.FILL,
        width: 768,
        height: 448,
        min: {
            width: 768,
            height: 448
        },
        max: {
            width: 1536,
            height: 896
        }
    },
    scene: [BootScene, TitleScene, GameScene, PauseScene]
};

const game = new Phaser.Game(config);

// game.scene.add('TitleScene', titleScene);
// game.scene.start('TitleScene')
