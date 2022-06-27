//register
$("#regMe").click(function(e) {
    document.getElementById("regMe").innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:25px"></i>';
    e.preventDefault();
    email = $("#email").val();
    name = $("#name").val();
    phone = $("#phone").val();
    refcode = $("#refcode").val();
    pass1 = $("#password").val();
    pass2 = $("#confirmPassword").val();

    if (name == "") {
        alert('Enter your full name');
        document.getElementById("regMe").innerHTML = '<span>Sign Up</span><i class="material-icons">arrow_forward</i>';
    } else if (email == "") {
        alert('Enter your email address');
        document.getElementById("regMe").innerHTML = '<span>Sign Up</span><i class="material-icons">arrow_forward</i>';
    } else if (phone == "") {
        alert('Enter your phone number');
        document.getElementById("regMe").innerHTML = '<span>Sign Up</span><i class="material-icons">arrow_forward</i>';
    } else if (pass1 == "") {
        alert('Enter your password');
        document.getElementById("regMe").innerHTML = '<span>Sign Up</span><i class="material-icons">arrow_forward</i>';
    } else if (pass2 == "") {
        alert('Confirm your password');
        document.getElementById("regMe").innerHTML = '<span>Sign Up</span><i class="material-icons">arrow_forward</i>';
    } else if (pass1.length < 6) {
        alert('Password length too short');
        document.getElementById("regMe").innerHTML = '<span>Sign Up</span><i class="material-icons">arrow_forward</i>';
    } else if (pass1 != pass2) {
        alert('Password does not match');
        document.getElementById("regMe").innerHTML = '<span>Sign Up</span><i class="material-icons">arrow_forward</i>';
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/register.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                name: name,
                referral_code: refcode,
                phone: phone,
                password: pass1
            },
            success: function(res) {
                console.log(res);
                msg = res.message;
                if (msg == 'success') {
                    token = res.token;
                    localStorage.setItem("token", token);
                    localStorage.setItem("email", email);
                    location.replace('index.html');
                } else {
                    alert(msg);
                    document.getElementById("regMe").innerHTML = '<span>Sign Up</span><i class="material-icons">arrow_forward</i>';
                }
            },
            error: function(res) {
                console.log(res);
                alert('Error in connection');
                document.getElementById("regMe").innerHTML = '<span>Sign Up</span><i class="material-icons">arrow_forward</i>';
            }
        });
    }
});

//login
$("#logMeIn").click(function(e) {
    document.getElementById("logMeIn").innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:25px"></i>';
    e.preventDefault();
    logphone = $("#logPhone").val();
    logPwd = $("#logPassword").val();
    if (logphone == "") {
        alert('Enter phone number');
        document.getElementById("logMeIn").innerHTML = '<span>Sign in</span><i class="material-icons">arrow_forward</i>';
    } else if (logPwd == "") {
        alert('Enter password');
        document.getElementById("logMeIn").innerHTML = '<span>Sign in</span><i class="material-icons">arrow_forward</i>';
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/login.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                phone: logphone,
                password: logPwd
            },
            success: function(res) {
                console.log(res);
                msg = res.message;
                if (msg == 'success') {
                    email = res.email;
                    token = res.token;
                    localStorage.setItem("email", email);
                    localStorage.setItem("token", token);
                    location.replace("index.html");
                } else {
                    alert(msg);
                    document.getElementById("logMeIn").innerHTML = '<span>Sign in</span><i class="material-icons">arrow_forward</i>';
                }
            },
            error: function(res) {
                console.log(res);
                alert('Error in connection');
                document.getElementById("logMeIn").innerHTML = '<span>Sign in</span><i class="material-icons">arrow_forward</i>';
            }
        });
    }
});

//logout
function logout() {
    localStorage.removeItem("email");
    location.replace('login.html');
}

//reset password
$("#sendResetCode").click(function(e) {
    document.getElementById("sendResetCode").innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:25px"></i>';
    e.preventDefault();
    var resetemail = $("#resetEmail").val();
    if (resetemail == "") {
        alert('Enter email address');
        document.getElementById("sendResetCode").innerHTML = '<span>Reset</span><i class="material-icons">arrow_forward</i>';
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/reset-code.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: resetemail
            },
            success: function(res) {
                console.log(res)
                msg = res.message;
                if (msg == 'success') {
                    alert('Reset code sent successfully');
                    window.location = 'resetcode.html';
                } else {
                    alert(msg);
                    document.getElementById("sendResetCode").innerHTML = '<span>Reset</span><i class="material-icons">arrow_forward</i>';
                }
            },
            error: function(res) {
                console.log(res)
                alert('Error in connection');
                document.getElementById("sendResetCode").innerHTML = '<span>Reset</span><i class="material-icons">arrow_forward</i>';
            }
        });
    }
});

//update new password
$("#resetMyPassword").click(function(e) {
    document.getElementById("resetMyPassword").innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:25px"></i>';
    e.preventDefault();
    email = $("#myResetEmail").val();
    newpass = $("#newPassword").val();
    resetcode = $("#resetCode").val();
    if (email == "") {
        alert('Enter email');
        document.getElementById("resetMyPassword").innerHTML = '<span>Submit</span><i class="material-icons">arrow_forward</i>';
    } else if (newpass == "") {
        alert('Enter new password');
        document.getElementById("resetMyPassword").innerHTML = '<span>Submit</span><i class="material-icons">arrow_forward</i>';
    } else if (resetcode == "") {
        alert('Enter reset code');
        document.getElementById("resetMyPassword").innerHTML = '<span>Submit</span><i class="material-icons">arrow_forward</i>';
    } else if (newpass.length < 6) {
        alert('Password length is too short');
        document.getElementById("resetMyPassword").innerHTML = '<span>Submit</span><i class="material-icons">arrow_forward</i>';
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/reset-password.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                new_password: newpass,
                reset_code: resetcode
            },
            success: function(res) {
                console.log(res)
                msg = res.message;
                if (msg == 'success') {
                    alert('Password reset successful');
                    location.href = 'login.html';
                } else {
                    alert(msg);
                    document.getElementById("resetMyPassword").innerHTML = '<span>Submit</span><i class="material-icons">arrow_forward</i>';
                }
            },
            error: function(res) {
                console.log(res);
                alert('Error in connection');
                document.getElementById("resetMyPassword").innerHTML = '<span>Submit</span><i class="material-icons">arrow_forward</i>';
            }
        });
    }
});