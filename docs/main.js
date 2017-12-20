window.onload = function(){
      
  ctx = document.getElementById('canvas').getContext('2d');

  clearScreen();

};


function clearScreen() {
  ctx.fillStyle = 'rgba(17, 17, 17, 1)';
  ctx.fillRect(0,0,600,600);
}

function doStuff() {
  var file = document.querySelector("#file").files[0];
  var reader = new FileReader();

  if (!file) return;

  reader.onload = function(ev) {
    debugger;
    alert(ev.target.result);
  }
  reader.readAsText(file);
}