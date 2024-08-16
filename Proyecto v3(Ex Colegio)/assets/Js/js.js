var salir = document.getElementById("salir");

salir.onclick = function(){
    localStorage.clear();
    location.reload();
}

var closes_bar = document.getElementById("closes_bar");
var bar_lateral = document.getElementById("bar_lateral");
var open_bar = document.getElementById("open_bar");

open_bar.onclick = function(){
    bar_lateral.classList.remove("cerrado")
    open_bar.style.display = "none";
}

closes_bar.onclick = function(){
    bar_lateral.classList.add("cerrado")
    setTimeout(() => {
        open_bar.style.display = "block";
    }, 1000);
}

