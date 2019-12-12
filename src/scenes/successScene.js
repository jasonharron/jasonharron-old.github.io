/*global Phaser*/
import * as ChangeScene from'./ChangeScene.js';
export default class successScene extends Phaser.Scene {
  constructor () {
    super('successScene');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
    this.load.audio('winnerAudio', './assets/audio/winner(JonECope).mp3');
    this.load.image('heart', './assets/sprites/heart.png');
    this.load.image('peggyIcon', './assets/sprites/peggyIcon.png');
    this.load.image('parrot', './assets/sprites/parrot_large.png');
  }

  create (data) {
    // add event addSceneEventListeners
    ChangeScene.addSceneEventListeners(this, [3]);
    //Create the scene
    var text = this.add.text(this.centerX-150, this.centerY, 'you have won!!!!')
    var text = this.add.text(this.centerX-185, this.centerY + 50, 'congratz')
    var text = this.add.text(this.centerX-200, this.centerY-100, 'Press [ESCAPE] to play again :)')
    var peggyAvatar = this.add.image(0.5*this.centerX, 1.8*this.centerY, 'peggyIcon');
    var parrot = this.add.image(1.5*this.centerX, 1.8*this.centerY, 'parrot');
    this.winnerMusic = this.sound.add('winnerAudio');
    this.heartIcon = this.add.sprite(1.5*this.centerX,0.75*this.centerY, 'heart');
    this.heartIcon.setScale(10);
    this.heartIcon.gravity = 0;
    this.winnerMusic.play();
  }

  update (time, delta) {
    // Update the scene
  }
}
