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
placar.innerHTML = "Clicar em iniciar";
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

let arr = [[], [], [], [], [], []];

const whiteSpaceGame = (arr) => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      arr[i][j] = 0;
    }
  }
}
whiteSpaceGame(arr);

/* matriz de elementos */


/* colocando o bloco na columna */
let nome;
let block = "";

let condInicio = false;
let condClonar = true;

let jogadas = 0;

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
          placar.innerHTML = "Turno do Vermelho";
          block = "";
          player.id = "Vermelho";
        }
        if (nome === "Vermelho") {
          arr[j][i] = 2;
          placar.innerHTML = "Turno do Preto";
          block = "";
          player.id = "Preto";
        }
      }

      if (
        checkWinHorizontal(arr) ||
        checkWinVertical(arr) ||
        checkWinDiagonal1(arr) ||
        checkWinDiagonal2(arr)
      ) {
        whiteSpaceGame(arr);
        placar.innerHTML = `${nome} Ganhou.`;
        stop();
        condInicio = false;
        condClonar = '';
      } else {
        stop();
        start();
      }
      jogadas++;
      console.log(jogadas);
      /* verifica se ouve empate */
      if(jogadas === 42){
        placar.innerHTML = "Empate!";
        stop();
        condInicio = '';
        condClonar = '';
      }
      condClonar = !condClonar;
    } else {
      placar.innerText = 'Mudar de coluna';
    }
    console.log(arr)
  });
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
buttonReset.innerText = "Iniciar";
container2.appendChild(buttonReset);

/* Botão de reset */
buttonReset.addEventListener("click", function () {
  for (let i = 0; i <= 6; i++) {
    line = document.getElementById("line" + i);
    line.innerHTML = "";
  }
  buttonReset.innerText = 'Reset';

  placar.innerHTML = "Turno do Preto";
  condInicio = true;
  condClonar = true;
  jogadas = 0;
  whiteSpaceGame(arr);
  stop();
  start();
});