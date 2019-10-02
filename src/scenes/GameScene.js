import Player from "../sprites/Player";
import AnimatedTiles from "phaser-animated-tiles/dist/AnimatedTiles.min.js";

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene"
        });
    }

    preload() {
        this.load.scenePlugin(
            "animatedTiles",
            AnimatedTiles,
            "animatedTiles",
            "animatedTiles"
        );
    }

    create() {
        this.attractMode = null;

        // Places to warp to (from pipes). These coordinates is used also to define current room (see below)
        this.destinations = {};

        this.background = this.add
            .tileSprite(
                0,
                0,
                384,
                224,
                "bg-moon",
                "assets/environment/bg-moon.png"
            )
            .setOrigin(0);

        // Add and play the music
        //this.music = this.sound.add("overworld");
        // this.music.play({
        //     loop: true
        // });

        // Add the map + bind the tileset
        this.map = this.make.tilemap({
            key: "map"
        });
        this.tileset = this.map.addTilesetImage("tileset");

        this.collisionLayer = this.map.createStaticLayer(
            "Collisions Layer",
            this.tileset,
            -35,
            470
        );
        this.collisionLayer.setVisible(false);

        this.map.createDynamicLayer("Back Layer", this.tileset, 0, 500);
        // Dynamic layer because we want breakable and animated tiles
        this.groundLayer = this.map.createDynamicLayer(
            "Main Layer",
            this.tileset,
            0,
            500
        );

        // We got the map. Tell animated tiles plugin to loop through the tileset properties and get ready.
        // We don't need to do anything beyond this point for animated tiles to work.
        this.sys.animatedTiles.init(this.map);

        // Probably not the correct way of doing this:
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // This group contains all enemies for collision and calling update-methods
        this.enemyGroup = this.add.group();

        // A group powerUps to update
        this.powerUps = this.add.group();

        // this.keys will contain all we need to control Mario.
        // Any key could just replace the default (like this.key.jump)
        this.keys = {
            jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            jump2: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            ),
            attack: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.Z
            ),
            left: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.LEFT
            ),
            right: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.RIGHT
            )
        };

        //this.createHUD();

        // If the game ended while physics was disabled
        this.physics.world.resume();

        // Create Player!!!
        this.player = new Player({
            scene: this,
            key: "player",
            x: 50,
            y: this.sys.game.config.height
        });
        this.collisionLayer.setCollisionBetween(1, 999, true);
        this.physics.add.collider(this.collisionLayer, this.player);
        // The camera should follow Mario
        this.cameras.main.startFollow(this.player);
    }

    update(time, delta) {
        if (this.physics.world.isPaused) {
            return;
        }

        // Run the update method of Mario
        this.player.update(this.keys, time, delta);
    }

    updateScore(score) {
        this.score.pts += score;
        this.score.textObject.setText(("" + this.score.pts).padStart(6, "0"));
    }

    // createHUD() {
    //     const hud = this.add.bitmapText(
    //         5 * 8,
    //         8,
    //         "font",
    //         "MARIO                      TIME",
    //         8
    //     );
    //     hud.setScrollFactor(0, 0);
    //     this.levelTimer = {
    //         textObject: this.add.bitmapText(36 * 8, 16, "font", "255", 8),
    //         time: 150 * 1000,
    //         displayedTime: 255,
    //         hurry: false
    //     };
    //     this.levelTimer.textObject.setScrollFactor(0, 0);
    //     this.score = {
    //         pts: 0,
    //         textObject: this.add.bitmapText(5 * 8, 16, "font", "000000", 8)
    //     };
    //     this.score.textObject.setScrollFactor(0, 0);

    //     if (this.attractMode) {
    //         hud.alpha = 0;
    //         this.levelTimer.textObject.alpha = 0;
    //         this.score.textObject.alpha = 0;
    //     }
    // }

    cleanUp() {
        // Never called since 3.10 update (I called it from create before). If Everything is fine, I'll remove this method.
        // Scenes isn't properly destroyed yet.
        let ignore = [
            "sys",
            "anims",
            "cache",
            "registry",
            "sound",
            "textures",
            "events",
            "cameras",
            "make",
            "add",
            "scene",
            "children",
            "cameras3d",
            "time",
            "data",
            "input",
            "load",
            "tweens",
            "lights",
            "physics"
        ];
        let whatThisHad = [
            "sys",
            "anims",
            "cache",
            "registry",
            "sound",
            "textures",
            "events",
            "cameras",
            "make",
            "add",
            "scene",
            "children",
            "cameras3d",
            "time",
            "data",
            "input",
            "load",
            "tweens",
            "lights",
            "physics",
            "attractMode",
            "destinations",
            "rooms",
            "eightBit",
            "music",
            "map",
            "tileset",
            "groundLayer",
            "mario",
            "enemyGroup",
            "powerUps",
            "keys",
            "blockEmitter",
            "bounceTile",
            "levelTimer",
            "score",
            "finishLine",
            "touchControls"
        ];
        whatThisHad.forEach(key => {
            if (ignore.indexOf(key) === -1 && this[key]) {
                switch (key) {
                    case "enemyGroup":
                    case "music":
                    case "map":
                        this[key].destroy();
                        break;
                }
                this[key] = null;
            }
        });
    }
}

export default GameScene;
