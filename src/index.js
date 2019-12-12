import Phaser from "phaser";
import config from "./config/config.js";
import BootScene from "./scenes/BootScene.js";
import scene0 from "./scenes/scene0.js";
import scene1 from "./scenes/scene1.js";
import scene2 from "./scenes/scene2.js";
import scene3 from "./scenes/scene3.js";
import scene4 from "./scenes/scene4.js";
import scene5 from "./scenes/scene5.js";
import scene6 from "./scenes/scene6.js";
import scene7 from "./scenes/scene7.js";
import scene8 from "./scenes/scene8.js";
import scene9 from "./scenes/scene9.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Boot", BootScene);
    this.scene.add("scene0", scene0);
    this.scene.add("scene1", scene1);
    this.scene.add("scene2", scene2);
    this.scene.add("scene3", scene3);
    this.scene.add("scene4", scene4);
    this.scene.add("scene5", scene5);
    this.scene.add("scene6", scene6);
    this.scene.add("scene7", scene7);
    this.scene.add("scene8", scene8);
    this.scene.add("scene9", scene9);
    this.scene.start("scene9");
  }
}
window.game = new Game();
