document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
    $("#payMoney").click(function() {
        document.getElementById("payMoney").innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>';
        //alert('okay boss');
        inputamount = $("#amount").val();
        cardno = $("#cardno").val();
        expmnt = $("#expmnt").val();
        expyear = $("#expyear").val();
        cvv = $("#cvv").val();
        code = $("#cartcode").val();
        if (cardno == "") {
            alert('Enter card number');
            document.getElementById("payMoney").innerHTML = 'PAY';
        } else if (expmnt == "") {
            alert('Enter expiry month');
            document.getElementById("payMoney").innerHTML = 'PAY';
        } else if (expyear == "") {
            alert('Enter expiry year');
            document.getElementById("payMoney").innerHTML = 'PAY';
        } else if (cvv == "") {
            alert('Enter CVV');
            document.getElementById("payMoney").innerHTML = 'PAY';
        } else if (inputamount == "") {
            alert('Amount required');
            document.getElementById("payMoney").innerHTML = 'PAY';
        } else if (code == "") {
            alert('Error occurred');
            document.getElementById("payMoney").innerHTML = 'PAY';
        } else {
            amount = inputamount * 100;
            window.PaystackPlugin.chargeCard(
                function(resp) {
                    // charge successful, grab transaction reference - do your thang!
                    console.log('charge successful: ', resp);
                    //$("#resp").append(resp);
                    $.ajax({
                        url: "https://evolve.capfields.com.ng/user_app/paywithcard.php",
                        type: "POST",
                        headers: {
                            Accept: 'application/json'
                        },
                        data: {
                            email: email,
                            token: token,
                            amount: inputamount,
                            cartcode: code
                                //reference: response.reference
                        },
                        success: function(res) {
                            console.log(res)
                            msg = res.message;
                            if (msg == 'success') {
                                window.location = 'submit-order.html';
                            } else {
                                alert(msg);
                                document.getElementById("payMoney").innerHTML = 'PAY';
                            }
                        },
                        error: function(res) {
                            console.log(res)
                            alert('Error occurred');
                            document.getElementById("payMoney").innerHTML = 'PAY';
                        }
                    })
                },
                function(resp) {
                    // Something went wrong, oops - perhaps an invalid card.
                    console.log('charge failed: ', resp);
                    alert('Error charging this card');
                    document.getElementById("payMoney").innerHTML = 'PAY';
                }, {
                    cardNumber: cardno,
                    expiryMonth: expmnt,
                    expiryYear: expyear,
                    cvc: cvv,
                    email: email,
                    amountInKobo: amount,
                    //subAccount: 'ACCT_pz61jjjsslnx1d9',
                });
        }
    })

    $("#paySchedule").click(function() {
        document.getElementById("paySchedule").innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>';
        //alert('okay boss');
        inputamount = $("#amount").val();
        cardno = $("#cardno").val();
        expmnt = $("#expmnt").val();
        expyear = $("#expyear").val();
        cvv = $("#cvv").val();
        code = $("#cartcode").val();
        if (cardno == "") {
            alert('Enter card number');
            document.getElementById("paySchedule").innerHTML = 'PAY';
        } else if (expmnt == "") {
            alert('Enter expiry month');
            document.getElementById("paySchedule").innerHTML = 'PAY';
        } else if (expyear == "") {
            alert('Enter expiry year');
            document.getElementById("paySchedule").innerHTML = 'PAY';
        } else if (cvv == "") {
            alert('Enter CVV');
            document.getElementById("paySchedule").innerHTML = 'PAY';
        } else if (inputamount == "") {
            alert('Amount required');
            document.getElementById("paySchedule").innerHTML = 'PAY';
        } else if (code == "") {
            alert('Error occurred');
            document.getElementById("paySchedule").innerHTML = 'PAY';
        } else {
            amount = inputamount * 100;
            window.PaystackPlugin.chargeCard(
                function(resp) {
                    // charge successful, grab transaction reference - do your thang!
                    console.log('charge successful: ', resp);
                    //$("#resp").append(resp);
                    $.ajax({
                        url: "https://evolve.capfields.com.ng/user_app/paywithcard.php",
                        type: "POST",
                        headers: {
                            Accept: 'application/json'
                        },
                        data: {
                            email: email,
                            token: token,
                            amount: inputamount,
                            cartcode: code
                                //reference: response.reference
                        },
                        success: function(res) {
                            console.log(res)
                            msg = res.message;
                            if (msg == 'success') {
                                window.location = 'select-date-time.html';
                            } else {
                                alert(msg);
                                document.getElementById("paySchedule").innerHTML = 'PAY';
                            }
                        },
                        error: function(res) {
                            console.log(res)
                            alert('Error occurred');
                            document.getElementById("paySchedule").innerHTML = 'PAY';
                        }
                    })
                },
                function(resp) {
                    // Something went wrong, oops - perhaps an invalid card.
                    console.log('charge failed: ', resp);
                    alert('Error charging this card');
                    document.getElementById("paySchedule").innerHTML = 'PAY';
                }, {
                    cardNumber: cardno,
                    expiryMonth: expmnt,
                    expiryYear: expyear,
                    cvc: cvv,
                    email: email,
                    amountInKobo: amount,
                    //subAccount: 'ACCT_pz61jjjsslnx1d9',
                });
        }
    })
    $("#payFlex").click(function() {
        document.getElementById("payFlex").innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>';
        //alert('okay boss');
        inputamount = $("#amountused").val();
        cardno = $("#cardno").val();
        expmnt = $("#expmnt").val();
        expyear = $("#expyear").val();
        cvv = $("#cvv").val();
        code = $("#cartcode").val();
        if (cardno == "") {
            alert('Enter card number');
            document.getElementById("payFlex").innerHTML = 'PAY';
        } else if (expmnt == "") {
            alert('Enter expiry month');
            document.getElementById("payFlex").innerHTML = 'PAY';
        } else if (expyear == "") {
            alert('Enter expiry year');
            document.getElementById("payFlex").innerHTML = 'PAY';
        } else if (cvv == "") {
            alert('Enter CVV');
            document.getElementById("payFlex").innerHTML = 'PAY';
        } else if (inputamount == "") {
            alert('Amount required');
            document.getElementById("payFlex").innerHTML = 'PAY';
        } else if (code == "") {
            alert('Error occurred');
            document.getElementById("payFlex").innerHTML = 'PAY';
        } else {
            amount = inputamount * 100;
            window.PaystackPlugin.chargeCard(
                function(resp) {
                    // charge successful, grab transaction reference - do your thang!
                    console.log('charge successful: ', resp);
                    //$("#resp").append(resp);
                    $.ajax({
                        url: "https://evolve.capfields.com.ng/user_app/repayflex.php",
                        type: "POST",
                        headers: {
                            Accept: 'application/json'
                        },
                        data: {
                            email: email,
                            token: token,
                            amount: inputamount,
                            //reference: response.reference
                        },
                        success: function(res) {
                            console.log(res)
                            msg = res.message;
                            if (msg == 'success') {
                                window.location = 'flex-dashboard.html';
                            } else {
                                alert(msg);
                                document.getElementById("payFlex").innerHTML = 'PAY';
                            }
                        },
                        error: function(res) {
                            console.log(res)
                            alert('Error occurred.');
                            document.getElementById("payFlex").innerHTML = 'PAY';
                        }
                    })
                },
                function(resp) {
                    // Something went wrong, oops - perhaps an invalid card.
                    console.log('charge failed: ', resp);
                    alert('Error charging this card');
                    document.getElementById("payFlex").innerHTML = 'PAY';
                }, {
                    cardNumber: cardno,
                    expiryMonth: expmnt,
                    expiryYear: expyear,
                    cvc: cvv,
                    email: email,
                    amountInKobo: amount,
                    //subAccount: 'ACCT_pz61jjjsslnx1d9',
                });
        }
    })

    $("#payTip").click(function() {
        document.getElementById("payTip").innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>';
        //alert('okay boss');
        inputamount = $("#tipAmount").val();
        cardno = $("#cardno").val();
        expmnt = $("#expmnt").val();
        expyear = $("#expyear").val();
        cvv = $("#cvv").val();
        code = $("#cartcode").val();
        if (cardno == "") {
            alert('Enter card number');
            document.getElementById("payTip").innerHTML = 'PAY';
        } else if (expmnt == "") {
            alert('Enter expiry month');
            document.getElementById("payTip").innerHTML = 'PAY';
        } else if (expyear == "") {
            alert('Enter expiry year');
            document.getElementById("payTip").innerHTML = 'PAY';
        } else if (cvv == "") {
            alert('Enter CVV');
            document.getElementById("payTip").innerHTML = 'PAY';
        } else if (inputamount == "") {
            alert('Amount required');
            document.getElementById("payTip").innerHTML = 'PAY';
        } else if (code == "") {
            alert('Error occurred');
            document.getElementById("payTip").innerHTML = 'PAY';
        } else {
            amount = inputamount * 100;
            window.PaystackPlugin.chargeCard(
                function(resp) {
                    // charge successful, grab transaction reference - do your thang!
                    console.log('charge successful: ', resp);
                    //$("#resp").append(resp);
                    $.ajax({
                        url: "https://evolve.capfields.com.ng/user_app/tipcard.php",
                        type: "POST",
                        headers: {
                            Accept: 'application/json'
                        },
                        data: {
                            email: email,
                            token: token,
                            amount: inputamount,
                            code: code
                        },
                        success: function(res) {
                            console.log(res)
                            msg = res.message;
                            if (msg == 'success') {
                                alert('Thank you for tipping our agent');
                                document.getElementById("payTip").innerHTML = 'PAY';
                            } else {
                                alert(msg);
                                document.getElementById("payTip").innerHTML = 'PAY';
                            }
                        },
                        error: function(res) {
                            console.log(res)
                            alert('Error occurred');
                            document.getElementById("payTip").innerHTML = 'PAY';
                        }
                    })
                },
                function(resp) {
                    // Something went wrong, oops - perhaps an invalid card.
                    console.log('charge failed: ', resp);
                    alert('Error charging this card');
                    document.getElementById("payTip").innerHTML = 'PAY';
                }, {
                    cardNumber: cardno,
                    expiryMonth: expmnt,
                    expiryYear: expyear,
                    cvc: cvv,
                    email: email,
                    amountInKobo: amount,
                    //subAccount: 'ACCT_pz61jjjsslnx1d9',
                });
        }
    })

    $("#payWallet").click(function() {
        document.getElementById("payWallet").innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>';
        //alert('okay boss');
        inputamount = $("#tipAmount").val();
        cardno = $("#cardno").val();
        expmnt = $("#expmnt").val();
        expyear = $("#expyear").val();
        cvv = $("#cvv").val();
        code = $("#cartcode").val();
        if (cardno == "") {
            alert('Enter card number');
            document.getElementById("payWallet").innerHTML = 'PAY';
        } else if (expmnt == "") {
            alert('Enter expiry month');
            document.getElementById("payWallet").innerHTML = 'PAY';
        } else if (expyear == "") {
            alert('Enter expiry year');
            document.getElementById("payWallet").innerHTML = 'PAY';
        } else if (cvv == "") {
            alert('Enter CVV');
            document.getElementById("payWallet").innerHTML = 'PAY';
        } else if (inputamount == "") {
            alert('Amount required');
            document.getElementById("payWallet").innerHTML = 'PAY';
        } else if (code == "") {
            alert('Error occurred');
            document.getElementById("payWallet").innerHTML = 'PAY';
        } else {
            amount = inputamount * 100;
            window.PaystackPlugin.chargeCard(
                function(resp) {
                    // charge successful, grab transaction reference - do your thang!
                    console.log('charge successful: ', resp);
                    //$("#resp").append(resp);
                    $.ajax({
                        url: "https://evolve.capfields.com.ng/user_app/fundwallet.php",
                        type: "POST",
                        headers: {
                            Accept: 'application/json'
                        },
                        data: {
                            email: email,
                            token: token,
                            amount: inputamount
                                //reference: response.reference
                        },
                        success: function(res) {
                            console.log(res)
                            msg = res.message;
                            if (msg == 'success') {
                                window.location = 'thankyou2.html';
                            } else {
                                alert(msg);
                                document.getElementById("payWallet").innerHTML = 'PAY';
                            }
                        },
                        error: function(res) {
                            console.log(res)
                            alert('Error occurred.');
                            document.getElementById("payWallet").innerHTML = 'PAY';
                        }
                    })
                },
                function(resp) {
                    // Something went wrong, oops - perhaps an invalid card.
                    console.log('charge failed: ', resp);
                    alert('Error charging this card');
                    document.getElementById("payWallet").innerHTML = 'PAY';
                }, {
                    cardNumber: cardno,
                    expiryMonth: expmnt,
                    expiryYear: expyear,
                    cvc: cvv,
                    email: email,
                    amountInKobo: amount,
                    //subAccount: 'ACCT_pz61jjjsslnx1d9',
                });
        }
    })

    $("#paySub").click(function() {
            document.getElementById("paySub").innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>';
            //alert('okay boss');
            inputamount = $("#amount").val();
            cardno = $("#cardno").val();
            expmnt = $("#expirymnt").val();
            expyear = $("#expiryyear").val();
            cvv = $("#cvv").val();
            code = $("#code").val();
            if (cardno == "") {
                alert('Enter card number');
                document.getElementById("paySub").innerHTML = 'PAY';
            } else if (expmnt == "") {
                alert('Enter expiry month');
                document.getElementById("paySub").innerHTML = 'PAY';
            } else if (expyear == "") {
                alert('Enter expiry year');
                document.getElementById("paySub").innerHTML = 'PAY';
            } else if (cvv == "") {
                alert('Enter CVV');
                document.getElementById("paySub").innerHTML = 'PAY';
            } else if (inputamount == "") {
                alert('Amount required');
                document.getElementById("paySub").innerHTML = 'PAY';
            } else if (code == "") {
                alert('Error occurred');
                document.getElementById("paySub").innerHTML = 'PAY';
            } else {
                amount = inputamount * 100;
                window.PaystackPlugin.chargeCard(
                    function(resp) {
                        // charge successful, grab transaction reference - do your thang!
                        console.log('charge successful: ', resp);
                        //$("#resp").append(resp);
                        $.ajax({
                            url: "https://evolve.capfields.com.ng/user_app/paysub.php",
                            type: "POST",
                            headers: {
                                Accept: 'application/json'
                            },
                            data: {
                                email: email,
                                token: token,
                                amount: inputamount,
                                code: code
                                    //reference: response.reference
                            },
                            success: function(res) {
                                console.log(res)
                                msg = res.message;
                                if (msg == 'success') {
                                    alert('Subscription successful');
                                } else {
                                    alert(msg);
                                    document.getElementById("paySub").innerHTML = 'PAY';
                                }
                            },
                            error: function(res) {
                                console.log(res)
                                alert('Error occurred.');
                                document.getElementById("paySub").innerHTML = 'PAY';
                            }
                        })
                    },
                    function(resp) {
                        // Something went wrong, oops - perhaps an invalid card.
                        console.log('charge failed: ', resp);
                        alert('Error charging this card');
                        document.getElementById("payWallet").innerHTML = 'PAY';
                    }, {
                        cardNumber: cardno,
                        expiryMonth: expmnt,
                        expiryYear: expyear,
                        cvc: cvv,
                        email: email,
                        amountInKobo: amount,
                        //subAccount: 'ACCT_pz61jjjsslnx1d9',
                    });
            }
        })
        //window.load = payMoney();
}