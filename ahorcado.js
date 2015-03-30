//de aun array ed palabras aleatorias
var palabra = "";
var hombre, l, espacio, aciertos;
//Declaracion de clases
var Fondo = function(con){
	this.contexto = con;
	this.paisaje();
	//this.poste();
}
//Declaracion de la clase ahorcado con poste y fx(trazar)
var Ahorcado = function(con){
	//para dibujar canvas es necesario el contexto 2D
	//this es las variables locales de la clase, accesibles en toda la clase
	//this.contexto es el context de dibujo del canvas, que llega por parametro
	//desde la variable con
	this.contexto = con;					//variable exclusiva del this
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;
	this.dibujar();
}
//dibuja fondo y poste
Fondo.prototype.paisaje = function(){
	var dibujalo = this.contexto;
	var paisajeFondo = new Image();
	paisajeFondo.src = "fondo.png";
	paisajeFondo.onload = function(){
		dibujalo.drawImage(paisajeFondo,0,0,500,400);
	}
}
//dibuja poste y avance del cuerpo con carga de imagen
Ahorcado.prototype.dibujar = function(i){
	//solo una variable local para nombrar x atributos
	var dibujalo = this.contexto;
	var cuerpo = new Image();
	if(this.intentos > 0){
		cuerpo.src = i;
		cuerpo.onload = function(){
			dibujalo.drawImage(cuerpo,200,250,26,90);
		}
		if(this.intentos > 1){
			cuerpo.src = i;
			cuerpo.onload = function(){
				dibujalo.drawImage(cuerpo,210,330,20,20);
			}
			if(this.intentos > 2){
				document.getElementById("btnInicio").disabled = false;
				cuerpo.src = i;
				cuerpo.onload = function(){
					dibujalo.drawImage(cuerpo,208,252,20,80);
				}
				if(this.intentos > 3){
					cuerpo.src = i;
					cuerpo.onload = function(){
						dibujalo.drawImage(cuerpo,208,160,60,90);
					}
					if(this.intentos > 4){
						cuerpo.src = i;
						cuerpo.onload = function(){
							dibujalo.drawImage(cuerpo,203,243,26,90);
						}
					}
				}
			}
		}
	}
}
//dibuja el cuerpo
Ahorcado.prototype.trazar = function(){
	//agregue un intento nuevo y vuelva a trazar
	this.intentos++;
	if(this.intentos >= this.maximo){
		this.vivo = false;
		//alert("auch!!!");
	}
	this.dibujar(this.intentos+".png");
}
function iniciar(){
	aciertos = 0;
	//trae el canvas del html (getElementById es el metodo de la funcion JS document)
	l = document.getElementById("letra");
	var b = document.getElementById("boton");
	var bI = document.getElementById("btnInicio");
	var canvas = document.getElementById("c");

	bI.disabled = true;
	//crea el ancho alto del canvas
	canvas.width = 500;
	canvas.height = 400;
	//ahora puedo dibujar (traer el contexto)
	var contexto = canvas.getContext("2d");	//esta solo vive dentro de la funcion (3D=webgl)
	//la var conetxto se la pasa el parametro al constructor
	juego = new Fondo(contexto);
	hombre = new Ahorcado(contexto);	//constructir de la variable ahorcado



	var dict = ["joaca","marijo", "anavaleria","rodrigo","alvaro",
	"daniela","terumi","isabela","marina","luis","gala","cama","regis",
	"gaby","enrique","beto","yas","glo","santi","frida","dani","trabadulce",
	"bea","villano","montse","karendel","stefhani","corin","carmen",
	"pablo","cami","grillo","gimi","hector","quebarbara","oscar","sofi",
	"sebastian","josejuan","mari"];

	var indice = 0;
	var min = 0;
	var max = dict.length - 1;

	indice = Math.floor(Math.random()*(max-min)+min);

	palabra = dict[indice];


	//mayusculas del string
	palabra = palabra.toUpperCase();
	//longitud de la palabra
	//alert(palabra.length);
	//array para recorrer el string []
	//alert(palabra[6]);
	//declaro array con n espacio acorde a la long de la palabra
	espacio = new Array(palabra.length);
	//funcion al click del boton
	b.addEventListener("click", agregarLetra);
	bI.addEventListener("click", reinicia);
	//espacio[0] = "t";
	//espacio[3] = "a";
	mostrarPista(espacio);
}
function reinicia(){
	iniciar();
}
function agregarLetra(){
	var letra = l.value;
	l.value = ""	//borra caja de texto
	//usar focus para regresar
	//hombre.trazar();
	mostrarPalabra(palabra, hombre, letra);
}
function mostrarPalabra(palabra, ahorcado, letra){
	var encontrado = false;
	var p;
	var largo = palabra.length;
	letra = letra.toUpperCase();
	//var pista = document.getElementById("pista");
	var texto = "";
	for(p in palabra){
		if(letra == palabra[p]){
			espacio[p]=letra;
			encontrado=true;
			aciertos += 1;
		}
	}
	mostrarPista(espacio);
	if(!encontrado){
		ahorcado.trazar();
	}
	if(!ahorcado.vivo){
		//mostrar la palabra al morir
		for(var i=0; i < largo; i++){
			texto = texto + palabra[i] + " ";
		}
		pista.innerText = texto;
	}
}
function mostrarPista(espacio){
	var pista = document.getElementById("pista");
	var texto = "";
	var largo = espacio.length;
	for(var i=0; i < largo; i++){
		if(espacio[i] != undefined){
			texto = texto + espacio[i] + " ";
		}else{
			texto += "_ ";
		}
		pista.innerText = texto;
	}
	if((palabra.length == aciertos) && aciertos > 0){
		alert("Iuff, Me salvaste");
		iniciar();
	}else{
		document.getElementById("letra").focus();	
	}
}