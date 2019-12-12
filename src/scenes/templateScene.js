/*global Phaser*/
export default class temp extends Phaser.Scene {
  constructor () {
    super('temp');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create (data) {
    //Create the scene

  }

  update (time, delta) {
    // Update the scene
  }
}
