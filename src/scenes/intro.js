import Phaser from 'phaser';

export default class Intro extends Phaser.Scene
{
  create (data)
  {
    console.log(this);
    console.log("Intro.create");
    this.__bg = this.add.tileSprite(data.x, data.y, this.game.config.width, this.game.config.height, "stars");
    this.__bg.setScale(3, 3);
    this.__velocity = new Phaser.Math.Vector2(1, 0);
    this.__deltaTheta = 1 / 16 / Math.PI; 
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
  update () {
    this.updateAngle();
    this.__bg.tilePositionX += this.__velocity.x;
    this.__bg.tilePositionY += this.__velocity.y;
  }
}
