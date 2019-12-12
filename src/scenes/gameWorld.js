/*global Phaser*/
export default class gameWorld extends Phaser.Scene {
  constructor () {
    super('gameWorld');
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
    this.shieldObtained = false;
    this.jumpCount = 2;
    this.mobile = true;
    this.spriteValue = 0;

  }//END OF DATA INITIALIZATION

// Preload assets
  preload () {
    //the player's spritesheet
    this.load.spritesheet('peggy', "./assets/spritesheets/combinedSpritesheet.png", {
      frameHeight: 32,
      frameWidth: 32
    });

    //Load tilemap and tileset
    this.load.image('tempTile', './assets/gameWorld/tempTile.png');
    this.load.image('jungleTileSheet', './assets/gameWorld/jungleTileSheet.png')
    this.load.image('beachTileSheet', './assets/gameWorld/shipAndBeachTiles.png')
    this.load.tilemapTiledJSON('gameWorld', './assets/gameWorld/gameWorld.json');

    // Load sound effects and music for the game
    this.load.audio('gunAudio', './assets/audio/477346__mattiagiovanetti__some-laser-gun-shots-iii.mp3');
    this.load.audio('jumpAudio', './assets/audio/277219__thedweebman__8-bit-jump-2.mp3');
    this.load.audio('powerupAudio', './assets/audio/good(JonECope).mp3');

    //load textbox
    this.load.image('textBorder', './assets/sprites/textBorder.png');

    //load the interactable world objects
    this.load.image('boots', './assets/gameWorld/goldShoes.png');
    this.load.image('shine', './assets/sprites/shine.png');

    //load bullets and weapons
    this.load.image('bullet', './assets/sprites/bulletSmall.png');


    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }//END OF PRELOAD FUNCTION

//Create the scene
  create (data) {

    //Put Sounds for game here
    this.gunSound = this.sound.add('gunAudio');
    this.gunSound.volume = 0.3;
    this.jumpSound = this.sound.add('jumpAudio');
    this.jumpSound.volume = 0.05;
    this.powerupSound = this.sound.add('powerupAudio');
    this.powerupSound.setRate(1.5);

    //create the player and add them to the scene
    this.player = this.physics.add.sprite(1984, 2624, 'peggy');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1.5);

    //create the game world and set the camera to follow the player
    this.physics.world.setBounds(0, 0, 5600, 3072);
    this.cameras.main.setBounds(0, 0, 5600, 3072);
    this.cameras.main.startFollow(this.player);

    //create the game world by adding each tileset using the
    //tilemap and creating collision with the player
    const world = this.make.tilemap({ key: 'gameWorld' });


    var tempTile = world.addTilesetImage('tempTile', 'tempTile');
    const platforms = world.createStaticLayer('tempTile', tempTile, 0, 0);
    platforms.setCollisionByExclusion(-1, true);

    var jungleTile = world.addTilesetImage('jungleTile', 'jungleTileSheet');
    const platforms2 = world.createStaticLayer('jungleTile', jungleTile, 0, 0);
    platforms2.setCollisionByExclusion(-1, true);

