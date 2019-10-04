class TitleScene extends Phaser.Scene {
	constructor() {
		super({
			key: "TitleScene"
		});
	}
	preload() {
		this.load.image("title", "assets/sprites/title-screen.png");
	}
	create() {
		this.title = this.add.image(
			this.sys.game.config.width / 2,
			this.sys.game.config.height / 2,
			"title"
		);

		// this.attractMode = this.scene.launch("GameScene");

		this.scene.bringToTop();

		this.registry.set("restartScene", false);

		this.registry.set("attractMode", false);

		let sh = window.screen.availHeight;
		let sw = window.screen.availWidth;
		let ch = 0;
		let cw = 0;
		let multiplier = 1;
		if (sh / sw > 0.6) {
			// Portrait, fit width
			multiplier = sw / 384;
		} else {
			multiplier = sh / 224;
		}
		multiplier = Math.floor(multiplier);

		this.blink = 1000;

		this.startKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.ENTER,
		);

		let title_text = this.add.text(350, 400, 'Press ENTER')

	}

	update(time, delta) {
		if (this.registry.get("restartScene")) {
			this.restartScene();
		}
		this.blink -= delta;
		if (this.blink < 0) {
			this.blink = 500;
		}

		if (!this.registry.get("attractMode")) {}
		if (this.startKey.isDown) {
			this.startGame();
		}
	}

	startGame() {
		this.scene.stop("GameScene");
		this.registry.set("attractMode", false);
		this.scene.start("GameScene");
	}

	restartScene() {
		this.scene.stop("GameScene");
		this.scene.launch("GameScene");
		this.scene.bringToTop();

		this.registry.set("restartScene", false);
	}
}

export default TitleScene;
