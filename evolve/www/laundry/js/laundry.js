var email = localStorage.getItem("email");
var token = localStorage.getItem("token");
var fetchCloth = () => {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/laundry/fetchcloth.php",
        type: "POST",
        headers: {
            Accept: 'application/json'
        },
        success: function(res) {
            console.log(res);
            cloth = '';
            $.each(res.cloth, function(key, value) {
                cloth += '<div class="col-6 col-md-4 col-lg-3 col-xl-2">';
                cloth += '<div class="card shadow-sm border-0 mb-4">';
                cloth += '<div class="card-body">';
                //cloth += '<button class="btn btn-sm btn-link p-0"><i class="material-icons md-18">favorite_outline</i></button>';
                //cloth += '<div class="badge badge-success float-right mt-1">best</div>';
                cloth += '<a href="details.html?code=' + value.code + '"><figure class="cloth-image"><img src="https://evolve.capfields.com.ng/view/laundry/' + value.photo + '" alt="" class="" height="100"></figure></a>';
                cloth += '<a href="details.html?code=' + value.code + '" class="text-dark mb-1 mt-2 h6 d-block textwrap">' + value.name + '</a>';
                cloth += '<h5 class="text-success font-weight-normal mb-0">&#8358;' + parseInt(value.price - value.discount) + '</h5>';
                cloth += '<button class="btn btn-default button-rounded-36 shadow-sm float-bottom-right" onclick="$.ajax({url: \'https://evolve.capfields.com.ng/user_app/laundry/addtocart.php\', type: \'POST\', headers: {Accept: \'application/json\'}, data: {email: email, token: token, code: ' + value.code + '}, success: function(res){console.log(res);status=res.status; msg=res.message; if(msg==\'success\'){alert(\'Added successfully\')}else if(msg==\'false\'){location.href=\'location.html\'} else{alert(msg)}}, error: function(res){alert(\'Error in connection\')}})"><i class="material-icons md-18">shopping_cart</i></button>';
                cloth += ' </div>';
                cloth += ' </div>';
                cloth += ' </div>';
            });
            $("#cloth").append(cloth);
            $(".loader").addClass("hidden");
        },
        error: function(res) {
            console.log(res);
        }
    });
}

var getCloth = (code) => {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/laundry/detail.php",
        type: "POST",
        headers: {
            Accept: 'application/json'
        },
        data: {
            code: code
        },
        success: function(res) {
            console.log(res);
            pic = res.cloth.photo;
            document.getElementById("pic1").setAttribute("src", "https://evolve.capfields.com.ng/view/laundry/" + pic);
            $("#pname").text(res.cloth.name);
            $("#desc").text(res.cloth.description);
            $("#wprice").append('N', res.cloth.price);
            $("#iprice").append('N', res.cloth.iron_price);
            $("#sprice").append('N', res.cloth.starch_price);
            $("#discount").append('N', res.cloth.discount);
        },
        error: function(res) {
            console.log(res);
        }
    })
}

var addCart = () => {
    code = $("#ccode").val();
    if (code === "") {
        alert('Invalid action');
    } else if (localStorage.getItem("email") === "" && localStorage.getItem("token") === "") {
        location.replace('../login.html');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/addtocart.php",
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
                console.log(res);
                if (res.message === 'success') {
                    alert('Added successfully');
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
                alert('Error in connection');
            }
        })
    }

}

