email = localStorage.getItem("email");
token = localStorage.getItem("token");
$.fn.digits = function() {
        return this.each(function() {
            $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        })
    }
    /*if (email == null || token == null) {
        location.replace('logpin.html');
    } else {*/
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
        cphone = res.phone;
        localStorage.setItem("phone", cphone);
        localStorage.setItem("custName", cname);
        if (msg == 'true') {
            $("#customerName").append(cname);
            $("#walletBalance").append('&#8358;', balance).digits();
        }
    },
    error: function(res) {
        console.log(res)
    }
});

function logout() {
    localStorage.removeItem("email");
    location.replace('login.html');
}

function generateCode() {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/generatecode.php",
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
            document.getElementById("cartCode").value = res.code;
            $(".myform").removeClass("hidden");
            $(".generate").addClass("hidden");
        },
        error: function(res) {
            console.log(res)
            alert('Error in connection');
        }
    })
}

function copyText() {
    /* Get the text field */
    var copyText = document.getElementById("cartCode");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied");
}
//}