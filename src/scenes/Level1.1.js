/*global Phaser*/
export default class Level1v2 extends Phaser.Scene {
  constructor () {
    super('Level1v2');
  }

  init (data) {
    // Initialization code goes here

    // Load the health score
    this.gameHealth = 0;
    this.waitASecond = false;
    this.startTime = Date.now();
    this.peggyHurt1 = false;
    //for double jumping
    this.bootsObtained = false;
    this.jumpCount = 2;
    this.mobile = true;
    this.spriteValue = 7;
  }

  preload () {
    // Preload assets
    // Peggy spritesheet
    this.load.spritesheet('peggy', "./assets/spritesheets/peggyHurt1.png", {
      frameHeight: 32,
      frameWidth: 32
    });

    // Peggy (Hurt) spritesheet
    this.load.spritesheet('peggyHurt', "./assets/spritesheets/peggyHurt2.png", {
      frameHeight: 32,
      frameWidth: 32
    });

    //peggy with boots
    this.load.spritesheet('peggyGold', "./assets/spritesheets/PeggyGold.png", {
      frameHeight: 32,
      frameWidth: 32
    });


    // Load the health spriteSheet
    this.load.spritesheet('health', "./assets/spritesheets/healthSpriteSheet.png", {
      frameHeight: 48,
      frameWidth: 16
    });

    //boots
    this.load.image('boots', './assets/sprites/goldShoes.png' );
    //ship
    this.load.image('ship', './assets/sprites/pirateShip.png' );


    //projectiles
    this.load.image('bullet', './assets/sprites/bulletSmall.png');
    this.load.image('coconut', './assets/sprites/coconut_small.png');

    //other items
    this.load.image('heart', './assets/sprites/heart.png');

    // load background
    this.load.image('beachBackground', './assets/Level1.1/beachArtwork.png');

    //load enemies
    this.load.image('monkey', './assets/Level1.1/monkey.png');
    this.load.image('crab', './assets/Level1.1/crab_small.png');
    this.load.image("enemy", "./assets/possibleAssets/pirate.png");
    this.load.image("swordenemy", "./assets/possibleAssets/pirates.v1 copy.png");
    this.load.image("sword", "./assets/possibleAssets/sword.png");


    //load tile map
    this.load.image('jungleTiles', './assets/Level1.1/jungleTileSheet.png');
    this.load.image('beachTiles', './assets/Level1.1/shipAndBeachTiles.png');
    this.load.tilemapTiledJSON('map', './assets/Level1.1/Level 1 V2.json');

    // Load the sound effects
    this.load.audio('gunAudio', './assets/audio/477346__mattiagiovanetti__some-laser-gun-shots-iii.mp3');
    this.load.audio('jumpAudio', './assets/audio/277219__thedweebman__8-bit-jump-2.mp3');
    this.load.audio('screamAudio', './assets/audio/Wilhelm_Scream_wikipedia(public).ogg');
    this.load.audio('peggyScream', './assets/audio/peggyScream.mp3');
    this.load.audio('gameAudio', './assets/audio/JonECopeLoop1-1.mp3');

    this.load.audio('powerupAudio', './assets/audio/good(JonECope).mp3');


    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {
    //Create the scene
    var beachBackground = this.add.image(1200, 600, "beachBackground");
    beachBackground.setScale(3);

    this.gunSound = this.sound.add('gunAudio');
    this.gunSound.volume = 0.3;
    this.jumpSound = this.sound.add('jumpAudio');
    this.jumpSound.volume = 0.05;
    this.screamSound = this.sound.add('screamAudio');
    this.peggyScream = this.sound.add('peggyScream');
    this.gameMusic = this.sound.add('gameAudio');
    this.gameMusic.volume = 0.3;
    this.gameMusic.setLoop(true);
    this.gameMusic.play();

    this.powerupSound = this.sound.add('powerupAudio');
    this.powerupSound.setRate(1.5);



    this.text1 = this.add.text(50, 400, 'Use [W], [A], [S], [D] to walk around.', { font: "20px Arial", fill: "#000000" });
    //this.text2 = this.add.text(50, 430, 'Use [SHIFT] to run.', { font: "20px Arial", fill: "#000000" });
    this.text3 = this.add.text(50, 460, 'Use [O] to shoot enemies.', { font: "20px Arial", fill: "#000000" });
    this.text4 = this.add.text(2500, 1700, 'Collect hearts to boost health!', { font: "15px Arial", fill: "#ffffff" });

    this.text5 = this.add.text(3032, 1700, "You've found super boots!", { font: "15px Arial", fill: "#ffffff" });
    this.text6 = this.add.text(3032, 1750, "Press [W] while in the air to double jump.", { font: "15px Arial", fill: "#ffffff" });

    this.text7 = this.add.text(7700, 400, "You've found a pirate ship!", { font: "17px Arial", fill: "#ffffff" });
    this.text7 = this.add.text(7700, 430, "Hmm, wonder what's on board...", { font: "17px Arial", fill: "#ffffff" });

    this.player = this.physics.add.sprite(32, 546, 'peggy');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1.5);

    this.physics.world.setBounds(0, 0, 8000, 1920);

    this.cameras.main.setBounds(0, 0, 8000, 1920);
    this.cameras.main.startFollow(this.player);



    // tile map
    const map = this.make.tilemap({ key: 'map' });
    var tileset1 = map.addTilesetImage('jungleTileSheet', 'jungleTiles');
    var tileset2 = map.addTilesetImage('shipAndBeachTiles', 'beachTiles');
    const platforms = map.createStaticLayer('beach', tileset2, 0, 0);
    const platforms2 = map.createStaticLayer('jungle', tileset1, 0, 0);
    platforms.setCollisionByExclusion(-1, true);
    platforms2.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, platforms2);
    this.heart = this.physics.add.sprite(2600, 1750, 'heart');
    this.physics.add.collider(this.heart, platforms);
    this.physics.add.collider(this.heart, platforms2);
    this.heart.setScale(2);

