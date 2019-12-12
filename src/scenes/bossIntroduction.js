/*global Phaser*/
import * as ChangeScene from'./Changescene.js';
export default class bossIntroScene extends Phaser.Scene {
  constructor () {
    super('bossIntroScene');
  }

  init (data) {
    // Initialization code goes here
    this.gameHealth2 = data.health;
  }

  preload () {
    // Preload assets
    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;

    this.load.audio('bossintroAudio', './assets/audio/bossIntro.mp3');

    this.load.image('shipSprite', "./assets/sprites/pirateShip.png");

    // Peggy spritesheet
    this.load.spritesheet('peggyBoss', "./assets/spritesheets/peggyGold.png", {
      frameHeight: 32,
      frameWidth: 32
    });

  }
  create (data) {
    // add event addSceneEventListeners
    ChangeScene.addSceneEventListeners(this, [2, this.gameHealth2]);
    // Current Letter index and phrase index
    this.currentLetter = 0;
    this.currentPhrase = 0;

    this.bossintroMusic = this.sound.add('bossintroAudio');
    this.bossintroMusic.setLoop(true);
    this.bossintroMusic.volume = 2;
    this.bossintroMusic.setRate(0.85);
    this.bossintroMusic.play();

    this.animationStarted = false;
    this.typingIsDone = false;
    //Make sure you don't load the next scene multiple times
    this.toNextScene = false;
    this.helpText = "Press [ESCAPE] at any time to skip"

    this.cameras.main.setBackgroundColor('#100022');
    //this.
    // add event addSceneEventListeners
    //this.cameras.main.setBackgroundColor('#150033');

    //Create the scene
    this.introContent = ["Peggy has just discovered the hidden ship.\n[ENTER Button]", "Is she strong enough to defeat the King Pirate?\n[ENTER Button]", "Let's find out...\n[ESCAPE Button]"];


    this.helpTextDisplay = this.add.text(this.centerX, 32, this.helpText, { font: "32px Arial", fill: "#FFF" });
    this.helpTextDisplay.setOrigin(0.5);

    this.previousTime = Date.now();

    this.anims.create({
      key: "PeggyOrdinary2",
      frames: this.anims.generateFrameNumbers("peggyBoss", {start: 0, end: 0}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "PeggyOk",
      frames: this.anims.generateFrameNumbers("peggyBoss", {start: 5, end: 5}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "PeggyRun",
      frames: this.anims.generateFrameNumbers("peggyBoss", {start: 2, end: 5}),
      frameRate: 10,
      repeat: -1
    });





  }

  update (time, delta) {
    // Update the scene
    if (this.currentPhrase < this.introContent.length){
      this.textToDisplay = this.introContent[this.currentPhrase];

      //console.log("Current Phrase: " + this.currentPhrase);

      if (Date.now() >= this.previousTime + 40){

        if (this.currentLetter == 0) {
        	this.tempText = this.textToDisplay.charAt(this.currentLetter);
          // Display temp textToDisplay
          if (this.introTextDisplay){
            this.introTextDisplay.destroy();
          }
          this.introTextDisplay = this.add.text(this.centerX, this.cameras.main.height-100, this.tempText, { font: "32px Arial", fill: "#FFBC58" });
          this.introTextDisplay.setOrigin(0.5);

          this.currentLetter++;
          this.typingIsDone = false;
        }
        else if (this.currentLetter < this.textToDisplay.length) {
          this.tempText += this.textToDisplay.charAt(this.currentLetter);

          // Display temp textToDisplay
          if (this.introTextDisplay){
            this.introTextDisplay.destroy();
          }
          this.introTextDisplay = this.add.text(this.centerX, this.cameras.main.height-100, this.tempText, { font: "32px Arial", fill: "#FFBC58" });
          this.introTextDisplay.setOrigin(0.5);

          this.currentLetter++;
          this.typingIsDone = false;
        }
        else{
          this.typingIsDone = true;
        }

        this.previousTime = Date.now();
      }




    }

    if (this.animationStarted == false){
      if (this.currentPhrase == 0){
        this.bossPeggy = this.physics.add.sprite(this.centerX, (0.9*this.centerY), "peggyBoss");
        this.bossPeggy.setScale(6);
        this.bossPeggy.alpha = 0;
        this.bossPeggy.setBounce(0.15);
        //this.bossPeggy.setCollideWorldBounds(true);
        this.bossPeggy.body.setAllowGravity(false);
        this.bossPeggy.anims.play('PeggyOrdinary2', true);
        this.animationStarted = true;

        this.add.tween({
          targets: this.bossPeggy,
          alpha: { start: 0, to: 1},
          ease: "Linear",
          duration: 4000,
          repeat: 0
        });

        this.ship = this.physics.add.sprite(1.5*this.centerX + 500, (0.9*this.centerY), "shipSprite");
        this.ship.setScale(10);
        this.ship.alpha = 0;
        this.ship.setBounce(0.15);
        //this.bossPeggy.setCollideWorldBounds(true);
        this.ship.body.setAllowGravity(false);
      }
      else if (this.currentPhrase == 1) {
        this.bossPeggy.anims.play('PeggyRun', true);
        this.add.tween({
          targets: this.bossPeggy,
          x: "-=200",
          ease: "Linear",
          duration: 800,
          repeat: 0
        });
        this.animationStarted = true;

        this.add.tween({
          targets: this.ship,
          alpha: { start: 0, to: 1},
          x: "-=550",
          ease: "Linear",
          duration: 4000,
          repeat: 0
        });
      }
      else if (this.currentPhrase == 2){
        //this.bossPeggy.anims.play('PeggyOk', true);
        this.animationStarted = true;
        this.ship.flipX = true;
        this.add.tween({
          targets: this.ship,
          x: "+=2000",
          y: "+=50",
          ease: "Bounce",
          duration: 16000,
          repeat: 0
        });
        this.add.tween({
          targets: this.bossPeggy,
          x: "+=2000",
          //y: "-=50",
          ease: "Bounce",
          duration: 16000,
          repeat: 0
        });
      }
    }

  }

  //function escapePressed(){

  //}
}
