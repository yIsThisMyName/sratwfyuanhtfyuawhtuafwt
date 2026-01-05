window.snakeabakeTas = {};
window.snakeabakeTas.runCodeBefore = function() {
  // for logging the game's time
  window.gameNow = 0;
  window.gameStartTime = 0;
  const gameInputsInit = [
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    3,
    2,
    2,
    3,
    3,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    1,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    3
  ]
  window.gameInputs = gameInputsInit;
  window.direction = "NONE";
  window.setDirection = "NONE";
  window.endRecording = 1;
  window.playBackActive = 0;


  // list of apple spawns
  window.appleSpawnNum = -1;
  const appleSpawnListInit = [
    [0,0],
    [0,2],
    [0,3],
    [0,4],
    [0,5],
    [0,6],
    [0,8],
    [1,1],
    [1,2],
    [1,3],
    [1,4],
    [1,5],
    [1,6],
    [1,7],
    [2,0],
    [2,1],
    [2,2],
    [2,3],
    [3,0],
    [3,1],
    [3,2],
    [3,3],
    [4,7],
    [7,8],
    [6,2],
    [8,5],
    [9,6],
    [3,5],
    [6,1],
    [4,6],
    [7,0],
    [5,6]
  ];
  window.appleSpawnList = appleSpawnListInit;

  // list of wall spawns
  window.wallSpawnNum = -1;
  const wallSpawnListInit = [
    [8,7],
    [8,1],
    [5,4],
    [5,1],
    [8,4]
  ];
  window.wallSpawnList = wallSpawnListInit;

  // current score element
  window.currentScore = document.querySelector("body > div.Czus3 > div > div.sEOCsb > div.MNu4v > div:nth-child(2)");

  // pause mod
  window.pauseGame = 0;

}
window.snakeabakeTas.alterSnakeCode = function(code) {

  // c and d are the apple spawn x and y coords when an apples is eaten
  code = assertReplace(
    code,
    /return\s*new\s*_\.\s*Bl\s*\(\s*c\s*,\s*d\s*\)\s*;/,
    "{if(window.endRecording===0){window.appleSpawnList.push([c,d])}if(window.playBackActive===1){window.appleSpawnNum++;return new _.Bl(window.appleSpawnList[window.appleSpawnNum][0],window.appleSpawnList[window.appleSpawnNum][1]);}else{return new _.Bl(c,d);}}"
  );

  // c is the list of not allowed apple spawns
  code = assertReplace(
    code,
    /2\s*\)\s*&&\s*!f\s*&&\s*e\s*;/,
    '2)&&!f&&e;if(window.currentScore.textContent<52){c.push(new _.Bl(0,1));c.push(new _.Bl(1,0));c.push(new _.Bl(0,7));c.push(new _.Bl(1,8));}'
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
window.snakeabakeTas.runCodeAfter = function() {
  
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
  const gameInputsInit = [
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    3,
    2,
    2,
    3,
    3,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    1,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    3
  ];
  const appleSpawnListInit = [
    [0,0],
    [0,2],
    [0,3],
    [0,4],
    [0,5],
    [0,6],
    [0,8],
    [1,1],
    [1,2],
    [1,3],
    [1,4],
    [1,5],
    [1,6],
    [1,7],
    [2,0],
    [2,1],
    [2,2],
    [2,3],
    [3,0],
    [3,1],
    [3,2],
    [3,3],
    [4,7],
    [7,8],
    [6,2],
    [8,5],
    [9,6],
    [3,5],
    [6,1],
    [4,6],
    [7,0],
    [5,6]
  ];
  const wallSpawnListInit = [
    [8,7],
    [8,1],
    [5,4],
    [5,1],
    [8,4]
  ];

  // using the timer
  let time_element = document.querySelector("body > div.Czus3 > div > div.sEOCsb > div.A2vT0 > div.Jc72He.gmwAbc");
  function timeToSeconds(timeStr) {
      const [minutes, seconds, milliseconds] = timeStr.split(":").map(Number);
      return (minutes * 60) + seconds + (milliseconds / 1000);
  }

  window.startRecording= function(){
    window.endRecording = 0;
    window.gameInputs = [...gameInputsInit];
    window.appleSpawnNum = -1;
    window.appleSpawnList = [...appleSpawnListInit];
    window.wallSpawnNum = -1;
    window.wallSpawnList = [...wallSpawnListInit];

    let lastTickVal = Math.floor((timeToSeconds(time_element.textContent))/.135);
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
    let i = 0;
    setTimeout(()=>{
      doMovement(window.gameInputs[0]);
    }, 100)
    let abc = setInterval(()=>{
      if(window.gameInputs.length === i){
        clearInterval(abc);
        window.playBackActive = 0;
        console.log("playback ended");
        if(window.gameInputs.length===gameInputsInit.length){
          console.log('recording started');
          window.startRecording();
        }
      }
      doMovement(window.gameInputs[i]);
      i++;
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
      /*console.log("recording started");
      startRecording();*/
      console.log("recording disabled");
    }
    if(e.code === "Digit2"){
      
      console.log("recording ended");
      window.endRecording = 1;
      
      //console.log("recording disabled");
    }
    if(e.code === "Digit5"){
      console.log("recording ended");
      window.endRecording = 1;
      console.log("playback started");
      playBack();
    }
    if(e.code === "Digit4"){
      console.log(window.gameInputs);
      console.log(appleSpawnNum);
      console.log(appleSpawnList);
    }
    if(e.code === "Digit3"){
      console.log("recording ended");
      window.endRecording = 1;
      console.log("playback started");
      playBack();
      window.gameInputs = [...gameInputsInit];
      window.appleSpawnNum = -1;
      window.appleSpawnList = [...appleSpawnListInit];
      window.wallSpawnNum = -1;
      window.wallSpawnList = [...wallSpawnListInit];
    }

    // pause mod
    if(e.code === "KeyK"){
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