var p1 = document.getElementById("p1")
var p2 = document.getElementById("p2")
var p3 = document.getElementById("p3")
var bar_open = document.getElementById("bar_open")
var close_bar = document.getElementById("close_bar")
var bar = document.getElementById("bar")
bar_open.onclick = function(){
    bar.style.display = "block";
}

close_bar.onclick = function(){
    bar.style.display = "none";
} 
p1.onclick = function(){
    alert("1")
}

p2.onclick = function(){
    alert("2")
}

p3.onclick = function(){
    alert("3")
}
           // Eliminar los elementos con la clase "edit" solo si no es "Editor"
            // if (TipoModelos !== "Editor" && TipoModelos !== "Premiun") {
                // var passwordElements = document.getElementsByClassName("edit");
                // while (passwordElements.length > 0) {
                //     passwordElements[0].parentNode.removeChild(passwordElements[0]);
                // } if (passwordElements.length === 0) {
                //     alert("Tesigerimos comprar el modelo premiun");
                // }
                // var ESTUDIANTE = document.getElementById("ESTUDIANTE");
                // if (tablero_admin) {
                //     tablero_admin.parentNode.removeChild(tablero_admin);
                // }
            // }