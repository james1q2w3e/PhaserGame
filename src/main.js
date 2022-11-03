/** @type {import("../typings/phaser")} */
// import Phaser from 'phaser'

// import {LoadScene} from './scenes/LoadScene'

// let game = new Phaser.Game({
  //   type: Phaser.AUTO,
  //   width: 800,
  //   height: 600,
  //   scene: [
    //     LoadScene, 
    //     MenuScene
    //   ]
    // })

    
import {MenuScene} from './scenes/MenuScene'
import {LoadScene} from './scenes/LoadScene';


var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: [
    LoadScene,
    MenuScene
  ]
};

var game = new Phaser.Game(config);

// function preload ()
// {
//   this.load.image('logo', "assets/logo.png")
//   this.load.image('sky', "assets/title_bg.jpg")
//   this.load.image('red', "assets/options_button.png")
//   // this.load.setBaseURL('http://labs.phaser.io');

//   // this.load.image('sky', 'assets/skies/space3.png');
//   // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  
//   // this.load.image('red', 'assets/particles/red.png');

//   let loadingBar = this.add.graphics({
//     fillStyle: {
//       color: 0xffffff // white
//     }
//   });

//   // for(let i = 0; i < 100; i++) {
//   //   console.log("HEEELELEEO");
//   //   this.load.spritesheet('cat' + i, './assets/cat.png', {
//   //     frameHeight: 32,
//   //     frameWidth: 32
//   //   });
//   // }

//   this.load.on("progress", (percent) => {
//     loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
//     console.log(percent);
//   })

// }

// function create ()
// {
//   this.add.image(400, 300, 'sky');

//   var particles = this.add.particles('red');

//   var emitter = particles.createEmitter({
//       speed: 100,
//       scale: { start: 1, end: 0 },
//       blendMode: 'ADD'
//   });

//   var logo = this.physics.add.image(400, 100, 'logo');

//   logo.setVelocity(100, 200);
//   logo.setBounce(1, 1);
//   logo.setCollideWorldBounds(true);

//   emitter.startFollow(logo);
// }