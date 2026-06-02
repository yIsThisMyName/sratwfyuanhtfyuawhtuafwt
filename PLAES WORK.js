window.templateMod = {}
window.templateMod.runCodeBefore = function(){

}
window.templateMod.alterSnakeCode = function(code){
  return code
}
window.templateMod.runCodeAfter = function(){
    function timeToSeconds(timeStr) {
        const [minutes, seconds, milliseconds] = timeStr.split(":").map(Number);
        return (minutes * 60) + seconds + (milliseconds / 1000);
    }
    var goalApples = prompt("how many apples u want uwu");
    var goalTime = prompt("how many time u want owo");
    var timea = timeToSeconds(document.querySelector('[jsName="yddQF"]').textContent);
    var movea = 0.135;
    var speeda = speed.style.left;

    setInterval(()=>{
        //normal
        movea = 0.135
        timea = timeToSeconds(document.querySelector('[jsName="yddQF"]').textContent)
        speeda = speed.style.left
        //fast
        if(speeda == '91.5px') {
            movea *= 0.66
        //slow
        } else if(speeda == '51.5px') {
            movea *= 1.33
        }

        totalTime = timea + movea * (goalApples - document.querySelector('[jsName="A0kWCf"]').textContent)

        if(totalTime > goalTime){
            const keydownEvent = new KeyboardEvent('keydown', {
                    keyCode: 27
            });
            document.dispatchEvent(keydownEvent);
        }
    },20);
}