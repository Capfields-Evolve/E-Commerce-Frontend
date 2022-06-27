email = localStorage.getItem("email");
token = localStorage.getItem("token");
if (email == null) {
    location.href = 'login.html';
}