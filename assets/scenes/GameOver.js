export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init() {}

  preload() {
    this.load.image("botonReintentar", "./assets/images/botonReintentar.png");
    this.load.image("botonR", "./assets/images/botonReintentar-presionado.png");
    this.load.image("botonMenu", "./assets/images/botonMenu.png");
    this.load.image("botonP", "./assets/images/botonMenu-presionado.png");
  }

  create() {
    this.add.text(230, 250, "Game over", {
      fontSize: "60px",
      fill: "#fffa86",
    });

    let retryButton = this.add.image(400, 460, "botonReintentar").setInteractive();

    retryButton.on("pointerover", () => {
      retryButton.setTexture("botonR");
    })

    retryButton.on("pointerdown", () => {
      retryButton.setTexture("botonR");
      this.scene.start("Game");
    })

    retryButton.on("pointerout", () => {
      retryButton.setTexture("botonReintentar");
    })

    let MenuButton = this.add.image(400, 530, "botonMenu").setInteractive();

    MenuButton.on("pointerover", () => {
      MenuButton.setTexture("botonP");
      })

    MenuButton.on("pointerdown", () => {
      MenuButton.setTexture("botonP");
      this.scene.start("MainMenu");
      })

    MenuButton.on("pointerout", () => {
      MenuButton.setTexture("botonMenu");
      })
  }

  update() {}
}
