/*global Phaser*/
import * as ChangeScene from'./Changescene.js';
export default class CutScene extends Phaser.Scene {
  constructor () {
    super('CutScene');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {

  }

  create (data) {
    //variables
    this.content = ["This is testing code", "Biiiiiiiitch!!!!!"];
    this.line = [];

    this.wordIndex = 0;
    this.lineIndex = 0;

    this.wordDelay = 120;
    this.lineDelay = 400;

    this.text = this.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });

  //add scrolling text
  this.textTween = this.add.tween({
    targets: this.text,
    x: '-=0',
    ease: "Linear",
    repeat:1,
    onRepeat: function(){this.nextLine(this.content, this.line, this.wordIndex, this.lineIndex, this.wordDelay, this.lineDelay)},
   onRepeatScope: this
  });
}

  update (time, delta) {

  }

nextLine(content, line, wordIndex, lineIndex, wordDelay, lineDelay, game) {
    console.log(content.length);
    if (lineIndex === content.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the linear)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, nextWord, game);

    //  Advance to the next line
    lineIndex++;

}

nextWord() {

    //  Add the next word onto the text string, followed by a space
    text.text = text.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        text.text = text.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, nextLine, this);
    }

}
}
