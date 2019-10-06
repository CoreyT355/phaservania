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

		this.background_1 = this.add
			.tileSprite(
				0,
				0,
				this.sys.game.config.width,
				this.sys.game.config.height,
				"bg-moon"
			)
			.setOrigin(0, 0)
			.setScrollFactor(0);

		this.background_2 = this.add
			.tileSprite(
				0,
				0,
				this.sys.game.config.width,
				this.sys.game.config.height,
				"bg-mountains"
			)
			.setOrigin(0, 0)
			.setScrollFactor(0);

		this.background_3 = this.add
			.tileSprite(
				0,
				0,
				this.sys.game.config.width,
				this.sys.game.config.height,
				"bg-graveyard"
			)
			.setOrigin(0, 0)
			.setScrollFactor(0);

		// Add the map + bind the tileset
		this.map = this.make.tilemap({
			key: "map"
		});
		this.tileset = this.map.addTilesetImage("tileset");

		this.collisionLayer = this.map.createStaticLayer(
			"Collisions Layer",
			this.tileset,
			-35,
			570
		);
		this.collisionLayer.setVisible(false);

		// Dynamic layer because we want breakable and animated tiles
		this.groundLayer = this.map.createDynamicLayer(
			"Main Layer",
			this.tileset,
			0,
			600
		);

		// We got the map. Tell animated tiles plugin to loop through the tileset properties and get ready.
		// We don't need to do anything beyond this point for animated tiles to work.
		this.sys.animatedTiles.init(this.map);

		// Probably not the correct way of doing this:
		//this.physics.world.bounds.width = this.groundLayer.width;
		//this.physics.world.bounds.height = this.groundLayer.height;

		// this.keys will contain all we need to control Mario.
		// Any key could just replace the default (like this.key.jump)
		this.keys = {
			jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
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
			)
		};

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

		// this.cameras.main.setBounds(
		// 	0,
		// 	0,
		// 	this.game.config.width * 3,
		// 	this.game.config.height
		// );

		// The camera should follow Mario
		this.cameras.main.startFollow(this.player);
	}

	update(time, delta) {
		if (this.physics.world.isPaused) {
			return;
		}

		this.background_1.tilePositionX = this.cameras.main.scrollX * .3;
		this.background_2.tilePositionX = this.cameras.main.scrollX * .6;
		this.background_3.tilePositionX = this.cameras.main.scrollX;

		// Run the update method of Mario
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
