/*global Phaser*/
import * as ChangeScene from'./ChangeScene.js';
export default class GameOver extends Phaser.Scene {
  constructor () {
    super('GameOver');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.image('peggyIcon', './assets/sprites/peggyIcon.png');
    this.load.image('parrot', './assets/sprites/parrot_large.png');
    this.load.audio('losingAudio', './assets/audio/minorInstrumental(JonECope).mp3');
    this.load.spritesheet("gameOverSheet", "./assets/spriteSheets/GameOver.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {
    /// add event addSceneEventListeners
    ChangeScene.addSceneEventListeners(this, [3]);

    this.cameras.main.setBackgroundColor('#150033');
    this.losingMusic = this.sound.add('losingAudio');
    this.losingMusic.play();

    // create all the text and icons on the screen.
    /*
      peggyAvatar = character image, usable throughout
      title = Peggy the pirate, text, usable only in this function
      title2 = Quest for the golden Booty, text, usable only in this function
      instructions = Press enter, text, usable only in this function
      enterImg = Start button icon, image, usable throughout
    */

    var peggyAvatar = this.add.image(0.5*this.centerX, 1.8*this.centerY, 'peggyIcon');
    var parrot = this.add.image(1.5*this.centerX, 1.8*this.centerY, 'parrot');
    var text = this.add.text(this.centerX-150, this.centerY-100, 'Press [ESCAPE] to play again :)')
    //Create the scene
    var title = this.add.text(this.centerX, (0.2*this.centerY), 'You Lose', {
      fill: '#ff00ff',
      fontSize: '55px',
      align: 'center',
    });
    // Required to center align the text
    title.setOrigin(0.5);

    this.overSign = this.physics.add.sprite(this.centerX, (0.8*this.centerY), "gameOverSheet");
    this.overSign.setScale(6);
    this.overSign.setBounce(0.15);
    this.overSign.setCollideWorldBounds(true);

    this.anims.create({
      key: "gameDone",
      frames: this.anims.generateFrameNumbers("gameOverSheet", {start: 0, end: 1}),
      frameRate:1,
      repeat: -1
    });
  }

  update (time, delta) {
    // Update the scene
    this.overSign.anims.play("gameDone", true);


  }
}
