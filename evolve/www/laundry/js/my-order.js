$.ajax({
    url: "https://evolve.capfields.com.ng/user_app/my-order.php",
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
            cart = '';
            $.each(res.data, function(key, value) {
                cart += '<li class="list-group-item">';
                cart += '<div class="row">';
                cart += '<div class="col-auto align-self-center">';
                //cart += '<a href="#"><button class="btn btn-sm btn-link p-0 float-right"><i class="material-icons">remove_circle</i></button></a>';
                cart += '</div>';
                cart += '<div class="col-2 pl-0 align-self-center">';
                cart += '<figure class="product-image h-auto"><img src="https://evolve.capfields.com.ng/view/products/' + value.image + '" alt="" class="vm"></figure>';
                cart += '</div>';
                cart += '<div class="col px-0">';
                cart += '<a href="#" class="text-dark mb-1 h6 d-block textwrap">' + value.product + '</a>';
                cart += '<h5 class="text-success font-weight-normal mb-0">₦' + value.total_price + '<sup>.00</sup></h5>';
                cart += '</div>';
                cart += '<div class="col-auto align-self-center">';
                cart += '<div class="input-group input-group-sm">';
                cart += '<div class="input-group-prepend">';
                //cart += '<a href="#" class="btn btn-light-grey px-1" style="background:none;"><i class="material-icons">remove</i></a>';
                cart += '</div>';
                cart += '<input type="text" class="form-control w-35" placeholder="" value="' + value.quantity + '" disabled>';
                cart += '<div class="input-group-append">';
                //cart += '<a href="#"  class="btn btn-light-grey px-1" style="background:none;"><i class="material-icons">add</i></a>';
                cart += '</div>';
                cart += '</div>';
                cart += '</div>';
                cart += '</div>';
                cart += '</li>';
            });
            $("#cartList").append(cart);
            $(".loader").addClass("hidden");
            monitor = res.monitor;
            pod = res.pod;
            $("#showAmount").append('NGN', res.amount);
            document.getElementById("amount").value = res.amount;
            if (pod !== null) {
                $(".pod").removeClass("hidden");
                $("#confirmDelivery").addClass("hidden");
                /*if (pod === 'cash') {
                     $(".cash").removeClass("hidden");
                     $(".podcard").addClass("hidden");
                     $(".transfer").addClass("hidden");
                 } else if (pod === 'card') {
                     $(".cash").addClass("hidden");
                     $(".podcard").removeClass("hidden");
                     $(".transfer").addClass("hidden");
                 } else if (pod === 'transfer') {
                     $(".cash").addClass("hidden");
                     $(".podcard").addClass("hidden");
                     $(".transfer").removeClass("hidden");
                 } else {
                     console.log('okay');
                 }*/
            }
            if (monitor === 'self') {
                document.getElementById("traceOrder").setAttribute("href", "trace.html?code=" + res.ordercode);
                $(".trace").removeClass("hidden");
            }
        } else if (msg == 'false') {
            $(".noorder").removeClass("hidden");
            $(".myorder").addClass("hidden");
            $(".loader").addClass("hidden");
        }
    },
    error: function(res) {
        console.log(res)
    }
});

//pending delivery
$.ajax({
    url: "https://evolve.capfields.com.ng/user_app/pending.php",
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
            drivername = res.driver;
            $("#drivername").text(drivername);
            driverphone = res.phone;
            document.getElementById("driverphone").setAttribute("href", "Tel:" + driverphone)
            $("#driverphone").text(driverphone);
            orderid = res.ordercode;
            $("#orderid").text(orderid);
            document.getElementById("cartcode").value = orderid;
            plate = res.plate;
            $("#driverplate").text(plate);
            date = res.date;
            $("#orderdate").text(date);
            $(".delivery").removeClass("hidden");

            table = '';
            $.each(res.product, function(key, value) {
                table += '<tr>';
                table += '<td>' + value.p_name + '</td>';
                table += '<td><img src="https://evolve.capfields.com.ng/agent_app/uploads/' + value.photo3 + '" height="100px"></td>';
                table += '</tr>';
            });
            $("#agentuploads").append(table);
        }
    },
    error: function(res) {
        console.log(res);
    }
});
$(document).ready(function(e) {
    $("#uploadimage").on('submit', (function(e) {
        document.getElementById("submitBtn").innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:20px"></i>';

        e.preventDefault();
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/uploadpop.php", // Url to which the request is send
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
                        alert('Receipt uploaded');
                        $("#confirmDelivery").removeClass("hidden");
                    } else {
                        alert(msg);
                        document.getElementById("submitBtn").innerHTML = 'Upload Receipt';
                    }
                },
            error: function(data) {
                console.log(data)
                alert('Error in connection');
                document.getElementById("submitBtn").innerHTML = 'Upload Receipt';
            }
        });
    }));
});
//confirm delivery
$("#confirmDelivery").click(function(e) {
    document.getElementById("confirmDelivery").innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:20px"></i>';
    e.preventDefault();
    code = $("#cartcode").val();
    if (code == "") {
        alert('Error occurred');
        document.getElementById("confirmDelivery").innerHTML = 'Confirm Delivery';
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/oop/confirm-delivery.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                code: code
            },
            success: function(res) {
                console.log(res)
                msg = res.message;
                if (msg == 'success') {
                    alert('Delivery confirmed');
                    location.href = 'rating.html?code=' + code;
                } else {
                    alert(msg);
                    document.getElementById("confirmDelivery").innerHTML = 'Confirm Delivery';
                }
            },
            error: function(res) {
                console.log(res)
                alert('Error in connection');
                document.getElementById("confirmDelivery").innerHTML = 'Confirm Delivery';
            }
        });
    }
});

