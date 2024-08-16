document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.bar_lateral .btn');
    
    buttons.forEach(button => {
        const span = button.querySelector('span');
        const icons = button.querySelector("i");

        button.addEventListener('mouseover', function() {
            span.classList.add('activo_sub');
            icons.classList.add('activo_btn');
            span.style.display = 'block';
        });
        
        button.addEventListener('mouseout', function() {
            span.classList.remove('activo_sub');
            icons.classList.remove('activo_btn');
            span.style.display = 'none';
        });
    });
});

var ESTUDIANTE = document.getElementById("ESTUDIANTE");
var PRE_GRADO = document.getElementById("PRE_GRADO");
var PROFESIONAL = document.getElementById("PROFESIONAL");

const buttons = document.querySelectorAll('.carta');
const closeButtons = document.querySelectorAll('.close');

// Añade un evento de clic a cada botón de carta
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove("Grande"));
        ESTUDIANTE.style.display = "none";
        PRE_GRADO.style.display = "none";
        PROFESIONAL.style.display = "none";

        button.classList.add("Grande");
        button.style.display = "block";
    });
});

// Añade un evento de clic a cada botón de cierre
closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', (event) => {
        // Evita que el evento de clic en la carta también se dispare
        event.stopPropagation();
        
        // Remueve la clase "Grande" de la carta actual
        const carta = closeButton.parentElement;
        carta.classList.remove("Grande");
        
        // Muestra todas las cartas
        ESTUDIANTE.style.display = "block";
        PRE_GRADO.style.display = "block";
        PROFESIONAL.style.display = "block";
    });
});




document.querySelectorAll('.como-btn').forEach(button => {
    button.addEventListener('click', () => {
        const span = button.nextElementSibling;
        span.style.display = span.style.display === 'blokc' ? 'none' : 'blokc';
    });
});





function trabajos(cartaId) {
    const carta = document.getElementById(cartaId);
    const tipoProyecto = carta.querySelector('.selec').value;
    carta.querySelectorAll('.parte').forEach(parte => parte.style.display = 'none');
    
    if (tipoProyecto) {
        carta.querySelector(`.${tipoProyecto}`).style.display = 'block';
        mostrarParte(cartaId, 1);
    }
}

function mostrarParte(cartaId, numero) {
    const carta = document.getElementById(cartaId);
    const tipoProyecto = carta.querySelector('.selec').value;
    const partes = carta.querySelectorAll(`.${tipoProyecto} .parte`);
    
    partes.forEach(parte => parte.style.display = 'none');
    if (partes.length) partes[numero - 1].style.display = 'block';
}

function cambiarParte(cartaId, direccion) {
    const carta = document.getElementById(cartaId);
    const tipoProyecto = carta.querySelector('.selec').value;
    const partes = carta.querySelectorAll(`.${tipoProyecto} .parte`);
    let indiceActual = Array.from(partes).findIndex(parte => parte.style.display === 'block');

    if (direccion === 'next' && indiceActual < partes.length - 1) {
        indiceActual++;
        carta.querySelector('#inicio').style.display = 'none';
    } else if (direccion === 'prev') {
        if (indiceActual > 0) {
            indiceActual--;
        } else {
            carta.querySelectorAll('.parte').forEach(parte => parte.style.display = 'none');
            carta.querySelector('#inicio').style.display = 'block';
            return;
        }
    }
    mostrarParte(cartaId, indiceActual + 1);
}

// Aplicar los controladores a todas las cartas
document.querySelectorAll('.carta').forEach(carta => {
    const cartaId = carta.id;

    carta.querySelector('.selec').addEventListener('change', () => trabajos(cartaId));
    carta.querySelector('#prev_prf')?.addEventListener('click', () => cambiarParte(cartaId, 'prev'));
    carta.querySelector('#nex_prf')?.addEventListener('click', () => cambiarParte(cartaId, 'next'));
});
