let body = document.body;
let container1 = document.createElement('div')
container1.id = 'container1';
body.appendChild(container1);
let box = document.createElement('div')
box.id = 'box';
body.appendChild(box);
let container2 = document.createElement('div')
container2.id = 'container2';
body.appendChild(container2);
let line = '';
let bloco = '';
constructTable();
function constructTable(){
    for(let i = 0; i<=6; i++){
        line = document.createElement('div');
        line.id = 'line'+i;
        line.classList.add('line');
        box.appendChild(line);
    }
}
/* Criando o peça preta e vermelha */
let blocoP = document.createElement("div");
blocoP.id = "Preto";
container1.appendChild(blocoP);
let blocoV = document.createElement("div");
blocoV.id = "Vermelho";
container1.appendChild(blocoV);
let block = '';
let num = 0;
let arr = [[],[],[],[],[],[],[]];
/* matriz de elementos */
for(let i = 0; i <= 6; i++){
    for(let j = 0; j < 6; j++){
        arr[i][j] = 0;
    }
}
/* selecionando o bloco */
blocoP.addEventListener('click', function(){
    block = blocoP.cloneNode();
    num = 0;
});
blocoV.addEventListener('click', function(){
    block = blocoV.cloneNode();
    num = 1;
});
/* colocando o bloco na columna */ 
for(let i = 0; i <= 6 ;i++){
    let col = document.getElementById('line' + i);
    col.addEventListener('click', function(){
        /* verificando não ter mais de 6 peças na coluna */
        if(block != '' && (col.childElementCount < 6)){
            col.appendChild(block);
        }else {
            console.log('max')
        }
        /* atualizar o array de elementos da coluna */
        let i = Number(col.id[col.id.length - 1]);
        for(let j = 0; j < col.childElementCount; j++){ 
            let nome = col.children[j].id;
            console.log(nome);
            if(nome === "Preto"){                
                arr[i][j] = 1;
            }
            if(nome === "Vermelho"){                
                arr[i][j] = 2;
            }
        }
        console.log(arr);
        // linha(arr);
        verificarVertical();
        // diagonal1();
        // diagonal2();
    });
}

function verificarVertical(){
    let countPreto = 1;
    let countVermelho = 1;
    let newArr;

    for(let i = 0; i < arr.length; i++){
            newArr = arr[i];
        for(let j = 0; j < newArr.length-1; j++){
            if(newArr[j] > 0){
                if(newArr[j] === newArr[j + 1] == 1){
                    countPreto++;
                } 
                if (newArr[j] == newArr[j + 1] == 2){
                    countVermelho++;
                }
                if(countPreto == 4){
                    alert("vc venceu")
                    return true;
                } 
                if (countVermelho == 4){
                    return true;
                }
            }
        }
    }
}

const linha = (arr) => {
    let cont1 = 1;
    let cont2 = 1;
    for(let i = 0; i < arr.length-1; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j] > 0){
                if(arr[i][j] == arr[i+1][j] == 1){
                    cont1++;
                } else if (arr[i][j] == arr[i+1][j] == 2){
                    cont2++;
                }
                if(cont1 == 4){
                    console.log ('player1 win');
                    return true
                } else if (cont2 == 4){
                    return 'player2 win';
                }
            }
        }
    }
}



let buttonReset = document.createElement('button');

buttonReset.id = 'buttonReset';

buttonReset.innerText = 'Reset';

container2.appendChild(buttonReset);

let placar = document.createElement('div');

placar.id = 'placar';

placar.innerText = 'Placar:';

container2.appendChild(placar);