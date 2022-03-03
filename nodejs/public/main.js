capteur1 = document.getElementById('capteur1');
capteur2 = document.getElementById('capteur2');

function ChangeTB() {
    var temp = document.getElementById("tbleu").value
    document.getElementById("TempRB").innerHTML = temp + '°C'
}

function ChangeTR() {
    var temp = document.getElementById("trouge").value
    document.getElementById("TempRR").innerHTML = temp + '°C'
}

function requeteAPICapteur1() {
    callAPI = new XMLHttpRequest;
    callAPI.open('GET', 'http://localhost/api/capteur1');
    callAPI.onload = function() {
        donnees = JSON.parse(callAPI.responseText);
        console.log(donnees);
        for (let i = 0; i < donnees.length; i++) {
            ajoutHTMLCapteur1(donnees[i]);
        }
        requeteAPICapteur2();
    };
    callAPI.send();
};

function requeteAPICapteur2() {
    callAPI = new XMLHttpRequest;
    callAPI.open('GET', 'http://localhost/api/capteur2');
    callAPI.onload = function() {
        donnees = JSON.parse(callAPI.responseText);
        console.log(donnees);
        for (let i = 0; i < donnees.length; i++) {
            ajoutHTMLCapteur2(donnees[i]);
        }
    };
    callAPI.send();
};

function ajoutHTMLCapteur1(data) {
    var a_temp = "";
    a_temp += '<a>' + data.temperature +'</a>';
    capteur1.insertAdjacentHTML('beforeend', a_temp);
};

function ajoutHTMLCapteur2(data) {
    var a_temp = "";
    a_temp += '<a>' + data.temperature +'</a>';
    capteur2.insertAdjacentHTML('beforeend', a_temp);
};


requeteAPICapteur1();
