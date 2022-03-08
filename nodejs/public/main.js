capteur1 = document.getElementById('capteur1');
capteur2 = document.getElementById('capteur2');
derniereTemperature1 = document.getElementById('Temp1');
derniereTemperature2 = document.getElementById('Temp2');

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
    callAPI.open('GET', 'https://localhost/api/capteur1');
    callAPI.onload = function() {
        donnees = JSON.parse(callAPI.responseText);
        console.log(donnees);
        ajoutDerniereTemperature1(donnees[donnees.length - 1]);
        for (let i = 0; i < donnees.length; i++) {
            ajoutHTMLCapteur1(donnees[i]);
        }
        requeteAPICapteur2();
    };
    callAPI.send();
};

function requeteAPICapteur2() {
    callAPI = new XMLHttpRequest;
    callAPI.open('GET', 'https://localhost/api/capteur2');
    callAPI.onload = function() {
        donnees = JSON.parse(callAPI.responseText);
        console.log(donnees);
        ajoutDerniereTemperature2(donnees[donnees.length - 1]);
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

function ajoutDerniereTemperature1(data) {
    var p_temp = "";
    p_temp += '<p>' + data.temperature + '°C' + '</p>';
    derniereTemperature1.insertAdjacentHTML('beforeend', p_temp);
}

function ajoutDerniereTemperature2(data) {
    var p_temp = "";
    p_temp += '<p>' + data.temperature + '°C' + '</p>';
    derniereTemperature2.insertAdjacentHTML('beforeend', p_temp);
}

requeteAPICapteur1();
