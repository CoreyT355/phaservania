import "phaser";
import BootScene from "./scenes/BootScene";
import GameScene from "./scenes/GameScene";
import TitleScene from "./scenes/TitleScene";

let titleScene = new TitleScene();

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    parent: "content",
    width: 384,
    height: 224,
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 600
            },
            debug: false
        }
    },
    scene: [BootScene, TitleScene, GameScene]
};

const game = new Phaser.Game(config);

game.scene.add('TitleScene', titleScene);
game.scene.start('TitleScene')
