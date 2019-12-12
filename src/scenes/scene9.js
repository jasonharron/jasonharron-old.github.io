/*globals Phaser*/
import * as changeScene from "/src/object/changeScene.js";
import firebase from "firebase/app";
import "firebase/firestore";
export default class scene9 extends Phaser.Scene {
  init() {}

  preload() {
    console.log("scene9");
    this.load.spritesheet("button1", "/assets/spriteSheets/button1.png", {
      frameHeight: 145,
      frameWidth: 271
    });
    this.load.spritesheet("button2", "/assets/spriteSheets/button2.png", {
      frameHeight: 139,
      frameWidth: 305
    });
  }

  create() {
    //Add change scene event listeners
    changeScene.addChangeSceneEventListeners(this);

    this.cameras.main.setBackgroundColor(0xffcc66);

    const firebaseConfig = {
      apiKey: "AIzaSyD2c7WmQj9GmqHSD9DUykeMdzmpivHR1FQ",
      authDomain: "fir-scoreboard-1bf96.firebaseapp.com",
      databaseURL: "https://fir-scoreboard-1bf96.firebaseio.com",
      projectId: "fir-scoreboard-1bf96",
      storageBucket: "fir-scoreboard-1bf96.appspot.com",
      messagingSenderId: "1097343346728",
      appId: "1:1097343346728:web:67056c3a3fcaae69"
    };

    let firebaseApp = firebase.initializeApp(firebaseConfig);

    let db = firebaseApp.firestore();

    var hsText = [];

    let score = 0;

    let name = "TaterTot";

    //Print scores on screen
    for (var i = 1; i < 11; i++) {
      this.add.text(300, 20 + i * 50, i + ". ", { fontSize: "40px" });
    }

    for (i = 0; i < 10; i++) {
      hsText[i] = this.add.text(370, 20 + (i + 1) * 50, "", {
        fontSize: "40px"
      });
    }

    var b1 = this.add.sprite(150, 100, "button1", 0).setInteractive();
    b1.on("pointerover", function() {
      this.setFrame(1);
      //if(checkSound){sound.play('low')};
    });

    b1.on("pointerout", function() {
      this.setFrame(0);
    });

    b1.on(
      "pointerup",
      function() {
        saveScore();
      },
      this
    );

    saveScore();

    function saveScore() {
      // Get name from input box
      //let name = document.getElementById('name').value;
      score = Math.round(Math.random() * 100);

      // Make sure name has a value, if not send alert.
      if (name !== "") {
        // Add a new document in collection "scores"
        db.collection("scores")
          .doc()
          .set({
            name: name,
            score: score
          })
          .then(function() {
            console.log("Document successfully written!");
            updateScores();
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      } else {
        alert("Please enter a name");
      }
    }

    function updateScores() {
      // Get the top 10 scores from our scoreboard
      var i = 0;
      db.collection("scores")
        .orderBy("score", "desc")
        .limit(10)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            hsText[i].text = doc.data().name + " " + doc.data().score;
            i++;
          });
        });
    }
  }
}
