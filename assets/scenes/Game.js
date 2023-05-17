import {
  PLAYER_MOVEMENTS,
  SHAPE_DELAY,
  TIMER_DELAY,
  SHAPES,
  TRIANGULO,
  CUADRADO,
  ROMBO,
  ESTRELLA,
  POINTS_PERCENTAGE,
  POINTS_PERCENTAGE_VALUE_START
} from "../../utils.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    //inicializar variables
    this.shapesRecolected = {
      [TRIANGULO]: { count: 0, score: 10 },
      [CUADRADO]: { count: 0, score: 20 },
      [ROMBO]: { count: 0, score: 30 },
      [ESTRELLA]: {count: 0, score: -40}
    };

    this.isWinner = false;
    this.isGameOver = false;

    this.timer = 30;
    this.totalScore = 0;
  }

  preload() {
    //cargar imágenes de fondos, personajes, formas, etc
    this.load.image("sky", "./assets/images/Cielo.png");
    this.load.image("platform", "./assets/images/platform.png");
    this.load.image("player", "./assets/images/Ninja.png");
    this.load.image(TRIANGULO, "./assets/images/Triangulo.png");
    this.load.image(CUADRADO, "./assets/images/Cuadrado.png");
    this.load.image(ROMBO, "./assets/images/Rombo.png");
    this.load.image(ESTRELLA, "./assets/images/Estrella.png");
  }

  create() {
    //agregado sin fisicas
    this.add.image(400, 300, "sky").setScale(0.555);

    //agregado con fisicas
    this.player = this.physics.add.sprite(100, 500, "player");

    //plataform static group o grupo estático
    this.platformsGroup = this.physics.add.staticGroup();
    this.platformsGroup.create(400, 580, "platform").setScale(2).refreshBody();
    this.platformsGroup.create(650, 420, "platform").setScale(0.5).refreshBody();
    this.platformsGroup.create(100, 320, "platform").setScale(0.4).refreshBody();
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

    this.physics.add.overlap(
      this.shapesGroup,
      this.platformsGroup,
      this.reduce,
      null,
      this
    );

    //create cursors - se crean los inputs en teclado
    this.cursors = this.input.keyboard.createCursorKeys();

    //create event to add shapes - crea un evento para que las formas caigan cada cierto tiempo
    this.time.addEvent({
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    //agrego evento de contador
    this.time.addEvent({
      delay: TIMER_DELAY,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    //agrega texto en pantalla de puntaje
    this.scoreText = this.add.text(16, 16, "T: 0 / C: 0 / R: 0 / E: 0", {
      fontSize: "20px",
      fill: "#1af",
    });

    this.totalScoreText = this.add.text(16, 50, "SCORE: 0", {
      fontSize: "20px",
      fill: "#1af",
    })

    this.timerText = this.add.text(400, 16, "Tiempo: 30", {
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
    figuraChocada.disableBody(true, true);

    const shapeName = figuraChocada.texture.key;
    this.shapesRecolected[shapeName].count++;

    const percentage = figuraChocada.getData(POINTS_PERCENTAGE);

    this.totalScore = this.totalScore + this.shapesRecolected[shapeName].score * percentage;

    //update score text
    this.scoreText.setText(
      "T: " +
        this.shapesRecolected[TRIANGULO].count +
        " / C: " +
        this.shapesRecolected[CUADRADO].count +
        " / R: " +
        this.shapesRecolected[ROMBO].count +
        " / E: " +
        this.shapesRecolected[ESTRELLA].count
    );

    this.totalScoreText.setText(
      "SCORE: " +
      this.totalScore
    )

    console.log("Figura recolectada ---> Puntos:" + this.shapesRecolected[shapeName].score);
    console.log("Puntos totales:", this.totalScore);

    if (this.totalScore >= 100) {
      this.isWinner = true;
    };

    // if (
    //   this.shapesRecolected[TRIANGULO].count >= 2 &&
    //   this.shapesRecolected[CUADRADO].count >= 2 &&
    //   this.shapesRecolected[ROMBO].count >= 2
    // ) {
    //   this.isWinner = true;
    // }

  }

  addShape() {
    //get random shape
    const randomShape = Phaser.Math.RND.pick(SHAPES);

    //get random position
    const randomX = Phaser.Math.RND.between(0, 800);

    //add shape to screen
    this.shapesGroup.create(randomX, 0, randomShape)
    .setCircle(32, 0, 0)
    .setBounce(0.8)
    .setData(POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START);

    console.log("Shape is added", randomX, randomShape);
  }

  updateTimer() {
    this.timer--;
    this.timerText.setText("Tiempo: " + this.timer);
    console.log(this.timer);

    if (this.timer == 0) {
      this.isGameOver = true;
    }
  }

  reduce(shape, platform) {
    const newPercentage = shape.getData(POINTS_PERCENTAGE) - 0.25;

    console.log(shape.texture.key, newPercentage);

    shape.setData(POINTS_PERCENTAGE, newPercentage);

    if (newPercentage <= 0) {
      shape.disableBody(true, true);
      return;
    }

    // show text
    const text = this.add.text(shape.body.position.x+10, shape.body.position.y, "- 25%", {
      fontSize: "22px",
      fontStyle: "bold",
      fill: "red",
    });

    setTimeout(() => {
      text.destroy();
    }, 200)
  }
}
