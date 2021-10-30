export default function makeAnimations(scene) {
    // TONS of animations. Everything animation-related is ugly and stupid below.
    // TODO:  maybe use JSON to load animations
    let config = {};

    scene.anims.create({
        key: "idle",
        frames: scene.anims.generateFrameNames("atlas", {
            prefix: "hero-idle-",
            start: 1,
            end: 4,
            zeroPad: 0
        }),
        frameRate: 3,
        repeat: -1
    });
    scene.anims.create({
        key: "run",
        frames: scene.anims.generateFrameNames("atlas", {
            prefix: "hero-run-",
            start: 1,
            end: 6,
            zeroPad: 0
        }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: "jump",
        frames: scene.anims.generateFrameNames("atlas", {
            prefix: "hero-jump-",
            start: 1,
            end: 4,
            zeroPad: 0
        }),
        frameRate: 1,
        repeat: -1
    });
    scene.anims.create({
        key: "attack",
        frames: scene.anims.generateFrameNames("atlas", {
            prefix: "hero-attack-",
            start: 1,
            end: 5,
            zeroPad: 0
        }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: "ghost-halo-2",
        frames: scene.anims.generateFrameNames("atlas", {
            prefix: "ghost-halo-",
            start: 1,
            end: 5,
            zeroPad: 0
        }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "hell-gato-1",
        frames: scene.anims.generateFrameNames("atlas", {
            prefix: "hell-gato-",
            start: 1,
            end: 5,
            zeroPad: 0
        }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "skeleton-clothed-1",
        frames: scene.anims.generateFrameNames("atlas", {
            prefix: "skeleton-clothed-",
            start: 1,
            end: 5,
            zeroPad: 0
        }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "skeleton-rise-clothed-1",
        frames: scene.anims.generateFrameNames("atlas", {
            prefix: "skeleton-rise-clothed-",
            start: 1,
            end: 5,
            zeroPad: 0
        }),
        frameRate: 10,
        repeat: -1
    });


    //================================================================


    config = {
        key: "goomba",
        frames: scene.anims.generateFrameNames("mario-sprites", {
            prefix: "goomba/walk",
            start: 1,
            end: 2
        }),
        frameRate: 5,
        repeat: -1,
        repeatDelay: 0
    };
    scene.anims.create(config);
    config = {
        key: "goombaFlat",
        frames: [
            {
                key: "mario-sprites",
                frame: "goomba/flat"
            }
        ]
    };
    scene.anims.create(config);
    config = {
        key: "turtle",
        frames: scene.anims.generateFrameNames("mario-sprites", {
            prefix: "turtle/turtle",
            end: 1
        }),
        frameRate: 5,
        repeat: -1,
        repeatDelay: 0
    };

    scene.anims.create(config);
    config = {
        key: "mario/climb",
        frames: scene.anims.generateFrameNames("mario-sprites", {
            prefix: "mario/climb",
            end: 1
        }),
        frameRate: 5,
        repeat: -1,
        repeatDelay: 0
    };
    scene.anims.create(config);
    config = {
        key: "mario/climbSuper",
        frames: scene.anims.generateFrameNames("mario-sprites", {
            prefix: "mario/climbSuper",
            end: 1
        }),
        frameRate: 5,
        repeat: -1,
        repeatDelay: 0
    };

    scene.anims.create(config);

    config = {
        key: "flag",
        frames: [
            {
                key: "mario-sprites",
                frame: "flag"
            }
        ],
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: "turtleShell",
        frames: [
            {
                frame: "turtle/shell",
                key: "mario-sprites"
            }
        ]
    };

    scene.anims.create(config);

    config = {
        key: "mushroom",
        frames: [
            {
                frame: "powerup/super",
                key: "mario-sprites"
            }
        ]
    };
    scene.anims.create(config);

    config = {
        key: "coin",
        frames: scene.anims.generateFrameNames("mario-sprites", {
            prefix: "coin/spin",
            start: 1,
            end: 4
        }),
        frameRate: 30,
        repeat: -1,
        repeatDelay: 0
    };
    scene.anims.create(config);

    config = {
        key: "1up",
        frames: [
            {
                frame: "powerup/1up",
                key: "mario-sprites"
            }
        ]
    };
    scene.anims.create(config);

    config = {
        key: "flower",
        frames: scene.anims.generateFrameNames("mario-sprites", {
            prefix: "powerup/flower",
            start: 1,
            end: 4
        }),
        frameRate: 30,
        repeat: -1,
        repeatDelay: 0
    };
    scene.anims.create(config);

    config = {
        key: "star",
        frames: scene.anims.generateFrameNames("mario-sprites", {
            prefix: "powerup/star",
            start: 1,
            end: 4
        }),
        frameRate: 30,
        repeat: -1,
        repeatDelay: 0
    };
    scene.anims.create(config);
    config = {
        key: "dpad",
        frames: [
            {
                frame: "controller/dpad",
                key: "mario-sprites"
            }
        ]
    };
    scene.anims.create(config);
    config = {
        key: "button",
        frames: [
            {
                frame: "controller/button",
                key: "mario-sprites"
            }
        ]
    };
    scene.anims.create(config);

    config = {
        key: "fireFly",
        frames: scene.anims.generateFrameNames("mario-sprites", {
            prefix: "fire/fly",
            start: 1,
            end: 4
        }),
        frameRate: 10,
        repeat: -1,
        repeatDelay: 0
    };
    scene.anims.create(config);

    config = {
        key: "fireExplode",
        frames: scene.anims.generateFrameNames("mario-sprites", {
            prefix: "fire/explode",
            start: 1,
            end: 3
        }),
        frameRate: 30,
        repeat: 0,
        repeatDelay: 0
    };

    scene.anims.create(config);
}
