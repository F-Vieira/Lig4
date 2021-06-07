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
        linha();
        coluna();
        diagonal1();
        diagonal2();
    });
}

let buttonReset = document.createElement('button');

buttonReset.id = 'buttonReset';

buttonReset.innerText = 'Reset';

container2.appendChild(buttonReset);

let placar = document.createElement('div');

placar.id = 'placar';

placar.innerText = 'Placar:';

container2.appendChild(placar);