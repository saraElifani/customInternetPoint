var clienti = [];

class Cliente {
    constructor(nome, cognome, oraIngresso) {
        this.nome = nome;
        this.cognome = cognome;
        this.oraIngresso = oraIngresso;
    }
    getNome() {
        return this.nome;
    }
    getCognome() {
        return this.cognome;
    }
    getOraIngresso() {
        return this.oraIngresso;
    }
    setNome(nome) {
        this.nome = nome;
    }
    setCognome(cognome) {
        this.cognome = cognome;
    }
    setOraIngresso(oraIngresso) {
        this.oraIngresso = oraIngresso;
    }

}

//al caricamento della pagina verifico se c'è un lista clienti in memoria e mi faccio restituire gli items
window.addEventListener("load", verificaLista);

function verificaLista() {
    if (localStorage.getItem("listaClienti")) {
        clienti = localStorage.getItem("listaClienti").split(",");
    }
    visualizzaListaClienti();
}

function inserisciNuovoCliente() {
    let nome = document.getElementById("nomeCliente").value;
    let cognome = document.getElementById("cognomeCliente").value;
    let oraIngresso = document.getElementById("oraIngresso").value;
    const cliente = new Cliente(nome, cognome, oraIngresso);
    //inserisco cliente dentro array clienti
    clienti.push(cliente.nome + " " + cliente.cognome + " " + cliente.oraIngresso);
    visualizzaListaClienti();
    //svuoto i campi
    document.getElementById("nomeCliente").value = "";
    document.getElementById("cognomeCliente").value = "";
    document.getElementById("oraIngresso").value = "";
}

function visualizzaListaClienti() {
    let listaClienti = document.getElementById("container_items");
    let listItem = "";
    for (i = 0; i < clienti.length; i++) {
        listItem += "<li>" + i + " " + clienti[i] + "</li>";
    }
    listaClienti.innerHTML = listItem;
    salvataggio();
}

function modificaCliente() {
    let idClienteDaModificare = document.getElementById("idClienteDaModificare").value;
    let nome = document.getElementById("nomeCliente").value;
    let cognome = document.getElementById("cognomeCliente").value;
    let oraIngresso = document.getElementById("oraIngresso").value;
    const cliente = new Cliente(nome, cognome, oraIngresso);
    clienti.splice(idClienteDaModificare, 1, cliente.nome + " " + cliente.cognome + " " + cliente.oraIngresso);
    salvataggio();
    visualizzaListaClienti();

}

function salvataggio() {
    localStorage.setItem("listaClienti", clienti);
}

function rimuoviCliente() {
    let id = document.getElementById("idClienteDaCancellare").value;
    clienti.splice(id, 1);
    salvataggio();
    visualizzaListaClienti();
}


function calcolaPrezzo() {
    var orarioIngresso = document.getElementById('oraIngresso').value;
    var orarioUscita = document.getElementById('oraFine').value;
    var res = "";
    var aTmp = "";
    //Trasformo l'orario di inizio in minuti
    aTmp = orarioIngresso.split(":");
    var nStartMin = (Number(aTmp[0]) * 60) + Number(aTmp[1]);
    //Trasformo l'orario di fine in minuti
    aTmp = orarioUscita.split(":");
    var nEndMin = (Number(aTmp[0]) * 60) + Number(aTmp[1]);
    //Calcolo la differenza
    var nDiff = 0;
    if (nStartMin > nEndMin) {
        nDiff = nStartMin - nEndMin;
    } else {
        nDiff = nEndMin - nStartMin;
    }
    //arrotondo i 15 min per eccesso
    var quantiQuartiDora = nDiff / 15;
    if (nDiff % 15 != 0) {
        quantiQuartiDora += 1;
    }
    var arrOra = Math.trunc(quantiQuartiDora);
    //calcolo tariffa
    var ore = arrOra / 4;
    var restoQuartiDora = arrOra % 4;
    var mezzOra = Math.trunc(restoQuartiDora) / 2;
    var quartiDora = Math.trunc(restoQuartiDora) % 2;
    var tariffa = (Math.trunc(ore) + (Math.trunc(mezzOra) * 0.5) + (Math.trunc(quartiDora) * 0.3));
    //Formatto la stringa di uscita
    var nDiffMin = 0;
    var nDiffHour = 0;
    if (nDiff > 59) {
        nDiffMin = nDiff % 60;
        nDiffHour = (nDiff - nDiffMin) / 60;
    } else {
        nDiffMin = nDiff;
    }
    if (nDiffHour < 10) res += "0";
    res += nDiffHour;
    res += ":";
    if (nDiffMin < 10) res += "0";
    res += nDiffMin;
    confirm("Il totale da pagare e': " + tariffa + " Euro." + " Per un tempo di utilizzo pari a : " + res + " ore.");
    //CANCELLO DALLA LISTA IL CLIENTE CHE HA ESEGUITO IL CHECKOUT
    let idClientePerCheckout = document.getElementById("idClientePerCheckout").value;
    clienti.splice(idClientePerCheckout, 1);
    salvataggio();
    visualizzaListaClienti();
}
