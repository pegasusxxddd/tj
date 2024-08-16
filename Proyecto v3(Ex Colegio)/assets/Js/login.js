var perfil = document.getElementById("perfil");
var informacion = document.getElementById("informacion");

perfil.onclick = function(){
    if(informacion.style.display === "" || informacion.style.display === "none" ){
        informacion.style.display = "block";
        perfil.style.margin = "0";
        perfil.style.float = "left;"
    } else{
        informacion.style.display = "none";
        perfil.style.margin = "0 auto";

    }
}