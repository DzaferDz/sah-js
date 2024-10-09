const ploca = document.getElementById('ploca');
let trenutniIgrac = 'bijeli';  // Bijeli igrač počinje

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

// Kreiranje ploče
function kreirajPlocu() {
    ploca.innerHTML = '';  // Resetuje ploču
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
            }

            kvadrat.dataset.pozicija = `${i},${j}`;
            ploca.appendChild(kvadrat);
        }
    }
}

// Funkcija za pomjeranje figure na osnovu unosa
function unesiPotez() {
    let potez = prompt("Unesite potez (npr. e2-e4):");
    
    if (!potez || potez.length !== 5 || potez[2] !== '-') {
        alert("Neispravan unos! Koristite format 'e2-e4'.");
        return;
    }

    let startnoPolje = potez.slice(0, 2);
    let ciljanoPolje = potez.slice(3, 5);

    let [staraRow, staraCol] = pozicijaToKoordinate(startnoPolje);
    let [novaRow, novaCol] = pozicijaToKoordinate(ciljanoPolje);

    const figura = pocetnaPloca[staraRow][staraCol];

    if ((trenutniIgrac === 'bijeli' && figura === figura.toLowerCase()) ||
        (trenutniIgrac === 'crni' && figura === figura.toUpperCase())) {
        alert("Nije tvoj red!");
        return;
    }

    // Pomjeranje figure
    pocetnaPloca[staraRow][staraCol] = '.';
    pocetnaPloca[novaRow][novaCol] = figura;

    // Promjena igrača
    trenutniIgrac = trenutniIgrac === 'bijeli' ? 'crni' : 'bijeli';

    // Ponovno iscrtavanje ploče
    kreirajPlocu();
}

// Pretvaranje šahovske notacije u koordinate ploče (npr. "e2" => [6, 4])
function pozicijaToKoordinate(pozicija) {
    const kolona = pozicija[0].charCodeAt(0) - 'a'.charCodeAt(0);  // "a" je 0, "b" je 1, itd.
    const red = 8 - parseInt(pozicija[1], 10);  // Šahovski red (1-8) preokrećemo u (0-7)
    return [red, kolona];
}

// Kreiraj početnu ploču
kreirajPlocu();

// Traži potez od igrača
document.getElementById('ploca').addEventListener('click', unesiPotez);
