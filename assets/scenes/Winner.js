export default class Winner extends Phaser.Scene {
  constructor() {
    super("Winner");
  }

  init() {}

  preload() {}

  create() {
    this.add.text(300, 300, "You win", {
      fontSize: "30px",
      fill: "#1af",
    });
  }

  update() {}
}
