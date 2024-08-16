var img_user = document.getElementById("img_user");
var cong = document.getElementById("cong");

img_user.src = localStorage.getItem('imagenUsuario');

img_user.onclick = function(){
    cong.style.display= "block";
    setInterval(() => {
        cong.style.display= "none";
    }, 5000);
}

document.querySelectorAll('.como-btn').forEach(button => {
    button.addEventListener('click', () => {
        const span = button.nextElementSibling;
        span.style.display = span.style.display === 'block' ? 'none' : 'block';
    });
});

