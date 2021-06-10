/* Dom e Funções para o Start button e Dev button*/ 
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function(){
    startScreen.classList.add("hidden")
})

let devClick = 0;
const devList = document.getElementById("devList");
const devButton = document.getElementById("developer__button");
devButton.addEventListener("click", function(){
    if(devClick === 0){
        devList.classList.remove("hidden");
        devClick = 1;   
    }
    else{
        devList.classList.add("hidden");
        devClick = 0;
    } 
})

/* Dom e Funções para a Seleção de Personagens*/
const selectScreen = document.getElementById("selectScreen");
const spider = document.getElementById("selectSpider");
spider.addEventListener("click", function(){
    selectScreen.classList.add("hidden")
})
const venom = document.getElementById("selectVenom");
venom.addEventListener("click", function(){
    selectScreen.classList.add("hidden")
})

let audio = document.getElementById('audio');
let main = document.getElementById("main");

let container1 = document.createElement("div");
container1.id = "container1";
main.appendChild(container1);

let box = document.createElement("div");
box.id = "box";
main.appendChild(box);

let container2 = document.createElement("div");
container2.id = "container2";
main.appendChild(container2);

let placar = document.createElement("div");
placar.id = "placar";
placar.innerHTML = "Clique em iniciar";
container2.appendChild(placar);

let line = "";

function constructTable() {
  for (let i = 0; i <= 6; i++) {
    line = document.createElement("div");
    line.id = "line" + i;
    line.classList.add("line");
    box.appendChild(line);
  }
}
constructTable();

/* Criando peça preta e o timer */
let player = document.createElement("div");
player.id = "Preto";
player.classList.add("player");
container1.appendChild(player);

let timer = document.createElement("div");
timer.id = "Timer";
container1.appendChild(timer);

/* matriz de elementos */
let arr = [[], [], [], [], [], []];

const whiteSpaceGame = (arr) => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      arr[i][j] = 0;
    }
  }
}
whiteSpaceGame(arr);

/* colocando o bloco na columna */
  let nome;
  let block = "";
  
  let condInicio = false;
  let condClonar = true;
  
  let jogadas = 0;

const game = () => {
  
  for (let i = 0; i <= 6; i++) {
    let col = document.getElementById("line" + i);
  
    col.addEventListener("click", function () {
      /* verificando não ter mais de 6 peças na coluna */
      if (col.childElementCount < 6) {
        /* colocando a peça preta */
        if (condInicio && condClonar) {
          block = document.createElement("div");
          block.id = "Preto";
          block.classList.add("player");
          col.appendChild(block);
        }
        /* colocando a peça vermelha */
        if (condInicio && !condClonar) {
          block = document.createElement("div");
          block.id = "Vermelho";
          block.classList.add("player");
          col.appendChild(block);
        }
  
        /* atualizar o array de elementos da coluna */
        let i = Number(col.id[col.id.length - 1]);
            
        for (let j = 0; j < col.childElementCount; j++) {
          nome = col.children[j].id;
  
          if (nome === "Preto") {
            arr[j][i] = 1;
            placar.innerHTML = "Player 2";
            block = "";
            player.id = "Vermelho";
          }
          if (nome === "Vermelho") {
            arr[j][i] = 2;
            placar.innerHTML = "Player 1";
            block = "";
            player.id = "Preto";
          }
        }

        jogadas++;
        
        if (
          checkWinHorizontal(arr) ||
          checkWinVertical(arr) ||
          checkWinDiagonal1(arr) ||
          checkWinDiagonal2(arr)
        ) {
  
          win();
          audio.pause();
          audio.currentTime = 0;

        } else {
  
          stop();
          start();
        }
        
        /* verifica se ouve empate */
        if(jogadas === 42){
          draw();
        }
        condClonar = !condClonar;
      } else {
        placar.innerText = 'Mudar de coluna';
      }
    });
  }
}
game();

const win = () => {
  stop();
  condInicio = '';
  condClonar = '';
  player.id = 'Preto';
  jogadas = 0;
}

const draw = () => {
  stop();
  condInicio = '';
  condClonar = '';
  player.id = 'Preto';
  jogadas = 0;
}

function checkWinDiagonal1(arr) {
  for (let i = 0; i < arr.length - 3; i++) {
    for (let j = 0; j < arr[i].length - 3; j++) {
      let count = 1;

      if (arr[i][j] > 0) {
        for (let t = 1; t < 4; t++) {
          if (arr[i][j] === arr[i + t][j + t]) {
            count++;
          }
        }
        if (count === 4) {
          return true;
        }
      }
    }
  }
}

function checkWinDiagonal2(arr) {
  for (let i = 3; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length - 3; j++) {
      let count = 1;

      if (arr[i][j] > 0) {
        for (let t = 1; t < 4; t++) {
          if (arr[i][j] === arr[i - t][j + t]) {
            count++;
          }
        }

        if (count == 4) {
          return true;
        }
      }
    }
  }
}

/* Criando condição de vitória vertical */
const checkWinHorizontal = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    newArr = arr[i];
    for (let j = 0; j < newArr.length - 3; j++) {
      if (newArr[j] > 0) {
        if (
          newArr[j] == newArr[j + 1] &&
          newArr[j] == newArr[j + 2] &&
          newArr[j] == newArr[j + 3]
        ) {
          return true;
        }
      }
    }
  }
};

/* Criando condição de vitória horizontal */
const checkWinVertical = (arr) => {
  for (let i = 0; i < arr.length - 3; i++) {
    newArr = arr[i];
    for (let j = 0; j < newArr.length; j++) {
      if (newArr[j] !== 0) {
        if (newArr[j] > 0) {
          if (
            newArr[j] == arr[i + 1][j] &&
            newArr[j] == arr[i + 2][j] &&
            newArr[j] == arr[i + 3][j]
          ) {
            return true;
          }
        }
      }
    }
  }
};

/* Contador de tempo */
let sec = 10;
let interval = 1000; // millisegundos
let lapse;
timer.innerHTML = "Timer:<br>" + sec + " sec";

function time() {
  sec--;
  if (sec === 0) {
    clearInterval(lapse);
    placar.innerHTML = "Acabou o tempo";
    condInicio = false;
  }
  timer.innerHTML = "Timer:<br>" + sec + " sec";
}

function start() {
  sec = 11;
  lapse = setInterval(() => {
    time();
  }, interval);
}

function stop() {
  clearInterval(lapse);
}

let buttonReset = document.createElement("button");
buttonReset.id = "buttonReset";
buttonReset.innerText = "Reset";
container2.appendChild(buttonReset);

/* Botão de reset */
const reset = () => {
  for (let i = 0; i <= 6; i++) {
    line = document.getElementById("line" + i);
    line.innerHTML = "";
  }
  audio.play();
  placar.innerHTML = "Player 1";
  player.id = 'Preto';
  condInicio = true;
  condClonar = true;
  jogadas = 0;
  whiteSpaceGame(arr);
  stop();
  start();
}
buttonReset.addEventListener("click", reset);