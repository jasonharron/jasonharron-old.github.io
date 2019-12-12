export { addSceneEventListeners };

function addSceneEventListeners(that, intScene){
  if (intScene[0] == 0){
    that.input.keyboard.on(
      "keydown_ENTER",
        function(){
          if(that.bootMusic){
            that.bootMusic.stop();
          }
          that.scene.start('IntroScene') //changes from start screen to cutscene
        }
      );
  }

  // If in Intro scene
  else if (intScene[0] == 1){
    // Check if Escape is keyPressed
    that.input.keyboard.on(
      "keydown_ESC",
        function(){
          if (!that.toNextScene){
            if(that.introMusic){
              that.introMusic.stop();
            }
            that.toNextScene = true;
            if(that.introMusic){
              that.introMusic.stop();
            }
            that.scene.start('Level1v2'); //changes from start screen to cutscene

          }
        }
      );

      // Check if Escape is keyPressed
      that.input.keyboard.on(
        "keydown_ENTER",
          function(){
            if (that.typingIsDone){
              that.currentLetter = 0;
              that.currentPhrase += 1;
              that.typingIsDone = false;
              that.animationStarted = false;
            }
          }
        );
  }
  // If in Boss intro scene
  else if (intScene[0] == 2){
    // Check if Escape is keyPressed
    that.input.keyboard.on(
      "keydown_ESC",
        function(){
          if (!that.toNextScene){
            if(that.bossintroMusic){
              that.bossintroMusic.stop();
            }
            that.toNextScene = true;
            if(that.bossintroMusic){
              that.bossintroMusic.stop();
            }
            that.scene.start('Boss1', {health: intScene[1]});

          }
        }
      );

      // Check if Escape is keyPressed
      that.input.keyboard.on(
        "keydown_ENTER",
          function(){
            if (that.typingIsDone){
              that.currentLetter = 0;
              that.currentPhrase += 1;
              that.typingIsDone = false;
              that.animationStarted = false;
            }
          }
        );
  }
  else if (intScene[0] == 3){
    that.input.keyboard.on(
      "keydown_ESC",
        function(){
          //if (!that.toNextScene){
            if(that.gameMusic){
              that.gameMusic.stop();
            }
            that.toNextScene = true;
            if(that.gameMusic){
              that.gameMusic.stop();
            }

            that.scene.start('Boot');

          //}
        }
      );
  }

}
