window.isakfanMod = {};
window.isakfanMod.runCodeBefore = function() {


  window.isakSpeedy = 135




  window.stopPlayback = 0;
  window.gameNow = 0;
  window.gameStartTime = 0;
  window.gameInputs = [
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        2
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        0
    ],
    [
        0
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        2
    ],
    [
        2
    ],
    [
        2
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        2
    ],
    [
        2
    ],
    [
        2
    ],
    [
        2
    ],
    [
        2
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        2
    ],
    [
        2
    ],
    [
        2
    ],
    [
        2
    ],
    [
        2
    ],
    [
        2
    ],
    [
        2
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        3
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        0
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ],
    [
        1
    ]
];
  window.direction = "NONE";
  window.setDirection = "NONE";
  window.endRecording = 1;
  window.playBackActive = 0;
  window.ticks = 0;
}
window.isakfanMod.alterSnakeCode = function(code) {

  // change speed to be speedier
  code = code.replaceAll('.66',`${1/window.isakSpeedy}`);

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
    `if(this.Aa.direction!=="NONE"||CUD(this.Aa)){if((Math.abs(window.gameStartTime-a)>1000)&&this.ticks<1){window.gameStartTime=this.hb;}for(;a-this.hb>=this.Bb;){this.hb+=this.Bb,this.ticks++,this.tick(),b=!0;window.ticks=this.ticks;if(window.stopPlayback==0&&window.playBackActive==1){window.doMovement(window.gameInputs[this.ticks]);}
    if(window.direction!="NONE"&&window.endRecording==0){
          window.gameInputs.push([directionMapper[window.direction]]);
        }
  }}else{this.hb=a,b=!0;}`
  );

  // pause mod
  code = assertReplace(
    code,
    /\(this\.Aa\.direction!=="NONE"\|\|CUD\(this\.Aa\)\)/,
    "((this.Aa.direction!==\"NONE\"||CUD(this.Aa))&&!window.pauseGame)"
  );

  return code;
}
window.isakfanMod.runCodeAfter = function() {
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

  let timestamp_count = document.querySelector("body > div.Czus3 > div > div.sEOCsb > div.A2vT0 > div.Jc72He.rc48Qb > div.DiITId");
  let timestamp_element = document.querySelector('[jsname="lulO0b"]');
  let timestamps = [];
  function timeToSeconds(timeStr) {
      const [minutes, seconds, milliseconds] = timeStr.split(":").map(Number);
      return (minutes * 60) + seconds + (milliseconds / 1000);
  }
  function getCurrentTime() {
      const now = new Date();
      const hours = ((now.getHours().toString().padStart(2, "0")+11) % 12)+1;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
  }

  window.stopPlayback = 0;

  window.startRecording= function(){
    window.endRecording = 0;
    window.gameInputs = [];
    let lastTickVal = 0;
    let a = setInterval(()=>{
      let currentTickVal = Math.floor((timeToSeconds(time_element.textContent))/.135);
      if(currentTickVal===lastTickVal+1){
        lastTickVal = currentTickVal;
        // if(window.direction!="NONE"){
        //   window.gameInputs.push([directionMapper[window.direction]]);
        // }
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
    window.playBackActive = 0;
    let abc = ()=>{
      if(playBackActive == 1){
      if(window.gameInputs.length<=window.ticks || timestamp_count.textContent == "ALL" /*this is here to check to see if the game has gotten all so that it can reset*/){
        if(timestamp_count.textContent == "ALL"){
          let timestamp = timeToSeconds(timestamp_element.textContent);
          console.log([timestamp, Math.round(timestamp/(.135/isakSpeedy))]);
          timestamps.push([timestamp, Math.round(timestamp/(.135/isakSpeedy))]);
          timestamps.push(getCurrentTime());
        }else{
          console.log("DNF");
          timestamps.push("DNF");
          timestamps.push(getCurrentTime());
        }
        if(timestamps.length>100000){
            const blob = new Blob(
                [JSON.stringify(timestamps, null, 2)],
                { type: "application/json" }
            );
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "magnetSimTimesPacket.json";
            a.click();

            URL.revokeObjectURL(a.href);
            timestamps = [];
        }
        // code to make it loop over and over
        if(stopPlayback==1){
          window.playBackActive = 0;
          console.log("playback ended");
        }else{

          const keydownEvent = new KeyboardEvent('keydown', {
            keyCode: 27
          });
          document.dispatchEvent(keydownEvent);
          document.querySelector('[jsname="NSjDf"]').click();
          window.ticks = 0;
          doMovement(window.gameInputs[0]);
        }

        /*
        clearInterval(abc);
        window.playBackActive = 0;
        console.log("playback ended");
        */
      }
    }
      requestAnimationFrame(abc);
    }
    requestAnimationFrame(abc);
  }

  window.doMovement = function(a){
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

  window.directionMapper = {
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
      stopPlayback = 0;
      playBackActive = 1;
      doMovement(window.gameInputs[0]);
    }
    if(e.code === "Digit4"){
      console.log("playback force halted");
      stopPlayback = 1;
    }
    if(e.code === "Digit5"){
      console.log(timestamps);
    }
    if(e.code === "Digit6"){
      console.log(window.gameInputs);
    }
  }

  document.addEventListener('keydown', keydownHandler);

  (() => {
      document.getElementById("__imageOverlayCanvas")?.remove();

      const overlay = document.createElement("canvas");
      overlay.id = "__imageOverlayCanvas";

      Object.assign(overlay.style, {
          position: "fixed",
          left: "0",
          top: "0",
          width: "100vw",
          height: "100vh",
          zIndex: "2147483647",
          pointerEvents: "none",
          display: "block"
      });

      document.body.appendChild(overlay);

      const ctx = overlay.getContext("2d");
      let visible = true;

      function resize() {
          overlay.width = window.innerWidth;
          overlay.height = window.innerHeight;
          draw();
      }

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "https://codehs.com/uploads/55261975c211d8c5d0fcc7b20adee8d8";

      function draw() {
          if (!img.complete) return;

          ctx.clearRect(0, 0, overlay.width, overlay.height);

          ctx.globalAlpha = 0.5; // 50% opacity

          const scale = Math.min(
              overlay.width / img.width,
              overlay.height / img.height
          );

          const w = img.width * scale;
          const h = img.height * scale;

          ctx.drawImage(
              img,
              (overlay.width - w) / 2,
              (overlay.height - h) / 2,
              w,
              h
          );

          ctx.globalAlpha = 1;
      }

      img.onload = draw;
      window.addEventListener("resize", resize);

      // Press C to toggle visibility
      document.addEventListener("keydown", e => {
          if (
              e.key.toLowerCase() === "c" &&
              !e.ctrlKey &&
              !e.altKey &&
              !e.metaKey
          ) {
              visible = !visible;
              overlay.style.display = visible ? "block" : "none";
          }
      });

      resize();
  })();
  setTimeout(playBack,5000);
}