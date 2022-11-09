let nombreCoup;
/* déclaration de la variable nombreCoup qui limitera le nombre de coup à 9, et servira à definir si c'est aux
croix ou aux ronds de jouer */
let emplacement; // déclaration de la variable emplacement qui deviendra un objet contenant tous les coups joués.
let gagnant;  /* déclaration de la variable gagnant qui stockera le type de gagnant,
si cette variable est toujours undefined à 9 coups, alors il n'y aura pas de gagnant.
*/
let table = document.getElementById("center");
// Déclaration et assocation de l'objet table avec la balise html ayant id center, il s'agit de la table
let cells = table.getElementsByTagName("td");
// Récuperation dans un tableau de tous les éléments ayant une balise td dans l'objet table.

function checkWin() {
    /* fonction qui verifie toutes les possibilités de victoire, pour cela il faut qu'une ligne verticale ou horizontale
    ou diagonale soit remplie avec le même élément croix ou rond, peu importe.*/
    if (verifEgalite(emplacement["Zonea1"], emplacement["Zonea2"], emplacement["Zonea3"]) || verifEgalite(emplacement["Zoneb1"], emplacement["Zoneb2"], emplacement["Zoneb3"]) || verifEgalite(emplacement["Zonec1"], emplacement["Zonec2"], emplacement["Zonec3"]) || verifEgalite(emplacement["Zonea1"], emplacement["Zoneb1"], emplacement["Zonec1"]) || verifEgalite(emplacement["Zonea2"], emplacement["Zoneb2"], emplacement["Zonec2"]) || verifEgalite(emplacement["Zonea3"], emplacement["Zoneb3"], emplacement["Zonec3"]) || verifEgalite(emplacement["Zonea1"], emplacement["Zoneb2"], emplacement["Zonec3"]) || verifEgalite(emplacement["Zonea3"], emplacement["Zoneb2"], emplacement["Zonec1"])) {
        /* Si une condition de ligne a été vérifiée, alors il y a un gagnant (défini par la fonction verifEgalité)
on peut afficher qui a gagné.
        */
        if (gagnant === 'croix') {
            document.getElementById("titre").textContent = "Les croix ont gagné";
        } else {
            document.getElementById("titre").textContent = "Les ronds ont gagné";
        }
        // Affichage du bouton rejouer car la partie est finie
        document.getElementById("rejouer").style.display = "initial";
        // désactivation des événements sur les zones qui n'ont pas encore été cliquées après la fin de partie pour éviter des choses bizarres.
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.pointerEvents = 'none';
        }
    }
}
// fonction qui evalue si les trois paramètres d'entrés ont la même valeur et que cette valeur est bien différente de vide
function verifEgalite(zone1, zone2, zone3) {
    if (zone1 === zone2 && zone1 === zone3 && zone1 !== 'vide') {
        // si la condition est vérifiée, alors il y a un gagnant qui correspond à l'un des éléments testés ci-dessus.
        gagnant = zone1;
        // cette fonction retourne true si un gagnant est détecté, sinon false
        return true;
    } else {
        return false;
    }
}
// Evenement qui se lance lorsque tous les éléments de la page sont chargés.
window.addEventListener('load', (event) => {
    // appel de la fonction initialisation
    initialisation();
});
// fonction initialisation qui peut être appelée au chargement de la page ou en cliquant sur rejouer
function initialisation() {
    // on masque le bouton rejouer
    document.getElementById("rejouer").style.display = "none";
    // on cahnge le texte du titre
    document.getElementById("titre").textContent = "Super Morpion";
    // le nombre de coup est mis ou remis à O
    nombreCoup = 0;
    // On met ou remet le gagnant à undefined
    gagnant = undefined;
    /* toutes le propriétés de l'objets prennent comme valeur "vide"
    Les propriétés enregistrent ce qui a été joué dans les cellules,
    donc cela sera soit rond soit croix. */
    emplacement = {
        Zonea1: "vide",
        Zonea2: "vide",
        Zonea3: "vide",
        Zoneb1: "vide",
        Zoneb2: "vide",
        Zoneb3: "vide",
        Zonec1: "vide",
        Zonec2: "vide",
        Zonec3: "vide"
    };
    // boucle dans le tableau des objets cellules
    for (let i = 0; i < cells.length; i++) {
        // identification d'une cellule avec son index de tableau
        let cell = cells[i];
        // le fond de la cellule est aligné à gauche, donc devient blanc
        cell.style.backgroundPosition = "left";
        // on active ou ré-active la possibilité de cliquer sur la cellule, la fonction onClick sur la balise est maintenant disponible.
        cell.style.pointerEvents = 'auto';
    }

}
// fonction jouer qui s'appelle par le onClick sur les balises <td>, le paramètre est l'identifiant de la zone
function jouer(zone) {
    // en utilisant le modulo, on arrive a déterminer si c'est un coup pour les rond ou pour les croix
    // nombre impaire, c'est les croix qui jouent
    // nombre pair, c'est les ronds qui jouent
    if (nombreCoup % 2 === 1) {
        // mouvement de l'image de fond pour indiquer visuellement ce qui a été joué dans la cellule
        document.getElementById(zone).style.backgroundPosition = "center";
        // ecriture dan l'objet emplacement un utilisant la paramètre passé dans la fonction
        // IMPORTANT IMPORTANT IMPORTANT accès à la propriété d'un objet avec une variable !!
        emplacement[zone] = "croix"; // emplacement ["Zone"] = "rond"      emplacement.Zonea1 = "rond"
    } else {
        document.getElementById(zone).style.backgroundPosition = "right";
        emplacement[zone] = "rond";
    }
// désactivation de la possibilité de cliquer sur la cellule
    document.getElementById(zone).style.pointerEvents = 'none';
    // incrementation de nombre de coup
    nombreCoup++;
    // appel de la fonction checkWin
    checkWin();
// vérification que la partie n'est pas finie sans gagnant
    if (nombreCoup == 9 && typeof gagnant == "undefined") {
        document.getElementById("titre").textContent = "Pas de gagnant";
        document.getElementById("rejouer").style.display = "initial";
    }
}
