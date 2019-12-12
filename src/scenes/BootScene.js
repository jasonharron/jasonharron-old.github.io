/*global Phaser*/
import * as ChangeScene from'./Changescene.js';
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.image('peggyIcon', './assets/sprites/peggyIcon.png');
    this.load.image('enterIcon', './assets/uiSprites/start.png');
    this.countSize = 1.00;
    this.changeCount = true;
    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;

    this.load.audio('bootAudio', './assets/audio/game(JonECope).mp3');
  }

  create (data) {
    // add event addSceneEventListeners
    ChangeScene.addSceneEventListeners(this, [0]);
    this.cameras.main.setBackgroundColor('#150033');
    this.bootMusic = this.sound.add('bootAudio');
    this.bootMusic.setLoop(true);
    this.bootMusic.play();

    // create all the text and icons on the screen.
    /*
      peggyAvatar = character image, usable throughout
      title = Peggy the pirate, text, usable only in this function
      title2 = Quest for the golden Booty, text, usable only in this function
      instructions = Press enter, text, usable only in this function
      enterImg = Start button icon, image, usable throughout
    */

    this.peggyAvatar = this.add.image(this.centerX, this.centerY, 'peggyIcon');
    //Create the scene

    var title = this.add.text(this.centerX, (0.2*this.centerY), 'Peggy the Pirate:', {
      fill: '#ff00ff',
      fontSize: '55px',
      align: 'center',
    });
    // Required to center align the text
    title.setOrigin(0.5);

    var title2 = this.add.text(this.centerX, (0.4*this.centerY), 'The Quest for the Golden Booty', {
      fill: '#ffffff',
      fontSize: '35px',
      align: 'center',
    });
    // Required to center align the text
    title2.setOrigin(0.5);

    var instructions = this.add.text(this.centerX, (1.6*this.centerY), 'Press [ENTER] to ', {
      fill: '#00ffff',
      fontSize: '30px',
      align: 'center',
    });
    // Required to center align the text
    instructions.setOrigin(0.5);

    // Button if they press Enter
    this.enterImg = this.add.image(this.centerX, (1.8*this.centerY), 'enterIcon');
    this.enterImg.setScale(5);
  }

  update (time, delta) {
    // Update the scene

    // Create a simple counter to go within 0 and 2. If it hits a threshold, flip the counter.
    if (this.changeCount){
      if (this.countSize >= 2){
        this.changeCount = false;
        this.peggyAvatar.flipX = false;
      }
      else {
        this.countSize += .02;
      }
    }
    else {
      if (this.countSize <= 0){
        this.changeCount = true;
        this.peggyAvatar.flipX = true;
      }
      else {
        this.countSize -= 0.02;
      }
    }

    // Change the button size based on this counter above
    this.enterImg.setScale(4+this.countSize);
    this.enterImg.setOrigin(0.5, 0.4+(0.05*this.countSize));
  }
}
