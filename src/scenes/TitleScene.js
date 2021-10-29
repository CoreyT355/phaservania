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
        // let el = document.getElementsByTagName("canvas")[0];
        // el.style.width = 500 + "px";
        // el.style.height = 288 + "px";

        this.blink = 1000;

        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER,
        );

        // let title_text = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 200, 'Press ENTER')
        // title_text.setOrigin(0.5);

        
        let instruction_text = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 200, 'Instructions')
        instruction_text.setOrigin(0.5, -4);
        
        let instruction_text_move = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 200, 'Arrow Keys - Move/Jump')
        instruction_text_move.setOrigin(0.5, -5);
        
        let instruction_text_attack = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 200, 'Ctrl/Shift - Attack')
        instruction_text_attack.setOrigin(0.5, -6);
        
        let instruction_text_pause = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 200, 'Backspace - Pause')
        instruction_text_pause.setOrigin(0.5, -7);
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
