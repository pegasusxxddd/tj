var TipoModelos = localStorage.getItem('TipoModelo');

if (TipoModelos === "Premiun" || TipoModelos === "Editor") {

} else if (TipoModelos === "ESTUDIANTE") {
    var PROFESIONAL = document.getElementsByClassName("PROFESIONAL");
    while (PROFESIONAL.length > 0) {
        PROFESIONAL[0].parentNode.removeChild(PROFESIONAL[0]);
    }
    var PRE_GRADO = document.getElementsByClassName("PRE_GRADO");
    while (PRE_GRADO.length > 0) {
        PRE_GRADO[0].parentNode.removeChild(PRE_GRADO[0]);
    }
} else if (TipoModelos === "PRE-GRADO") {
    var PROFESIONAL = document.getElementsByClassName("PROFESIONAL");
    while (PROFESIONAL.length > 0) {
        PROFESIONAL[0].parentNode.removeChild(PROFESIONAL[0]);
    }
    var ESTUDIANTE = document.getElementsByClassName("ESTUDIANTE");
    while (ESTUDIANTE.length > 0) {
        ESTUDIANTE[0].parentNode.removeChild(ESTUDIANTE[0]);
    }
} else if (TipoModelos === "PROFESIONAL") {
    var ESTUDIANTE = document.getElementsByClassName("ESTUDIANTE");
    while (ESTUDIANTE.length > 0) {
        ESTUDIANTE[0].parentNode.removeChild(ESTUDIANTE[0]);
    }
    var PRE_GRADO = document.getElementsByClassName("PRE_GRADO");
    while (PRE_GRADO.length > 0) {
        PRE_GRADO[0].parentNode.removeChild(PRE_GRADO[0]);
    }
} else {
    document.body.innerHTML = `    
    <h1 style="font-size: 50px;  position: fixed; z-index:10000; background: #000 ; color: #fff;  top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);"> jajajaja capo te crees</h1> 
    `;

    setInterval(() => {
        window.location = "/login.html"
    }, 3000);
}
