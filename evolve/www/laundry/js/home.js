$.fn.digits = function() {
    return this.each(function() {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    })
}

/*function loader() {
    document.getElementById("loadee").removeAttribute("style");
}

function remloader() {
    document.getElementById("loadee").setAttribute("style", "display:none;");
}*/

var email = localStorage.getItem("email");
var token = localStorage.getItem("token");
console.log(token);
//var tel = localStorage.getItem("phone");
console.log(email);
//console.log(tel);

if (email == null || token == null) {
    //location.replace('login.html');
}

// profile
//loader();
$.ajax({
    url: "https://api.chibs.com.ng/profile.php",
    type: "GET",
    data: {
        email: email,
        token: token
    },
    jsonp: "callback",
    dataType: "jsonp",
    success: function(res) {
        console.log(res);
        var fname = res.firstname;
        var lname = res.lastname;
        var wallet1 = res.wallet;
        var referral_money = res.ref_earning;
        var wallet = wallet1.toLocaleString();
        var refcode = res.referral_code;
        var token = res.token;
        var pin = res.pin;
        var bvn = res.bvn;
        if (bvn == 'false') {
            location.replace('bvn.html');
        }
        if (pin == "" || pin == null) {
            location.href = 'pin.html';
        }
        fullname = fname + ' ' + lname;
        console.log(fullname)
            //document.getElementById("tokenpin").value = token;
            //document.getElementById("tokenpin2").value = token;
        $("#myname").append(fname, ' ', lname);
        $("#name4").append(fname, ' ', lname);
        $("#name1").text(fname);
        $("#name2").append(fname, ' ', lname);
        $("#name3").append(fname, ' ', lname);
        $("#walletbal").append('&#8358;', wallet).digits();
        $("#mybal").append(wallet);
        $("#refmoney").append('&#8358;', referral_money);
        //remloader();
        //document.getElementById("refcode").value = refcode;
        //document.getElementById("refwith").value = referral_money;
    },
    error: function(res) {
        console.log(res);
        // alert('Error in connection');
        //remloader();
    }
});

//check orders
//loader();
$.ajax({
    "url": "https://api.chibs.com.ng/check_order.php",
    "type": "POST",
    data: {
        email: email,
        token: token
    },
    headers: {
        Accept: 'application/json'
    },
    success: function(res) {
        console.log(res);
        var oid = res.orderid;
        var destination = res.destination;
        var link = "map.html?code=" + oid;
        //document.getElementById("link").setAttribute("href", link);
        if (oid !== null || oid !== "") {
            $("#destination").append(destination);
            $(".activeorder").removeClass("hidden");
            $(".noorder").addClass("hidden");
            //remloader();
        } else {
            $(".noorder").removeClass("hidden");
        }
        //remloader();
    },
    error: function(res) {
        console.log(res);
        //remloader();
    }
});

function logout() {
    localStorage.removeItem("email");
    location.replace('login.html');
}