


var Link_Online = "https://script.google.com/macros/s/AKfycbzZFCOsH31EOqAYsXTIyQqwc9YOe6bJjP_KLSkCuX2LvH_fHzz36_2jpESXgj3UVFDybg/exec";

function SubirBtn() {
    tipo_po = document.getElementById("Tipo-De-Proyecto").value;
    TProfeccional = document.getElementById("selec-frabricante2").value;
    img_user_wa = localStorage.getItem("imagenUsuario");
    nombre_comp = localStorage.getItem("nombre_completo");
    var nombre = localStorage.getItem("nombre_completo");
    var dni = localStorage.getItem("dni");
    var numero = localStorage.getItem("numero");
    var region = localStorage.getItem('region');
    var provincia = localStorage.getItem('provincia');
    var distrito = localStorage.getItem('distrito');
    var tipoDeProyecto = localStorage.getItem('tipoDeProyecto');
    var otroInput = localStorage.getItem('otroInput');
    var selec_frabricante = document.getElementById("selec-frabricante2").value;
    var ubicacion = document.getElementById('markerURL').value;
    var area = document.getElementById('area').value;
    var perimetro = document.getElementById('perimetro').value;
    var documentos_pro = document.getElementById('documentos_pro').value;
    var certificado_parametros = document.getElementById('certificado_parametros').value;
    var mecanicas_suelo = document.getElementById('mecanicas_suelo').value;
    var zonificacion = document.getElementById('zonificacion').value;
    var pisos = document.getElementById('pisos').value;
    var especificaciones = document.getElementById('especificaciones').value;

    const mensaje = `╠════ INFORMACIÓN PERSONAL ════╣\n\nNombre: ${nombre}\nId: ${dni}\nNumero: ${numero}\nregion: ${region}\nprovincia: ${provincia}\ndistrito: ${distrito} \n\n╠════ PROYECTO ════╣\n\nEncargado Del Proyecto: ${selec_frabricante}\nTipo De Proyecto: ${tipoDeProyecto}\nAlgo como: ${otroInput} \n\n╠════ INFORMACION DEL TERRENO ════╣\n\nUbicación del Proyecto: ${ubicacion}\nÁrea del Terreno: ${area} m²\nPerímetro del Terreno: ${perimetro} m\nNúmero de Pisos: ${pisos}\nEspecificaciones del Proyecto: ${especificaciones}\n\n╠════ DOCUMENTOS ════╣\n\nDocumentos de Propiedad: ${documentos_pro}\nCertificado de Parámetros Urbanísticos: ${certificado_parametros}\nEstudio de Mecánicas de Suelo: ${mecanicas_suelo}\nZonificación Urbana: ${zonificacion}`;

    if (tipo_po.trim() !== '' && Link_Online) {
        $.ajax({
            url: Link_Online,
            method: 'POST',
            data: {
                tipo_po: tipo_po,
                TProfeccional: TProfeccional,
                img_user_wa: img_user_wa,
                mensaje: mensaje,
            },
            success: function (response) {
                alert('Agregado con éxito');
                mostrarAvances();
                // Limpiar los campos después de agregar el botón
            },
            error: function (error) {
                console.error('Error al agregar: ', error);
            }
        });
    } else {
        alert('Por favor, seleccione un tablero y asegúrese de que la URL esté guardada antes de subir el botón.');
    }
}

var Link_Online = "https://script.google.com/macros/s/AKfycbzZFCOsH31EOqAYsXTIyQqwc9YOe6bJjP_KLSkCuX2LvH_fHzz36_2jpESXgj3UVFDybg/exec";

function mostrarAvances() {
    if (Link_Online) {
        $.ajax({
            url: Link_Online,
            method: 'GET',
            success: function (response) {
                var Metodos = $('#Metodos');
                Metodos.empty(); // Limpia el contenedor antes de agregar nuevos elementos

                // Verifica si la respuesta es un array
                if (Array.isArray(response)) {
                    response.forEach(function (Btns) {
                        // Asegúrate de que Btns tenga las propiedades que estás usando
                        if (Btns.img_user_wa && Btns.tipo_po && Btns.mensaje) {
                            const contenedor = document.createElement("div");
                            contenedor.className = "carta_avance";

                            contenedor.innerHTML = `
                                <div class="carta_wasap">
                                    <img src="${Btns.img_user_wa}" alt="Imagen de usuario">
                                    <p>Tipo de pedido: ${Btns.tipo_po}</p>
                                    <p>Cuenta con: ${Btns.mensaje}</p>
                                </div>
                            `;
                            
                            Metodos.append(contenedor);
                        } else {
                            console.error('Datos incompletos en la respuesta:', Btns);
                        }
                    });
                } else {
                    console.error('La respuesta no es un array.');
                }
            },
            error: function (error) {
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    } else {
        console.log('No hay una URL guardada en el localStorage.');
    }
}

$(document).ready(function() {
    mostrarAvances();
});

