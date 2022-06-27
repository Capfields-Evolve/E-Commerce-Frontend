var email = localStorage.getItem("email");
var token = localStorage.getItem("token");
$.fn.digits = function() {
    return this.each(function() {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    })
}
if (email !== null || token !== null) {

    var fetchProfile = () => {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/bill/profile.php",
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
                if (msg === 'success') {
                    prof = res.profile;
                    wallet = res.wallet;
                    $("#cname").append(prof.fname, ' ', prof.lname);
                    $("#useremail").text(email);
                    $("#myname").append(prof.fname, ' ', prof.lname);
                    $("#myemail").text(email);
                    $("#walletbal").append('&#8358;', wallet.balance).digits();
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }

    window.load = fetchProfile();

    var buyAirtime = () => {
        phone = $("#airtimephone").val();
        amount = $("#airtimeamount").val();

        if (phone === "") {
            alert('Enter phone number');
        } else if (amount === "") {
            alert('Enter amount');
        } else if (phone.length !== 11) {
            alert('Invalid phone number');
        } else if (amount < 100) {
            alert('Minimum amount is NGN100');
        } else if (amount > 10000) {
            alert('Maximum amount is NGN10,000');
        } else {
            document.getElementById("buyAirtime").innerHTML = '<i class="fa fa-spin fa-spinner"></i>';
            $.ajax({
                url: "https://evolve.capfields.com.ng/user_app/bill/airtime.php",
                type: "POST",
                headers: {
                    Accept: 'application/json'
                },
                data: {
                    email: email,
                    token: token,
                    phone: phone,
                    amount: amount
                },
                success: function(res) {
                    console.log(res);
                    msg = res.message;
                    if (msg === 'success') {
                        alert('Transaction successful');
                        location.href = "index.html";
                    } else if (msg === 'Insufficient balance') {
                        alert(msg);
                        location.href = '../fundwallet.html';
                        document.getElementById("buyAirtime").innerHTML = 'Buy Airtime';
                    } else {
                        alert(msg);
                        document.getElementById("buyAirtime").innerHTML = 'Buy Airtime';
                    }
                },
                error: function(res) {
                    console.log(res)
                    alert('Error in connection');
                    document.getElementById("buyAirtime").innerHTML = 'Buy Airtime';
                }
            });
        }
    }

    var banklist = () => {
        const key = 'FLWPUBK-f129a6e0a499714b8d4cc9eb618fc994-X';
        //bank list
        $.ajax({
            url: "https://api.ravepay.co/v2/banks/NG?public_key=" + key,
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            success: function(res) {
                console.log(res);
                var status = res.status;
                if (status == 'success') {
                    var bank = '';
                    $.each(res.data.Banks, function(key, value) {
                        bank += '<option value="' + value.Code + '">' + value.Name + '</option>';
                    });
                    $("#banks").append(bank);
                }
            },
            error: function(res) {
                console.log(res);
                banklist();
                //alert('Error fetching banks');
                //location.href = 'sendmoney.html';
            }
        });
    }
    window.load = banklist();

    function logout() {
        localStorage.removeItem("email");
        location.replace('../login.html');
    }

    var verifyAccount = () => {
        const key = 'FLWPUBK-f129a6e0a499714b8d4cc9eb618fc994-X';
        acctno = $("#acctno").val();
        bank = $("#banks").val();
        if (acctno.length !== 10) {
            alert('Invalid account number');
        } else {
            $.ajax({
                url: "https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account",
                type: "POST",
                header: {
                    Accept: 'application/json'
                },
                data: {
                    recipientaccount: acctno,
                    destbankcode: bank,
                    PBFPubKey: key
                },
                success: function(res) {
                    console.log(res);
                    var status = res.status;
                    var message = res.message;
                    if (status == 'success') {
                        var accname = res.data.data.accountname;
                        var msg = res.data.data.responsemessage;
                        if (accname !== null) {
                            $("#accountname").text(accname);
                            document.getElementById("accname").value = accname;
                            $("#acctname").text(accname);
                            $(".rest").fadeIn(1000);
                        } else {
                            alert(msg);
                        }
                    } else {
                        alert(message);
                    }
                },
                error: function(res) {
                    console.log(res);
                }
            });
        }
    }

    var sendMoney = () => {
        acctno = $("#acctno").val();
        bank = $("#banks").val();
        acctname = $("#accname").val();
        amount = $("#sendamount").val();
        nar = $("#narration").val();

        if (acctno.length !== 10) {
            alert('Invalid account number');
        } else if (bank === "") {
            alert('Select bank');
        } else if (acctname === "") {
            alert('Name verification failed');
        } else if (amount === "") {
            alert('Enter amount');
        } else if (nar === "") {
            alert('Enter narration');
        } else {
            document.getElementById("sendMoney").innerHTML = 'Sending...';
            $.ajax({
                url: "https://evolve.capfields.com.ng/user_app/bill/transfer.php",
                type: "POST",
                headers: {
                    Accept: 'application/json'
                },
                data: {
                    email: email,
                    token: token,
                    amount: amount,
                    acctno: acctno,
                    bank: bank,
                    acctname: acctname,
                    narration: nar
                },
                success: function(res) {
                    console.log(res)
                    msg = res.message;
                    if (msg === 'success') {
                        alert('Transfer successful');
                        location.href = 'index.html';
                    } else if (msg === 'Insufficient balance') {
                        alert(msg);
                        location.href = '../fundwallet.html';
                    } else {
                        alert(msg);
                        document.getElementById("sendMoney").innerHTML = 'Send Money';
                    }
                },
                error: function(res) {
                    console.log(res)
                    alert('Error in connection');
                    document.getElementById("sendMoney").innerHTML = 'Send Money';
                }
            });
        }
    }

    function dsTv() {
        $(".dstv").fadeIn(1000);
        $(".gotv").fadeOut("fast");
    }

    function goTv() {
        $(".gotv").fadeIn(1000);
        $(".dstv").fadeOut("fast");
    }

    function billCategory() {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/bill/bill-category.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            success: function(res) {
                console.log(res)
                json = res.response.data;
                //console.log(json)
                item = json.filter(item => item.biller_code == "BIL108");
                //console.log(item);
                mtnplan = '';
                $.each(item, function(key, value) {
                    mtnplan += "<option value='{\"name\":\"" + value.name + "\", \"amount\":\"" + value.amount + "\"}'>" + value.name + " @ &#8358;" + value.amount + "</option>";
                });
                $("#mtnDataPlan").append(mtnplan);

                item2 = json.filter(item2 => item2.biller_code == "BIL109");
                gloplan = '';
                $.each(item2, function(key, value) {
                    gloplan += "<option value='{\"name\":\"" + value.name + "\", \"amount\":\"" + value.amount + "\"}'>" + value.name + " @ &#8358;" + value.amount + "</option>";
                })
                $("#gloDataPlan").append(gloplan)

                item3 = json.filter(item3 => item3.biller_code == "BIL110");
                airtelplan = '';
                $.each(item3, function(key, value) {
                    airtelplan += "<option value='{\"name\":\"" + value.name + "\", \"amount\":\"" + value.amount + "\"}'>" + value.name + " @ &#8358;" + value.amount + "</option>";
                })
                $("#airtelDataPlan").append(airtelplan)

                item4 = json.filter(item4 => item4.biller_code == "BIL111");
                mobileplan = '';
                $.each(item4, function(key, value) {
                    mobileplan += "<option value='{\"name\":\"" + value.name + "\", \"amount\":\"" + value.amount + "\"}'>" + value.name + " @ &#8358;" + value.amount + "</option>";
                })
                $("#mobileDataPlan").append(mobileplan);

                dstvp = json.filter(dstvp => dstvp.biller_code == "BIL121");
                dstvpackage = '';
                $.each(dstvp, function(key, value) {
                    dstvpackage += "<option value='{\"name\":\"" + value.name + "\", \"amount\":\"" + value.amount + "\"}'>" + value.name + " @ &#8358;" + value.amount + "</option>";
                })
                $("#dstvpackage").append(dstvpackage);

                gotvp = json.filter(gotvp => gotvp.biller_code == "BIL122");
                gotvpackage = '';
                $.each(gotvp, function(key, value) {
                    gotvpackage += "<option value='{\"name\":\"" + value.name + "\", \"amount\":\"" + value.amount + "\"}'>" + value.name + " @ &#8358;" + value.amount + "</option>";
                })
                $("#gotvpackage").append(gotvpackage);
            },
            error: function(res) {
                console.log(res)
                    //alert('Error fetching bill payment categories');
                billCategory();
            }
        });
    }

    window.load = billCategory();

    var subDstv = () => {
        cardno = $("#dstvcard").val();
        pack = $("#dstvpackage").val();
        if (pack === "") {
            alert('Select package');
        } else if (cardno === "") {
            alert('Enter smart card number');
        } else {
            pack = JSON.parse(pack);
            amount = pack.amount;
            packname = pack.name;
            if (amount === '0') {
                alert('Invalid package selected');
            } else {
                document.getElementById("subDstv").innerHTML = 'Loading...';
                $.ajax({
                    url: "https://evolve.capfields.com.ng/user_app/bill/cable.php",
                    type: "POST",
                    headers: {
                        Accept: 'application/json'
                    },
                    data: {
                        email: email,
                        token: token,
                        cardno: cardno,
                        amount: amount,
                        name: packname,
                        type: 'DSTV'
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.message === 'success') {
                            alert('Subscription successful');
                            location.href = 'index.html';
                        } else if (msg === 'Insufficient balance') {
                            alert(msg);
                            location.href = '../fundwallet.html';
                        } else {
                            alert(res.message);
                            document.getElementById("subDstv").innerHTML = 'Subscribe';
                        }
                    },
                    error: function(res) {
                        console.log(res)
                        alert('Error in connection');
                        document.getElementById("subDstv").innerHTML = 'Subscribe';
                    }
                });
            }
        }
    }

    var subGotv = () => {
        cardno = $("#gotvcard").val();
        pack = $("#gotvpackage").val();
        if (pack === "") {
            alert('Select package');
        } else if (cardno === "") {
            alert('Enter smart card number');
        } else {
            pack = JSON.parse(pack);
            amount = pack.amount;
            packname = pack.name;
            if (amount === '0') {
                alert('Invalid package selected');
            } else {
                document.getElementById("subGotv").innerHTML = 'Loading...';
                $.ajax({
                    url: "https://evolve.capfields.com.ng/user_app/bill/cable.php",
                    type: "POST",
                    headers: {
                        Accept: 'application/json'
                    },
                    data: {
                        email: email,
                        token: token,
                        cardno: cardno,
                        amount: amount,
                        name: packname,
                        type: 'GOTV'
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.message === 'success') {
                            alert('Subscription successful');
                            location.href = 'index.html';
                        } else if (msg === 'Insufficient balance') {
                            alert(msg);
                            location.href = '../fundwallet.html';
                        } else {
                            alert(res.message);
                            document.getElementById("subGotv").innerHTML = 'Subscribe';
                        }
                    },
                    error: function(res) {
                        console.log(res)
                        alert('Error in connection');
                        document.getElementById("subGotv").innerHTML = 'Subscribe';
                    }
                });
            }
        }
    }

    function mtn() {
        $(".mtn").fadeIn(1000);
        $(".glo").fadeOut("fast");
        $(".airtel").fadeOut("fast");
        $(".mobile").fadeOut("fast");
    }

    function glo() {
        $(".mtn").fadeOut("fast");
        $(".glo").fadeIn(1000);
        $(".airtel").fadeOut("fast");
        $(".mobile").fadeOut("fast");
    }

    function airtel() {
        $(".mtn").fadeOut("fast");
        $(".glo").fadeOut("fast");
        $(".airtel").fadeIn(1000);
        $(".mobile").fadeOut("fast");
    }

    function mobile() {
        $(".mtn").fadeOut("fast");
        $(".glo").fadeOut("fast");
        $(".airtel").fadeOut("fast");
        $(".mobile").fadeIn(1000);
    }

    var subMtn = () => {
        phone = $("#mtnno").val();
        plan = $("#mtnDataPlan").val();
        if (phone === "") {
            alert('Enter phone number');
        } else if (phone.length !== 11) {
            alert('Invalid phone number');
        } else {
            plan2 = JSON.parse(plan)
            amount = plan2.amount;
            planname = plan2.name;
            if (amount === "") {
                alert('Select package');
            } else if (planname === "") {
                alert('Select package');
            } else if (amount === 0) {
                alert('Invalid selection');
            } else {
                document.getElementById("subMtn").innerHTML = 'Loading...';
                $.ajax({
                    url: "https://evolve.capfields.com.ng/user_app/bill/dataplan.php",
                    type: "POST",
                    headers: {
                        Accept: 'application/json'
                    },
                    data: {
                        email: email,
                        token: token,
                        amount: amount,
                        plan: planname,
                        phone: phone
                    },
                    success: function(res) {
                        console.log(res)
                        msg = res.message;
                        if (msg === 'success') {
                            alert('Subscription successful');
                            location.href = 'index.html';
                        } else {
                            alert(msg);
                            document.getElementById("subMtn").innerHTML = 'Buy Data';
                        }
                    },
                    error: function(res) {
                        console.log(res)
                        alert('Error in connection');
                        document.getElementById("subMtn").innerHTML = 'Buy Data';
                    }
                });
            }
        }
    }

    var subGlo = () => {
        phone = $("#glono").val();
        plan = $("#gloDataPlan").val();
        if (phone === "") {
            alert('Enter phone number');
        } else if (phone.length !== 11) {
            alert('Invalid phone number');
        } else {
            plan2 = JSON.parse(plan)
            amount = plan2.amount;
            planname = plan2.name;
            if (amount === "") {
                alert('Select package');
            } else if (planname === "") {
                alert('Select package');
            } else if (amount === 0) {
                alert('Invalid selection');
            } else {
                document.getElementById("subGlo").innerHTML = 'Loading...';
                $.ajax({
                    url: "https://evolve.capfields.com.ng/user_app/bill/dataplan.php",
                    type: "POST",
                    headers: {
                        Accept: 'application/json'
                    },
                    data: {
                        email: email,
                        token: token,
                        amount: amount,
                        plan: planname,
                        phone: phone
                    },
                    success: function(res) {
                        console.log(res)
                        msg = res.message;
                        if (msg === 'success') {
                            alert('Subscription successful');
                            location.href = 'index.html';
                        } else if (msg === 'Insufficient balance') {
                            alert(msg);
                            location.href = '../fundwallet.html';
                        } else {
                            alert(msg);
                            document.getElementById("subGlo").innerHTML = 'Buy Data';
                        }
                    },
                    error: function(res) {
                        console.log(res)
                        alert('Error in connection');
                        document.getElementById("subGlo").innerHTML = 'Buy Data';
                    }
                });
            }
        }
    }

    var subAirtel = () => {
        phone = $("#airtelno").val();
        plan = $("#airtelDataPlan").val();
        if (phone === "") {
            alert('Enter phone number');
        } else if (phone.length !== 11) {
            alert('Invalid phone number');
        } else {
            plan2 = JSON.parse(plan)
            amount = plan2.amount;
            planname = plan2.name;
            if (amount === "") {
                alert('Select package');
            } else if (planname === "") {
                alert('Select package');
            } else if (amount === 0) {
                alert('Invalid selection');
            } else {
                document.getElementById("subAirtel").innerHTML = 'Loading...';
                $.ajax({
                    url: "https://evolve.capfields.com.ng/user_app/bill/dataplan.php",
                    type: "POST",
                    headers: {
                        Accept: 'application/json'
                    },
                    data: {
                        email: email,
                        token: token,
                        amount: amount,
                        plan: planname,
                        phone: phone
                    },
                    success: function(res) {
                        console.log(res)
                        msg = res.message;
                        if (msg === 'success') {
                            alert('Subscription successful');
                            location.href = 'index.html';
                        } else if (msg === 'Insufficient balance') {
                            alert(msg);
                            location.href = '../fundwallet.html';
                        } else {
                            alert(msg);
                            document.getElementById("subAirtel").innerHTML = 'Buy Data';
                        }
                    },
                    error: function(res) {
                        console.log(res)
                        alert('Error in connection');
                        document.getElementById("subAirtel").innerHTML = 'Buy Data';
                    }
                });
            }
        }
    }

    var subMobile = () => {
        phone = $("#mobileno").val();
        plan = $("#mobileDataPlan").val();
        if (phone === "") {
            alert('Enter phone number');
        } else if (phone.length !== 11) {
            alert('Invalid phone number');
        } else {
            plan2 = JSON.parse(plan)
            amount = plan2.amount;
            planname = plan2.name;
            if (amount === "") {
                alert('Select package');
            } else if (planname === "") {
                alert('Select package');
            } else if (amount === 0) {
                alert('Invalid selection');
            } else {
                document.getElementById("subMobile").innerHTML = 'Loading...';
                $.ajax({
                    url: "https://evolve.capfields.com.ng/user_app/bill/dataplan.php",
                    type: "POST",
                    headers: {
                        Accept: 'application/json'
                    },
                    data: {
                        email: email,
                        token: token,
                        amount: amount,
                        plan: planname,
                        phone: phone
                    },
                    success: function(res) {
                        console.log(res)
                        msg = res.message;
                        if (msg === 'success') {
                            alert('Subscription successful');
                            location.href = 'index.html';
                        } else if (msg === 'Insufficient balance') {
                            alert(msg);
                            location.href = '../fundwallet.html';
                        } else {
                            alert(msg);
                            document.getElementById("subMobile").innerHTML = 'Buy Data';
                        }
                    },
                    error: function(res) {
                        console.log(res)
                        alert('Error in connection');
                        document.getElementById("subMobile").innerHTML = 'Buy Data';
                    }
                });
            }
        }
    }

    var fetchNoBill = () => {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/bill/fetchbill.php",
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
                $("#airtimeTotal").text(res.airtime);
                $("#transferTotal").text(res.transfer);
                $("#cableTotal").text(res.cable);
                $("#dataTotal").text(res.data);
            },
            error: function(res) {
                console.log(res)
            }
        })
    }

    window.load = fetchNoBill();

} else {
    location.replace('../login.html');
}