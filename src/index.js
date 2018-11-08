import "phaser";

var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var map;
var player;
var groundLayer;
var collisionLayer;
var cursors;
var qKey;

function preload() {
  this.load.image("logo", "assets/logo.png");
  this.load.image("loading", "assets/sprites/loading.png");
  // load title screen
  this.load.image("title", "assets/sprites/title-screen.png");
  this.load.image("game-over", "assets/sprites/game-over.png");
  this.load.image("enter", "assets/sprites/press-enter-text.png");
  this.load.image("credits", "assets/sprites/credits-text.png");
  this.load.image("instructions", "assets/sprites/instructions.png");
  // environment
  this.load.image("bg-moon", "assets/environment/bg-moon.png");
  this.load.image("bg-mountains", "assets/environment/bg-mountains.png");
  this.load.image("bg-graveyard", "assets/environment/bg-graveyard.png");
  // tileset
  this.load.image("tileset", "assets/environment/tileset.png");
  this.load.tilemapTiledJSON("map", "assets/maps/map.json");
  this.load.image("objects", "assets/environment/objects.png");
  // atlas sprite
  this.load.atlas("atlas", "assets/atlas/atlas.png", "assets/atlas/atlas.json");
  this.load.atlas(
    "atlas-props",
    "assets/atlas/atlas-props.png",
    "assets/atlas/atlas-props.json"
  );
  // audio
  this.load.audio("music", ["assets/sounds/sci_fi_platformer04_main_loop.ogg"]);
  this.load.audio("attack", ["assets/sounds/attack.ogg"]);
  this.load.audio("kill", ["assets/sounds/kill.ogg"]);
  this.load.audio("rise", ["assets/sounds/rise.ogg"]);
  this.load.audio("hurt", ["assets/sounds/hurt.ogg"]);
  this.load.audio("jump", ["assets/sounds/jump.ogg"]);
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tiles = map.addTilesetImage("tileset");

  map.createDynamicLayer("Back Layer", tiles, 0, 60);
  groundLayer = map.createDynamicLayer("Main Layer", tiles, 0, 60);
  //collisionLayer = map.createDynamicLayer("Collisions Layer", tiles);

  this.physics.world.bounds.width = groundLayer.width;
  this.physics.world.bounds.height = groundLayer.height;

  player = this.physics.add.sprite(6, 9, "player");
  player.setCollideWorldBounds(true);

  player.body.setSize(player.width, player.height - 8);
  this.physics.add.collider(groundLayer, player);
  // create the animations from the atlas
  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNames("atlas", {
      prefix: "hero-idle-",
      start: 1,
      end: 4,
      zeroPad: 0
    }),
    frameRate: 3,
    repeat: -1
  });
  this.anims.create({
    key: "run",
    frames: this.anims.generateFrameNames("atlas", {
      prefix: "hero-run-",
      start: 1,
      end: 6,
      zeroPad: 0
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "jump",
    frames: this.anims.generateFrameNames("atlas", {
      prefix: "hero-jump-",
      start: 1,
      end: 4,
      zeroPad: 0
    }),
    frameRate: 1,
    repeat: -1
  });
  this.anims.create({
    key: "attack",
    frames: this.anims.generateFrameNames("atlas", {
      prefix: "hero-attack-",
      start: 1,
      end: 5,
      zeroPad: 0
    }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();

  qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

  // Limit the camera to the map size
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(player);
}

function update(time, delta) {
  if (cursors.left.isDown) {
    player.body.setVelocityX(-100);
    player.anims.play(player.body.onFloor() ? "run" : "jump", true);
    player.flipX = true;
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(100);
    player.anims.play(player.body.onFloor() ? "run" : "jump", true);
    player.flipX = false;
  } else {
    player.body.setVelocityX(0);
    player.anims.play(player.body.onFloor() ? "idle" : "jump", true);
  }
  if (qKey.isDown) {
    player.body.setVelocityX(0);
    player.anims.play("attack", true);
  }
  if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
    player.body.setVelocityY(-400);
    player.anims.play("jump", true);
  }
}
