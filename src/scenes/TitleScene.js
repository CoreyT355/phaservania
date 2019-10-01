class TitleScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: "TitleScene"
        });
    }
    preload() {
        this.load.image("title", "assets/sprites/title-screen.png");
    }
    create() {
        // let config = {
        //     key: "title"
        // };
        // this.anims.create(config);

        this.backgroundMoon = this.add.tileSprite(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            384,
            224,
            "bg-moon"
        );

        this.backgroundMountains = this.add.tileSprite(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            384,
            224,
            "bg-mountains"
        );

        this.title = this.add.image(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "title"
        );

        this.attractMode = this.scene.launch("GameScene");

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
        // let el = document.getElementsByTagName("canvas")[0];
        // el.style.width = 500 + "px";
        // el.style.height = 288 + "px";

        this.blink = 1000;

        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.X
        );
    }

    update(time, delta) {
        if (this.registry.get("restartScene")) {
            this.restartScene();
        }
        this.blink -= delta;
        if (this.blink < 0) {
            //this.pressX.alpha = this.pressX.alpha === 1 ? 0 : 1;
            this.blink = 500;
        }

        if (!this.registry.get("attractMode")) {
        }
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
