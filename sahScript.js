const ploca = document.getElementById('ploca');
let trenutniIgrac = 'bijeli';  
let selektovanaFigura = null;
let pocetnaPozicija = null;
const figure = {
    't': '♜', 's': '♞', 'l': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'T': '♖', 'S': '♘', 'L': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

const pocetnaPloca = [
    'tslqklst',
    'pppppppp',
    '........',
    '........',
    '........',
    '........',
    'PPPPPPPP',
    'TSLQKLST'
];

function kreirajPlocu() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const kvadrat = document.createElement('div');
            kvadrat.classList.add('kvadrat');
            kvadrat.classList.add((i + j) % 2 === 0 ? 'bijela' : 'crna');
            const figura = pocetnaPloca[i][j];
            if (figura !== '.') {
                kvadrat.textContent = figure[figura];
                if (figura === figura.toLowerCase()) {
                    kvadrat.classList.add('crna-figura');
                } else {
                    kvadrat.classList.add('bijela-figura');
                }
                kvadrat.setAttribute('draggable', true);
            }
            ploca.appendChild(kvadrat);
        }
    }
}
kreirajPlocu();
function odaberiFiguru(i,j){
    const figura = pocetnaPloca[i][j];
    if(figura==='.') return;
    
    if ((trenutniIgrac === 'bijeli' && figura === figura.toLowerCase()) ||
    (trenutniIgrac === 'crni' && figura === figura.toUpperCase())) {
    alert("Nije tvoj red!");
    return;}

    if (selektovanaFigura === null) {
        selektovanaFigura = figura;
        pocetnaPozicija = { i, j };
    } else {
        pomjeriFiguru(i, j);
    }
}
function pomjeriFiguru(novaRow, novaCol) {
    const figura = selektovanaFigura;
    const validanPotez = provjeriPotez(figura, pocetnaPozicija.row, pocetnaPozicija.col, novaRow, novaCol);

    if (validanPotez) {
        // Pomjeri figuru
        pocetnaPloca[pocetnaPozicija.row][pocetnaPozicija.col] = '.';
        pocetnaPloca[novaRow][novaCol] = figura;

        // Promijeni igrača
        trenutniIgrac = trenutniIgrac === 'bijeli' ? 'crni' : 'bijeli';
        selektovanaFigura = null;
        kreirajPlocu();  // Ponovo crta ploču
    } else {
        alert("Neispravan potez!");
        selektovanaFigura = null;
    }
}

function provjeriPotez(figura, staraRow, staraCol, novaRow, novaCol) {
    // Provjera validnih poteza za svaku figuru
    const razlikaRow = Math.abs(novaRow - staraRow);
    const razlikaCol = Math.abs(novaCol - staraCol);

    switch (figura.toLowerCase()) {
        case 'p':  // Pijun
            if (figura === 'P') {
                return novaRow < staraRow && razlikaRow === 1 && razlikaCol === 0;
            } else {
                return novaRow > staraRow && razlikaRow === 1 && razlikaCol === 0;
            }
        case 't':  // Top
            return novaRow === staraRow || novaCol === staraCol;
        case 'l':  // Lovac
            return razlikaRow === razlikaCol;
        case 'q':  // Kraljica
            return novaRow === staraRow || novaCol === staraCol || razlikaRow === razlikaCol;
        case 'k':  // Kralj
            return razlikaRow <= 1 && razlikaCol <= 1;
        case 's':  // Skakač
            return (razlikaRow === 2 && razlikaCol === 1) || (razlikaRow === 1 && razlikaCol === 2);
        default:
            return false;
    }
}

kreirajPlocu();