    //add player's bullet group
    this.bullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 20
    });
    this.physics.add.collider(this.bullets, platforms, this.callbackFunc, null, this);
    this.physics.add.collider(this.bullets, platforms2, this.callbackFunc, null, this);

  //add enemy's bullet group
  this.enemyBullets = this.physics.add.group({
    defaultKey: "bullet",
    maxSize: 100
});

this.physics.add.collider(this.enemyBullets, platforms, this.callbackFunc, null, this);
this.physics.add.collider(this.enemyBullets, platforms2, this.callbackFunc, null, this);

  //add enemy's coconut enemyGroup
      this.enemyCoconuts = this.physics.add.group({
        defaultKey: "coconut",
        maxSize: 100
  });
      //how to get gravity of bullets to be zero??
      this.enemyCoconuts.children.iterate(function(child){
  });

  this.physics.add.collider(this.enemyCoconuts, platforms, this.callbackFunc, null, this);


    //create enemy group
    this.enemyGroup = this.physics.add.group({});

    //adding crab enemies
    this.crab1 = this.physics.add.sprite(736, 544, 'crab');
    this.enemyGroup.add(this.crab1);
    this.crab2 = this.physics.add.sprite(5472, 544, 'crab');
    this.enemyGroup.add(this.crab2);
    this.crab3 = this.physics.add.sprite(6400, 544, 'crab');
    this.enemyGroup.add(this.crab3);
    this.crab4 = this.physics.add.sprite(7072, 544, 'crab');
    this.enemyGroup.add(this.crab4);

    //adding pirate enemies
    this.pirate1 = this.physics.add.sprite(1060, 544, 'enemy');
    this.pirate1.setScale(3)
    .flipX = true;
    this.enemyGroup.add(this.pirate1);
    this.pirate2 = this.physics.add.sprite(1408, 480, 'enemy');
    this.pirate2.setScale(3)
    .flipX = true;
    this.enemyGroup.add(this.pirate2);
    this.pirate3 = this.physics.add.sprite(5504, 500, 'enemy');
    this.pirate3.setScale(3)
    .flipX = true;
    this.enemyGroup.add(this.pirate3);
    this.pirate4 = this.physics.add.sprite(6176, 344, 'enemy');
    this.pirate4.setScale(3)
    .flipX = true;
    this.enemyGroup.add(this.pirate4);
    this.pirate5 = this.physics.add.sprite(6474, 380, 'enemy');
    this.pirate5.setScale(3)
    .flipX = true;
    this.enemyGroup.add(this.pirate5);
    this.pirate6 = this.physics.add.sprite(6474, 150, 'enemy');
    this.pirate6.setScale(3)
    .flipX = true;
    this.enemyGroup.add(this.pirate6);
    this.pirate7 = this.physics.add.sprite(7040, 244, 'enemy');
    this.pirate7.setScale(3)
    this.enemyGroup.add(this.pirate7);


    //adding monkey enemies
    this.monkey1 = this.physics.add.sprite(2288, 448, 'monkey');
    this.enemyGroup.add(this.monkey1);
    this.monkey2 = this.physics.add.sprite(2176, 288, 'monkey');
    this.enemyGroup.add(this.monkey2);
    this.monkey3 = this.physics.add.sprite(2340, 160, 'monkey');
    this.enemyGroup.add(this.monkey3);
    this.monkey4 = this.physics.add.sprite(3590, 1500, 'monkey');
    this.enemyGroup.add(this.monkey4);
    this.monkey5= this.physics.add.sprite(2896, 1500, 'monkey');
    this.enemyGroup.add(this.monkey5);
    this.monkey6= this.physics.add.sprite(4512, 1080, 'monkey');
    this.enemyGroup.add(this.monkey6);
    this.monkey7= this.physics.add.sprite(5120, 440, 'monkey');
    this.enemyGroup.add(this.monkey7);



    this.physics.add.collider(this.enemyGroup, platforms);
    this.physics.add.collider(this.enemyGroup, platforms2);

    //if player touches enemy
    this.enemyGroup.children.each(
          function (b) {
            if (b.active) {
              this.physics.add.overlap( //if enemyGroup touches player, calls function
                b,
                this.player,
                this.healthHurt,
                null,
                this
              );
            }
          }.bind(this) //binds to each children
        );



    //this.chest = this.physics.add.sprite(2432, 1856,'chest');
