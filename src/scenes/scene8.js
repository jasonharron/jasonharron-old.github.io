/*globals Phaser*/
import * as changeScene from "/src/object/changeScene.js";
export default class scene8 extends Phaser.Scene {
  preload() {
    console.log("scene8");
    this.load.script(
      "webfont",
      "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
    );
  }

  create() {
    //Add change scene event listeners
    changeScene.addChangeSceneEventListeners(this);

    WebFont.load({
      google: {
        families: ["Candal", "Finger Paint", "Montserrat"]
      }
    });
    this.cameras.main.setBackgroundColor(0x99e6e6);
    //addChangeStateEventListeners();

    var text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices enim sem, quis interdum velit blandit eget. Suspendisse mollis est a lectus dictum ornare. Donec a suscipit magna. Sed mauris turpis, tristique quis ante ut, ullamcorper facilisis nisl. Proin quis orci faucibus, congue nisi ac, imperdiet justo. Donec scelerisque, libero.";
    this.spellOutText(100, 75, 550, text, 20, 20, "#fff", "Candal");
    //this.spellOutText(100, 600, 1100, text, 40, 20, '#000', 'Montserrat');
    this.spellOutText(100, 350, 600, text, 20, 40, "#000", "Finger Paint");
  }

  spellOutText(x, y, width, text, fontSize, speed, fill, font) {
    var sentence = this.add.text(x, y, "", {
      fontSize: fontSize,
      fill: fill,
      fontFamily: font
    });
    var currentLine = this.add.text(10, 10, "", {
      fontSize: fontSize,
      fontFamily: font
    });
    currentLine.alpha = 0;
    var index = 0;
    var that = this; //Work around for trying to call a this within nested function
    var timer;

    startLoop(that);

    function startLoop(that) {
      timer = that.time.addEvent({
        delay: speed,
        callback: addChar,
        callbackScope: this,
        loop: true
      });
    }

    function addChar() {
      sentence.text += text[index];
      currentLine.text += text[index];

      if (currentLine.width > width && text[index] === " ") {
        sentence.text += "\n";
        currentLine.text = "";
      }
      if (index >= text.length - 1) {
        timer.remove();
        console.log("stop");
      }
      index++;
    }
  }
}
