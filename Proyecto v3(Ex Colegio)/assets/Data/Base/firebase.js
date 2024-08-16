function selectFile() {
    document.getElementById('fileToUpload').click();
}

document.getElementById('fileToUpload').addEventListener('change', function () {
    const fileInput = document.getElementById('fileToUpload');
    const fileNameDisplay = document.getElementById('fileName');
    if (fileInput.files.length > 0) {
        fileNameDisplay.value = fileInput.files[0].name;
    } else {
        fileNameDisplay.value = "Ningún archivo seleccionado";
    }
});
// sustituye aquí tus credenciales
var firebaseConfig = {
    apiKey: "AIzaSyCowkKlW7BEgdp_8GeRfQgg42OkSOrGzm8",
    authDomain: "fotos-b8a54.firebaseapp.com",
    projectId: "fotos-b8a54",
    storageBucket: "fotos-b8a54.appspot.com",
    messagingSenderId: "1037713159028",
    appId: "1:1037713159028:web:7386b0783a47e73f8b7221",
    measurementId: "G-909LJ5JLLG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

async function subirArchivo() {
    var inputFile = document.getElementById("fileToUpload");
    var imageContainer = document.getElementById("imageContainer");

    if (inputFile.files.length == 0) {
        alert("Por favor selecciona un archivo");
        return;
    }

    var file = inputFile.files[0];
    var username = localStorage.getItem('username');

    if (!username) {
        alert("Debes iniciar sesión para subir archivos.");
        return;
    }

    // Crear una referencia al directorio del usuario en Firebase Storage
    var storageRef = firebase.storage().ref(username + "/" + file.name);

    try {
        await storageRef.put(file);
        console.log("Carga completada...");

        var imagePath = username + "/" + file.name;
        mostrarImagen(imagePath, imageContainer, file); // Pasa 'file' como argumento
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        alert("Ocurrió un error al subir el archivo. Por favor, inténtalo de nuevo.");
    }
}

let cartaCounter = 1;
async function mostrarImagen(path, container, file) { // Añade 'file' como argumento
    var storageRef = firebase.storage().ref(path);
    var url = await storageRef.getDownloadURL();

    const cartaNumero = `Img Numero: ${cartaCounter}`;
    cartaCounter++;

    var cartaImgDiv = document.createElement("div");
    cartaImgDiv.classList.add("carta-img");

    var imageElement = document.createElement("img");
    imageElement.src = url;

    var numero = document.createElement("p")
    numero.textContent = cartaNumero;

    var selectores = document.createElement("div");
    selectores.innerHTML = ''

    var fileNameElement = document.createElement("input");
    fileNameElement.classList.add("fileNameElement");
    fileNameElement.value = file.name;
    fileNameElement.disabled = true;

    var buttonElement = document.createElement("button");
    buttonElement.classList.add("button");
    buttonElement.textContent = "Copiar URL Del Archivo";
    buttonElement.onclick = function () {
        copiarURL(url);
    };

    cartaImgDiv.appendChild(imageElement);
    cartaImgDiv.appendChild(numero);
    cartaImgDiv.appendChild(fileNameElement);
    cartaImgDiv.appendChild(buttonElement);

    var imgCartaSubida = document.getElementById("imageContainer");
    imgCartaSubida.appendChild(cartaImgDiv);
}

function copiarURL(url) {
    var tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = url;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("URL de la imagen copiada al portapapeles: " + url);
}