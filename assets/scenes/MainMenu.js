export default class MainMenu extends Phaser.Scene {
    constructor() {
      super("MainMenu");
    }
  
    init() {}
  
    preload() {
      this.load.image("menu", "./assets/images/FondoMenu.jpg");
      this.load.image("title", "./assets/images/Title.png");
      this.load.image("boton", "./assets/images/botonInicio.png");
      this.load.image("botonPresionado", "./assets/images/botonInicio-presionado.png")
    }
  
    create() {
     this.add.image(0, 0, "menu").setOrigin(0).setScale(0.65);
     this.add.image(400, 150, "title").setScale(0.7);

     let startButton = this.add.image(400, 400, "boton").setInteractive();

     startButton.on("pointerover", () => {
        startButton.setTexture("botonPresionado");
     })

     startButton.on("pointerdown", () => {
        startButton.setTexture("botonPresionado");
        this.scene.start("Game");
     })

     startButton.on("pointerout", () => {
        startButton.setTexture("boton");
     })
    }
  
    update() {}
  }
  