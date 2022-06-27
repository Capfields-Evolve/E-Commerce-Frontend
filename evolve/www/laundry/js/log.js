token = localStorage.getItem("token");
console.log(token);
if (token == null) {
    location.replace('login.html');
} else {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/logprofile.php",
        type: "POST",
        headers: {
            Accept: 'application/json'
        },
        data: {
            token: token
        },
        success: function(res) {
            console.log(res);
            name = res.name;
            $("#name").append(name);
            email = res.email;
            document.getElementById("logmail").value = email;
            $(".finger").removeClass("hidden");
            $(".password").prop("disabled", false);
        },
        error: function(res) {
            console.log(res);
        }
    });
}
//#FF0068

//password login
$("#pwdLogin").click(function(e) {
    document.getElementById("pwdLogin").innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:20px"></i>';
    e.preventDefault();
    password = $("#logPassword").val();
    if (password == "") {
        alert('Enter password');
        document.getElementById("pwdLogin").innerHTML = '<i class="material-icons">arrow_forward</i>';
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/log.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                token: token,
                password: password
            },
            success: function(res) {
                console.log(res);
                msg = res.message;
                if (msg == 'success') {
                    newemail = res.email;
                    localStorage.setItem("email", email);
                    //localStorage.setItem("token", token);
                    location.replace('index.html');
                } else {
                    alert(msg);
                    document.getElementById("pwdLogin").innerHTML = '<i class="material-icons">arrow_forward</i>';
                }
            },
            error: function(res) {
                console.log(res)
                alert('Error in connection');
                document.getElementById("pwdLogin").innerHTML = '<i class="material-icons">arrow_forward</i>';
            }
        });
    }
});

//email login
function emailLog() {
    localStorage.removeItem("token");
    location.replace('login.html');
}