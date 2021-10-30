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
        );

        this.load.image("title", "assets/sprites/title-screen.png");
    }

    create() {
        
        this.attractMode = null;

        // Places to warp to (from pipes). These coordinates is used also to define current room (see below)
        this.destinations = {};

        [
            "bg-moon",
            "bg-mountains",
            "bg-graveyard"
        ].forEach(bg => {
            this.background = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, bg);
            this.background.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
            this.background.setScrollFactor(0);
        });


        let textWidthPosition = this.sys.game.config.width / 2;
        let textHeightPosition = this.sys.game.config.height - 200;
        textHeightPosition += 320;
        textWidthPosition -= 350;

        this.title = this.add.image(
            textWidthPosition,
            textHeightPosition,
            "title"
        );

        textHeightPosition += 150;
        
        let instruction_text = this.add.text(textWidthPosition, textHeightPosition, 'Instructions')
        instruction_text.setOrigin(0.5, -4);
        
        let instruction_text_move = this.add.text(textWidthPosition, textHeightPosition, 'Arrow Keys - Move/Jump')
        instruction_text_move.setOrigin(0.5, -5);
        
        let instruction_text_attack = this.add.text(textWidthPosition, textHeightPosition, 'Ctrl/Shift - Attack')
        instruction_text_attack.setOrigin(0.5, -6);
        
        let instruction_text_pause = this.add.text(textWidthPosition, textHeightPosition, 'Backspace - Pause')
        instruction_text_pause.setOrigin(0.5, -7);


        // Add the map + bind the tileset
        this.map = this.make.tilemap({
            key: "map"
        });
        this.tileset = this.map.addTilesetImage("tileset");

        this.collisionLayer = this.map.createStaticLayer(
            "Collisions Layer",
            this.tileset,
            -355,
            470
        );
        this.collisionLayer.setVisible(false);

        this.map.createDynamicLayer("Back Layer", this.tileset, -320, 500);
        // Dynamic layer because we want breakable and animated tiles
        this.groundLayer = this.map.createDynamicLayer(
            "Main Layer",
            this.tileset,
            -320,
            500
        );

        // We got the map. Tell animated tiles plugin to loop through the tileset properties and get ready.
        // We don't need to do anything beyond this point for animated tiles to work.
        this.sys.animatedTiles.init(this.map);

        // Probably not the correct way of doing this:
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        this.cameras.main.setBounds(-320, 0, 4800, 4450);

        // This group contains all enemies for collision and calling update-methods
        this.enemyGroup = this.add.group();

        // A group powerUps to update
        this.powerUps = this.add.group();

        // this.keys will contain all we need to control Mario.
        // Any key could just replace the default (like this.key.jump)
        this.keys = {
            jump: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.UP
            ),
            jump2: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            ),
            attack: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.CTRL
            ),
            attack2: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SHIFT
            ),
            left: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.LEFT
            ),
            right: this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.RIGHT
            ),
        };

        // this.createHUD();

        // If the game ended while physics was disabled
        this.physics.world.resume();

        // Pause Game
        // TODO: This currently only pauses one time. Need to 'reset' this functionality 
        // somehow to allow infinite pausing
        this.input.keyboard.once('keydown_BACKSPACE', function() {
            this.pauseGame();
        }, this);

        // Create Player!!!
        this.player = new Player({
            scene: this,
            key: "player",
            x: 0,
            y: this.sys.game.config.height + 20
        });
        this.collisionLayer.setCollisionBetween(1, 999, true);
        this.physics.add.collider(this.collisionLayer, this.player);
        // The camera should follow Player
        this.cameras.main.startFollow(this.player);
    }

    pauseGame() {
        this.scene.pause("GameScene");
        this.scene.launch("PauseScene");
        console.log("pause");
    }

    update(time, delta) {
        if (this.physics.world.isPaused) {
            return;
        }

        // Run the update method of Player
        this.player.update(this.keys, time, delta);
    }

    updateScore(score) {
        this.score.pts += score;
        this.score.textObject.setText(("" + this.score.pts).padStart(6, "0"));
    }

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
