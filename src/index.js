/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Level1 from './scenes/Level1.js';
import Boss1 from './scenes/Boss1.js'
import successScene from './scenes/successScene.js';
import GameOver from './scenes/GameOverScene.js'
import Config from './config/config.js';
import Level1v2 from './scenes/Level1.1.js';
import IntroScene from './scenes/Introduction.js';
import bossIntroScene from './scenes/bossIntroduction.js'
import test from './scenes/test.js';
import CutScene from './scenes/cutscene.js';
import gameWorld from './scenes/gameWorld.js'



class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Level1', Level1);
    this.scene.add('Level1v2', Level1v2);
    this.scene.add('GameOver', GameOver);
    this.scene.add('successScene', successScene);
    this.scene.add('Boss1', Boss1);
    this.scene.add('bossIntroScene', bossIntroScene);
    this.scene.add('test', test);
    this.scene.add('CutScene', CutScene);
    this.scene.add('IntroScene', IntroScene);
    this.scene.add('gameWorld', gameWorld);
    //this.scene.start('bossIntroScene');
    this.scene.start('gameWorld');
  }
}

window.game = new Game();
