/*globals Phaser*/
import * as changeScene from "/src/object/changeScene.js";
export default class scene7 extends Phaser.Scene {
  preload() {
    console.log("scene7");
    this.load.image("arrow", "assets/sprites/arrow.png");
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }

  create() {
    //Add change scene event listeners
    changeScene.addChangeSceneEventListeners(this);

    var arrow,
      startPointX,
      startPointY,
      endPointX,
      endPointY,
      swipeDirection,
      leeway = 80;
    var centerX = this.width / 2;
    var centerY = this.height / 2;

    this.cameras.main.setBackgroundColor(0xa6ff4d);

    arrow = this.add.sprite(centerX, centerY, "arrow");

    var downX,
      upX,
      downY,
      upY,
      threshold = 80;

    this.input.on("pointerdown", function(pointer) {
      downX = pointer.x;
      downY = pointer.y;
    });

    this.input.on("pointerup", function(pointer) {
      upX = pointer.x;
      upY = pointer.y;
      if (upX < downX - threshold) {
        //console.log("swipeleft");
        swipeDirection = 270;
      } else if (upX > downX + threshold) {
        //console.log("swiperight");
        swipeDirection = 90;
      } else if (upY < downY - threshold) {
        //console.log("swipeup");
        swipeDirection = 0;
      } else if (upY > downY + threshold) {
        //console.log("swipedown");
        swipeDirection = 180;
      }
      arrow.angle = swipeDirection;
    });
  }
}
