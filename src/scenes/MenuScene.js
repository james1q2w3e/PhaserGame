/** @type {import("../typings/phaser")} */
import { CST } from "../CST";
import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU,
    });
  }
  init(data) {
    console.log(data);
    console.log("i got it bro"); 
  }
  
  // preLoad() {
  //   console.log("?ASDASD?");
  // }

  create() { // creating the menu screen
    // create images (z-order)

    // setDepth is what determines what images/assets get placed on top (by default whatever loads first is the back-most image)
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo").setDepth(1)

    this.add.image(0,0, "title_bg").setOrigin(0).setDepth(0);

    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button").setDepth(1)
    
    let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "options_button").setDepth(1)

    // create sprites (if using pixel art, remove sharpen)
    let hoverSprite = this.add.sprite(100, 100, "cat")
    hoverSprite.setScale(2)
    hoverSprite.setVisible(false)

    // create audio, disable pauseOnBlur
    // this.sound.pauseOnBlur = false;
    this.sound.play("title_music", {
      loop: true,
      volume: 0.1
    })

    // interactivity
    playButton.setInteractive();
    optionsButton.setInteractive();

    // create animation
    this.anims.create({
      key: 'walk',
      frameRate: 10,
      repeat: -1, //repeat forever
      frames: this.anims.generateFrameNumbers("cat", {
        frames: [0,1,2,3]
      })
    })

    // DRY pointerOver/OUT/UP
    const pointerOver = (variable) => {
      variable.on("pointerover", () => {
        console.log('//////');
        hoverSprite.setVisible(true)
        hoverSprite.play("walk") // animation
        hoverSprite.x = variable.x - variable.width;
        hoverSprite.y = variable.y;
      })
      variable.on("pointerout", () => {
        console.log('pointerOUT');
        hoverSprite.setVisible(false)
      })
      variable.on("pointerup", () => {
        console.log('clicked!!!!!');
      })
    }

    pointerOver(playButton)
    pointerOver(optionsButton)

    // playButton.on("pointerover", () => {
    //   hoverSprite.setVisible(true)
    //   hoverSprite.x = playButton.x - playButton.width;
    //   hoverSprite.y = playButton.y;
    // })

    // playButton.on("pointerout", () => {
    //   console.log('pointerOUT');
    //   hoverSprite.setVisible(false)
    // })

    // playButton.on("pointerup", () => {
    //   console.log('clicked!!!!!');
    // })

  }
}