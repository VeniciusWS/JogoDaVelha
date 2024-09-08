var turno = 'X';
var tabuleiro = [
    null, null, null,
    null, null, null,
    null, null, null
];
var jogadas = 0;
var ganhador = 0;

function play(col, row) {
    if (jogadas === 9 || ganhador !== 0) {
        alert('Reinicie o jogo');
        return;
    }

    if (tabuleiro[col + row * 3]) {
        alert('Jogada inválida');
        return;
    }
    tabuleiro[col + row * 3] = turno;
    jogadas++;

    var cell = document.getElementById('c' + col + row);
    cell.innerHTML = turno;

    ganhador = verificaFimDeJogo(col, row);

    var msg = document.getElementById('mensagem');
    if (ganhador >= 1) {
        msg.innerHTML = 'Jogador <b>' + turno + '</b> ganhou!';
        msg.style.color = 'blue';
        destaqueGanhador(ganhador, col, row);
        return;
    } else if (ganhador === -1) {
        msg.innerHTML = 'Empatou';
        msg.style.color = 'red';
        return;
    }
    turno = turno === 'X' ? 'O' : 'X';
    msg.innerHTML = 'Jogador ' + turno;
}

function reset() {
    jogadas = 0;
    tabuleiro = [null, null, null, null, null, null, null, null, null];
    turno = 'X';
    ganhador = 0;
    var msg = document.getElementById('mensagem');
    msg.innerHTML = 'Jogador ' + turno;
    msg.style.color = 'black';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            var cell = document.getElementById('c' + col + row);
            cell.innerHTML = '';
            cell.style.color = 'black';
        }
    }
}

function verificaFimDeJogo(col, row) {
    // Verifica coluna
    if ((tabuleiro[col] === turno) && (tabuleiro[col + 3] === turno) && (tabuleiro[col + 6] === turno)) {
        return 1;
    }
    // Verifica linha
    if ((tabuleiro[row * 3] === turno) && (tabuleiro[1 + row * 3] === turno) && (tabuleiro[2 + row * 3] === turno)) {
        return 2;
    }
    // Verifica diagonais
    if ((tabuleiro[0] === turno) && (tabuleiro[4] === turno) && (tabuleiro[8] === turno)) {
        return 3;
    }
    if ((tabuleiro[2] === turno) && (tabuleiro[4] === turno) && (tabuleiro[6] === turno)) {
        return 4;
    }
    if (jogadas === 9) {
        return -1;
    }
    return 0;
}

function destaqueGanhador(ganhador, col, row) {
    if (ganhador === 1) {
        for (let row = 0; row < 3; row++) {
            var cell = document.getElementById('c' + col + row);
            cell.style.color = 'blue';
        }
    } else if (ganhador === 2) {
        for (let col = 0; col < 3; col++) {
            var cell = document.getElementById('c' + col + row);
            cell.style.color = 'blue';
        }
    } else if (ganhador === 3) {
        for (let i = 0; i < 3; i++) {
            var cell = document.getElementById('c' + i + i);
            cell.style.color = 'blue';
        }
    } else if (ganhador === 4) {
        for (let i = 0; i < 3; i++) {
            var cell = document.getElementById('c' + i + (2 - i));
            cell.style.color = 'blue';
        }
    }
}