var fetchCart = () => {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/laundry/fetchcart.php",
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
            cart = '';
            total = res.total;
            if (res.message === 'success') {
                $.each(res.cart, function(key, value) {
                    cart += '<li class="list-group-item">';
                    cart += '<div class="row">';
                    cart += '<div class="col-auto align-self-center">';
                    cart += '<button class="btn btn-sm btn-link p-0 float-right" onclick="$.ajax({url: \'https://evolve.capfields.com.ng/user_app/laundry/removecart.php\', type: \'POST\', headers: {Accept: \'application/json\'}, data: {id: ' + value.id + '}, success: function(res){msg=res.message; if(msg===\'success\'){fetchCart()} else {alert(msg)}}, error: function(res){alert(\'Error in connection\')}})"><i class="material-icons">remove_circle</i></button>';
                    cart += '</div>';
                    cart += '<div class="col-2 pl-0 align-self-center">';
                    cart += '<figure class="product-image h-auto"><img src="https://evolve.capfields.com.ng/view/laundry/' + value.image + '" alt="" class="vm"></figure>';
                    cart += '</div>';
                    cart += '<div class="col px-0">';
                    cart += '<a href="#" class="text-dark mb-1 h6 d-block textwrap" style="text-transform:capitalize">' + value.name + '</a>';
                    cart += '<h5 class="text-success font-weight-normal mb-0">₦' + value.total + '<sup>.00</sup></h5>';
                    cart += '</div>';
                    cart += '<div class="col-auto align-self-center">';
                    cart += '<div class="input-group input-group-sm">';
                    //cart += '<div class="input-group-prepend">';
                    //cart += '<a href="#" class="btn btn-light-grey px-1" style="background:none;" onclick="$.ajax({url: \'https://evolve.capfields.com.ng/user_app/minuscart.php\', type: \'POST\', headers: {Accept: \'application/json\'}, data: {email: email, token: token, code: ' + value.id + '}, success: function(res){status=res.status; msg=res.message; if(status==\'true\'){cartLog()} else {alert(msg)}}, error: function(res){alert(\'Error in connection\')}})"><i class="material-icons">remove</i></a>';
                    //cart += '</div>';
                    //cart += '<input type="text" class="form-control w-35" placeholder="" value="' + value.quantity + '" disabled>';
                    //cart += '<div class="input-group-append">';
                    //cart += '<a href="#" onclick="$.ajax({url: \'https://evolve.capfields.com.ng/user_app/pluscart.php\', type: \'POST\', headers: {Accept: \'application/json\'}, data: {email: email, token: token, code: ' + value.id + '}, success: function(res){status=res.status; msg=res.message; if(status==\'true\'){cartLog()} else {alert(msg)}}, error: function(res){alert(\'Error in connection\')}})"  class="btn btn-light-grey px-1" style="background:none;"><i class="material-icons">add</i></a>';
                    //cart += '</div>';
                    cart += '</div>';
                    cart += '</div>';
                    cart += '</div>';
                    cart += '</li>';
                });
                $("#cartList").append(cart);
                $("#totalPrice").append('₦', total);
                $("#payablePrice").append('₦', total);
                $(".loader").addClass("hidden");
            }
        },
        error: function(res) {
            console.log(res);
        }
    });
}

