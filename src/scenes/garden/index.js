import Phaser from 'phaser';

export default class Garden extends Phaser.Scene
{
    constructor ()
    {
        super();
      console.log("Garden.construct");
    }

    preload ()
    {

      console.log("Garden.preload");
    } 
    
    create ()
    {

      console.log("Garden.create");
    }
}
