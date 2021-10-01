
function calcolaPrezzo() {
    var orarioIngresso = document.getElementById('oraIngresso').value;
    var orarioUscita = document.getElementById('oraFine').value;
    alert("orario ingresso: " + orarioIngresso + "\n" + "orario fine: " + orarioUscita);
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
    //alert(nDiff);
    //arrotondo i 15 min per eccesso
    var quantiQuartiDora = nDiff / 15;
    if (nDiff % 15 != 0) {
        quantiQuartiDora += 1;
    }
    var arrOra = Math.trunc(quantiQuartiDora);
    //alert(arrOra);
    //calcolo tariffa
    var ore = arrOra / 4;
    var restoQuartiDora = arrOra % 4;
    var mezzOra = Math.trunc(restoQuartiDora) / 2;
    var quartiDora = Math.trunc(restoQuartiDora) % 2;
    var tariffa = (Math.trunc(ore) + (Math.trunc(mezzOra) * 0.5) + (Math.trunc(quartiDora) * 0.3));
    //alert("Il totale da pagare e': " + tariffa + " Euro.");
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
    // var testoDaStampare = document.getElementById("testo");
    //testoDaStampare.innerHTML = "Il totale da pagare e': " + tariffa + " Euro." + " Per un tempo di utilizzo pari a : " + res + " ore.";

}
