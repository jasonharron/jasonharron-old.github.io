/*globals Phaser*/
import * as changeScene from "/src/object/changeScene.js";
export default class BootScene extends Phaser.Scene {
  preload() {
    this.load.image("phaser2logo", "/assets/images/logo.png");
    console.log("Boot");
  }

  create() {
    changeScene.addChangeSceneEventListeners(this);

    const phaser2logo = this.add.image(400, 300, "phaser2logo");

    this.tweens.add({
      targets: phaser2logo,
      y: 450,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });
  }
}
