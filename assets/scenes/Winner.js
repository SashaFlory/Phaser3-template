export default class Winner extends Phaser.Scene {
  constructor() {
    super("Winner");
  }

  init() {}

  preload() {
    this.load.image("gato", "./assets/images/win.png");
  }

  create() {
    this.add.image(400, 250, "gato").setScale(0.55);
    this.add.text(300, 500, "You win", {
      fontSize: "30px",
      fill: "#1af",
    });
  }

  update() {}
}
