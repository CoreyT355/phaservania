export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.acceleration = 224;
        this.body.maxVelocity.x = 200;
        this.body.maxVelocity.y = 500;
        this.animSuffix = "";

        this.wasHurt = -1;
        this.flashToggle = false;
        this.star = {
            active: false,
            timer: -1,
            step: 0
        };
        this.enteringPipe = false;
        this.anims.play("idle");
        this.alive = true;
        this.type = "player";
        this.jumpTimer = 0;
        this.jumping = false;

        this.large();

        // this.on(
        //     "animationcomplete",
        //     () => {
        //         if (
        //             this.anims.currentAnim.key === "grow" ||
        //             this.anims.currentAnim.key === "shrink"
        //         ) {
        //             this.scene.physics.world.resume();
        //         }
        //     },
        //     this
        // );
    }

    update(keys, time, delta) {
        // Don't do updates while entering the pipe or being dead
        // if (this.enteringPipe || !this.alive) {
        //     return;
        // }

        // Just run callbacks when hitting something from below or trying to enter it

        this.scene.physics.world.collide(this, this.scene.groundLayer);
        this.log([this.wasHurt,"hurt update"]);
        if (this.wasHurt > 0) {
            this.wasHurt -= delta;
            this.flashToggle = !this.flashToggle;
            this.alpha = this.flashToggle ? 0.2 : 1;
            if (this.wasHurt <= 0) {
                this.alpha = 1;
            }
        }

        let input = {
            left: keys.left.isDown,
            right: keys.right.isDown,
            jump: keys.jump.isDown || keys.jump2.isDown,
            attack: keys.attack.isDown || keys.attack2.isDown
        };

        if (input.attack && this.animSuffix === "attack") {
            this.body.setVelocityY(-400);
        }

        if (this.body.velocity.y > 0) {
            this.hasFalled = true;
        }

        this.jumpTimer -= delta;

        if (input.left) {
            if (this.body.velocity.y === 0) {
                this.run(-this.acceleration);
            } else {
                this.run(-this.acceleration / 3);
            }
            this.flipX = true;
        } else if (input.right) {
            if (this.body.velocity.y === 0) {
                this.run(this.acceleration);
            } else {
                this.run(this.acceleration / 3);
            }
            this.flipX = false;
        } else if (this.body.blocked.down) {
            if (Math.abs(this.body.velocity.x) < 10) {
                this.body.setVelocityX(0);
                this.run(0);
            } else {
                this.run(
                    ((this.body.velocity.x > 0 ? -1 : 1) * this.acceleration) /
                        2
                );
            }
        } else if (!this.body.blocked.down) {
            this.run(0);
        }

        if (input.jump && (!this.jumping || this.jumpTimer > 0)) {
            this.jump();
        } else if (!input.jump) {
            this.jumpTimer = -1; // Don't resume jump if button is released, prevents mini double-jumps
            if (this.body.blocked.down) {
                this.jumping = false;
            }
        }

        let anim = null;
        if (this.body.velocity.y !== 0 || this.jumping) {
            anim = "jump";
        } else if (this.body.velocity.x !== 0) {
            anim = "run";
            if (
                (input.left || input.right) &&
                ((this.body.velocity.x > 0 && this.body.acceleration.x < 0) ||
                    (this.body.velocity.x < 0 && this.body.acceleration.x > 0))
            ) {
                anim = "idle";
            } else if (
                this.animSuffix !== "" &&
                input.down &&
                !(input.right || input.left)
            ) {
                anim = "idle";
            }
        } else if (input.attack) {
            anim = "attack";
        } else {
            anim = "idle";
            if (
                this.animSuffix !== "" &&
                input.down &&
                !(input.right || input.left)
            ) {
                anim = "idle";
            }
        }

        anim += this.animSuffix;
        if (
            this.anims.currentAnim.key !== anim &&
            !this.scene.physics.world.isPaused
        ) {
            this.log("anim",anim);
            this.anims.play(anim);
        }

        this.physicsCheck = true;
    }

    run(vel) {
        this.body.setAccelerationX(vel);
    }

    jump() {
        if (!this.body.blocked.down && !this.jumping) {
            return;
        }

        if (!this.jumping) {
            if (this.animSuffix === "") {
                //this.scene.sound.playAudioSprite("sfx", "smb_jump-small");
            } else {
                //this.scene.sound.playAudioSprite("sfx", "smb_jump-super");
            }
        }
        if (this.body.velocity.y < 0 || this.body.blocked.down) {
            this.body.setVelocityY(-200);
        }
        if (!this.jumping) {
            this.jumpTimer = 300;
        }
        this.jumping = true;
    }

    enemyBounce(enemy) {
        console.log("enemyBounce");
        // Force Player y-position up a bit (on top of the enemy) to avoid getting killed
        // by neigbouring enemy before being able to bounce
        this.body.y = enemy.body.y - this.body.height;
        // TODO: if jump-key is down, add a boost value to jump-velocity to use and init jump for controls to handle.
        this.body.setVelocityY(-150);
    }

    hurtBy(enemy) {
        // if (!this.alive) {
        //     return;
        // }

        if (this.wasHurt < 1) {
            this.log("wasHurt");
            // if (this.animSuffix !== "") {
            this.log(["animSuffix",this.animSuffix]);
            this.resize(true);
            this.scene.sound.playAudioSprite("sfx", "hurt");
            this.wasHurt = 2000;
            // } else {
            // this.log("die");
            //     this.die();
            // }
        }
    }

    resize(large) {
        this.log(["resize",large]);
        this.scene.physics.world.pause();
        if (large) {
            this.large();
            this.animSuffix = "Super";
            this.play("grow");
        } else {
            this.small();
            this.animSuffix = "";
            this.play("shrink");
        }
    }

    small() {
        this.body.setSize(this.width, this.height);
    }

    large() {
        this.body.setSize(10, 22);
        this.body.offset.set(3, 10);
    }

    die() {
        this.log(["die",this.alive]);
        //this.scene.music.pause();
        // this.scene.sound.playAudioSprite("sfx", "smb_mariodie");
        // this.body.setAcceleration(0);
        // this.body.setVelocity(0, -300);
        // this.alive = false;
    }

    log(me){
        console.log(me)
    }
}
