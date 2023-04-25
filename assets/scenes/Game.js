import { PLAYER_MOVEMENTS } from "../../utils.js";
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
      this.load.image("triangle", "./assets/images/Triangulo.png");
    }
  
    create() {
      //agregado sin fisicas
      this.add.image(400, 300, "sky").setScale(0.555);

      //agregado con fisicas
      this.player = this.physics.add.sprite(100, 500, "player");

      //plataform static group o grupo estático
      this.platformsGroup=this.physics.add.staticGroup();
      this.platformsGroup
        .create(400, 580, "platform")
        .setScale(2)
        .refreshBody();
      //o en la misma linea como:  this.platforms.create(400, 580, "platform").setScale(2).refreshBody();
      
      //grupo de formas que no estatico
      this.shapesGroup = this.physics.add.group();
      this.shapesGroup.create(100, 0, "triangle");

      //agrega colision entre personaje y plataforma, y entre formas y plataforma
      this.physics.add.collider(this.player, this.platformsGroup);

      this.physics.add.collider(this.shapesGroup, this.platformsGroup);

      //agregar overlap entre player y formas
      this.physics.add.overlap(this.player, this.shapesGroup, this.collectShape, null, this);
      //null y this quedan fijos por ahora
      
      //create cursors - se crean los inputs en teclado
      this.cursors = this.input.keyboard.createCursorKeys();

    }
  
    update() {

      //update player left right movement - establece que pasa cuando se apreta cada tecla
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-PLAYER_MOVEMENTS.x);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(PLAYER_MOVEMENTS.x);
      } else {
        this.player.setVelocityX(0);
      };

      //update player jump
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-PLAYER_MOVEMENTS.y);
      };

    }

    collectShape(jugador, figuraChocada) {
      console.log("figura recolectada");
      figuraChocada.disableBody(true, true);
    }
  }
  