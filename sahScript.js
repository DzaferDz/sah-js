const ploca = document.getElementById('ploca');
let trenutniIgrac = 'bijeli'; 
let selektovanaFigura = null; 

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
    ploca.innerHTML = '';  
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
            }
            kvadrat.dataset.pozicija = `${i},${j}`;
            kvadrat.addEventListener('click', () => onKvadratClick(i, j));
            ploca.appendChild(kvadrat);
        }
    }
}

function onKvadratClick(i, j) {
    if (selektovanaFigura) {
        
        const figura = pocetnaPloca[selektovanaFigura[0]][selektovanaFigura[1]];

        
        if ((trenutniIgrac === 'bijeli' && figura === figura.toLowerCase()) ||
            (trenutniIgrac === 'crni' && figura === figura.toUpperCase())) {
            alert("Nije tvoj red!");
            return;
        }

        
        if (pocetnaPloca[i][j] !== '.' && pocetnaPloca[i][j] !== figura) {
            
            pocetnaPloca[selektovanaFigura[0]][selektovanaFigura[1]] = '.';
            pocetnaPloca[i][j] = figura;

            
            trenutniIgrac = trenutniIgrac === 'bijeli' ? 'crni' : 'bijeli';

            selektovanaFigura = null;
            kreirajPlocu();
        }
    } else {
        const figura = pocetnaPloca[i][j];

        if (figura === '.') {
            alert("Nema figure na ovom polju!");
            return;
        }

        if ((trenutniIgrac === 'bijeli' && figura === figura.toLowerCase()) ||
            (trenutniIgrac === 'crni' && figura === figura.toUpperCase())) {
            alert("To nije tvoja figura!");
            return;
        }


        selektovanaFigura = [i, j];
        alert(`Figura selektovana na poziciji ${i + 1}, ${j + 1}`);
    }
}

kreirajPlocu();
