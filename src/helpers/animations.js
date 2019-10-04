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

    scene.anims.create(config);
}
