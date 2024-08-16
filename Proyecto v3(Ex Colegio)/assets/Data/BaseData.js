$(document).ready(function () {
    var lastSecurityCheckDate = localStorage.getItem('lastSecurityCheckDate');
    var today = new Date().toLocaleDateString();

    if (lastSecurityCheckDate === today) {
        showWelcomeMessage();
    } else {
        performSecurityCheck();
    }
});

function showWelcomeMessage() {
    var username = localStorage.getItem('nombre_completo');

    if (username) {

        var mensajeGeneral = `
            <span class="descuento">30%</span>
                <div class="baner-tex" style="--clr:#ffd900">
                    <div class="infos" >
                        <span class="alertas" style="--clr:#ffd900"><i class="fa fa-triangle-exclamation"></i> La seguridad esta mal <i class="fa fa-triangle-exclamation"></i></span>
                    </div>
                    <h1>Demon Slayer</h1>
                    <p class="sinopsis">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus odio alias minus minima delectus neque tenetur consectetur iusto, saepe fugiat laudantium quis deserunt, eveniet unde maxime excepturi facere nobis ipsum?</p>
                </div>
            `;
        var mensajeDiv = document.createElement("div");
        mensajeDiv.className = "mensaje-baner";
        mensajeDiv.innerHTML = mensajeGeneral;
        document.getElementById("mensajes-container").appendChild(mensajeDiv);

        $("#user").val(username);

        var TipoModelos = localStorage.getItem('TipoModelo');

        if (TipoModelos) {
            var TipoModelo = document.getElementById("Modelo-user");
            TipoModelo.textContent = TipoModelos;

            // Eliminar los elementos con la clase "edit" solo si no es "Editor"
            if (TipoModelos !== "Editor") {
                var passwordElements = document.getElementsByClassName("edit");
                while (passwordElements.length > 0) {
                    passwordElements[0].parentNode.removeChild(passwordElements[0]);
                } if (passwordElements.length === 0) {
                    // alert("Tesigerimos comprar el modelo premiun");
                }
                var tablero_admin = document.getElementById("Editores");
                if (tablero_admin) {
                    tablero_admin.parentNode.removeChild(tablero_admin);
                }

                var users = document.getElementById("users");
                if (users) {
                    users.parentNode.removeChild(users);
                }
            }

            if (TipoModelos === "Premiun") {
                TipoModelo.textContent = "💎 " + TipoModelos + " 💎";
                TipoModelo.style.background = "#00ffc8";
            } else if (TipoModelos === "Editor") {
                TipoModelo.textContent = "✒️ " + TipoModelos + " ✒️";
                TipoModelo.style.background = "red";
                var Modelo_user = document.getElementById("Modelo-user");

                Modelo_user.onclick = function () {
                    TipoModelo.textContent = "✒️ Editando ✒️";
                    var passwordElements = document.getElementsByClassName("edit");
                    for (var i = 0; i < passwordElements.length; i++) {
                        passwordElements[i].style.display = "block";
                    } 

                    // var Modal_Pgxs = document.getElementsByClassName("Modal_Pgx");
                    // for (var i = 0; i < Modal_Pgxs.length; i++) {
                    //     Modal_Pgxs[i].style.display = "none";
                    // } 
                }
            }
        }

        var mensajes = localStorage.getItem('mensajes');
        if (mensajes) {
            mensajes = JSON.parse(mensajes);
            var mensajesDiv = document.getElementById("mensajes-container");

            mensajes.forEach(function (mensaje) {
                var mensajeDiv = document.createElement("div");
                mensajeDiv.className = mensaje.MensajeClass;
                mensajeDiv.style.background = "url(" + mensaje.BanerDelMensaje + ") center";
                mensajeDiv.style.backgroundSize = "cover";
                mensajeDiv.style.backgroundRepeat = "";
                //mensajeDiv.innerHTML = "<h3>" + mensaje.NombreDelMensaje + "</h3>";

                const NombreMensaje = document.createElement('h1');
                NombreMensaje.textContent = mensaje.NombreDelMensaje;
                NombreMensaje.className = 'mensaje-Nombre';

                const imgMensaje = document.createElement('img');
                imgMensaje.src = mensaje.ImgDelMensaje;
                imgMensaje.className = 'mensaje-img';

                const ContenidoMensaje = document.createElement('p');
                ContenidoMensaje.textContent = mensaje.ContenidoDelMensaje;
                ContenidoMensaje.className = 'mensaje-Contenido';

                const Mensajebaner = document.createElement('div');
                Mensajebaner.innerHTML = mensaje.conternedor;

                mensajeDiv.appendChild(NombreMensaje);
                mensajeDiv.appendChild(imgMensaje);
                mensajeDiv.appendChild(ContenidoMensaje);
                mensajeDiv.appendChild(Mensajebaner);
                mensajesDiv.appendChild(mensajeDiv);
            });
        }

        var imagenUsuarioURL = localStorage.getItem('imagenUsuario');

        if (imagenUsuarioURL) {
            var imagenUsuario = document.getElementById("img-user");
            imagenUsuario.src = imagenUsuarioURL;
            imagenUsuario.alt = "Imagen de Usuario";
        }

        var nombre_completos = localStorage.getItem("nombre_completo");
        if (nombre_completos) {
            var nombre_completo = document.getElementById("nombre_completo");
            nombre_completo.textContent = nombre_completos;

        }

        var dni_ = localStorage.getItem("dni");
        if (dni_) {
            var dni = document.getElementById("dni");
            dni.value = dni_;
        }

        var numero_ = localStorage.getItem("numero");
        if (numero_) {
            var numero = document.getElementById("numero")
            numero.value = numero_;
        }

        var img_portadas = localStorage.getItem("img_portada");
        if (img_portadas) {
            var img_portada = document.getElementById("img_portada");
            img_portada.style.background = "url(" + img_portadas + ") center center";
            img_portada.style.backgroundSize = "cover"
        }

    } else {
        performSecurityCheck();
    }
    hideLoader();
}

