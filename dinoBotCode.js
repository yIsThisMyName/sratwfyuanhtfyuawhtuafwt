//copy the line below and paste it into console on the chrome dino game
setInterval(()=>{if((Runner.getInstance().horizon.obstacles[0].xPos-20-Runner.getInstance().currentSpeed*14<0)&&!(Runner.getInstance().horizon.obstacles[0].yPos==50))Runner.getInstance().tRex.startJump(Runner.getInstance().currentSpeed)},10)
