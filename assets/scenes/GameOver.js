export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init() {}

  preload() {}

  create() {
    this.add.text(300, 300, "Game over", {
      fontSize: "30px",
      fill: "#1af",
    });
  }

  update() {}
}
