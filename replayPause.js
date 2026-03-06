window.replayPause = {};
window.replayPause.runCodeBefore = function() {
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

  
  // list of wall spawns
  window.wallSpawnNum = -1;
  window.wallSpawnList = [];


  // pause mod
  window.pauseGame = 0;

}
window.replayPause.alterSnakeCode = function(code) {

  // c and d are the apple spawn x and y coords when an apples is eaten
  code = assertReplace(
    code,
    /return\s*new\s*_\.\s*Bl\s*\(\s*c\s*,\s*d\s*\)\s*;/,
    "{if(window.endRecording===0){window.appleSpawnList.push([c,d])}if(window.playBackActive===1){window.appleSpawnNum++;return new _.Bl(window.appleSpawnList[window.appleSpawnNum][0],window.appleSpawnList[window.appleSpawnNum][1]);}else{return new _.Bl(c,d);}}"
  );

  // oh.x and oh.y are the wall spawn coords (u can edit them)
  code = assertReplace(
    code,
    /rVD\(this\.Da,this\.qc\(null,5\)\);/,
    "rVD(this.Da,this.qc(null,5));if(oh){if(window.endRecording===0){window.wallSpawnList.push([oh.x,oh.y])}if(window.playBackActive){window.wallSpawnNum++;oh.x=window.wallSpawnList[window.wallSpawnNum][0];oh.y=window.wallSpawnList[window.wallSpawnNum][1];}}"
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
window.replayPause.runCodeAfter = function() {
  
  // Key simulating functions
  function simulateKeyPress(keyCode) {
      // Create keydown event
      const keydownEvent = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          keyCode: keyCode,
          which: keyCode,
          key: getKeyFromCode(keyCode),
          code: getCodeFromKeyCode(keyCode)
      });

      // Create keyup event
      const keyupEvent = new KeyboardEvent('keyup', {
          bubbles: true,
          cancelable: true,
          keyCode: keyCode,
          which: keyCode,
          key: getKeyFromCode(keyCode),
          code: getCodeFromKeyCode(keyCode)
      });

      // Dispatch events to the document
      document.dispatchEvent(keydownEvent);
      document.dispatchEvent(keyupEvent);
  }

  // Helper function to get key name from key code
  function getKeyFromCode(keyCode) {
      switch(keyCode) {
          case 37: return 'ArrowLeft';
          case 38: return 'ArrowUp';
          case 39: return 'ArrowRight';
          case 40: return 'ArrowDown';
          case 32: return ' ';
          case 27: return 'Escape';
          default: return '';
      }
  }

  // Helper function to get code from key code
  function getCodeFromKeyCode(keyCode) {
      switch(keyCode) {
          case 37: return 'ArrowLeft';
          case 38: return 'ArrowUp';
          case 39: return 'ArrowRight';
          case 40: return 'ArrowDown';
          case 32: return ' ';
          case 27: return 'Escape';
          default: return '';
      }
  }

  // Key codes for arrow keys
  const KEYS = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SPACE: 32,
      ESC: 27
  };
  // key simulating functions ^^^^^^^^^

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
    window.wallSpawnNum = -1;
    window.wallSpawnList = [];
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

  window.playBack = function(){
    window.playBackActive = 1;
    window.appleSpawnNum = -1;
    window.wallSpawnNum = -1;
    let lastTick = 0;
    let i = 0;
    setTimeout(()=>{
      doMovement(window.gameInputs[0]);
    }, 100)
    let abc = setInterval(()=>{
      if(window.gameInputs.length === i){
        clearInterval(abc);
        window.playBackActive = 0;
        console.log("playback ended");
      }
      if(Math.ceil((timeToSeconds(time_element.textContent))/.135)>lastTick){
        lastTick = Math.ceil((timeToSeconds(time_element.textContent))/.135)
        doMovement(window.gameInputs[i]);
        i++;
      }
    },135);
  }

  function doMovement(a){
    if(a == 0){
      simulateKeyPress(KEYS.UP);
    }
    if(a == 1){
      simulateKeyPress(KEYS.RIGHT);
    }
    if(a == 2){
      simulateKeyPress(KEYS.DOWN);
    }
    if(a == 3){
      simulateKeyPress(KEYS.LEFT);
    }
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
      console.log("playback started");
      playBack();
    }

    // pause mod
    if(e.code === "KeyQ"){
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