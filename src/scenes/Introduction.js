/*global Phaser*/
import * as ChangeScene from'./Changescene.js';
export default class IntroScene extends Phaser.Scene {
  constructor () {
    super('IntroScene');
  }

  init (data) {
    // Initialization code goes here

  }

  preload () {
    // Preload assets
    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;

    this.load.audio('introAudio', './assets/audio/introMusic.wav');

    // Peggy spritesheet
    this.load.spritesheet('peggyCry', "./assets/spritesheets/peggyCry.png", {
      frameHeight: 48,
      frameWidth: 48
    });

    this.load.image('RIP', './assets/sprites2/Tombstone.png');
    this.load.image('GrampaBox', './assets/sprites2/GrampaBox.png');
    //this.load.image('SmallPic', './assets/sprites2/SmallPic.png');
    this.load.image('BigPic', './assets/sprites2/BigPic.png');
  }
  create (data) {
    // add event addSceneEventListeners
    ChangeScene.addSceneEventListeners(this, [1]);
    // Current Letter index and phrase index
    this.currentLetter = 0;
    this.currentPhrase = 0;

    this.introMusic = this.sound.add('introAudio');
    this.introMusic.setLoop(true);
    this.introMusic.play();

    this.animationStarted = false;
    this.typingIsDone = false;
    //Make sure you don't load the next scene multiple times
    this.toNextScene = false;
    this.helpText = "Press [ESCAPE] at any time to skip the tutorial"

    this.cameras.main.setBackgroundColor('#100022');
    //this.
    // add event addSceneEventListeners
    //this.cameras.main.setBackgroundColor('#150033');

    //Create the scene
    this.introContent = ["This is Peggy, an ordinary girl in an ordinary world.\n[ENTER Button]",
    "Peggy's Grampa just passed away.\n[ENTER Button]", "She's heart-broken.\n[ENTER Button]",
    "Upon rumaging through Gramps's memorables,\nshe saw he was a pirate.\n[ENTER Button]",
    "It is now up to her to follow in his footsteps.\n[Escape Button to begin]"];


    this.helpTextDisplay = this.add.text(this.centerX, 32, this.helpText, { font: "32px Arial", fill: "#FFF" });
    this.helpTextDisplay.setOrigin(0.5);

    this.previousTime = Date.now();

    this.anims.create({
      key: "PeggyOrdinary",
      frames: this.anims.generateFrameNumbers("peggyCry", {start: 0, end: 0}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "PeggyOk",
      frames: this.anims.generateFrameNumbers("peggyCry", {start: 1, end: 1}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "PeggySad",
      frames: this.anims.generateFrameNumbers("peggyCry", {start: 2, end: 6}),
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
        this.sadPeggy = this.physics.add.sprite(this.centerX, (0.9*this.centerY), "peggyCry");
        this.sadPeggy.setScale(6);
        this.sadPeggy.alpha = 0;
        this.sadPeggy.setBounce(0.15);
        //this.sadPeggy.setCollideWorldBounds(true);
        this.sadPeggy.body.setAllowGravity(false);
        this.sadPeggy.anims.play('PeggyOrdinary', true);
        this.animationStarted = true;

        this.add.tween({
          targets: this.sadPeggy,
          alpha: { start: 0, to: 1},
          ease: "Linear",
          duration: 4000,
          repeat: 0
        });
      }
      else if (this.currentPhrase == 1) {
        this.tombStone = this.add.sprite(2.2*this.centerX, this.centerY+40, "RIP");
        this.tombStone.setScale(4.5);

        this.add.tween({
          targets: this.tombStone,
          x: '-=400',
          ease: "Linear",
          duration: 2500,
          repeat:0
        });

        this.add.tween({
          targets: this.sadPeggy,
          x: '-=180',
          ease: "Cubic",
          duration: 3000,
          repeat:0
        });


        this.sadPeggy.anims.play('PeggyOk', true);
        this.animationStarted = true;
      }
      else if (this.currentPhrase == 2) {

        this.add.tween({
          targets: this.tombStone,
          x: '+=100',
          ease: "Linear",
          repeat:0
        });

        this.sadPeggy.anims.play('PeggySad', true);
        this.animationStarted = true;
      }
      else if (this.currentPhrase == 3) {
        this.memBox = this.add.sprite(2.2*this.centerX, this.centerY+40, "GrampaBox");
        this.memPic1 = this.add.sprite(2.2*this.centerX, this.centerY-40, "BigPic");
        this.memBox.setScale(4.5);
        this.memPic1.setScale(3);

        this.add.tween({
          targets: this.memBox,
          x: '-=400',
          ease: "Cubic",
          alpha: { start: 0, to: 1},
          duration: 4000,
          repeat:0
        });

        this.add.tween({
          targets: this.memPic1,
          x: '-=400',
          ease: "Cubic",
          duration: 4000,
          alpha: { start: 0, to: 1},
          repeat:0
        });

        this.add.tween({
          targets: this.tombStone,
          x: '+=300',
          ease: "Linear",
          repeat:0
        });

        this.sadPeggy.anims.play('PeggyOk', true);
        this.animationStarted = true;
      }
      else if (this.currentPhrase == 4){
        this.memPic2 = this.add.sprite(this.centerX-120, this.centerY, "BigPic");
        this.memPic2.alpha = 0;
        this.memPic2.setScale(4);
        this.add.tween({
          targets: this.memPic1,
          ease: "Linear",
          alpha: { start: 1, to: 0},
          repeat:0
        });

        this.add.tween({
          targets: this.sadPeggy,
          x: '+=100',
          ease: "Linear",
          repeat:0
        });
        this.add.tween({
          targets: this.memPic2,
          x: '+=100',
          ease: "Linear",
          repeat:0
        });

        this.add.tween({
          targets: this.memPic2,
          ease: "Cubic",
          alpha: { start: 0, to: 1},
          duration: 1000,
          yoyo: true,
          repeat:-1
        });

        this.add.tween({
          targets: this.memBox,
          ease: "Linear",
          alpha: { start: 1, to: 0},
          repeat:0
        });

        this.animationStarted = true;
      }
    }

  }

  //function escapePressed(){

  //}
}
