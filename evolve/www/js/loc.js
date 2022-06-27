email = localStorage.getItem("email");
token = localStorage.getItem("token");
$.ajax({
    url: "https://evolve.capfields.com.ng/user_app/checklocation.php",
    type: "POST",
    headers: {
        Accept: 'application/json'
    },
    data: {
        email: email,
        token: token
    },
    success: function(res) {
        console.log(res);
        msg = res.message;
        if (msg == 'false') {
            window.location = 'location.html';
        }
    },
    error: function(res) {
        console.log(res)
    }
});