    var beachTile = world.addTilesetImage('shipAndBeachTile', 'beachTileSheet');
    const platforms3 = world.createStaticLayer('beachTile', beachTile, 0 ,0);
    platforms3.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, platforms2);
    this.physics.add.collider(this.player, platforms3);


    //Peggy's animations
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers('peggy', {start: this.spriteValue, end: this.spriteValue + 5}),
      frameRate: 10,
      repeat: -1 //repeat forever
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers('peggy', {start:this.spriteValue, end:this.spriteValue}),
      frameRate: 10,
      repeat: -1
    });

    //add player's bullets and shield
    // Max 5 at once
    this.bullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 10
    });
    this.bullets.children.iterate(function(child){
    }
  );
    //adding undefined object to be placeholder for shield
    this.shine;



    //add treasure chests to game
    this.treasures = this.physics.add.group({});

    this.treasureBoots = this.physics.add.sprite(4448, 3008, 'boots');
    this.treasures.add(this.treasureBoots);

    this.treasureShield = this.physics.add.sprite(1024, 3008, 'shine');
    this.treasures.add(this.treasureShield);

    this.physics.add.collider(this.treasures, platforms);
    this.physics.add.collider(this.treasures, platforms2);
    this.physics.add.collider(this.treasures, platforms3);

    //player interactions with treasures
    this.physics.add.overlap(this.player, this.treasureBoots, this.getBoots, null, this);
    this.physics.add.overlap(this.player, this.treasureShield, this.getShield, null, this);


  }//END OF CREATE FUNCTION

  // Update the scene
  update (time, delta) {
    //all player input buttons
    var movement = this.input.keyboard.addKeys('A, S, D');
    var jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    var specialButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    var bang = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    var speed = 140;


    //Player Input Functions
    //if player is on ground, reset jump jumpCount to 2
    //and reset player's mobility
    if (this.player.body.onFloor()){
        this.jumpCount = 2;
        this.mobile = true;
    }
    // Move Left
    if (movement.A.isDown && this.mobile == true){
      if (this.bootsObtained == true){
        if (Phaser.Input.Keyboard.JustDown(specialButton)){
          this.player.body.setAllowGravity(false);
          this.player.setVelocityX(0);
          this.player.anims.play('dash', true);
          this.player.x -= 160;
          this.player.body.setAllowGravity(true);
          this.mobile = false;
          this.player.body.acceleration.x = 0;
        }
      else{
        if (this.player.body.velocity.x > -speed){
          this.player.setVelocityX(-speed);
          }
        this.player.flipX = true;
        this.player.body.acceleration.x = -50;
        this.player.body.maxVelocity.x = 210;
        this.player.anims.play('walk', true);
      }
    }
    else{
      if (this.player.body.velocity.x > -speed){
        this.player.setVelocityX(-speed);
        }
        this.player.flipX = true;
        this.player.body.acceleration.x = -50;
        this.player.body.maxVelocity.x = 210;
        this.player.anims.play('walk', true);
      }
    }
    // Move Right
    else if (movement.D.isDown && this.mobile == true){
      if(this.bootsObtained == true){
        if(Phaser.Input.Keyboard.JustDown(specialButton)){
            this.player.body.setAllowGravity(false);
            this.player.setVelocityX(0);
            this.player.anims.play('dash', true);
            this.player.x += 160;
            this.player.body.setAllowGravity(true);
            this.mobile = false;
            this.player.body.acceleration.x = 0;
        }
        else{
          if (this.player.body.velocity.x < speed){
            this.player.setVelocityX(speed);
            }
            this.player.flipX = false;
            this.player.body.acceleration.x = 50;
            this.player.body.maxVelocity.x = 210;
            this.player.anims.play('walk', true);
        }
      }
      else{
        if (this.player.body.velocity.x < speed){
          this.player.setVelocityX(speed);
          }
          this.player.flipX = false;
          this.player.body.acceleration.x = 50;
          this.player.body.maxVelocity.x = 210;
          this.player.anims.play('walk', true);
        }
      }
    // Idle
    else {
      if (this.player.body.onFloor()){
        this.player.anims.play('idle', true);
        this.player.setVelocityX(0);
        this.player.body.acceleration.x = 0;
      }
    }
    //Jump command
    if(Phaser.Input.Keyboard.JustDown(jumpButton) && this.mobile == true){
      if (this.bootsObtained == true){
        if(this.jumpCount > 0){
          this.jumpCount --;
          this.player.setVelocityY(-225);
          this.jumpSound.play();
        }
      }
      else{
        if(this.jumpCount > 1){
          this.jumpCount --;
          this.player.setVelocityY(-225);
          this.jumpSound.play();
        }
      }
    }
    //fast falling for quick movement
    else if(movement.S.isDown && !this.player.body.onFloor() && this.mobile == true){
        this.player.setVelocityY(300);
    }

    //player shoots a bullet
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
    //player's bullet kills enemies or falls out of bounds and despawns
    this.bullets.children.each(
      function (b) {
        if (b.active) {
          //if bullet touches enemyGroup, calls function
          this.physics.add.overlap(
            b,
            this.enemyGroup,
            this.hitEnemy,
            null,
            this
          );
            //refresh bullet group
            if (b.y < this.player.y - 300) { //if bullet off top of screen
              b.setActive(false);
            }
            else if (b.y > this.player.y + 300) { //if bullet off bottom of screen
              b.setActive(false);
            }
            else if (b.x < this.player.x -400){
              b.setActive(false);
            }
            else if (b.x > this.player.x + 400){
              b.setActive(false);
            }
        }
      }.bind(this) //binds to each children
  );

    //player uses their shield to block a bullet
    if (this.shieldObtained == true){
      //summon shield when pressing p and s down
      if (Phaser.Input.Keyboard.JustDown(specialButton) && movement.S.isDown){
        this.player.setVelocityY(0);
        this.player.setVelocityX(0);
        if (this.player.flipX == true){
          this.shine = this.physics.add.sprite(this.player.x - 16, this.player.y, 'shine');
          }
        else{
          this.shine = this.physics.add.sprite(this.player.x + 16, this.player.y, 'shine');
        }
        this.shine.body.setAllowGravity(false);
        this.player.body.setAllowGravity(false);
        this.mobile = false;
        this.player.body.acceleration.x = 0;
        this.player.anims.play('idle', true);
      }
      //upon releasing specialButton if shield is out remove it
      if (Phaser.Input.Keyboard.JustUp(specialButton)){
        if (this.shine != undefined ){
          this.shine.destroy();
          this.player.body.setAllowGravity(true);
          this.mobile = true;
        }
      }
    }



  }//END OF UPDATE FUNCTION

  //additional functions to be called

  //gain boots from the treasure chest
  getBoots(){
    this.treasureBoots.disableBody(true, true);
    this.powerupSound.play();
    this.bootsObtained = true;
    this.spriteValue += 7;
    this.anims.remove('walk');
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers('peggy', {start: this.spriteValue, end: this.spriteValue + 5}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.remove('idle');
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers('peggy', {start:this.spriteValue, end:this.spriteValue}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "dash",
      frames: this.anims.generateFrameNumbers('peggy', {start:this.spriteValue + 3, end: this.spriteValue + 3}),
      framerate: 60,
      repeat: -1
    });
  }

  //gain shield from the treasure chests
  getShield(){
    this.treasureShield.disableBody(true, true);
    this.powerupSound.play;
    this.shieldObtained = true;
  }



}
