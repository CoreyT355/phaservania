class PauseScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: "PauseScene"
    });
  }

  create() {
    console.log("launched pause scene");
    [
      "bg-moon",
      "bg-mountains"
    ].forEach(bg => {
      this.background = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, bg);
      this.background.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
      this.background.setScrollFactor(0);
    });

    this.scene.bringToTop();

    let pause_text = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 200, 'PAUSED')
    pause_text.setOrigin(0.5);
    
    let resume_text = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 200, 'Press Backspace to Resume')
    resume_text.setOrigin(0.5, -2);

    this.resumeKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.BACKSPACE,
    );
  }

  update() {
    if(this.resumeKey.isDown) {
      this.resumeGame();
    }
  }

  resumeGame() {
    this.scene.stop("PauseScene");
    this.scene.resume("GameScene");
    console.log("unpause");
  }
}

export default PauseScene;