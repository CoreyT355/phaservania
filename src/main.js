import "phaser";
import BootScene from "./scenes/BootScene";
import GameScene from "./scenes/GameScene";
import TitleScene from "./scenes/TitleScene";

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    parent: "content",
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [BootScene, TitleScene, GameScene]
};

const game = new Phaser.Game(config);
