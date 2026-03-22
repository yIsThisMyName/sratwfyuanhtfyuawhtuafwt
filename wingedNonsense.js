window.wingedNonsense = {};
window.wingedNonsense.runCodeBefore = function() {
  
}
window.wingedNonsense.alterSnakeCode = function(code) {
  // messes with the direction of winged apples
  /*code = assertReplace(
    code,
    /for\s*\(\s*const\s+a\s+of\s+this\.oa\s*\)\s*a\.Oo\s*\|\|\s*\(\s*a\.yL\s*=\s*\(\s*a\.yL\s*\+\s*1\s*\)\s*%\s*6\s*,\s*O6\s*\(\s*this\.settings\s*\)\s*&&\s*\(\s*a\.pL\.x\s*&&\s*\(\s*a\.pos\.x\s*\+=\s*a\.we\.x\s*\)\s*,\s*a\.pL\.y\s*&&\s*\(\s*a\.pos\.y\s*\+=\s*a\.we\.y\s*\)\s*,\s*P6\s*\(\s*this\.settings\s*,\s*4\s*\)\s*&&\s*\(\s*a\.pos\.x\s*<\s*0\s*\?\s*a\.pos\.x\s*\+=\s*this\.Aa\.Aa\.width\s*:\s*a\.pos\.x\s*>=\s*this\.Aa\.Aa\.width\s*&&\s*\(\s*a\.pos\.x\s*-\=\s*this\.Aa\.Aa\.width\s*\)\s*,\s*a\.pos\.y\s*<\s*0\s*\?\s*a\.pos\.y\s*\+=\s*this\.Aa\.Aa\.height\s*:\s*a\.pos\.y\s*>=\s*this\.Aa\.Aa\.height\s*&&\s*\(\s*a\.pos\.y\s*-\=\s*this\.Aa\.Aa\.height\s*\)\s*\)\s*\)\s*\)/,
    "for (const a of this.oa){if(!(a.we.x%1==0))a.we.x*=2;if(!(a.we.y%1==0))a.we.y*=2;a.Oo || (a.yL = (a.yL + 1) % 6,O6(this.settings) && (a.pL.x && (a.pos.x += a.we.x),a.pL.y && (a.pos.y += a.we.y),P6(this.settings, 4) && (a.pos.x < 0 ? a.pos.x += this.Aa.Aa.width : a.pos.x >= this.Aa.Aa.width && (a.pos.x -= this.Aa.Aa.width),a.pos.y < 0 ? a.pos.y += this.Aa.Aa.height : a.pos.y >= this.Aa.Aa.height && (a.pos.y -= this.Aa.Aa.height))));}",
  );*/

  // messes with magnet attraction direction
  code = assertReplace(
    code,
    /<\s*kd\.x\s*\?\s*\.5\s*:\s*-\.5\s*;/,
    "<kd.x?-.5:.5;"
  );
  code = assertReplace(
    code,
    /<\s*kd\.y\s*\?\s*\.5\s*:\s*-\.5\s*;/,
    "<kd.y?-.5:.5;"
  );

// magnet speed increase
/*  code = assertReplace(
    code,
    /<\s*kd\.x\s*\?\s*\.5\s*:\s*-\.5\s*;/,
    "<kd.x?1:-1;"
  );
  code = assertReplace(
    code,
    /<\s*kd\.y\s*\?\s*\.5\s*:\s*-\.5\s*;/,
    "<kd.y?1:-1;"
  );
*/
// magnet repel mod
/*
  code = assertReplace(
    code,
    /<\s*kd\.x\s*\?\s*\.5\s*:\s*-\.5\s*;/,
    "<kd.x?-.5:.5;"
  );
  code = assertReplace(
    code,
    /<\s*kd\.y\s*\?\s*\.5\s*:\s*-\.5\s*;/,
    "<kd.y?-.5:.5;"
  );*/
  // for random direction changes every 10 ticks
  /*if(!Object.hasOwn(a, \"wingedTimer\"))a.wingedTimer=0;a.wingedTimer++;if(a.wingedTimer%10==0){a.we.x=((Math.floor(Math.random()*3)-1)/2);a.we.y=((Math.floor(Math.random()*3)-1)/2);console.log(a.we.y);}*/
  // random speed changes every tick
  /*a.we.x+=(Math.floor(Math.random()*3)-1)/10;a.we.y+=(Math.floor(Math.random()*3)-1)/10;*/
  // double the speed
  /*if(!(a.we.x%1==0))a.we.x*=2;if(!(a.we.y%1==0))a.we.y*=2;*/

  return code;
}
window.wingedNonsense.runCodeAfter = function() {
  
}