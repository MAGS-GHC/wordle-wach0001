let yk = 6; // y aksen antal kolonner
let xr = 5; // x aksen antal rækker

let kolonne = 0;
let raekke = 0;

let ordliste = [];
let ord = "";

let gameOver = false;
getText("/Assets/wordle.txt");
async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  ordliste = myText.split(" ");
  ord = ordliste[Math.floor(Math.random() * ordliste.length)].toUpperCase();
}

//e.code fortæller hvilken tast på keyboardet der bliver trykket på
function plade() {
  document.addEventListener("keyup", (e) => {
    if (gameOver) return; //gør sådan at hvis du gætter rigtig kan du ikke forsætte med at skrive og spillet slutter
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      //omfanget mellem A tasten og Z tasten
      if (raekke < xr) {
        let felt = document.getElementById(
          kolonne.toString() + "-" + raekke.toString()
        );
        if (felt.innerText == "") {
          felt.innerText = e.code[3]; // returnerer den fjerde karakter i Key# og går en frem i rækken
          raekke += 1;
        }
      }
    } else if (e.code == "Backspace") {
      //Går et felt i tilbage rækken, og erstatter hvad der står med en blank string
      if (0 < raekke && raekke <= 5) {
        raekke -= 1;
      }
      let felt = document.getElementById(
        kolonne.toString() + "-" + raekke.toString()
      );
      felt.innerText = "";
    } else if (e.code == "Enter") {
      //når man trykker enter går man 1 videre i kolonnen, og rækken bliver nulstillet så den starter fra 0 igen
      update();
      kolonne += 1; //fx 0.4 enter ny kolonne 1.0
      raekke = 0;
    }
    if (!gameOver && kolonne == yk) {
      //Hvis man har fyldt alle bokse ud, uden at gætte rigtigt, taber man spillet og svaret bliver vist
      gameOver = true;
      document.getElementById("svaret").innerText = ord;
    }
  });
}
plade();

function update() {
  let korrekt = 0;
  let sumafhverBogstav = [];
  for (let i = 0; i < ord.length; i++) {
    bs = ord[i];
    if (sumafhverBogstav[bs]) {
      sumafhverBogstav[bs] += 1;
    } else {
      sumafhverBogstav[bs] = 1;
    }
    console.log("loop1");
    console.log(sumafhverBogstav);
  } //antal korrekte bogstaver
  for (let k = 0; k < xr; k++) {
    let felt = document.getElementById(kolonne.toString() + "-" + k.toString());
    let bs = felt.innerText;
    //hvis indexet (k) i ordet er rigtigt får den korrekte css styling
    if (ord[k] == bs) {
      felt.classList.add("korrekt");
      korrekt += 1;
      sumafhverBogstav[bs] -= 1;
      console.log("loop2");
      console.log(sumafhverBogstav[bs]);
    }
    if (korrekt == xr) {
      gameOver = true;
    }
  } //antal i forkert placering
  for (let k = 0; k < xr; k++) {
    let felt = document.getElementById(kolonne.toString() + "-" + k.toString());
    let bs = felt.innerText;
    if (!felt.classList.contains("korrekt")) {
      if (ord.includes(bs) && sumafhverBogstav[bs] >= 1) {
        felt.classList.add("forkertPlacering");
        sumafhverBogstav[bs] -= 1;
        console.log("loop3");
        console.log(sumafhverBogstav);
      } else {
        felt.classList.add("ingenAdem");
      }
    }
  }
}
