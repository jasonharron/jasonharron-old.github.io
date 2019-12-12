/*globals Phaser*/
import * as changeScene from "/src/object/changeScene.js";
export default class scene4 extends Phaser.Scene {
  preload() {
    console.log("scene4");
    this.load.image("player", "assets/sprites/player_sprite.png");
  }

  create() {
    //Add change scene event listeners
    changeScene.addChangeSceneEventListeners(this);

    this.cameras.main.setBackgroundColor(0xcc66ff);

    var a1 = this.add.sprite(100, 150, "player");
    var a2 = this.add.sprite(250, 150, "player");
    var a3 = this.add.sprite(400, 500, "player");
    var a4 = this.add.sprite(700, 150, "player");
    var a5 = this.add.sprite(300, 300, "player");

    this.tweens.add({
      targets: a1,
      x: 100,
      y: 500,
      ease: "Cubic",
      duration: 2000
      //repeat: -1,
      //yoyo: true
    });
    var i = this.tweens.add({
      targets: a2,
      x: 100,
      y: 150,
      ease: "Elastic",
      duration: 1000
    });

    this.tweens.add({
      targets: a3,
      y: 100, //start from current value <--NOT WORKING
      ease: "Circle",
      duration: 1500
    });

    this.tweens.add({
      targets: a4,
      x: 500,
      y: 500,
      ease: "Linear",
      delay: 1000,
      duration: 1000,
      repeat: -1,
      //repeatDelay: 1000,
      yoyo: true
    });

    this.tweens.add({
      targets: a5,
      alpha: 0,
      duration: 5000,
      ease: "Bounce"
    });
  }
}