//this.physics.add.collider(this.chest, platforms2);

this.boots = this.physics.add.sprite(3100, 1856,'boots');
this.physics.add.collider(this.boots, platforms2);


this.physics.add.overlap(this.player, this.boots, this.getBoots, null, this);

this.ship = this.physics.add.sprite(7970, 544, 'ship');
this.ship.setScale(2.5);
this.physics.add.collider(this.ship, platforms);
this.physics.add.overlap(this.player, this.ship, this.bossFight, null, this);

//if player touches chest
//this.physics.add.collider(this.player, this.chest, function(){});

    // animations

    //tweens
    //crab walking movement
    this.tweens.add({
      targets: this.crab1,
      x: '-=600',
      ease: "Linear",
      delay: 0,
      duration: 5000,
      yoyo: true,
      repeat: -1,
      flipX: true
    });
    this.tweens.add({
      targets: this.crab2,
      x: '-=650',
      ease: "Linear",
      delay: 0,
      duration: 5000,
      yoyo: true,
      repeat: -1,
      flipX: true
    });
    this.tweens.add({
      targets: this.crab3,
      x: '-=690',
      ease: "Linear",
      delay: 0,
      duration: 5000,
      yoyo: true,
      repeat: -1,
      flipX: true
    });
    this.tweens.add({
      targets: this.crab4,
      x: '-=640',
      ease: "Linear",
      delay: 0,
      duration: 5000,
      yoyo: true,
      repeat: -1,
      flipX: true
    });

    //monkeys throw coconuts
     this.tweens.add({
      targets: this.monkey1,
      ease: "Linear",
      x: '-=0',
      delay: 1000, //add delay so monkey takes time to throw coconut
      duration: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onRepeat: function(){this.enemyShootTargeted(this.monkey1, this.enemyCoconuts, this.player)},
     onRepeatScope: this
    });
    this.tweens.add({
      targets: this.monkey2,
      ease: "Linear",
      x: '-=0',
      delay: 1500,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onRepeat: function(){this.enemyShootTargeted(this.monkey2, this.enemyCoconuts, this.player)},
     onRepeatScope: this
    });
    this.tweens.add({
      targets: this.monkey3,
      ease: "Linear",
      x: '-=0',
      delay: 1250,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onRepeat: function(){this.enemyShootTargeted(this.monkey3, this.enemyCoconuts, this.player)},
     onRepeatScope: this
    });
    this.tweens.add({
      targets: this.monkey4,
      ease: "Linear",
      x: '-=0',
      delay: 1250,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onRepeat: function(){this.enemyShootTargeted(this.monkey4, this.enemyCoconuts, this.player)},
     onRepeatScope: this
    });
    this.tweens.add({
      targets: this.monkey5,
      ease: "Linear",
      x: '-=0',
      delay: 1250,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onRepeat: function(){this.enemyShootTargeted(this.monkey5, this.enemyCoconuts, this.player)},
     onRepeatScope: this
    });
    this.tweens.add({
      targets: this.monkey6,
      ease: "Linear",
      x: '-=0',
      delay: 1250,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onRepeat: function(){this.enemyShootTargeted(this.monkey6, this.enemyCoconuts, this.player)},
     onRepeatScope: this
    });
    this.tweens.add({
      targets: this.monkey7,
      ease: "Linear",
      x: '-=0',
      delay: 1250,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onRepeat: function(){this.enemyShootTargeted(this.monkey7, this.enemyCoconuts, this.player)},
     onRepeatScope: this
    });

    //pirate tweens
    this.add.tween({
      targets: this.pirate1,
      x: '-=0',
      ease: "Linear",
      delay: 2000,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onRepeat: function(){this.enemyShoot(this.pirate1, this.enemyBullets, this.player)},
     onRepeatScope: this
    });
    this.tweens.add({
      targets: this.pirate2,
      x: '+=232',
      ease: "Linear",
      delay: 1000,
      duration: 2000,
      repeatDelay: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true
    });
    this.tweens.add({
      targets: this.pirate3,
      x: '+=160',
      ease: "Linear",
      delay: 1000,
      duration: 2000,
      repeatDelay: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true
    });
    this.tweens.add({
      targets: this.pirate4,
      ease: "Linear",
      x: '-=0',
      delay: 1000,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onRepeat: function(){this.enemyShootTargeted(this.pirate4, this.enemyBullets, this.player)},
     onRepeatScope: this
    });
    this.tweens.add({
      targets: this.pirate5,
      x: '+=190',
      ease: "Linear",
      delay: 1000,
      duration: 2000,
      repeatDelay: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true
    });
    this.tweens.add({
      targets: this.pirate6,
      x: '+=190',
      ease: "Linear",
      delay: 1000,
      duration: 2000,
      repeatDelay: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true
    });
    this.tweens.add({
      targets: this.pirate7,
      ease: "Linear",
      x: '-=0',
      delay: 1000,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onRepeat: function(){this.enemyShootTargeted(this.pirate7, this.enemyBullets, this.player)},
     onRepeatScope: this
    });

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
  this.anims.create({
    key: "hurt",
    frames: this.anims.generateFrameNumbers('peggy', {start:6, end:6}),
    frameRate: 10,
    repeat: 1 //repeat just for a small amount of time
  });

  //peggy hurt
  this.anims.create({
    key: "hurtwalk",
    frames: this.anims.generateFrameNumbers('peggyHurt', {start:1, end:5}),
    frameRate: 10,
    repeat: -1 //repeat just for a small amount of time
  });
  this.anims.create({
    key: "hurtidle",
    frames: this.anims.generateFrameNumbers('peggyHurt', {start:0, end:0}),
    frameRate: 10,
    repeat: -1 //repeat just for a small amount of time
  });
  this.anims.create({
    key: "hurthurt",
    frames: this.anims.generateFrameNumbers('peggyHurt', {start:6, end:6}),
    frameRate: 10,
    repeat: 1 //repeat just for a small amount of time
  });

  //peggy with boots
  this.anims.create({
    key: "goldwalk",
    frames: this.anims.generateFrameNumbers('peggyGold', {start:1, end:5}),
    frameRate: 10,
    repeat: -1 //repeat just for a small amount of time
  });
  this.anims.create({
    key: "goldidle",
    frames: this.anims.generateFrameNumbers('peggyGold', {start:0, end:0}),
    frameRate: 10,
    repeat: -1 //repeat just for a small amount of time
  });
  this.anims.create({
    key: "goldhurt",
    frames: this.anims.generateFrameNumbers('peggyGold', {start:6, end:6}),
    frameRate: 10,
    repeat: 1 //repeat just for a small amount of time
  });

  // Display the health bar based on health score
  this.healthbar = this.physics.add.sprite(this.cameras.main.x+20, this.cameras.main.y+58, "health");
  this.healthbar.setScale(2);
  this.healthbar.body.setAllowGravity(false);
  // Move as the camera moves
  this.healthbar.setScrollFactor(0,0);

  this.anims.create({
    key: "healthActive",
    frames: this.anims.generateFrameNumbers("health", {start: this.gameHealth, end: this.gameHealth}),
    frameRate: 0,
    repeat: 1
  });

}

