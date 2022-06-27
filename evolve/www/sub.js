function subList() {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/sublist.php",
        type: "POST",
        headers: {
            Accept: 'application/json'
        },
        success: function(res) {
            console.log(res)
            sublist = '';
            $.each(res.data, function(key, value) {
                //sublist += '<option value="' + value.code + '">' + value.type + ' ' + value.duration + ' Subscription @ NGN' + value.price + '</option>';
                sublist += "<option value='{\"code\":\"" + value.code + "\", \"amount\":\"" + value.price + "\"}'>" + value.type + " " + value.duration + " @ &#8358;" + value.price + "</option>";
            })
            $("#sublist").append(sublist);
        },
        error: function(res) {
            console.log(res)
        }
    });
}
window.load = subList();

function subscribe() {
    subtype = $("#sublist").val();
    if (subtype == "") {
        alert('Select subscription');
    } else {
        subtype = JSON.parse(subtype);
        amount = subtype.amount;
        code = subtype.code;
        document.getElementById("amount").value = amount;
        document.getElementById("code").value = code;
        document.getElementById("amounttf").value = amount;
        document.getElementById("codetf").value = code;
        $("#transamt").append('N', amount);
        $(".payment").removeClass("hidden");
    }
}

function card() {
    $(".cardpay").toggleClass("hidden");
    $(".bank").addClass('hidden');
}

function bank() {
    $(".bank").toggleClass("hidden");
    $(".cardpay").addClass("hidden");
}

function wallet() {
    amount = $("#amount").val();
    code = $("#code").val();
    if (amount == "") {
        alert('Select subscription');
    } else if (code == "") {
        alert('Select subscription');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/paysubwallet.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                code: code,
                amount: amount
            },
            success: function(res) {
                console.log(res)
                msg = res.message;
                if (msg == 'success') {
                    alert('Subscription successful');
                    location.href = 'index.html';
                } else {
                    alert(msg);
                }
            },
            error: function(res) {
                console.log(res);
                alert('Error in connection')
            }
        });
    }
}
document.getElementById("email").value = email;
document.getElementById("token").value = token;
//$(document).ready(function(e) {
$("#uploadimage").on('submit', (function(e) {
    document.getElementById("uploadBtn").innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:25px"></i>';
    e.preventDefault();
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/uploadsubpayment.php", // Url to which the request is send
        type: "POST", // Type of request to be send, called as method
        data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false, // The content type used when sending data to the server.
        cache: false, // To unable request pages to be cached
        processData: false, // To send DOMDocument or non processed data file it is set to false
        success: function(data) // A function to be called if request succeeds
            {
                console.log(data)
                msg = data.message;
                if (msg == 'success') {
                    alert('Payment proof uploaded successfully');
                    document.getElementById("uploadBtn").innerHTML = 'Submit';
                    location.href = 'index.html';
                } else {
                    alert(msg);
                    document.getElementById("uploadBtn").innerHTML = 'Submit';
                }
            },
        error: function(data) {
            console.log(data)
            alert('Error in connection')
            document.getElementById("uploadBtn").innerHTML = 'Submit';
        }
    });
}));
//});