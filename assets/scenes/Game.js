export default class Game extends Phaser.Scene {
    constructor() {
      super("Game");
    }
  
    init() {
      //inicializar variables
      let shapesRecolected = [
        {type: "Triangulo", count: 0},
        {type: "Cuadrado", count: 0},
        {type: "Rombo", count: 0}
      ];
    };
  
    preload() {
      //cargar imágenes de fondos, personajes, formas, etc
      this.load.image("sky", "./assets/images/Cielo.png");
      this.load.image("platform", "./assets/images/platform.png");
      this.load.image("player", "./assets/images/Ninja.png");
    }
  
    create() {
      //agregado sin fisicas
      this.add.image(400, 300, "sky").setScale(0.555);

      //agregado con fisicas
      this.player = this.physics.add.sprite(100, 400, "player");

      //plataform static group o grupo estático
      this.platforms=this.physics.add.staticGroup();
      this.platforms
        .create(400, 580, "platform")
        .setScale(2)
        .refreshBody();
        //o en la misma linea como:  this.platforms.create(400, 580, "platform").setScale(2).refreshBody();
      
        //agrega colision entre personaje y plataforma
      this.physics.add.collider(this.player, this.platforms)

    }
  
    update() {}
  }
  