import Phaser from 'phaser';
import Garden from './garden/';
import FadeOutDestroy from 'phaser3-rex-plugins/plugins/fade-out-destroy.js';

function fadeOut(obj, dur) {
  return new Promise(resolve => {
    FadeOutDestroy(obj, dur).on('complete', resolve);
  });
}
function zoom(camera, duration) {
  return new Promise(resolve => {
    camera.zoomTo(4, duration); 
    camera.on('camerazoomcomplete', resolve);
  });
}
export default class Intro extends Phaser.Scene
{
  create (data)
  {
    // do the background stuff
    this.__bg = this.add.tileSprite(data.x, data.y, this.game.config.width, this.game.config.height, "stars");
    this.__bg.setScale(3, 3);
    this.__velocity = new Phaser.Math.Vector2(1, 0);
    this.__deltaTheta = 1 / 16 / Math.PI; 
    
    // Show the game title and instructions
    this.__title = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 3,
      document.title.toUpperCase(),
      { 
        fontSize: "48px",
        fontFamily: "sans-serif"
      }
    )
    this.__title.setOrigin(0.5, 0.5); 

    this.__instruct = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 5 * 3,
      "Click anywhere to find tranquility...",
      {
        fontSize: "18px",
        fontFamily: "sans-serif"
      }
    )
    this.__instruct.setOrigin(0.5, 0.5);

    this.input.once("pointerup", () => {
      this.animateOut().then(() => {
        this.scene.add('garden', Garden, true);
        this.scene.remove(this);
      });
    });
  }
  animateOut() {
    return fadeOut(this.__instruct, 250)
      .then(() => fadeOut(this.__title, 500))
      .then(() => Promise.all([
        fadeOut(this.__bg, 250),
        zoom(this.cameras.main, 250)
      ]));
  }
  updateAngle() {
    if (!this.__targetVelocity) 
      this.__targetVelocity = new Phaser.Math.Vector2(1,0);
   
    const t0 = this.__velocity.angle();
    const t1 = this.__targetVelocity.angle();
    const dT = t1 - t0;

    this.__velocity.rotate(dT / Math.abs(dT || 1) * this.__deltaTheta);
    
    if (Math.abs(dT) < this.__deltaTheta) {
      this.__targetVelocity.rotate(Phaser.Math.FloatBetween(0, Math.PI));
    }
  }
  update (delta) {
    this.updateAngle();
    this.__bg.tilePositionX += this.__velocity.x;
    this.__bg.tilePositionY += this.__velocity.y;
  }
}
