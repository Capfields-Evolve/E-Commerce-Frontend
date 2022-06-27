email = localStorage.getItem("email");
token = localStorage.getItem("token");
$.fn.digits = function() {
    return this.each(function() {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    })
}
if (email == null || token == null) {
    location.replace('logpin.html');
} else {
    $("#mymail").append(email);
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/profile.php",
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
            cname = res.fname;
            balance = res.balance;
            walletid = res.wallet_id;
            phone = res.phone;
            address = res.address;
            refcode = res.refcode;
            refearn = res.refearn;
            $("#refearn").append('&#8358;', refearn).digits();
            $("#refcode").append(refcode);
            if (msg == 'true') {
                //$("#customerName").append(cname);
                //$("#walletBalance").append('&#8358;', balance).digits();
                $("#myname").append(cname);
                $("#mywallet").append('&#8358;', balance).digits();
                $("#walletid").append(walletid);
                $("#myphone").append(phone);
                $("#myaddress").append(address);
                document.getElementById("nameVal").value = cname;
                document.getElementById("mailVal").value = email;
                document.getElementById("phoneVal").value = phone;
            }
        },
        error: function(res) {
            console.log(res)
        }
    });

    //update profile
    $("#editProf").click(function(e) {
        e.preventDefault();
        name = $("#nameVal").val();
        phone = $("#phoneVal").val();
        if (name == "") {
            alert('Enter name');
        } else if (phone == "") {
            alert('Enter phone number');
        } else {
            $.ajax({
                url: "https://evolve.capfields.com.ng/user_app/updateprofile.php",
                type: "POST",
                headers: {
                    Accept: 'application/json'
                },
                data: {
                    email: email,
                    token: token,
                    name: name,
                    phone: phone
                },
                success: function(res) {
                    console.log(res)
                    msg = res.message;
                    if (msg == 'success') {
                        localStorage.removeItem("email");
                        //localStorage.removeItem("token");
                        location.replace('login.html');
                    } else {
                        alert(msg);
                    }
                },
                error: function(res) {
                    console.log(res)
                    alert('Error in connection');
                }
            });
        }
    });
}

//withdraw ref
$("#withdrawRef").click(function(e) {
    e.preventDefault();
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/withdrawref.php",
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
            msg = res.message;
            if (msg == 'success') {
                alert('Withdrawal successful');
                location.href = 'profile.html';
            } else {
                alert(msg)
            }
        },
        error: function(res) {
            console.log(res)
            alert('Error in connection')
        }
    });
});