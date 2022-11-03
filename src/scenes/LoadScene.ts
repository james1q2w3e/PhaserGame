/** @type {import("../typings/phaser")} */
import { CST } from "../CST";
import Phaser from "phaser";

// export class LoadScene extends Phaser.Scene {
//   constructor() {
    // super({
    //   key: CST.SCENES.LOAD,
    // });
//   }

//   init() {
//     console.log("PPPPPPPPPPPPPP");
//   }

//   preLoad() {
//     // this.load.setBaseURL('http://localhost:3000');
//     console.log("ASASDASDASDASD");
//     this.load.image('title_bg', "./assets/title_bg.jpg")
//     this.load.image('options_button', "./assets/options_button.png")
//     this.load.image('play_button', "./assets/play_button.png")
//     this.load.image('logo', "./assets/logo.png")

//     this.load.spritesheet('cat', './assets/cat.png', {
//       frameHeight: 32,
//       frameWidth: 32
//     });

//     this.load.audio('title_music', './assets/shuinvy-childhood.mp3')

//     // creating a loading bar
//     let loadingBar = this.add.graphics({
//       fillStyle: {
//         color: 0xffffff // white
//       }
//     });

//     /*
//     Loader Events:
//       complete = when done loading everything
//       progress - loader number progress in decimal
//     */

//       //simulate a large load
//       for(let i = 0; i < 100; i++) {
//         console.log("HEEELELEEO");
//         this.load.spritesheet('cat' + i, './assets/cat.png', {
//           frameHeight: 32,
//           frameWidth: 32
//         });
//       }

//       this.load.on("progress", (percent) => {
//         loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
//         console.log(percent);
//       })
//   }

//   create() {
//     // this.scene.add(CST.SCENES.MENU, MenuScene, false)
//     console.log("SCENE CREATION?");
//     this.scene.start(CST.SCENES.MENU, 'henlo from load scene');
//   }

// }




// var game = new Phaser.Game(config);

// export class LoadScene extends Phaser.Scene {
//   constructor() {
//     super()
//   }

//   preload ()
//   {
//     this.load.image('logo', "assets/logo.png")
//     this.load.image('sky', "assets/title_bg.jpg")
//     this.load.image('red', "assets/options_button.png")
//     // this.load.setBaseURL('http://labs.phaser.io');

//     // this.load.image('sky', 'assets/skies/space3.png');
//     // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    
//     // this.load.image('red', 'assets/particles/red.png');

//     let loadingBar = this.add.graphics({
//       fillStyle: {
//         color: 0xffffff // white
//       }
//     });

//     /*to simulate a heavy load */
//     // for(let i = 0; i < 100; i++) {
//     //   console.log("HEEELELEEO");
//     //   this.load.spritesheet('cat' + i, './assets/cat.png', {
//     //     frameHeight: 32,
//     //     frameWidth: 32
//     //   });
//     // }

//     this.load.on("progress", (percent) => {
//       loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
//       console.log(percent);
//     })

//   }

//   create ()
//   {
//     console.log("CREATE? in LOADSCENE");
//     this.add.image(400, 300, 'sky');

//     var particles = this.add.particles('red');

//     var emitter = particles.createEmitter({
//         speed: 100,
//         scale: { start: 1, end: 0 },
//         blendMode: 'ADD'
//     });

//     var logo = this.physics.add.image(400, 100, 'logo');

//     logo.setVelocity(100, 200);
//     logo.setBounce(1, 1);
//     logo.setCollideWorldBounds(true);

//     emitter.startFollow(logo);
//   }
// }

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD,
    });
  }

  loadImages() {
    this.load.setPath("./assets/image");
    for(let prop in CST.IMAGE) {
      this.load.image(CST.IMAGE[prop], CST.IMAGE[prop])
    }
  }

  loadAudio() {
    this.load.setPath("./assets/audio");
    for(let prop in CST.AUDIO) {
      this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop])
    }
  }

  loadSprites(frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig) {
    this.load.setPath("./assets/sprite");
    for(let prop in CST.SPRITE) {
      this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig)
    }
  }

  preload ()
  {
    this.load.spritesheet("anna", "./assets/sprite/anna.png", ({frameHeight: 64, frameWidth: 64}))
    // load atlases
    this.load.atlas("characters", "./assets/sprite/characters.png", "./assets/sprite/characters.json")
    this.load.atlas("daze", "./assets/sprite/daze.png", "./assets/sprite/daze.json")


    this.loadAudio();
    this.loadSprites({
      frameHeight: 32,
      frameWidth: 32,
    });
    this.loadImages();

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff // white
      }
    });

    /*to simulate a heavy load */
    // for(let i = 0; i < 100; i++) {
    //   console.log("HEEELELEEO");
    //   this.load.spritesheet('cat' + i, './assets/cat.png', {
    //     frameHeight: 32,
    //     frameWidth: 32
    //   });
    // }

    this.load.on("progress", (percent: number) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
      console.log(percent);
    })

    
    this.load.on("load", (file: Phaser.Loader.File) => {
      console.log(file.src);
    })
  }

  create ()
  {
    console.log("CREATE? in LOADSCENE");
    this.scene.start(CST.SCENES.MENU);
  }
}