import * as Phaser from 'phaser';

let currentScore = 0;
let balls:[] = [];
let scoreBoxes:[] = [];
let  boxNumbers:[] = [];
 



export default class Game extends Phaser.Scene
{
   preload()
   {

   }
    createPlayBall (balls:[], scoreBoxes:[], currentScoreText:string, scores:number[], x:number, n:number) {

        const startButton =  this.add.circle(40, 50, 40, 0xffffff, 1)
        const startButtonText=  this.add.text(startButton.getCenter().x, startButton.getCenter().y, "START", { font: "14px Arial", fill: "#efab35", fontSize: "bold" });
         startButtonText.setOrigin(0.5)
          
         startButton.setInteractive();
         startButton.on('pointerdown', () => {
        const playBall = this.add.circle(450, 30, 12, 0xef1f78, 1);
        this.physics.add.existing(playBall);

          
            playBall.body.setBounce(0.2);
            playBall.body.setCollideWorldBounds();
            playBall.body.setCircle(12);
          
            const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            const speed = 200;
            const vx = speed * Math.cos(angle);
            const vy = speed * Math.sin(angle);
            playBall.body.setVelocity(vx, vy);
             playBall.body.setGravityY(2000);

            balls.map(ball1 => {
                let thisSound = this
                this.physics.add.collider(ball1, playBall, function(){
                    ball1.setFillStyle(0xff0000);
                    // var collideSound = thisSound.sound.add('click')
                    // collideSound.play();
                    setTimeout(function(){
                        ball1.setFillStyle(0xffffff);
                    }, 500); 
                    
                });
            })
            let isCollide = false
            scoreBoxes.map((scoreBox:any, key:any) => {
                let thatScore = this
                this.physics.add.collider(playBall, scoreBox, function(){
                    if(isCollide === false){
                   
                    
                        if(scores[key] === 15 || scores[key] === 25 || scores[key] === 35 || scores[key] === 5){
                            currentScore += scores[key]
                            currentScoreText.setText( currentScore.toString());
                            let scoreText = thatScore.add.text(scoreBox.x+ 10, scoreBox.y + 50, 'SCORE!', { fontSize: '40px', fill: '#fff' });
                             scoreText.setOrigin(0.5, 0.5);

                             thatScore.tweens.add({
                                targets: scoreText,
                                duration: 500,
                                alpha: 0,
                                yoyo: true,
                                repeat: 3
                            });
                             
                             thatScore.time.delayedCall(2000, () => {
                                scoreText.destroy();
                            });
                              
                        }
                         isCollide = true

                     playBall.destroy();

                    }
                    
                  
                   });
            })

        const ballPosition = x + (n-0.76)* 25 + 12.5
          const playBallCentY = playBall.getCenter().y;
          const PlayBallCentX = ballPosition  + 10;
          playBall.setPosition(PlayBallCentX,playBallCentY )
            
          setInterval(()=>{
            if (playBall.y >= 788){
                playBall.destroy()
              }
          }, 100)
          
          return playBall
    });
    
     }


   create(){
//   let  scoreBoxes = []
//   let boxNumbers = []
      let thisPhaser = this
      function plinko(n:number){

  const scoreBoard = thisPhaser.add.rectangle( 850, 70, 60, 60, 0xefab35, 1);
        const scoreLabel = thisPhaser.add.text(scoreBoard.getCenter().x, scoreBoard.y - 50, "SCORE", { font: "16px Arial", fill: "#ffffff" });
        scoreLabel.setOrigin(0.5, 0);
        
       
        const currentScoreText = thisPhaser.add.text(scoreBoard.getCenter().x, scoreBoard.y  , "0", { font: "25px Arial", fill: "#ffffff" });
        currentScoreText.setOrigin(0.5, 1);
        
     
   let  ball = thisPhaser.add.circle(400, 20, 20, 0x010101, 1);

    let x:number  = 200
    let y: number = 100
    let sx: number = 0
    let sy:number = 0
   

    for (let i = 2; i < n; i++){
            sx = 0
            for (let j = 1; j <=n  - i; j++){
                sx += 25
            }
           
            for (let k = 0; k <= i; k++){
                  
                const ball1 = thisPhaser.add.circle(x+ sx, y+ sy, 10, 0xffffff, 1)
                ball1.setOrigin(0.5);
               
                thisPhaser.physics.add.existing(ball1, true)
               
                // ball1.body.setCircle(12)

                balls.push(ball1) 
            
            
            sx += 52.5
              }
            sy += 50
        }

            const boxWidth: number = 45;
            const boxHeight: number = 30;
            const boxSpacing: number = 10;
            const startX: number = 240;
            const startY: number = 100 + sy;
            const numBoxes: number = n - 1;

            const scores = [10, 20, 15, 30, 25, 40, 35, 5, 10, 20,10, 45,25, 50];
            

            for (let a = 0; a < numBoxes; a++) {
             
           const x = startX + (a * (boxWidth + boxSpacing));

           
        
           const scoreBox =  thisPhaser.add.rectangle(x, startY, boxWidth, boxHeight, 0xefab35, 1);
           thisPhaser.physics.add.existing(scoreBox, true)
           const  boxNumber =  thisPhaser.add.text(x, startY, scores[a].toString(), { font: "16px Arial", fill: "#000000" });
            boxNumber.setOrigin(0.5);
            
            
           boxNumber.setX(scoreBox.getCenter().x);
           boxNumber.setY(scoreBox.getCenter().y);


            scoreBoxes.push(scoreBox)
            boxNumbers.push(boxNumber)


       }

       let that = thisPhaser
        for (let pb = 0; pb <= 5; pb++){
       setTimeout(function(){
        let playBall2 = that.createPlayBall(balls, scoreBoxes, currentScoreText, scores, x, n)
       
    }, 10000 * pb);
     
}
     const lastRowX = x + (n-0.76)*25 + 12.5;
          const ballCenterY = ball.getCenter().y;
          const ballCenterX = lastRowX + 10; 
          ball.setPosition(ballCenterX, ballCenterY);

       const restartButton =  thisPhaser.add.circle(150, 50, 40,  0xffffff, 1)
          const restartButtonText =  thisPhaser.add.text(restartButton.getCenter().x,restartButton.getCenter().y, "RESTART GAME", { font: "10px Arial", fill: "#efab35", fontSize: "bold" });
          restartButtonText.setOrigin(0.5)
          restartButton.setInteractive();
          restartButton.on('pointerdown', () => {
      
            thisPhaser.scene.restart();
          });
          }

           let n: number = 8
        plinko(n)

    const nOptions: HTMLElement= document.getElementById("gridLines")!;
    nOptions.addEventListener("change", function(){
        
        balls.map(ball => {
            ball.destroy();

        })
        scoreBoxes.map(scoreBoxe =>{
            scoreBoxe.destroy();
        })
        ball.destroy();
       
        boxNumbers.map(boxNumber =>{
            boxNumber.destroy()
        })
        const selectedOption = nOptions.value;
     console.log(selectedOption)
     currentScore = 0
    
    plinko(Number(selectedOption))
    
    });
    
       
   
}
}

       