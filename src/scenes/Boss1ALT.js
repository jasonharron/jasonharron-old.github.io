/*global Phaser*/
export default class Boss1 extends Phaser.Scene {
  constructor () {
    super('Boss1');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    //Peggy spritesheet
    this.load.spritesheet('peggy', "./assets/spritesheets/mainCharacter-gun.png", {
      frameHeight: 32,
      frameWidth: 32
    });
    //Boss sprite (maybe create sprite sheet for him to give him a
    // some life with animations)
    this.load.image('boss', './assets/Boss1/bossPirate3.png');

    //background
    this.load.image('background', './assets/Boss1/bossBackground.png');

    //other game objects
    this.load.image('bullet', './assets/sprites/bulletSmall.png');
    this.load.image('cannon', './assets/sprites/cannon.png' )


    //Load tilemap and tileset
    this.load.image('tiles', './assets/Boss1/shipAndBeachTiles.png');
    this.load.tilemapTiledJSON('map', './assets/Boss1/bossRoom1.json');

    // Load the gun/jump sound effect
    this.load.audio('gunAudio', './assets/audio/477346__mattiagiovanetti__some-laser-gun-shots-iii.mp3');
    this.load.audio('jumpAudio', './assets/audio/277219__thedweebman__8-bit-jump-2.mp3');

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
    var bullets;
  }

  create (data) {
    //load level background first, everything built on top of it
    var background = this.add.image(800/2, 600/2, "background");

    // initialize audio effects
    this.gunSound = this.sound.add('gunAudio');
    this.jumpSound = this.sound.add('jumpAudio');
    this.jumpSound.volume = 0.1;

    //Create player character
    this.player = this.physics.add.sprite(400, 550, 'peggy');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1.5);

    //create world bounds
    this.physics.world.setBounds(0, 0, 800, 600);

    //create level camera
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.startFollow(this.player);


    //create level layout
    const map = this.make.tilemap({ key: 'map' });
    var tileset = map.addTilesetImage('shipAndBeachTiles', 'tiles');
    const platforms = map.createStaticLayer('Boss Room Platforms', tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);


    //player can stand on the platforms
    this.physics.add.collider(this.player, platforms);

    //add Boss character to level
    this.boss = this.physics.add.sprite(400, 96, 'boss');
    this.boss.setScale(2);
    this.physics.add.collider(this.boss, platforms);
    this.physics.add.collider(this.player, this.boss);

    //add his cannons
    this.cannon1 = this.physics.add.sprite(64, 64, 'cannon');
    this.cannon1.setScale(2);
    this.cannon2 = this.physics.add.sprite(736, 64, 'cannon');
    this.cannon2.setScale(2);
    this.physics.add.collider(this.cannon1, platforms);
    this.physics.add.collider(this.cannon2, platforms);

    this.bullets;
    //Lets add bullets
    var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:
      function Bullet (scene){
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(250, 1);
},

      fire: function (x, y, flipX){
        if (flipX == true){
          this.flipX = flipX
          this.setPosition(x-16, y);
        }
        else{
          this.flipX = flipX
          this.setPosition(x+16, y);
        }
        this.setActive(true);
        this.setVisible(true);
},

      update: function (time, delta){
        if (this.flipX === true){
          this.x -= this.speed * delta;
        }
        else{
          this.x += this.speed * delta;
        }
        if (this.x < 0 || this.x > 800){
          this.setActive(false);
          this.setVisible(false);
        }

}

});
    this.bullets = this.add.group({
      classType: Bullet,
      maxSize: 10,
      runChildUpdate: true
    });
    this.lastFired = 0;






    // animations
    // Peggy animations
    //create animation from spritesheet
  this.anims.create({
    key: "walk",
    frames: this.anims.generateFrameNumbers('peggy', {start: 1, end: 5}),
    frameRate: 10,
    repeat: -1 //repeat forever
  });
  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers('peggy', {start:0, end:0}),
    frameRate: 10,
    repeat: -1
  });



  }

  update (time, delta) {
    // Player Movement with WASD and shift to sprint
    var movement = this.input.keyboard.addKeys('W, A, S, D, SHIFT');
    var speed;

    // Hold down shift to make Peggy sprint
    // this must come before input detection of WASD because
    // otherwise it wont change the speed variable before she
    // starts moving
    if (movement.SHIFT.isDown){
      speed = 210;
    }
    else{
      speed = 135;
    }
    // Move Left
    if (movement.A.isDown){
      this.player.setVelocityX(-speed);
      this.player.flipX = true;
      this.player.anims.play('walk', true);
    }
    // Move Right
    else if (movement.D.isDown){
      this.player.setVelocityX(speed);
      this.player.flipX = false;
      this.player.anims.play('walk', true);
    }
    // Idle
    else {
      if (this.player.body.onFloor()){
      this.player.anims.play('idle', true);
      this.player.setVelocityX(0);
      }
    }
    // player can jump if they are touching the ground
    // removed the bounce because it means you cant jump right away after
    // intial jump because the bounce puts them in air
    if (movement.W.isDown && this.player.body.onFloor()){
      this.player.setVelocityY(-225);
      this.jumpSound.play();
    }
    //allows fast falling for more player mobility
    // jump and fall speed need to be experimented with
    else if(movement.S.isDown && !this.player.body.onFloor()){
      this.player.setVelocityY(300);
    }

    //Player fires weapon
    var bang = this.input.keyboard.addKeys('O');
    if (bang.O.isDown && time > this.lastFired)
    {
        var bullet = this.bullets.get();
        bullet.enableBody;
        if (bullet)
        {
            bullet.fire(this.player.x, this.player.y, this.player.flipX);
            this.lastFired = time + 300;
        }
    }
    if (this.boss.body.touching.bullet){
      this.boss.setVisible(false);
    }


  }
}