update (time, delta) {
    // Update the scene
    console.log(this.gameHealth);

    // Player Movement with WASD and shift to sprint
    var movement = this.input.keyboard  .addKeys('A, S, D, SHIFT');
    var jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    var specialButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    var speed = 210;


    //resets your ability to jump once you land on the ground
    if (this.player.body.onFloor()){
        this.jumpCount = 2;
    }
    if(this.bootsObtained == true){
      //change animations if peggy has boots


      // Move Left
      if (movement.A.isDown){
        if (this.peggyScream.isPlaying){
          this.player.setVelocityX(-speed);
          this.player.flipX = true;
          this.player.anims.play('hurtwalk', true);
        }
        else {
          this.player.setVelocityX(-speed);
          this.player.flipX = true;
          this.player.anims.play('goldwalk', true);
        }

      }
      // Move Right
      else if (movement.D.isDown){
        if (this.peggyScream.isPlaying){
          this.player.setVelocityX(speed);
          this.player.flipX = false;
          this.player.anims.play('hurtwalk', true);
        }
        else {
          this.player.setVelocityX(speed);
          this.player.flipX = false;
          this.player.anims.play('goldwalk', true);
        }

      }
      // Idle
      else {
        if (this.player.body.onFloor()){
          if (this.peggyScream.isPlaying){
            this.player.anims.play('hurtidle', true);
            this.player.setVelocityX(0);
          }
          else{
            this.player.anims.play('goldidle', true);
            this.player.setVelocityX(0);
          }
        }
      }
    }
    else{


    // Move Left
    if (movement.A.isDown){
      //if Peggy is hurt
      if (this.peggyScream.isPlaying){
        this.player.setVelocityX(-speed);
        this.player.flipX = true;
        this.player.anims.play('hurtwalk', true);
      }
      else{
        this.player.setVelocityX(-speed);
        this.player.flipX = true;
        this.player.anims.play('walk', true);
      }
    }
    // Move Right
    else if (movement.D.isDown){
      if (this.peggyScream.isPlaying){
        this.player.setVelocityX(speed);
        this.player.flipX = false;
        this.player.anims.play('hurtwalk', true);
      }
      else{
        this.player.setVelocityX(speed);
        this.player.flipX = false;
        this.player.anims.play('walk', true);
      }
    }
    // Idle
    else {
      if (this.player.body.onFloor()){
        if (this.peggyScream.isPlaying){
          this.player.anims.play('hurtidle', true);
          this.player.setVelocityX(0);
        }
        else{
          this.player.anims.play('idle', true);
          this.player.setVelocityX(0);
        }

      }
    }
  }


    // player can jump if they are touching the ground
    // removed the bounce because it means you cant jump right away after
    // intial jump because the bounce puts them in air

    if(Phaser.Input.Keyboard.JustDown(jumpButton)){
      if (this.bootsObtained == true){
      if(this.jumpCount > 0){
        this.jumpCount --;
        this.player.setVelocityY(-225);
        this.jumpSound.play();
    }}
    else if(this.jumpCount > 1){
      this.jumpCount --;
      this.player.setVelocityY(-225);
      this.jumpSound.play();
  }
  }
  //fast falling for quick movement
    else if(movement.S.isDown && !this.player.body.onFloor()){
      this.player.setVelocityY(300);
}

    var bang = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

    if (Phaser.Input.Keyboard.JustDown(bang)){
          if(this.player.flipX == false){
            var velocity = {x: 1000, y: 0};
          }
          else{
            var velocity = {x: -1000, y: 0};
          }
          var bullet = this.bullets.get();
          bullet.enableBody(true, this.player.x, this.player.y, true, true)
          .setVelocity(velocity.x, velocity.y);
          bullet.body.setAllowGravity(false);
          // Play gun noise
          this.gunSound.play();
        }



        //player's bullet kills enemies
        this.bullets.children.each(
                  function (b) {
                    if (b.active) {
                      this.physics.add.overlap( //if bullet touches enemyGroup, calls function
                        b,
                        this.enemyGroup,
                        this.hitEnemy,
                        null,
                        this
                      );
                      //refresh bullet group
                      if (b.y < 0) { //if bullet off top of screen
                        b.setActive(false);
                      }
                      else if (b.y > 1920) { //if bullet off bottom of screen
                        b.setActive(false);
                      }
                      else if (b.x < 0){
                        b.setActive(false);
                      }
                      else if (b.x > 8000){
                        b.setActive(false);
                      }
                    }
                  }.bind(this) //binds to each children
                );

        //enemys's bullet kills player
        this.enemyBullets.children.each(
                              function (b) {
                                if (b.active) {
                                  this.physics.add.overlap( //if bullet touches player, calls function
                                    b,
                                    this.player,
                                    this.hitPlayer,
                                    null,
                                    this
                                  );
                                  //refresh bullet group
                                  if (b.y < 0) { //if bullet off top of screen
                                    b.setActive(false);
                                  }
                                  else if (b.y > 1920) { //if bullet off bottom of screen
                                    b.setActive(false);
                                  }
                                  else if (b.x < 0){
                                    b.setActive(false);
                                  }
                                  else if (b.x > 8000){
                                    b.setActive(false);
                                  }
                                }
                              }.bind(this) //binds to each children
                            );

        this.enemyCoconuts.children.each(
          function (b) {
            if (b.active) {
              this.physics.add.overlap( //if bullet touches player, calls function
                b,
                this.player,
                this.hitPlayer,
                null,
                this
              );
              //refresh bullet group
              if (b.y < 0) { //if bullet off top of screen
                b.setActive(false);
              }
              else if (b.y > 1920) { //if bullet off bottom of screen
                b.setActive(false);
              }
              else if (b.x < 0){
                b.setActive(false);
              }
              else if (b.x > 8000){
                b.setActive(false);
              }
            }
          }.bind(this) //binds to each children
        );

        //heart gives back health
        this.physics.add.overlap(
          this.heart,
          this.player,
          this.healthGain,
          null,
          this
        )
  }


      //function for enemy to shoot in a straight line, no aim
