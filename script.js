const tamanho = 10;

const robo = {
    x: 0,
    y: 0,
    direcao: 'direita',
    carregando: false
};

let comandos = [];
let bolas = [
    { x: 3, y: 2 },
    { x: 7, y: 5 }
];
const direcoes = ['cima', 'direita', 'baixo', 'esquerda'];


const grid = document.getElementById('grid');

function renderizarTabuleiro() {
    grid.innerHTML = '';
    for (let y = 0; y < tamanho; y++) {
        for (let x = 0; x < tamanho; x++) {
            const celula = document.createElement('div');
            celula.classList.add('celula');
            grid.appendChild(celula);
        }
    }
}

function renderizarBolas() {

    const bolasHTML = document.querySelectorAll('.bola');

    bolas.forEach((bola, index) => {

        const el = bolasHTML[index];

        el.style.left = `${bola.x * 52}px`;
        el.style.top = `${bola.y * 52}px`;
    });
}

const roboEl = document.getElementById('robo');
function atualizarRoboNaTela() {

    roboEl.style.left = `${robo.x * 52}px`;
    roboEl.style.top = `${robo.y * 52}px`;

    const angulos = {
        cima: 0,
        direita: 90,
        baixo: 180,
        esquerda: 270
    };

    roboEl.style.transform =
        `rotate(${angulos[robo.direcao]}deg)`;
}

function adicionarComando(tipo) {
    comandos.push(tipo);
    atualizarListaDeComandos();
}

function atualizarListaDeComandos() {
    const lista = document.getElementById('lista-comandos');
    lista.innerHTML = '';
    comandos.forEach((cmd, index) => {
        const item = document.createElement('div');
        item.textContent = `${index + 1}. ${cmd}`;
        lista.appendChild(item);
    });
}

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executarComandos() {
    for (const comando of comandos) {
        executarComando(comando);
        renderizarCena();
        await esperar(350);
    }
}

function executarComando(comando) {
    if (comando === 'frente') {
        if (robo.direcao === 'direita' && robo.x < 9) robo.x++;
        if (robo.direcao === 'esquerda' && robo.x > 0) robo.x--;
        if (robo.direcao === 'cima' && robo.y > 0) robo.y--;
        if (robo.direcao === 'baixo' && robo.y < 9) robo.y++;
    }
    if (comando === 'virar-direita') {
        virarDireita();
    }
    if(comando === 'virar-esquerda'){
        virarEsquerda();
    }
    if (comando === 'pegar') {
        pegarBolinha();
    }
}

function virarDireita() {
    let indice = direcoes.indexOf(robo.direcao);
    indice++;
    if (indice > 3) indice = 0;
    robo.direcao = direcoes[indice];
}

function virarEsquerda() {
    let indice = direcoes.indexOf(robo.direcao);
    indice--;
    if (indice < 0) indice = 3;
    robo.direcao = direcoes[indice];
}

function pegarBolinha() {
    const indice = bolas.findIndex(b => b.x === robo.x && b.y === robo.y);
    if (indice !== -1 && !robo.carregando) {
        bolas.splice(indice, 1);
        robo.carregando = true;
    }
}

