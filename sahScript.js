const ploca = document.getElementById('ploca');
let trenutniIgrac = 'bijeli';  // Bijeli igrač počinje
let selektovanaFigura = null;
let pocetnaPozicija = null;

const figure = {
    't': '♜', 's': '♞', 'l': '♝', 'q': '♛', 'k': '♚', 'p': '♟',  // Crne figure
    'T': '♖', 'S': '♘', 'L': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'   // Bijele figure
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
    ploca.innerHTML = '';  
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const kvadrat = document.createElement('div');
            kvadrat.classList.add('kvadrat');
            kvadrat.classList.add((i + j) % 2 === 0 ? 'bijela' : 'crna');

            const figura = pocetnaPloca[i][j];
            if (figura !== '.') {
                kvadrat.textContent = figure[figura];

                // Dodaj klasu za crne ili bijele figure
                if (figura === figura.toLowerCase()) {
                    kvadrat.classList.add('crna-figura');
                } else {
                    kvadrat.classList.add('bijela-figura');
                }


                kvadrat.setAttribute('draggable', true);
                kvadrat.addEventListener('dragstart', (e) => zapocniPovlacenje(e, i, j));
            }


            kvadrat.addEventListener('dragover', dozvoliPad);
            kvadrat.addEventListener('drop', (e) => zavrsiPovlacenje(e, i, j));

            kvadrat.dataset.pozicija = `${i},${j}`;
            ploca.appendChild(kvadrat);
        }
    }
}


function zapocniPovlacenje(event, i, j) {
    selektovanaFigura = pocetnaPloca[i][j];
    pocetnaPozicija = { i, j };
    event.dataTransfer.setData('text', `${i},${j}`);
}


function dozvoliPad(event) {
    event.preventDefault();
}

function zavrsiPovlacenje(event, i2, j2) {
    event.preventDefault();

    if (!selektovanaFigura) return;

    pocetnaPloca[pocetnaPozicija.i][pocetnaPozicija.j] = '.';
    pocetnaPloca[i2][j2] = selektovanaFigura;

 
    selektovanaFigura = null;
    trenutniIgrac = trenutniIgrac === 'bijeli' ? 'crni' : 'bijeli';


    kreirajPlocu();
}

kreirajPlocu();
