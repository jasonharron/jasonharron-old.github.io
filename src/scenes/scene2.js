/*globals Phaser*/
import * as changeScene from "/src/object/changeScene.js";
export default class scene2 extends Phaser.Scene {
  preload() {
    console.log("scene2");
    //Tank sprites from https://opengameart.org/content/tank-sprite
    this.load.image("base", "assets/sprites/tankBase.png");
    this.load.image("barrel", "assets/sprites/tankTurret.png");
    this.load.image("bullet", "assets/sprites/bullet.png");
    this.load.image("soda", "assets/sprites/soda.png");
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }

  create() {
    //Add change scene event listeners
    changeScene.addChangeSceneEventListeners(this);

    this.cameras.main.setBackgroundColor(0x008080);
    var barrel,
      bullets,
      velocity = 1000,
      enemy,
      bullet,
      enemyGroup;
    var centerX = this.width / 2;
    var centerY = this.height / 2;
    this.nextFire = 0;
    this.fireRate = 200;

    var base = this.add.sprite(centerX, centerY, "base");
    base.setScale(3);

    this.barrel = this.add.sprite(centerX, centerY, "barrel");
    this.barrel = this.barrel.setScale(3);

    this.bullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 10
    });

    this.enemyGroup = this.physics.add.group({
      key: "soda",
      repeat: 2,
      setXY: {
        x: 100,
        y: 100,
        stepX: 0,
        stepY: 200
      }
    });

    this.enemyGroup.children.iterate(function(child) {
      child.setScale(0.3);
    });
    this.bigOne = this.physics.add.sprite(700, 300, "soda");
    this.bigOne.flipX = true;

    this.enemyGroup.add(this.bigOne);

    this.input.on(
      "pointermove",
      function(pointer) {
        var BetweenPoints = Phaser.Math.Angle.BetweenPoints;
        var angle =
          Phaser.Math.RAD_TO_DEG * BetweenPoints(this.barrel, pointer);
        this.barrel.setAngle(angle);
      },
      this
    );

    this.input.on("pointerdown", this.shoot, this);
  }

  update() {
    this.bullets.children.each(
      function(b) {
        if (b.active) {
          this.physics.add.overlap(
            b,
            this.enemyGroup,
            this.hitEnemy,
            null,
            this
          );
          if (b.y < 0) {
            b.setActive(false);
          } else if (b.y > this.height) {
            b.setActive(false);
          } else if (b.x < 0) {
            b.setActive(false);
          } else if (b.x > this.width) {
            b.setActive(false);
          }
        }
      }.bind(this)
    );
  }

  shoot(pointer) {
    var BetweenPoints = Phaser.Math.Angle.BetweenPoints;
    var angle = BetweenPoints(this.barrel, pointer); //Returns in RADs
    var velocityFromRotation = this.physics.velocityFromRotation;
    var velocity = new Phaser.Math.Vector2();
    velocityFromRotation(angle, 600, velocity);
    var bullet = this.bullets.get();
    //bullet.setScale(0.3);
    bullet.setAngle(Phaser.Math.RAD_TO_DEG * angle);
    bullet
      .enableBody(true, this.barrel.x, this.barrel.y, true, true)
      .setVelocity(velocity.x, velocity.y);
  }

  hitEnemy(bullet, enemy) {
    console.log("hit");
    enemy.disableBody(true, true);
    bullet.disableBody(true, true);
  }
}
