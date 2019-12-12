/*globals Phaser*/
import * as changeScene from "/src/object/changeScene.js";
export default class scene6 extends Phaser.Scene {
  preload() {
    console.log("scene6");
    this.load.setBaseURL("https://labs.phaser.io");

    this.load.image("space", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.image("red", "assets/particles/red.png");
  }

  create() {
    //Add change scene event listeners
    changeScene.addChangeSceneEventListeners(this);

    this.add.image(400, 300, "space");

    var particles = this.add.particles("red");

    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD"
    });

    var logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }
}
