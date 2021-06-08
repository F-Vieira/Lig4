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
placar.innerText = "Placar:";
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
blocoP.classList.add('player');
container1.appendChild(blocoP);

let timer = document.createElement("div");
timer.id = "Timer";
container1.appendChild(timer);

let blocoV = document.createElement("div");
blocoV.id = "Vermelho";
blocoV.classList.add('player');
container1.appendChild(blocoV);

let block = "";
let num = 0;
let arr = [[], [], [], [], [], [], []];

/* matriz de elementos */
for (let i = 0; i <= 6; i++) {
  for (let j = 0; j < 6; j++) {
    arr[i][j] = 0;
  }
}

/* selecionando o bloco */
blocoP.addEventListener("click", function () {
  block = blocoP.cloneNode();
  num = 0;
});

blocoV.addEventListener("click", function () {
  block = blocoV.cloneNode();
  num = 1;
});

/* colocando o bloco na columna */
for (let i = 0; i <= 6; i++) {
  let col = document.getElementById("line" + i);

  col.addEventListener("click", function () {
    /* verificando não ter mais de 6 peças na coluna */
    if (block !== "" && col.childElementCount < 6) {
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
        arr[i][j] = 1;
        placar.innerHTML = "Turno do Vermelho";
        block = "";
      }
      if (nome === "Vermelho") {
        arr[i][j] = 2;
        placar.innerHTML = "Turno do Preto";
        block = "";
      }
    }

    if (checkWinDiagonal1(arr) || checkWinDiagonal2(arr)) {
      placar.innerHTML = `${nome} Ganhou.`;
      stop();
    } else {
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
const checkWinVertical = (arr) => {
  let countPreto = 1;
  let countVermelho = 1;
  let newArr;

  for (let i = 0; i < arr.length; i++) {
    newArr = arr[i];

    for (let j = 0; j < newArr.length - 1; j++) {
      if (newArr[j] > 0) {
        if ((newArr[j] == newArr[j + 1]) == 1) {
          countPreto++;
        } else {
          countPreto = 1;
        }

        if ((newArr[j] == newArr[j + 1]) == 2) {
          countVermelho++;
        } else {
          countVermelho = 1;
        }

        if (countPreto == 4) {
          return true;
        }
        if (countVermelho == 4) {
          return true;
        }
      }
    }
  }
};

/* Criando condição de vitória horizontal */
const checkWinHorizontal = (arr) => {
  let countPreto = 1;
  let countVermelho = 1;
  let newArr;

  for (let i = 0; i < arr.length - 1; i++) {
    newArr = arr[i];

    for (let j = 0; j < newArr.length; j++) {
      if (newArr[j] > 0) {
        if ((newArr[j] == arr[i + 1][j]) == 1) {
          countPreto++;
        } else {
          countPreto = 1;
        }

        if ((newArr[j] == arr[i + 1][j]) == 2) {
          countVermelho++;
        } else {
          countVermelho = 1;
        }

        if (countPreto == 4) {
          return true;
        }

        if (countVermelho == 4) {
          return true;
        }
      }
    }
  }
};



/* Contador de tempo */
let sec = 10;
let interval = 1000; // millisegundos
let lapse;
timer.innerHTML = "Timer: " + sec + " sec";

function start() {
  sec = 11;
  lapse = setInterval(() => {
    time();
  }, interval);
  console.log(sec);
}
function stop() {
  clearInterval(lapse);
}
function time() {
  sec--;
  if (sec === 0) {
    clearInterval(lapse);
    placar.innerHTML = "Acabou o tempo";
  }
  timer.innerHTML = "Timer: " + sec + " sec";
}

let buttonReset = document.createElement("button");
buttonReset.id = "buttonReset";
buttonReset.innerText = "Reset";
container2.appendChild(buttonReset);

/* Botão de reset */
buttonReset.addEventListener("click", function () {
  for (let i = 0; i <= 6; i++) {
    line = document.getElementById("line" + i);
    line.innerHTML = "";
  }
  stop();
  start();
});