var submitCloth = () => {
    qty = $("#cqt").val();
    wp = $("#cwp").val();
    ip = $("#cip").val();
    sp = $("#csp").val();
    type = 'clothes';
    //alert(ip);
    if (qty === "" || wp === "" || ip === "" || sp === "") {
        alert('Invalid number. Check quantity inputted and other values');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/add.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                qty: qty,
                wp: wp,
                ip: ip,
                sp: sp,
                type: type
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    alert('Submitted successfully');
                } else if (res.message === 'Error') {
                    location.replace('../login.html');
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
}

var submitDuve = () => {
    qty = $("#dqt").val();
    wp = $("#dwq").val();
    ip = $("#diq").val();
    sp = $("#dsq").val();
    type = 'duvet';

    if (qty === "" || wp === "" || ip === "" || sp === "") {
        alert('Invalid number. Check quantity inputted and other values');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/add.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                qty: qty,
                wp: wp,
                ip: ip,
                sp: sp,
                type: type
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    alert('Submitted successfully');
                } else if (res.message === 'Error') {
                    location.replace('../login.html');
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
}

var submitBed = () => {
    qty = $("#bqt").val();
    wp = $("#bwq").val();
    ip = $("#biq").val();
    sp = $("#bsq").val();
    type = 'bedsheet';

    if (qty === "" || wp === "" || ip === "" || sp === "") {
        alert('Invalid number. Check quantity inputted and other values');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/add.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                qty: qty,
                wp: wp,
                ip: ip,
                sp: sp,
                type: type
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    alert('Submitted successfully');
                } else if (res.message === 'Error') {
                    location.replace('../login.html');
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
}

var submitSuit = () => {
    qty = $("#sqt").val();
    wp = $("#swq").val();
    ip = $("#siq").val();
    sp = $("#ssq").val();
    type = 'suit';

    if (qty === "" || wp === "" || ip === "" || sp === "") {
        alert('Invalid number. Check quantity inputted and other values');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/add.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                qty: qty,
                wp: wp,
                ip: ip,
                sp: sp,
                type: type
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    alert('Submitted successfully');
                } else if (res.message === 'Error') {
                    location.replace('../login.html');
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
}

var submitBlanket = () => {
    qty = $("#blqt").val();
    wp = $("#blwq").val();
    ip = $("#bliq").val();
    sp = $("#blsq").val();
    type = 'blanket';

    if (qty === "" || wp === "" || ip === "" || sp === "") {
        alert('Invalid number. Check quantity inputted and other values');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/add.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                qty: qty,
                wp: wp,
                ip: ip,
                sp: sp,
                type: type
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    alert('Submitted successfully');
                } else if (res.message === 'Error') {
                    location.replace('../login.html');
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
}

var submitCurtain = () => {
    qty = $("#cuqt").val();
    wp = $("#cuwq").val();
    ip = $("#cuiq").val();
    sp = $("#cusq").val();
    type = 'curtain';

    if (qty === "" || wp === "" || ip === "" || sp === "") {
        alert('Invalid number. Check quantity inputted and other values');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/add.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                qty: qty,
                wp: wp,
                ip: ip,
                sp: sp,
                type: type
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    alert('Submitted successfully');
                } else if (res.message === 'Error') {
                    location.replace('../login.html');
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
}

var submitRug = () => {
    qty = $("#rqt").val();
    wp = $("#rwq").val();
    ip = $("#riq").val();
    sp = $("#rsq").val();
    type = 'centerrug';

    if (qty === "" || wp === "" || ip === "" || sp === "") {
        alert('Invalid number. Check quantity inputted and other values');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/add.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                qty: qty,
                wp: wp,
                ip: ip,
                sp: sp,
                type: type
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    alert('Submitted successfully');
                } else if (res.message === 'Error') {
                    location.replace('../login.html');
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
}

var submitLaundry = () => {
    $("#submitLaundry").html('<i class="fa fa-spin fa-spinner fa-2x"></i>');
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/laundry/submit-laundry.php",
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
            if (res.message === 'success') {
                location.href = 'cart.html';
            } else {
                alert(res.message);
                $("#submitLaundry").html('Submit');
            }
        },
        error: function(res) {
            console.log(res);
            alert('Error in connection');
            $("#submitLaundry").html('Submit');
        }
    });
}

var checkOut = () => {
    country = $("#countries").val();
    state = $("#states").val();
    city = $("#cities").val();
    address = $("#address").val();
    if (country === "") {
        alert('Select delivery country');
    } else if (state === "") {
        alert('Select delivery state');
    } else if (city === "") {
        alert('Select delivery city');
    } else if (address === "") {
        alert('Enter delivery address');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/checkout.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                country: country,
                state: state,
                city: city,
                address: address
            },
            success: function(res) {
                console.log(res);
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
}

var dropOff = () => {
    $(".dropoff").toggleClass("hidden");
    $(".delivery").toggleClass("hidden");
}

var loadDropOff = () => {
    country = $("#dcountries").val();
    state = $("#dstates").val();
    //city = $("#dcities").val();
    if (country === "") {
        alert("Select country");
    } else if (state === "") {
        alert("Select state");
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/loaddrop.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                country: country,
                state: state
                    //city: city
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    drop = '';
                    $.each(res.drop, function(key, value) {
                        drop += '<option value="' + value.id + '">' + value.point + '</option>';
                    });
                    $("#dropoff").append(drop);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
}

var submitDropOff = () => {
    country = $("#dcountries").val();
    state = $("#dstates").val();
    city = $("#dcities").val();
    drop = $("#dropoff").val();
    if (country === "") {
        alert('Select country');
    } else if (state === "") {
        alert('Select state');
    } else if (city === "") {
        alert('Select city');
    } else if (drop === "") {
        alert('Select dropoff');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/laundry/submit-dropoff.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                country: country,
                state: state,
                city: city,
                drop: drop
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    location.href = 'checkout.html';
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
}

var fetchCheckout = () => {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/laundry/fetch-checkout.php",
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
            if (res.message === 'success') {
                //₦$
                $("#totalAmount").append('₦', res.checkout.amount);
                total = parseInt(res.checkout.amount) + parseInt(res.checkout.delivery_fee) + parseInt(res.checkout.pickup_fee);
                $("#total").append('₦', total);
                charges = parseInt(res.checkout.delivery_fee) + parseInt(res.checkout.pickup_fee);
                $("#charges").append('₦', charges);
                $("#payable").append('₦', total);
            }
        },
        error: function(res) {
            coneole.log(res);
        }
    });
}

var payWithCard = () => {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/laundry/getamount.php",
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
            if (res.message === 'success') {
                amount = parseInt(res.amount);
                code = res.code;
                makePayment(amount, code);
            }
        },
        error: function(res) {
            console.log(res);
        }
    });
}

function makePayment(amount, code) {

    FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-c043eac6aa9d55c539b78f467a70d4f9-X",
        tx_ref: code,
        amount: amount,
        currency: "NGN",
        country: "NG",
        payment_options: "card",
        customer: {
            email: email,
            phone_number: '08032390769',
            name: 'Akinjide Marvelous',
        },
        callback: function(data) { // specified callback function
            console.log(data);
            stat = data.status;
            if (stat == 'successful') {
                $.ajax({
                    url: "https://evolve.capfields.com.ng/user_app/laundry/paywithcard.php",
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
                            alert('Payment successful');
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
            title: "Evolve Laundry",
            description: "Payment for Laundry",
            logo: "https://evolve.capfields.com.ng/user_app/img/logo.png",
        },
    });

}

var payWithWallet = () => {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/laundry/paywithwallet.php",
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
        },
        error: function(res) {
            console.log(res);
        }
    });
}