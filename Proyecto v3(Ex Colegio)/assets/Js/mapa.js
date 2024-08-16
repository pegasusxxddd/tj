const form = document.getElementById("locationForm");
let map;
let marker; // Variable para el marcador

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario
    var map = document.getElementById("map");
    map.style.display = "block";

        // Obtener los valores de los inputs
        const locationQuery = document.getElementById("location").value;
        const country = document.getElementById("country").value;
        const region = document.getElementById("region").value; // Obtener el valor de la región
        const province = document.getElementById("province").value; // Obtener el valor de la provincia
    
        // Crear la cadena de búsqueda para Nominatim
        const searchQuery = `${locationQuery}, ${province}, ${region}, ${country}`;
    
        // Llamar a la API de Nominatim para obtener las coordenadas
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    resetMap(); // Reiniciar el mapa antes de mostrar la nueva ubicación
                    initMap(lat, lon);
                } else {
                    alert("No se encontraron resultados para la ubicación ingresada.");
                }
            })
            .catch(error => {
                console.error('Error al obtener la ubicación:', error);
                alert("Ocurrió un error al obtener la ubicación.");
            });
    });
    
    function resetMap() {
        // Si ya existe un mapa, lo eliminamos
        if (map) {
            map.remove();
        }
        // Reiniciar la variable del mapa
        map = null;
    }
    
    function initMap(lat, lon) {
        const location = [lat, lon];
        map = L.map('map').setView(location, 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
        // Colocar un marcador inicial
        if (marker) {
            marker.remove(); // Eliminar el marcador anterior si existe
        }
        marker = L.marker(location).addTo(map)
            .bindPopup('Ubicación inicial.')
            .openPopup();
    
        // Agregar evento para hacer clic en el mapa
        map.on('click', function (e) {
            placeMarker(e.latlng);
        });
    }
    
    function placeMarker(latlng) {
        // Si ya existe un marcador, lo removemos
        if (marker) {
            marker.remove();
        }
        // Crear un nuevo marcador en la posición donde se hizo clic
        marker = L.marker(latlng).addTo(map)
            .bindPopup('Marcador colocado aquí.')
            .openPopup();
    
        // Obtener la URL de la ubicación
        getMarkerURL(latlng);
    }
    
    function getMarkerURL(latlng) {
        // Llamar a la API de Nominatim para geocodificación inversa
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.display_name) {
                    // Crear la URL de la ubicación
                    const url = `https://www.openstreetmap.org/?mlat=${latlng.lat}&mlon=${latlng.lng}#map=15/${latlng.lat}/${latlng.lng}`;
                    document.getElementById("markerURL").value = url; // Mostrar la URL en el input
                } else {
                    document.getElementById("markerURL").value = "No se pudo obtener la URL.";
                }
            })
            .catch(error => {
                console.error('Error al obtener la URL:', error);
                document.getElementById("markerURL").value = "Error al obtener la URL.";
            });
    }
    