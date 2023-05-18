export default class Winner extends Phaser.Scene {
  constructor() {
    super("Winner");
  }

  init() {}

  preload() {
    this.load.image("gato", "./assets/images/win.png");
    this.load.image("botonMenu", "./assets/images/botonMenu.png");
    this.load.image("botonP", "./assets/images/botonMenu-presionado.png");
  }

  create() {
    this.add.image(400, 250, "gato").setScale(0.5);
   
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
