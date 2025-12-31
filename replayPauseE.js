window.replayPauseE = {};
window.replayPauseE.runCodeBefore = function() {
  // for logging the game's time
  window.gameNow = 0;
  window.gameStartTime = 0;
  window.gameInputs = [];
  window.direction = "NONE";
  window.setDirection = "NONE";
  window.endRecording = 1;
  window.playBackActive = 0;


  // list of apple spawns
  window.appleSpawnNum = -1;
  window.appleSpawnList = [];

  // pause mod
  window.pauseGame = 0;

}
window.replayPauseE.alterSnakeCode = function(code) {

  // c and d are the apple spawn x and y coords when an apples is eaten
  code = assertReplace(
    code,
    /return\s*new\s*_\.\s*Bl\s*\(\s*c\s*,\s*d\s*\)\s*;/,
    "{if(window.endRecording===0){window.appleSpawnList.push([c,d])}if(window.playBackActive===1){window.appleSpawnNum++;return new _.Bl(window.appleSpawnList[window.appleSpawnNum][0],window.appleSpawnList[window.appleSpawnNum][1]);}else{return new _.Bl(c,d);}}"
  );

  // this.hb is the game's "Date.now()" and is used to set the pace of the whole game
  // sets snake direction and gets snake direction
  code = assertReplace(
    code,
    /return b}tick\(\){/,
    "window.gameNow=a-window.gameStartTime;return b}tick(){if(!(window.setDirection===\"NONE\")){this.Aa.direction=window.setDirection;window.setDirection=\"NONE\";}if(!(this.Aa.direction===window.direction)){/*console.log(this.Aa.direction);*/window.direction=this.Aa.direction}"
  );

  // gets the start time of the game
  code = assertReplace(
    code,
    /if\s*\(\s*this\.Aa\.direction\s*!==\s*"NONE"\s*\|\|\s*CUD\s*\(\s*this\.Aa\s*\)\s*\)\s*for\s*\(\s*;\s*a\s*-\s*this\.hb\s*>=\s*this\.Bb\s*;\s*\)\s*this\.hb\s*\+=\s*this\.Bb\s*,\s*this\.ticks\+\+\s*,\s*this\.tick\s*\(\s*\)\s*,\s*b\s*=\s*!0\s*;\s*else\s*this\.hb\s*=\s*a\s*,\s*b\s*=\s*!0\s*;/,
    "if(this.Aa.direction!==\"NONE\"||CUD(this.Aa)){if((Math.abs(window.gameStartTime-a)>1000)&&this.ticks<1){window.gameStartTime=this.hb;}for(;a-this.hb>=this.Bb;)this.hb+=this.Bb,this.ticks++,this.tick(),b=!0;}else{this.hb=a,b=!0;}"
  );

  // pause mod
  code = assertReplace(
    code,
    /\(this\.Aa\.direction!=="NONE"\|\|CUD\(this\.Aa\)\)/,
    "((this.Aa.direction!==\"NONE\"||CUD(this.Aa))&&!window.pauseGame)"
  );

  return code;
}
window.replayPauseE.runCodeAfter = function() {

  // using the timer
  let time_element = document.querySelector("body > div.Czus3 > div > div.sEOCsb > div.A2vT0 > div.Jc72He.gmwAbc");
  function timeToSeconds(timeStr) {
      const [minutes, seconds, milliseconds] = timeStr.split(":").map(Number);
      return (minutes * 60) + seconds + (milliseconds / 1000);
  }

  window.startRecording= function(){
    window.endRecording = 0;
    window.gameInputs = [];
    window.appleSpawnNum = -1;
    window.appleSpawnList = [];
    let lastTickVal = 0;
    let a = setInterval(()=>{
      let currentTickVal = Math.floor((timeToSeconds(time_element.textContent))/.135);
      if(currentTickVal===lastTickVal+1){
        lastTickVal = currentTickVal;
        if(window.direction!="NONE"){
          window.gameInputs.push([directionMapper[window.direction]]);
        }
        if(window.endRecording === 1){
          clearInterval(a);
        }
      }
      if(currentTickVal>lastTickVal+1){
        console.error("replay mod skipped a tick");
      }
    },10);
  }

  let directionMapper = {
    "RIGHT":1,
    "UP":0,
    "DOWN":2,
    "LEFT":3
  }

  function keydownHandler(e){
    if(e.code === "Digit1"){
      console.log("recording started");
      startRecording();
    }
    if(e.code === "Digit2"){
      console.log("recording ended");
      window.endRecording = 1;
    }
    if(e.code === "Digit3"){
      console.log(window.gameInputs);
      console.log(appleSpawnNum);
      console.log(appleSpawnList);
    }

    // pause mod
    if(e.code === "Backquote"){
      window.pauseGame = !window.pauseGame;
      if(window.pauseGame){
        document.querySelector("body > div.Czus3 > div > div.wjOYOd").style.visibility = "visible";
        document.querySelector("body > div.Czus3 > div > div.wjOYOd").style.opacity = 1;
        document.querySelector("body > div.Czus3 > div > div.wjOYOd > div").style.visibility = "hidden";
      } else {
        setTimeout(()=>{if(!window.pauseGame){document.querySelector("body > div.Czus3 > div > div.wjOYOd > div").style.visibility = "visible";}},500);
        document.querySelector("body > div.Czus3 > div > div.wjOYOd").style.visibility = "hidden";
        document.querySelector("body > div.Czus3 > div > div.wjOYOd").style.opacity = 0;
      }
    }
    // pause mod ^^^^^^
  }

  document.addEventListener('keydown', keydownHandler);

}
