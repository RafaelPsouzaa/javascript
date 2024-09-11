const eye = [... document.getElementsByClassName("eye")];
let posx_mouse = 0;
let posy_mouse = 0;

window.addEventListener("mousemove",(evt)=>{
     posx_mouse = evt.clientX;
     posy_mouse = evt.clientY;
     const rot = Math.atan2(posy_mouse,posx_mouse)*180/Math.PI
     eye.forEach(elem => {
          elem.style.transform ="rotate("+rot+"deg)"
     });
    
})