function performSecurityCheck() {
    var maxAttempts = 3;
    var attempts = 0;
    var isAvisoMostrado = false;
    var controluno = false;
    var controldos = false;

    function showLoader() {
        $("#overlay").fadeIn();
    }

    function hideLoader() {
        $("#overlay").fadeOut();
    }

    function guardarDatos(nombre) {
        //var fechaHora = obtenerFechaHora();
        //var url = "https://script.google.com/macros/s/AKfycby1aVTFUQOvTLePapUGtgR-nZ49jo_Z3NDJBQpbIFM_o0ucMMBzOlVXwcqHjqD--N27/exec";
        //var data = {
        //    nombre: nombre
        //};

        //$.post(url, JSON.stringify(data), function (response) {
        //    alert(response);
        //});

        var lastReloadDate = localStorage.getItem('lastReloadDate');
        var today = new Date().toLocaleDateString();

        if (lastReloadDate !== today) {
            setTimeout(function () {
                localStorage.setItem('lastReloadDate', today);
                window.location.reload();
            }, 5000);
        }
    }

    function obtenerFechaHora() {
        var now = new Date();
        var fecha = now.toLocaleDateString();
        var hora = now.toLocaleTimeString();
        return fecha + " " + hora;
    }

    function checkNombre() {
        if (attempts < maxAttempts) {
            if (!isAvisoMostrado) {
                alert("😋 ¡Hola! Es hora de acceder e interactuar con la pagina tienes que poner tus claves de seguridad. 😋\n🤭 Si no tienes tus claves, accede a este\n🔗 link: 'pegasus-v2.tk/registro' 🔗 para obtener tu acceso. 😏\n\n☠️ ¡No te equivoques! ☠️");
                isAvisoMostrado = true;
            }

            if (!controluno) {
                alert("Control De Seguridad 1");
                controluno = true;
            }

            var username = prompt("Ingrese el nombre de seguridad");

            if (usuariosContrasenas.hasOwnProperty(username)) {
                checkCodigo(username);
            } else {
                attempts++;
                alert("Nombre de seguridad incorrecto. Intento " + attempts + " de " + maxAttempts);
                checkNombre();
            }
        } else {
            showLoader();
            setTimeout(hideLoader, 5000);
            window.location.href = "404.html";
        }
    }

    function checkCodigo(username) {
        if (attempts < maxAttempts) {
            if (!controldos) {
                alert("Control De Seguridad 2");
                controldos = true;
            }

            var codigo = prompt("Ingrese la contraseña");

            if (usuariosContrasenas[username].password === codigo) {
                showLoader();
                setTimeout(function () {
                    hideLoader();

                    var TipoModelos = usuariosContrasenas[username].modelo;
                    var TipoModelo = document.getElementById("Modelo-user");
                    TipoModelo.textContent = TipoModelos;
                    localStorage.setItem('TipoModelo', TipoModelos);

                    // Agregar imagen de usuario aquí
                    var imagenUsuarioURL = usuariosContrasenas[username].imagen;
                    var imagenUsuario = document.getElementById("img-user");
                    imagenUsuario.src = imagenUsuarioURL;
                    imagenUsuario.alt = "Imagen de Usuario";
                    // document.getElementById("texto-generado").appendChild(imagenUsuario);

                    // Almacenar la URL de la imagen en el almacenamiento local
                    localStorage.setItem('imagenUsuario', imagenUsuarioURL);

                    var nombre_completos = usuariosContrasenas[username].nombre_completo;
                    var nombre_completo = document.getElementById("nombre_completo");
                    nombre_completo.textContent = nombre_completos;

                    localStorage.setItem('nombre_completo', nombre_completos);

                    var dni_ = usuariosContrasenas[username].dni;
                    var dni = document.getElementById("dni");
                    dni.textContent = dni_;

                    localStorage.setItem('dni', dni_);

                    var numero_ = usuariosContrasenas[username].numero;
                    var numero = document.getElementById("numero");
                    numero.textContent = numero_;

                    localStorage.setItem('numero', numero_);

                    var img_portadas = usuariosContrasenas[username].img_portada;
                    var img_portada = document.getElementById("img_portada");
                    img_portada.style.background = "url(" + img_portadas + ") center center";
                    img_portada.style.backgroundSize = "cover"

                    localStorage.setItem('img_portada', img_portadas);


                    var mensajes = usuariosContrasenas[username].mensajes;
                    if (mensajes) {
                        var mensajesDiv = document.getElementById("mensajes-container");
                        localStorage.setItem('mensajes', JSON.stringify(mensajes));

                        mensajes.forEach(function (mensaje) {
                            var mensajeDiv = document.createElement("div");
                            mensajeDiv.className = mensaje.MensajeClass;
                            mensajeDiv.style.background = "url(" + mensaje.BanerDelMensaje + ") center";
                            mensajeDiv.style.backgroundSize = "cover";
                            mensajeDiv.style.backgroundRepeat = "";
                            //mensajeDiv.innerHTML = "<h3>" + mensaje.NombreDelMensaje + "</h3>";

                            const NombreMensaje = document.createElement('h1');
                            NombreMensaje.textContent = mensaje.NombreDelMensaje;
                            NombreMensaje.className = 'mensaje-Nombre';

                            const imgMensaje = document.createElement('img');
                            imgMensaje.src = mensaje.ImgDelMensaje;
                            imgMensaje.className = 'mensaje-img';

                            const ContenidoMensaje = document.createElement('p');
                            ContenidoMensaje.textContent = mensaje.ContenidoDelMensaje;
                            ContenidoMensaje.className = 'mensaje-Contenido';

                            const Mensajebaner = document.createElement('div');
                            Mensajebaner.innerHTML = mensaje.conternedor;

                            mensajeDiv.appendChild(NombreMensaje);
                            mensajeDiv.appendChild(imgMensaje);
                            mensajeDiv.appendChild(ContenidoMensaje);
                            mensajeDiv.appendChild(Mensajebaner);
                            mensajesDiv.appendChild(mensajeDiv);
                        });
                    }


                    if (username === 'joseph') {
                        // Mostrar una alerta específica para el usuario 'admin'
                        alert("!Bienvenido jefe y como se encuentra ahora, espero que bien¡");
                    } else {
                        alert("!Bienvenido 😎 " + nombre_completos + " 😎 es un gusto saludar somos el equipo NZTE!")
                    }
                    //if (usuariosContrasenas[username].mensaje) {
                    //    alert(usuariosContrasenas[username].mensaje);
                    //}

                    guardarDatos(username, imagenUsuarioURL, TipoModelos);

                    var today = new Date().toLocaleDateString();
                    localStorage.setItem('lastSecurityCheckDate', today);

                    localStorage.setItem('username', username);
                }, 5000);
            } else {
                attempts++;
                alert("Contraseña incorrecta. Intento " + attempts + " de " + maxAttempts);
                checkCodigo(username);
            }
        } else {
            showLoader();
            setTimeout(hideLoader, 5000);
            window.location.href = "404.html";
        }
    }
    showLoader();
    checkNombre();
}

function showLoader() {
    var lastSecurityCheckDate = localStorage.getItem('lastSecurityCheckDate');
    var today = new Date().toLocaleDateString();
    if (lastSecurityCheckDate !== today) {
        $("#overlay").fadeIn();
        localStorage.clear();
    }
}

function hideLoader() {
    $("#overlay").fadeOut();
    window.location.hash = "#inicial";
    var ele = document.getElementById("ele");
    ele.play();
}

var exit = document.getElementById("exit")

exit.onclick = function(){
    localStorage.removeItem("lastSecurityCheckDate");
    localStorage.removeItem("lastReloadDate");
    location.reload();
}

