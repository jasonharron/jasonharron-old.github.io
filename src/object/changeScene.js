export { addChangeSceneEventListeners };

function addChangeSceneEventListeners(that) {
  that.input.keyboard.on(
    "keydown_ZERO",
    function(event) {
      that.scene.start("scene0");
    },
    that
  );
  that.input.keyboard.on(
    "keydown_ONE",
    function(event) {
      that.scene.start("scene1");
    },
    that
  );
  that.input.keyboard.on(
    "keydown_TWO",
    function(event) {
      that.scene.start("scene2");
    },
    that
  );
  that.input.keyboard.on(
    "keydown_THREE",
    function(event) {
      that.scene.start("scene3");
    },
    that
  );
  that.input.keyboard.on(
    "keydown_FOUR",
    function(event) {
      that.scene.start("scene4");
    },
    that
  );
  that.input.keyboard.on(
    "keydown_FIVE",
    function(event) {
      that.scene.start("scene5");
    },
    that
  );
  that.input.keyboard.on(
    "keydown_SIX",
    function(event) {
      that.scene.start("scene6");
    },
    that
  );
  that.input.keyboard.on(
    "keydown_SEVEN",
    function(event) {
      that.scene.start("scene7");
    },
    that
  );
  that.input.keyboard.on(
    "keydown_EIGHT",
    function(event) {
      that.scene.start("scene8");
    },
    that
  );
  that.input.keyboard.on(
    "keydown_NINE",
    function(event) {
      that.scene.start("scene9");
    },
    that
  );
  that.input.keyboard.on(
    "keydown_ESC",
    function(event) {
      that.scene.start("Boot");
    },
    that
  );
}