enemyShoot (enemy, bullets, player) {

        var distance = enemy.x - player.x
        if(enemy.active){
        if(distance < 450 && distance > -450){ //only fire is enemy active and certain distance
          console.log('enemy shoots!');
        if(enemy.flipX == true){
          var velocity = {x: 700, y: 0};
        }
        else{
          var velocity = {x: -700, y: 0};
        }
        var bullet = bullets.get();
        bullet.enableBody(true, enemy.x, enemy.y, true, true)
        .setVelocity(velocity.x, velocity.y);
        bullet.body.setAllowGravity(false);
      }
      }
    }


      //targeted version of above function
enemyShootTargeted (enemy, bullets, player) {
        var distance = enemy.x - player.x
        console.log(distance)
        if(enemy.active){
          if(distance < 450 && distance > -450){ //only fire is enemy active and certain distance
          console.log('enemy shoots, targeted!');
          var betweenPoints = Phaser.Math.Angle.BetweenPoints;
      var angle = betweenPoints(enemy, this.player);
      var velocityFromRotation = this.physics.velocityFromRotation;
      //create variable called velocity from a vector2
      var velocity = new Phaser.Math.Vector2();
      velocityFromRotation(angle, 500, velocity);
      //get bullet group
        var bullet = bullets.get();
        bullet.setAngle(Phaser.Math.RAD_TO_DEG * angle);
        bullet.enableBody(true, enemy.x, enemy.y, true, true)
        .setVelocity(velocity.x, velocity.y);
        bullet.body.setAllowGravity(false);
      }
      }
      }

      getBoots(){
        this.bootsObtained = true;
        this.powerupSound.play();
        this.boots.disableBody(true, true);
      }

