let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function arco(a,b,c,d,e,cor){
    ctx.beginPath();
    ctx.stokeWidth = "5px";
    ctx.lineStyle = cor;
    ctx.fillStyle = cor;
    ctx.arc(a,b,c,Math.PI*d,Math.PI*e);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
class Circulo {
    x = 200;
    y = 200;
    raio = 50;
    c = 0;
    f = 2;
    cor = "red";
    vy = 0;
    e = 0.9;
    a = 1;
    valor = -2;

    constructor(x,y,raio,c,f,cor){
        this.x = x;
        this.y = y;
        this.raio = raio;
        this.c = c;
        this.f = f;
        this.cor = cor;
    };

    desenha() {
        arco(this.x,this.y,this.raio,this.c,this.f,this.cor)
    };
    gravidade(){
        this.y += this.vy;
        let j = 800-this.raio;
        if(this.y > j){
            this.y = j - (this.y - j);
            this.vy *= (-this.e);
            // console.log(this.y)
        }
        this.vy += this.a;
    };
    anda(){
        if(this.x > 350){
            this.valor *= (-1);
            this.x = 350;
        } else if(this.x < 50){
            this.valor *= (-1);
            this.x = 50;
        }
        this.x += this.valor;
    };
};
let lista = [];
for(let i = 0; i < 20; i++){
    lista.push(new Circulo(100+10*i,30*i,20,0,2,"red"))
}
let a = new Circulo(50,500,50,0,2,"blue");
function animacao(){
    ctx.clearRect(0,0,400,800);
    for(let i = 0; i < 20; i++) {
        lista[i].desenha();
        lista[i].gravidade();
    }
    a.desenha();
    a.anda();
    requestAnimationFrame(animacao);
}
animacao();

// CANVAS 2

let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");

function quadrado(a,b,c,d,cor){
    ctx2.beginPath();
    ctx2.fillStyle = cor;
    ctx2.fillRect(a,b,c,d);
    ctx2.closePath();
}

function texto(tamanho,texto,a,b){
    ctx2.beginPath();
    ctx2.fillStyle = "black";
    ctx2.font = tamanho + " Arial";
    ctx2.fillText(texto,a,b);
    ctx2.fill();
    ctx2.closePath();
}

function inicio(){
    quadrado(0,0,400,600,"gray");
    texto("90px","Carros",67.5,150)
    quadrado(100,300,200,50,"lightgray");
    texto("50px","Iniciar",130,340)
}

function final(){
    quadrado(0,0,400,600,"gray");
    texto("50px","Você perdeu",50,150)
    quadrado(75,300,250,50,"lightgray");
    texto("40px","Recomeçar",100,340)
}

class Carro {
    x = 0;
    y = 0;
    a = 0;
    l = 0;
    cor = "red";
    constructor(x,y,a,l,cor) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.l = l;
        this.cor = cor;
    }
    desenha() {
        quadrado(this.x,this.y,this.a,this.l,this.cor);
    }
    andar() {
        this.y += 5;
    }
}
let jogador = new Carro(180,400,40,60,"gray");
let lista2 = [];
for(let i = 0; i < 10; i++){
   lista2.push(new Carro(Math.floor(Math.random()*360), Math.floor(Math.random()*(-2000)), 40, 60, "blue"));
    
}
let perdemo = 0;
function animacao2(){
    ctx2.clearRect(0,0,400,600);
    if(perdemo == 0){
        inicio();
    }
    if(perdemo == 1){
        if(jogador.x < 0){
            jogador.x = 0;
        }
        if(jogador.x > 360){
            jogador.x = 360;
        }
        if(jogador.y < 0){
            jogador.y = 0;
        }
        if(jogador.y > 540){
            jogador.y = 540;
        }
        for(let i = 0; i < lista2.length; i++){
            lista2[i].desenha();
            lista2[i].andar();
            if(jogador.x + 40 > lista2[i].x && jogador.x < lista2[i].x && jogador.y < lista2[i].y + 60 && jogador.y + 60 > lista2[i].y){
                perdemo = 2;
            }

            if(jogador.x < lista2[i].x + 40 && jogador.x > lista2[i].x && jogador.y < lista2[i].y + 60 && jogador.y + 60 > lista2[i].y){
                perdemo = 2;
        
            }
            if(lista2[i].y > 600){
                lista2.splice(i,1);
                i--;
                lista2.push(new Carro(Math.floor(Math.random()*360), Math.floor(Math.random()*(-2000)), 40, 60, "red"));
            }
        }
        jogador.desenha();
    }
    if(perdemo == 2){
        final();
    }
    requestAnimationFrame(animacao2);
}
animacao2();
document.addEventListener("keypress",function(evento){
    tecla = evento.key;
    if(tecla == "w"){
        jogador.y -= 10;
    }
    if(tecla == "s"){
        jogador.y += 10;
    }
    if(tecla == "a"){
        jogador.x -= 10;
    }
    if(tecla == "d"){
        jogador.x += 10;
    }
});

document.addEventListener("click",function(evento){
    rect = canvas2.getBoundingClientRect();
    let posx = evento.clientX - rect.left;
    let posy = evento.clientY - rect.top;
    if(posx > 100 && posx < 300 && posy > 300 && posy < 350 && perdemo == 0){
        perdemo = 1;
        console.log("S")
    }
    if(posx > 75 && posx < 325 && posy > 300 && posy < 350 && perdemo == 2){
        perdemo = 1;
        jogador.x = 180;
        jogador.y = 400;
        for(let i = 0; i < lista2.length; i++){
            lista2[i].y = Math.floor(Math.random()*(-2000));
        }
        console.log("S")
    }
});