email = localStorage.getItem("email");
token = localStorage.getItem("token");

$.ajax({
    url: "https://evolve.capfields.com.ng/user_app/notifycounter.php",
    type: "POST",
    headers: {
        Accept: 'application/json'
    },
    data: {
        email: email,
        token: token
    },
    success: function(res) {
        console.log(res)
        counter = res.counter;
        $("#notCounter").text(counter);
    },
    error: function(res) {
        console.log(res)
    }
});