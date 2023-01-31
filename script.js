let symboleJoueurActuel;
let Element;
let partieFinie = false;

const miseAJourMessageJoueur = () => {
  const ModifDiv = document.getElementById("tour-joueur");
  ModifDiv.innerText = `C’est au tour de ${symboleJoueurActuel}`;
};

const init = () => {
  const TourJoueur = document.createElement("div");
  TourJoueur.setAttribute("id", "tour-joueur");
  //   console.log("TourJoeur", TourJoueur);
  document.body.appendChild(TourJoueur);
  const aleatoire = Math.floor(Math.random() * 2) + 1;
  // console.log(aleatoire);
  if (aleatoire === 1) {
    symboleJoueurActuel = "X";
  } else {
    symboleJoueurActuel = "O";
  }
  // console.log(symboleJoueurActuel);

  for (let x = 0; x <= 2; x++) {
    //console.log("i", i);
    for (let y = 0; y <= 2; y++) {
      //console.log("y", y);
      Element = document.getElementById(`cell-${x}-${y}`);
      Element.onclick = () => {
        jouer(x, y);
      };
    }
  }
  miseAJourMessageJoueur();
};

const jouer = (x, y) => {
  if (!partieFinie) {
    const Case = document.getElementById(`cell-${x}-${y}`);
    if (!Case.innerText) {
      Case.innerText = symboleJoueurActuel;
      Case.setAttribute("class", `cellule-${symboleJoueurActuel}`);
      if (Victoire(x, y)) {
        const DivVicoire = document.getElementById("victoire-message");
        DivVicoire.style.top = 0;
        DivVicoire.innerText = `Le Joueur ${symboleJoueurActuel} a gagné !`;
        document.getElementById("tour-joueur").style.display = "none";
      } else if (matchNul()) {
        alert("Match nul, la partie est terminée.");
        document.getElementById("tour-joueur").style.display = "none";
      } else {
        miseAJourMessageJoueur();
      }
      if (symboleJoueurActuel === "X") {
        symboleJoueurActuel = "O";
      } else if (symboleJoueurActuel === "O") {
        symboleJoueurActuel = "X";
      }
    } else {
      alert("Tu ne peux pas faire ça !");
    }
  }
};

const matchNul = () => {
  const Remplie = document.querySelectorAll("td:empty");
  return Remplie.length == 0;
};

const Victoire = (x, y) => {
  let alignes = 0;
  // Nord - sud
  for (let dir = -2; dir <= 2; dir++) {
    if (
      document.querySelector("#cell-" + x + "-" + (y + dir)) &&
      document.querySelector("#cell-" + x + "-" + (y + dir)).innerText ===
        symboleJoueurActuel
    ) {
      alignes++;
    }
  }
  if (alignes >= 3) {
    return true;
  }
  // Est - ouest
  alignes = 0;
  for (let dir = -2; dir <= 2; dir++) {
    if (
      document.querySelector("#cell-" + (x + dir) + "-" + y) &&
      document.querySelector("#cell-" + (x + dir) + "-" + y).innerText ===
        symboleJoueurActuel
    ) {
      alignes++;
    }
  }
  if (alignes >= 3) {
    return true;
  }
  // Sud-est - Nord-ouest
  alignes = 0;
  for (let dir = -2; dir <= 2; dir++) {
    if (
      document.querySelector("#cell-" + (x + dir) + "-" + (y + dir)) &&
      document.querySelector("#cell-" + (x + dir) + "-" + (y + dir))
        .innerText === symboleJoueurActuel
    ) {
      alignes++;
    }
  }
  if (alignes >= 3) {
    return true;
  }
  // Sud-ouest - Nord-est
  alignes = 0;
  for (let dir = -2; dir <= 2; dir++) {
    if (
      document.querySelector("#cell-" + (x + dir) + "-" + (y - dir)) &&
      document.querySelector("#cell-" + (x + dir) + "-" + (y - dir))
        .innerText === symboleJoueurActuel
    ) {
      alignes++;
    }
  }
  if (alignes >= 3) {
    return true;
  }
  return false;
};

init();
//jouer(1, 2);