//triggers when enemy is hit
hitEnemy(bullet, enemy){
    console.log('hit');
    enemy.disableBody(true, true);
    bullet.disableBody(true, true);
    //play hurt sound
    var randomSpeed = (Math.random()*0.4)+0.5;
    this.screamSound.setRate(randomSpeed);
    this.screamSound.play();

  }
//triggers when player is hit
hitPlayer(bullet, player){
        console.log('hit');
        //player.disableBody(true, true);
        bullet.disableBody(true, true);
        // Play hurt Sound
        //this.screamSound.play();
        this.healthHurt();
      }
//bullet collisions
callbackFunc(bullet, target)
{
  console.log('calling function');
    if (bullet.active) {
        console.log("bullet hit platform!");
        bullet.disableBody(true, true);

    }
}

//find distance between enemy and player
findDistance(player, enemy){
  if(enemy.active){
    distance = enemy.x - player.x
    console.log(distance)
    return(distance)
  }
}

//If player loses health --------------------------------------------------------
  healthHurt(){
    //console.log("Health hurt function called")
    // Add one to health hurt score
    if (this.waitASecond){
      // Wait a second before taking another damage
      if (Date.now() >= this.startTime + 900) {
        this.waitASecond = false;
      }
    }
    // If the user has waited a second since last hit
    else if (!this.waitASecond){
      this.peggyScream.play();
      // Enable hit and wait another second after this completes
      this.waitASecond = true;
      // Set the timer to now
      this.startTime = Date.now();
      // Add one hit to the player's health
      this.gameHealth += 1;
      // Update the health bar
      if (this.gameHealth <= 13){

        // Create a temporary path for the animation
        var tempStringPath = "healthActive";
        tempStringPath += this.gameHealth;

        // Create the animation for the Health bar to switch to
        this.anims.create({
          key: tempStringPath,
          frames: this.anims.generateFrameNumbers("health", {start: this.gameHealth, end: this.gameHealth}),
          frameRate: 1,
          repeat: -1
        });
        this.healthbar.anims.play(tempStringPath, true);

      }
      // Check if it's past empty, and if so, game over
      else{
        this.gameOver();
      }

      //Wait a second
    }
  }

healthGain(heart, player){
  heart.disableBody(true, true);
  if(this.gameHealth > 0){
    this.gameHealth -= 1;
  }
  // Update the health bar
  if (this.gameHealth <= 13){

    // Create a temporary path for the animation
    var tempStringPath = "healthActive0";
    tempStringPath += this.gameHealth;

    // Create the animation for the Health bar to switch to
    this.anims.create({
      key: tempStringPath,
      frames: this.anims.generateFrameNumbers("health", {start: this.gameHealth, end: this.gameHealth}),
      frameRate: 1,
      repeat: -1
    });
    this.healthbar.anims.play(tempStringPath, true);
    this.powerupSound.play();
  }
}

  //move onto the bossfight
  bossFight(){
    this.gameMusic.stop();
    this.scene.start('bossIntroScene', {health: this.gameHealth});
  }

  //end game, goes to game over scene
  gameOver(){
    // Stop music if playing
  this.gameMusic.stop();
  console.log('game over!');
  this.scene.start('GameOver');
  }


}
