class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: "TitleScene"
        });
    }
    preload() {
        this.load.image("title", "assets/sprites/title-screen.png");
        this.load.image("press-enter", "assets/sprites/press-enter-text.png");
    }
    create() {
        // let config = {
        //     key: "title"
        // };
        // this.anims.create(config);

        [
            "bg-moon",
            "bg-mountains"
        ].forEach(bg => {
            this.background = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, bg);
            this.background.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
            this.background.setScrollFactor(0);
        });

        this.title = this.add.image(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            "title"
        );


        this.title = this.add.image(
            this.sys.game.config.width / 2,
            (this.sys.game.config.height / 2) + 70,
            "press-enter"
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

        this.blink = 1000;

    }

    update(time, delta) {
        if (this.registry.get("restartScene")) {
            this.restartScene();
        }

        if (!this.registry.get("attractMode")) {
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
