function ajaxCall() {
    this.send = function(data, url, method, success, type) {
        type = type || 'json';
        var successRes = function(data) {
            success(data);
        };

        var errorRes = function(e) {
            console.log(e);
            alert("Error found \nError Code: " + e.status + " \nError Message: " + e.statusText);
        };
        $.ajax({
            url: url,
            type: method,
            data: data,
            success: successRes,
            error: errorRes,
            dataType: type,
            timeout: 60000
        });

    }

}

function locationInfo() {
    var rootUrl = "https://evolve.capfields.com.ng/user_app/api.php";
    var call = new ajaxCall();
    this.getCities = function(id) {
        $(".dcities option:gt(0)").remove();
        var url = rootUrl + '?type=getCities&stateId=' + id;
        var method = "post";
        var data = {};
        $('.dcities').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            $('.dcities').find("option:eq(0)").html("Select City");
            if (data.tp == 1) {
                $.each(data['result'], function(key, val) {
                    var option = $('<option />');
                    option.attr('value', key).text(val);
                    $('.dcities').append(option);
                });
                $(".dcities").prop("disabled", false);
            } else {
                alert(data.msg);
            }
        });
    };

    this.getStates = function(id) {
        $(".dstates option:gt(0)").remove();
        $(".dcities option:gt(0)").remove();
        var url = rootUrl + '?type=getStates&countryId=' + id;
        var method = "post";
        var data = {};
        $('.dstates').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            $('.dstates').find("option:eq(0)").html("Select State");
            if (data.tp == 1) {
                $.each(data['result'], function(key, val) {
                    var option = $('<option />');
                    option.attr('value', key).text(val);
                    $('.dstates').append(option);
                });
                $(".dstates").prop("disabled", false);
            } else {
                alert(data.msg);
            }
        });
    };

    this.getCountries = function() {
        var url = rootUrl + '?type=getCountries';
        var method = "post";
        var data = {};
        $('.dcountries').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            $('.dcountries').find("option:eq(0)").html("Select Country");
            console.log(data);
            if (data.tp == 1) {
                $.each(data['result'], function(key, val) {
                    var option = $('<option />');
                    option.attr('value', key).text(val);
                    $('.dcountries').append(option);
                });
                $(".dcountries").prop("disabled", false);
            } else {
                alert(data.msg);
            }
        });
    };

}

$(function() {
    var loc = new locationInfo();
    loc.getCountries();
    $(".dcountries").on("change", function(ev) {
        var countryId = $(this).val();
        if (countryId != '') {
            loc.getStates(countryId);
        } else {
            $(".dstates option:gt(0)").remove();
        }
    });
    $(".dstates").on("change", function(ev) {
        var stateId = $(this).val();
        if (stateId != '') {
            loc.getCities(stateId);
        } else {
            $(".dcities option:gt(0)").remove();
        }
    });
});

//update location
$("#updateLocation").click(function(e) {
    document.getElementById("updateLocation").innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:20px"></i>';
    //confirm('Change of location will automatically clear your cart');
    e.preventDefault();
    country = $("#countries").val();
    state = $("#states").val();
    city = $("#cities").val();
    if (country == "") {
        alert('Select country');
        document.getElementById("updateLocation").innerHTML = '<i class="material-icons">arrow_forward</i>';
    } else if (state == "") {
        alert('Select state');
        document.getElementById("updateLocation").innerHTML = '<i class="material-icons">arrow_forward</i>';
    } else if (city == "") {
        alert('Select city');
        document.getElementById("updateLocation").innerHTML = '<i class="material-icons">arrow_forward</i>';
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/location.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                country: country,
                state: state,
                city: city
            },
            success: function(res) {
                console.log(res);
                msg = res.message;
                if (msg == "success") {
                    alert('Location changed successfully');
                    window.location = 'index.html';
                } else {
                    alert(msg);
                    document.getElementById("updateLocation").innerHTML = '<i class="material-icons">arrow_forward</i>';
                }
            },
            error: function(res) {
                console.log(res)
                alert('Error in connection');
                document.getElementById("updateLocation").innerHTML = '<i class="material-icons">arrow_forward</i>';
            }
        });
    }
})