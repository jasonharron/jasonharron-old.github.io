/*globals Phaser*/
import * as changeScene from "/src/object/changeScene.js";
export default class scene3 extends Phaser.Scene {
  preload() {
    console.log("scene3");
    this.load.spritesheet("buttons", "assets/spriteSheets/buttons.png", {
      frameHeight: 100,
      frameWidth: 200
    });
    this.load.audio("pops", "assets/sounds/buttonPops.mp3");
  }

  create() {
    //Add change scene event listeners
    changeScene.addChangeSceneEventListeners(this);

    var sound = this.sound.add("pops");
    sound.addMarker({
      name: "low",
      start: 0.15,
      duration: 0.5
    });
    sound.addMarker({
      name: "high",
      start: 1.1,
      duration: 1.5
    });

    var b1 = this.add.sprite(150, 100, "buttons", 0).setInteractive();
    b1.on("pointerover", function() {
      this.setFrame(1);
      sound.play("low");
    });

    b1.on("pointerout", function() {
      this.setFrame(0);
    });

    b1.on(
      "pointerup",
      function() {
        sound.play("high");
        this.scene.start("scene0");
      },
      this
    );

    var b2 = this.add.sprite(400, 100, "buttons", 2).setInteractive();
    b2.on("pointerover", function() {
      this.setFrame(3);
      sound.play("low");
    });

    b2.on("pointerout", function() {
      this.setFrame(2);
    });

    b2.on(
      "pointerup",
      function() {
        sound.play("high");
        this.scene.start("scene1");
      },
      this
    );

    var b3 = this.add.sprite(650, 100, "buttons", 4).setInteractive();
    b3.on("pointerover", function() {
      this.setFrame(5);
      sound.play("low");
    });

    b3.on("pointerout", function() {
      this.setFrame(4);
    });

    b3.on(
      "pointerup",
      function() {
        sound.play("high");
        this.scene.start("scene2");
      },
      this
    );
  }
}
