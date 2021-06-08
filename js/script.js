let main = document.getElementById('main');

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
placar.innerHTML = "<br>Clicar em iniciar";
container2.appendChild(placar);

let line = "";
let bloco = "";

constructTable();

function constructTable() {
  for (let i = 0; i <= 6; i++) {
    line = document.createElement("div");
    line.id = "line" + i;
    line.classList.add("line");
    box.appendChild(line);
  }
}

/* Criando o peça preta e vermelha */
let blocoP = document.createElement("div");
blocoP.id = "Preto";
container1.appendChild(blocoP);

let timer = document.createElement("div");
timer.id = "Timer";
container1.appendChild(timer);

let blocoV = document.createElement("div");
blocoV.id = "Vermelho";
container1.appendChild(blocoV);

let block = "";
let num = 0;
let arr = [[], [], [], [], [], []];
let condInicio = false;
let condClonar = true;

/* matriz de elementos */
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 7; j++) {
    arr[i][j] = 0;
  }
}

/* selecionando o bloco */
blocoP.addEventListener("click", function () {
  if(condInicio && condClonar){
    block = blocoP.cloneNode();
    num = 0;
    condClonar = !condClonar;
  }
});

blocoV.addEventListener("click", function () {
  if(condInicio && !condClonar){
    block = blocoV.cloneNode();
    num = 1;
    condClonar = !condClonar;
  }
});

/* colocando o bloco na columna */
  console.log(condClonar);
  for (let i = 0; i <= 6; i++) {
    let col = document.getElementById("line" + i);

    col.addEventListener("click", function () {
      /* verificando não ter mais de 6 peças na coluna */
      if (col.childElementCount < 6) {
        col.appendChild(block);
      } else {
        console.log("max");
      }

      /* atualizar o array de elementos da coluna */
      let i = Number(col.id[col.id.length - 1]);
      let nome;

      for (let j = 0; j < col.childElementCount; j++) {
        nome = col.children[j].id;

        if (nome === "Preto") {
          arr[j][i] = 1;
          placar.innerHTML = "<Br>Turno do Vermelho";
          block = "";
        }
        if (nome === "Vermelho") {
          arr[j][i] = 2;
          placar.innerHTML = "<Br>Turno do Preto";
          block = "";
        }
      }

      if (checkWinHorizontal(arr) || checkWinVertical(arr) || checkWinDiagonal1(arr) || checkWinDiagonal2(arr)) {
        placar.innerHTML = `<Br> ${nome} Ganhou.`;
        stop();
        condInicio = false;
      }else{
        stop();
        start();
      }
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
        if ( newArr[j] == newArr[j + 1] &&
             newArr[j] == newArr[j + 2] &&
             newArr[j] == newArr[j + 3]) {
          return true
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
        console.log([j])
      if (newArr[j] !== 0){
        if (newArr[j] > 0) {
            if (newArr[j] == arr[i + 1][j] &&
                newArr[j] == arr[i + 2][j] &&
                newArr[j] == arr[i + 3][j]
                ) {
              return true
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

function start() {
  sec = 11;
  lapse = setInterval(() => {
    time();
  }, interval);
}
function stop() {
  clearInterval(lapse);
}
function time() {
  sec--;
  if (sec === 0) {
    clearInterval(lapse);
    placar.innerHTML = "<Br>Acabou o tempo";
    condInicio = false;
  }
  timer.innerHTML = "Timer:<br>" + sec + " sec";
}

let buttonReset = document.createElement("button");
buttonReset.id = "buttonReset";
buttonReset.innerText = "Iniciar";
container2.appendChild(buttonReset);

/* Botão de reset */
buttonReset.addEventListener("click", function () {
  for (let i = 0; i < 6; i++) {
    line = document.getElementById("line" + i);
    line.innerHTML = "";
  }
  placar.innerHTML = "<Br>Turno do Preto";
  condInicio = true;
  stop();
  start();
});
