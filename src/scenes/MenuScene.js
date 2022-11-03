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
  
  preLoad() {
    console.log("?ASDASD?");
  }

  create() {
    
  }
}