function podCard() {
    $(".podcards").removeClass("hidden");
    $(".podtransfer").addClass("hidden");
    $(".podcash").addClass("hidden");
}

function podCash() {
    $(".podcards").addClass("hidden");
    $(".podtransfer").addClass("hidden");
    $(".podcash").removeClass("hidden");
}

function podTransfer() {
    $(".podcards").addClass("hidden");
    $(".podtransfer").removeClass("hidden");
    $(".podcash").addClass("hidden");
}

function cashGiven() {
    code = $("#cartcode").val();
    if (code === "") {
        alert('Error occurred');
    } else {
        document.getElementById("cashGiven").innerHTML = 'Loading...';
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/cashgiven.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                code: code
            },
            success: function(res) {
                console.log(res)
                msg = res.message;
                if (msg === 'success') {
                    $("#confirmDelivery").removeClass("hidden");
                    document.getElementById("cashGiven").innerHTML = 'Cash given';
                } else {
                    alert(msg);
                    document.getElementById("cashGiven").innerHTML = 'Cash given';
                }
            },
            error: function(res) {
                console.log(res)
                alert('Error in connection');
                document.getElementById("cashGiven").innerHTML = 'Cash given';
            }
        });
    }
}

function checkDelStat() {
    code = $("#cartcode").val();
    if (code !== "") {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/checkpodstat.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                code: code
            },
            success: function(res) {
                console.log(res)
                stat = res.podstat;
                if (stat === true) {
                    $("#confirmDelivery").removeClass("hidden");
                    $(".pod").addClass("hidden");
                }
            },
            error: function(res) {
                console.log(res)
            }
        });
    }
}

setInterval(checkDelStat, 3000);

function payWithRave() {
    amount = $("#amount").val();
    code = $("#cartcode").val();
    if (amount === "") {
        alert('Error occurred');
    } else if (code === "") {
        alert('Error occurred');
    } else {
        FlutterwaveCheckout({
            public_key: "FLWPUBK-f129a6e0a499714b8d4cc9eb618fc994-X",
            tx_ref: code,
            amount: amount,
            currency: "NGN",
            country: "NG",
            payment_options: "card",
            customer: {
                email: email,
                phone_number: localStorage.getItem("phone"),
                name: localStorage.getItem("custName"),
            },
            callback: function(data) { // specified callback function
                console.log(data);
                status = data.status;
                if (status == 'successful') {
                    $.ajax({
                        url: "https://evolve.capfields.com.ng/user_app/podcarddel.php",
                        type: "POST",
                        headers: {
                            Accept: 'application/json'
                        },
                        data: {
                            email: email,
                            token: token,
                            amount: amount,
                            cartcode: code,
                            reference: data.flw_ref
                        },
                        success: function(res) {
                            console.log(res)
                            msg = res.message;
                            if (msg == 'success') {
                                //window.location = 'submit-order.html';
                            } else {
                                alert(msg);
                            }
                        },
                        error: function(res) {
                            console.log(res)
                            alert('Error occurred. Transaction reference: ' + data.flw_ref);
                        }
                    })
                }
            },
            customizations: {
                title: "Capfields Evolve",
                description: "Payment for items in cart",
                logo: "https://evolve.capfields.com.ng/user_app/img/logo.png",
            },
        });
    }
}

