let xr = 6;
let yk = 5;

let raekke = 0;
let kolonne = 0;

let ordliste = ["paper", "maker", "pulse", "house", "loser"];

let gameOver = false;
let ord = ordliste[Math.floor(Math.random() * ordliste.length)].toUpperCase();

window.onload = function () {
  plade();
};

function plade() {
  for (let r = 0; r < 6; r++) {
    for (let k = 0; k < 5; k++) {
      let felter = document.createElement("span");
      felter.id = r.toString() + "-" + k.toString();
      felter.classList.add("felter");
      felter.innerText = "";
      document.getElementById("board").appendChild(felter);
    }
  }

  document.addEventListener("keyup", (e) => {
    if (gameOver) return;
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (kolonne < 5) {
        let felt = document.getElementById(
          raekke.toString() + "-" + kolonne.toString()
        );
        if (felt.innerText == "") {
          felt.innerText = e.code[3];
          kolonne += 1;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < kolonne && kolonne <= 5) {
        kolonne -= 1;
      }
      let felt = document.getElementById(
        raekke.toString() + "-" + kolonne.toString()
      );
      felt.innerText = "";
    } else if (e.code == "Enter") {
      update();
      raekke += 1;
      kolonne = 0;
    }
    if (!gameOver && raekke == xr) {
      gameOver = true;
      document.getElementById("answer").innerText = ord;
    }
  });
}

function update() {
  let korrekt = 0;
  let antalBogstav = {};
  for (let i = 0; i < ord.length; i++) {
    bogstav = ord[i];
    if (antalBogstav[bogstav]) {
      antalBogstav[bogstav] += 1;
    } else {
      antalBogstav[bogstav] = 1;
    }
  }
  for (let k = 0; k < 5; k++) {
    let felt = document.getElementById(raekke.toString() + "-" + k.toString());
    let bogstav = felt.innerText;

    if (ord[k] == bogstav) {
      felt.classList.add("korrekt");
      korrekt += 1;
      antalBogstav[bogstav] -= 1;
    }
    if (korrekt == yk) {
      gameOver = true;
    }
  }
  for (let k = 0; k < 5; k++) {
    let felt = document.getElementById(raekke.toString() + "-" + k.toString());
    let bogstav = felt.innerText;
    if (!felt.classList.contains("korrekt")) {
      if (ord.includes(bogstav) && antalBogstav[bogstav] > 0) {
        felt.classList.add("forkertPlacering");
        antalBogstav[bogstav] -= 1;
      } else {
        felt.classList.add("ingenAdem");
      }
    }
  }
}
