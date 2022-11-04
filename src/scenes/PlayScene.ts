import { CST } from "../CST";
// import { CharacterSprite } from "../CharacterSprite";
// import { Sprite } from "../Sprite";

declare global {
  interface Window{
    hooded: any,
    anna: any,
    mandy: any,
  }
}

export class PlayScene extends Phaser.Scene {
  anna!: Phaser.Physics.Arcade.Sprite;
  hooded!: Phaser.Physics.Arcade.Sprite;
  keyboard!: { [index: string]: Phaser.Input.Keyboard.Key };
  assassins!: Phaser.Physics.Arcade.Group;
  fireAttacks!: Phaser.Physics.Arcade.Group;
  player!: Phaser.GameObjects.Container;
  constructor() {
    super({ 
      key: CST.SCENES.PLAY 
    })
  }

  preload() {
    this.anims.create({
      key: "left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("anna", {
          start: 9,
          end: 17
      })
  });
  this.anims.create({
      key: "down",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("anna", {
          start: 18,
          end: 26
      })
  });
  this.anims.create({
      key: "up",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("anna", {
          start: 0,
          end: 8
      })
  });
  this.anims.create({
      key: "right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("anna", {
          start: 27,
          end: 35
      })
  });

  this.anims.create({
      key: "blaze",
      duration: 50,
      frames: this.anims.generateFrameNames("daze", {
          prefix: "fire0",
          suffix: ".png",
          end: 55
      }),
      showOnStart: true,
      hideOnComplete: true
  });
  this.textures.addSpriteSheetFromAtlas("hooded", { frameHeight: 64, frameWidth: 64, atlas: "characters", frame: "hooded" })
  this.textures.addSpriteSheetFromAtlas("mandy", { frameHeight: 64, frameWidth: 64, atlas: "characters", frame: "mandy" });

  this.load.image("terrain", "./assets/image/terrain_atlas.png");
  this.load.image("items", "./assets/image/items.png");

  this.load.tilemapTiledJSON("mappy", "./assets/maps/mappy.json");


  this.anims.create({
      key: "mandyswordleft",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("mandy", {
          start: 169,
          end: 174
      })
  });

  this.anims.create({
      key: "sword_left",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("rapier", {
          start: 6,
          end: 11
      }),
      showOnStart: true,
      hideOnComplete: true
  });
}

  create() {
    this.anna = this.physics.add.sprite(400, 400, "anna", 26).setScale(2);
    this.hooded = this.physics.add.sprite(200, 200, "hooded", 26).setScale(2).setImmovable(true);
    this.assassins = this.physics.add.group({immovable: true})
    this.assassins.add(this.hooded)
    this.fireAttacks = this.physics.add.group()

    window.hooded = this.hooded;
    window.anna = this.anna;

    // smaller hitbox
    this.anna.setSize(40, 50).setOffset(10,10)
    this.anna.setCollideWorldBounds(true)

    this.keyboard = this.input.keyboard.addKeys("W, A, S, D")
    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if(pointer.isDown) {
        let fire = this.add.sprite(pointer.x, pointer.y, "daze", "fire00.png").play("blaze")
        this.fireAttacks.add(fire)
        fire.on("animationcomplete", () => {
          fire.destroy();
        })
      }
    })
    this.physics.world.addCollider(this.anna, this.assassins, (anna: Phaser.Physics.Arcade.Sprite, hooded: Phaser.Physics.Arcade.Sprite)=>{
      anna.destroy();
      hooded.destroy();
    })

    this.physics.world.addCollider(this.fireAttacks, this.assassins, (fireAttacks: Phaser.Physics.Arcade.Sprite, hooded: Phaser.Physics.Arcade.Sprite)=>{
      fireAttacks.destroy();
      hooded.destroy();

      let y = 0;
      let x = 0;
      switch(Phaser.Math.Between(0, 1)) {
        case 0: x = Phaser.Math.Between(0, this.game.renderer.width);
          break;
        case 1: y = Phaser.Math.Between(0, this.game.renderer.height)
  }

      for(let i=0; i < 2; i++) {
        this.assassins.add(this.physics.add.sprite(x, y, "hooded", 26).setScale(2).setImmovable(true));
      }
    })
  }
  update(time: number, delta: number){
    for(let i = 0; i < this.assassins.getChildren().length; i++){
    this.physics.accelerateToObject(this.assassins.getChildren()[i], this.anna)
    }

    if (this.anna.active === true) {
      if (this.keyboard.D.isDown === true) {
          this.anna.setVelocityX(128);

      }

      if (this.keyboard.W.isDown === true) {
          this.anna.setVelocityY(-128);
      }

      if (this.keyboard.S.isDown === true) {
          this.anna.setVelocityY(128);
      }

      if (this.keyboard.A.isDown === true) {
          this.anna.setVelocityX(-128);
      }
      if (this.keyboard.A.isUp && this.keyboard.D.isUp) { //not moving on X axis
          this.anna.setVelocityX(0);
      }
      if (this.keyboard.W.isUp && this.keyboard.S.isUp) { //not pressing y movement
          this.anna.setVelocityY(0);
      }

      if (this.anna.body.velocity.x > 0) { //moving right
          this.anna.play("right", true);
      } else if (this.anna.body.velocity.x < 0) { //moving left
          this.anna.anims.playReverse("left", true);
      } else if (this.anna.body.velocity.y < 0) { //moving up
          this.anna.play("up", true);
      } else if (this.anna.body.velocity.y > 0) { //moving down
          this.anna.play("down", true);
      }
  }
    
  }
}
