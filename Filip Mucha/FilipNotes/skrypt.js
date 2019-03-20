

function dodaj() {
    let tytul = document.querySelector("#tytul").value;
    let kolor = document.querySelector("#kolor").value;
    let tresc = document.querySelector("#tresc").value;

    let notka = new Note(tytul, tresc, kolor);
    
    localStorage.setItem(notka.id, JSON.stringify(notka));

}

//function wypiszNotatki() {
    for (let key in localStorage){
        wyswietl(key);
    }




function wyswietl(key) {
    let box = document.createElement("div");
    let item = JSON.parse(localStorage.getItem(key));
    box.innerHTML =`
        <div class="box-tytul" style="background-color:${item.kolor}">${item.tytul}</div>
        <div class="box-tresc">${item.tresc}</div>    
    `;

    document.querySelector("#notatki").appendChild(box);

}

/**
 * Obiekt notatki
 *
 * @param {string} [tytul='']
 * @param {string} [tresc='']
 * @param {string} [kolor='']
 */
function Note(tytul = '', tresc = '', kolor = '') {
    this.id = Date.now();
    this.tytul = tytul;
    this.tresc = tresc;
    this.kolor = kolor;
}