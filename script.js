document.addEventListener('DOMContentLoaded',function(){
    pares()
    listeners()
    
});

// variables xd
const par = [];
const impar = [];
const cartas = new Array(24);
/*let cartas = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12]*/
let c =0, c2=0;
let carta = document.querySelector('.cuadrado')
let player = 1, turno, turnoC =0,imageSrc, imageSrc2, endRound = false, cua2, scoreOne =0, scoreTwo =0;

// variables de divs y elementos 
let celda= document.querySelector('.tablero');
let puntos1 = document.querySelector('.points-one')
let puntos2 = document.querySelector('.points-two')
let audioGame = new Audio('audio/game.mp3');
let mensajeWin=document.querySelector('.mensaje-win')        
let opacidad=document.querySelector('.opacidad')
let mensaje=document.querySelector('.mensaje')

// funcion aleatorio xd 
function aleatorio(min, max){
return Math.floor(Math.random()*(max - min +1) + min)
}

// los listeners 
function listeners(){ 
  
celda.addEventListener('click',casilla);
}

// para crear las cartas 
function pares(){
    while (par.length < 12) {
          let parAleatorio, parAleatorio2;
          do {
              parAleatorio = aleatorio(1,12);      
          }while (par.includes(parAleatorio));
             par.push(parAleatorio);
          do{
              parAleatorio2 = aleatorio(1,12);
          }while(impar.includes(parAleatorio2)){
             impar.push(parAleatorio2)
          }
        }
// en estos for hacemos un unico array que contenga los dos artays de pares 
    for(i=0;i < 24;i+=2){
        cartas[i]= par[c];
        c++;
    } for(i=1;i < 25;i+=2){
        cartas[i] = impar[c2];
        c2++;
    }
   
}

// aqui detectamos en que cuadro se dio el click y llamamos a imagen para mostrar la carta
function casilla(clickedEvent){
  const cuadra = clickedEvent.target;
  const styles = window.getComputedStyle(cuadra);
  const noBackground= styles.backgroundImage === 'url("http://localhost:8080/img/xd.png")';

  if(cuadra.classList.contains('cuadrado') && noBackground){    
      const clickIndex = Array.from(cuadra.parentNode.children).indexOf(cuadra); 
    if(turnoC < 2){
  let audio = new Audio('audio/tap.mp3');
  audio.play();
  audioGame.loop = true;
  audioGame.play()
        turnoC++;
        imagen(cartas[clickIndex],cuadra,clickIndex)
        
        
    }
  }
}

// aqui dependiendo de la posición del cuadro pone una imagen 
function imagen(n,cua,cI){

    const mapping = {
        1: ["1"],
        2: ["2"],
        3: ["3"],
        4: ["4"],
        5: ["5"],
        6: ["6"],
        7: ["7"],
        8: ["8"],
        9: ["9"],
        10: ["10"],
        11: ["11"],
        12: ["12"]
    };
    const [valor] = mapping[n];
// aqui verificamos en que turno vamos y guardamos las rutas de las imagenes en dos variables 
    if(turnoC == 1){
        imageSrc = `img/${valor}.jpg`;
        cua2= cua;
        cua.style.backgroundImage = `url(${imageSrc})`;
    } else{
       imageSrc2 = `img/${valor}.jpg`;
       cua.style.backgroundImage = `url(${imageSrc2})`;
       turnoC = 0;
       endRound = true;
    }
// aqui verificamos si las imagenes son iguales :3
    if(endRound){
      if(imageSrc == imageSrc2){
          aumentarPunto()
          let audio = new Audio('audio/point.mp3');
          audio.play();
          endRound = false;
//si todos los cuadrados ya tienen imagen
        if(todosConImagen()){
 audioGame.pause()

 if(scoreOne > scoreTwo){
     mensajeWin.style.color = 'orange';
     mensaje.innerHTML = 'Trampa';
     mensaje.classList.add('rotate');
 } else if(scoreTwo > scoreOne){
     mensajeWin.style.color = 'green'
 }else{
     mensajeWin.style.color = 'white'
     mensaje.innerHTML = "Empate";
 }
// aqui presentamos el mensaje ganador 
     mensajeWin.style.display = 'block'
     mensaje.style.display = 'block'
     opacidad.style.display = 'block'
     showElement(opacidad);
     let audio = new Audio('audio/win.mp3');
     audio.play();
// aqui reiniciamos todo el juego 
     setTimeout(() => {
       hideElement(opacidad);
       document.body.style.backgroundColor = 'orange';
       player = 1;
       turnoC = 0;
       scoreOne = 0;
       scoreTwo = 0;
       c =0;
       c2 =0;
       par.splice(0,11);
       impar.splice(0,11);
       cartas.splice(0,23);
       puntos1.innerHTML = "0";
       puntos2.innerHTML = "0";
       const cuadrados = document.querySelectorAll('.cuadrado');
for (const cuadrado of cuadrados) {
    cuadrado.style.backgroundImage = 'url(img/xd.png)';
}
       pares()
       
            }, 4500);
          }
          
      } else{
         
         celda.removeEventListener('click',casilla)
         setTimeout(() => {
        cua.style.backgroundImage = 'url(img/xd.png)';
       cua2.style.backgroundImage = 'url(img/xd.png)';
            celda.addEventListener('click',casilla)
            alternarPlayer()
          }, 1500);
          
          imageSrc = 0;
          imageSrc2 = 0;
          endRound = false;
      }
    }    
}

// alternar players 
function alternarPlayer(){
    if(player == 1){
        player = 2;
       document.body.style.backgroundColor = 'green';
    } else{
        player = 1;
       document.body.style.backgroundColor = 'orange';
    }
}

//aumetar puntos :3 
function aumentarPunto(){
    if(player == 1){
        scoreOne++;
        puntos1.innerHTML = `${scoreOne}`;
    } else{
        scoreTwo++;
        puntos2.innerHTML = `${scoreTwo}`;
    }
}

// verificar si todos los cuadrados ya estan con imagenes
function todosConImagen() {
  const cuadrados = document.querySelectorAll('.cuadrado');
  for (const cuadrado of cuadrados) {
   const styles = window.getComputedStyle(cuadrado);
    if (styles.backgroundImage === 'url("http://localhost:8080/img/xd.png")') {
      return false;
    }
  }
  return true;
}

// Función para mostrar el elemento con animación
function showElement(element) {
  element.classList.remove('hidden', 'hide');
  element.classList.add('show');
}

// Función para ocultar el elemento con animación
function hideElement(element) {
  element.classList.remove('show');
  element.classList.add('hide');

//Espera a que termine la animación para ocultar completamente el elemento
  element.addEventListener('animationend', function handleAnimationEnd() {
    opacidad.style.display = 'none'
    element.classList.remove('hide');
    element.removeEventListener('animationend', handleAnimationEnd);
    mensaje.innerHTML = "Ganaste";
    mensaje.classList.remove('rotate')
  });
}