import  Phaser from 'phaser';
import Game from './scenes/Game';

const config = {
 width: 1000,
 height: 800,
 type: Phaser.AUTO,
 transparent: true,
   
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    }
}
const game= new Phaser.Game(config)

   game.scene.add('game', Game);
   game.scene.start('game');