function payWithPaystack() {
    amount = $("#amount").val();
    code = $("#cartcode").val();
    if (amount === "") {
        alert('Error occurred');
    } else if (code === "") {
        alert('Error occurred');
    } else {
        inputamount = amount * 100;
        var handler = PaystackPop.setup({
            key: 'pk_live_73bea53857da2959a95f98f6e41c070115bb74f2',
            email: email,
            amount: inputamount,
            currency: "NGN",
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            metadata: {
                custom_fields: [{
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: "+2348012345678"
                }]
            },
            callback: function(response) {
                alert('success. transaction ref is ' + response.reference);
                $.ajax({
                    url: "https://evolve.capfields.com.ng/user_app/podcarddel.php",
                    type: "POST",
                    headers: {
                        Accept: 'application/json'
                    },
                    data: {
                        email: email,
                        token: token,
                        amount: inputamount,
                        cartcode: code,
                        reference: response.reference
                    },
                    success: function(res) {
                        console.log(res)
                        msg = res.message;
                        if (msg == 'success') {
                            // window.location = 'submit-order.html';
                        } else {
                            alert(msg);
                        }
                    },
                    error: function(res) {
                        console.log(res)
                        alert('Error occurred. Transaction reference: ' + response.reference);
                    }
                })
            },
            onClose: function() {
                alert('window closed');
            }
        });
        handler.openIframe();
    }
}

function namedOrder() {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/oop/namedorder.php",
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
            if (res.order !== false) {
                order = res.order;
                table = '';
                $.each(order, function(key, value) {
                    table += '<tr>';
                    table += '<td style="font-weight:500;color:black;text-transform:capitalize;">' + value.name + '</td>';
                    table += '<td style="font-weight:500;color:black;">N' + value.total + '</td>';
                    table += '<td><a href="future-cart.html?code=' + value.cart_code + '"><button class="btn btn-default" style="text-transform:lowercase;">checkout</button></a></td>';
                    table += '<td><button class="btn btn-primary btn-block" onclick="document.getElementById(\'paycode\').value=' + value.cart_code + ';$(\'.card-footer\').removeClass(\'hidden\');">Pay</button></td>';
                    table += '</tr>';
                });
                $("#namedtable").append(table);
                $(".namedorder").removeClass("hidden");
            }
        },
        error: function(res) {
            console.log(res);
        }
    });
}
window.load = namedOrder();

function instalWallet() {
    amount = $("#payamt").val();
    code = $("#paycode").val();

    if (amount === "") {
        alert('Enter amount');
    } else if (code === "") {
        alert('Error occurred');
    } else {
        $("#instalwallet").html('<i class="fa fa-spin fa-spinner"></i>');
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/oop/instalwallet.php",
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
                console.log(res);
                if (res.message === 'success') {
                    alert('Payment successful');
                    location.href = 'my-order.html';
                } else {
                    alert(res.message);
                    $("#instalwallet").html('wallet');
                }
            },
            error: function(res) {
                console.log(res);
                alert('Error in connection');
                $("#instalwallet").html('wallet');
            }
        });
    }
}

function instalCardPay() {
    amount = $("#payamt").val();
    code = $("#paycode").val();
    if (amount === "") {
        alert('Error occurred');
    } else if (code === "") {
        alert('Error occurred');
    } else {
        inputamount = amount * 100;
        var handler = PaystackPop.setup({
            key: 'pk_live_73bea53857da2959a95f98f6e41c070115bb74f2',
            email: email,
            amount: inputamount,
            currency: "NGN",
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            metadata: {
                custom_fields: [{
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: "+2348012345678"
                }]
            },
            callback: function(response) {
                alert('success. transaction ref is ' + response.reference);
                $("#instalcard").html('<i class="fa fa-spin fa-spinner"></i>');
                $.ajax({
                    url: "https://evolve.capfields.com.ng/user_app/oop/instalcard.php",
                    type: "POST",
                    headers: {
                        Accept: 'application/json'
                    },
                    data: {
                        email: email,
                        token: token,
                        amount: amount,
                        code: code
                    },
                    success: function(res) {
                        console.log(res);
                        if (res.message === 'success') {
                            alert('Payment successful');
                            location.href = 'my-order.html';
                        } else {
                            alert(res.message);
                            $("#instalcard").html('card');
                        }
                    },
                    error: function(res) {
                        console.log(res);
                        alert('Error in connection');
                        $("#instalcard").html('card');
                    }
                });
            },
            onClose: function() {
                alert('window closed');
            }
        });
        handler.openIframe();
    }
}