import {
  PLAYER_MOVEMENTS,
  SHAPE_DELAY,
  SHAPES,
  TRIANGULO,
  CUADRADO,
  ROMBO,
} from "../../utils.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    //inicializar variables
    this.shapesRecolected = {
      [TRIANGULO]: { count: 0 },
      [CUADRADO]: { count: 0 },
      [ROMBO]: { count: 0 },
    };

    this.isWinner = false;
    this.isGameOver = false;
  }

  preload() {
    //cargar imágenes de fondos, personajes, formas, etc
    this.load.image("sky", "./assets/images/Cielo.png");
    this.load.image("platform", "./assets/images/platform.png");
    this.load.image("player", "./assets/images/Ninja.png");
    this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
    this.load.image(CUADRADO, "./assets/images/Cuadrado.png");
    this.load.image(ROMBO, "./assets/images/Rombo.png");
  }

  create() {
    //agregado sin fisicas
    this.add.image(400, 300, "sky").setScale(0.555);

    //agregado con fisicas
    this.player = this.physics.add.sprite(100, 500, "player");

    //plataform static group o grupo estático
    this.platformsGroup = this.physics.add.staticGroup();
    this.platformsGroup.create(400, 580, "platform").setScale(2).refreshBody();
    //o en la misma linea como:  this.platforms.create(400, 580, "platform").setScale(2).refreshBody();

    //grupo de formas no estatico
    this.shapesGroup = this.physics.add.group();

    //agrega colision entre personaje y plataforma, y entre formas y plataforma
    this.physics.add.collider(this.player, this.platformsGroup);

    this.physics.add.collider(this.shapesGroup, this.platformsGroup);

    //agregar overlap entre player y formas
    this.physics.add.overlap(
      this.player,
      this.shapesGroup,
      this.collectShape,
      null,
      this
    );
    //null y this quedan fijos por ahora

    //create cursors - se crean los inputs en teclado
    this.cursors = this.input.keyboard.createCursorKeys();

    //create event to add shapes - crea un evento para que las formas caigan cada cierto tiempo
    this.time.addEvent({
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    //agrega texto en pantalla de puntaje
    this.scoreText = this.add.text(16, 16, "T: 0 / C: 0 / R: 0", {
      fontSize: "20px",
      fill: "#1af",
    });
  }

  update() {
    //check if win or gameover
    if (this.isWinner) {
      this.scene.start("Winner");
    }

    if (this.isGameOver) {
      this.scene.start("GameOver");
    }

    //update player left right movement - establece que pasa cuando se apreta cada tecla
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-PLAYER_MOVEMENTS.x);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(PLAYER_MOVEMENTS.x);
    } else {
      this.player.setVelocityX(0);
    }

    //update player jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-PLAYER_MOVEMENTS.y);
    }
  }

  collectShape(jugador, figuraChocada) {
    console.log("figura recolectada");
    figuraChocada.disableBody(true, true);

    const shapeName = figuraChocada.texture.key;
    this.shapesRecolected[shapeName].count++;

    //update score text
    this.scoreText.setText(
      "T: " +
        this.shapesRecolected[TRIANGULO].count +
        " / C: " +
        this.shapesRecolected[CUADRADO].count +
        " / R: " +
        this.shapesRecolected[ROMBO].count
    );

    console.log(this.shapesRecolected);

    if (
      this.shapesRecolected[TRIANGULO].count >= 2 &&
      this.shapesRecolected[CUADRADO].count >= 2 &&
      this.shapesRecolected[ROMBO].count >= 2
    ) {
      this.isWinner = true;
    }
  }

  addShape() {
    //get random shape
    const randomShape = Phaser.Math.RND.pick(SHAPES);

    //get random position
    const randomX = Phaser.Math.RND.between(0, 800);

    //add shape to screen
    this.shapesGroup.create(randomX, 0, randomShape);

    console.log("Shape is added", randomX, randomShape);
  }
}
