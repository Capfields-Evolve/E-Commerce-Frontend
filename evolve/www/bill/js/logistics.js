/*function initMap() {
    var bounds = new google.maps.LatLngBounds;
    var markersArray = [];

    var origin1 = 'Lagos, Nigeria';
    var origin2 = 'Greenwich, England';
    var destinationA = 'Ibadan, Nigeria';
    var destinationB = { lat: 50.087, lng: 14.421 };

    var destinationIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=D|FF0000|000000';
    var originIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=O|FFFF00|000000';
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 55.53, lng: 9.4 },
        zoom: 10
    });
    var geocoder = new google.maps.Geocoder;

    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
        origins: [origin1],
        destinations: [destinationA],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function(response, status) {
        console.log(response)
        console.log(status)
    });
}*/

function loader() {
    document.getElementById("loading").removeAttribute("style");
}

function remloader() {
    document.getElementById("loading").style.display = 'none';
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -33.8688,
            lng: 151.2195
        },
        zoom: 13
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var deladd = document.getElementById("deladd");
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);
    var secondautocomplete = new google.maps.places.Autocomplete(deladd);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);
    secondautocomplete.bindTo('bounds', map);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);
    secondautocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        //infowindowContent.children['place-icon'].src = place.icon;
        //infowindowContent.children['place-name'].textContent = place.name;
        //infowindowContent.children['place-address'].textContent = address;
        //infowindow.open(map, marker);
    });

    secondautocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = secondautocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        //infowindowContent.children['place-icon'].src = place.icon;
        //infowindowContent.children['place-name'].textContent = place.name;
        //infowindowContent.children['place-address'].textContent = address;
        //infowindow.open(map, marker);
    });
    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
        });
    }

    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);

    document.getElementById('use-strict-bounds')
        .addEventListener('click', function() {
            console.log('Checkbox clicked! New state=' + this.checked);
            autocomplete.setOptions({
                strictBounds: this.checked
            });
        });
}


//order submission
if (email == null && token == null) {
    $("#submitOrder").click(function(e) {
        document.getElementById("submitOrder").innerHTML = 'Loading';
        //loader();
        e.preventDefault();
        var package = $("#package").val();
        var desc = $("#package_desc").val();
        var pickup = $("#pac-input").val();
        var deladd = $("#deladd").val();
        var pickphone = $("#pickphone").val();
        if (package == "") {
            notify('Enter package name');
            document.getElementById("submitOrder").innerHTML = 'Submit';
            //remloader();
        } else if (desc == "") {
            notify('Enter package description');
            document.getElementById("submitOrder").innerHTML = 'Submit';
            //remloader();
        } else if (pickup == "") {
            notify('Enter pickup address');
            document.getElementById("submitOrder").innerHTML = 'Submit';
            //remloader();
        } else if (deladd == "") {
            notify('Enter delivery address');
            document.getElementById("submitOrder").innerHTML = 'Submit';
            //remloader();
        } else if (pickphone == "") {
            notify('Enter pickup phone number');
            //remloader();
        } else {
            var geocoder = new google.maps.Geocoder;
            var service = new google.maps.DistanceMatrixService;
            service.getDistanceMatrix({
                    origins: [pickup],
                    destinations: [deladd],
                    travelMode: 'DRIVING',
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, function(response, status) {
                    console.log(response)
                    console.log(status)
                    if (status === 'OK') {
                        distance = response.rows[0].elements[0].distance.value;
                        price = (distance / 1000) * 100;
                        console.log(price)

                        localStorage.setItem("package", package);
                        localStorage.setItem("desc", desc);
                        localStorage.setItem("pickup", pickup);
                        localStorage.setItem("deladd", deladd);
                        localStorage.setItem("pickphone", pickphone);
                        notify('Login to submit your order');
                        location.href = 'login.html';
                    }
                    //$("#amount").append('&#8358;', price);
                    //document.getElementById("amtpay").value = price;
                }

            );
        }
    });
} else {
    document.getElementById("package").value = localStorage.getItem("package");
    document.getElementById("package_desc").value = localStorage.getItem("desc");
    document.getElementById("pac-input").value = localStorage.getItem("pickup");
    document.getElementById("deladd").value = localStorage.getItem("deladd");
    document.getElementById("pickphone").value = localStorage.getItem("pickphone");

    $("#submitOrder").click(function(e) {
        document.getElementById("submitOrder").innerHTML = 'Loading';
        //loader();
        e.preventDefault();
        var package = $("#package").val();
        var desc = $("#package_desc").val();
        var pickup = $("#pac-input").val();
        var deladd = $("#deladd").val();
        var pickphone = $("#pickphone").val();
        if (package == "") {
            notify('Enter package name');
            document.getElementById("submitOrder").innerHTML = 'Submit';
            //remloader();
        } else if (desc == "") {
            notify('Enter package description');
            document.getElementById("submitOrder").innerHTML = 'Submit';
            //remloader();
        } else if (pickup == "") {
            notify('Enter pickup address');
            document.getElementById("submitOrder").innerHTML = 'Submit';
            //remloader();
        } else if (deladd == "") {
            notify('Enter delivery address');
            document.getElementById("submitOrder").innerHTML = 'Submit';
            //remloader();
        } else if (pickphone == "") {
            notify('Enter pickup phone number');
            //remloader();
        } else {
            var geocoder = new google.maps.Geocoder;
            var service = new google.maps.DistanceMatrixService;
            service.getDistanceMatrix({
                    origins: [pickup],
                    destinations: [deladd],
                    travelMode: 'DRIVING',
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, function(response, status) {
                    console.log(response)
                    console.log(status)
                    if (status === 'OK') {
                        distance = response.rows[0].elements[0].distance.value;
                        price = (distance / 1000) * 100;
                        console.log(price)

                        $.ajax({
                            url: "https://api.chibs.com.ng/submit_order.php",
                            type: "POST",
                            data: {
                                package: package,
                                description: desc,
                                pickup_loc: pickup,
                                delivery_loc: deladd,
                                email: email,
                                token: token,
                                price: price,
                                phone: pickphone
                            },
                            header: {
                                Accept: 'application/json'
                            },
                            success: function(res) {
                                console.log(res);
                                var status = res.status;
                                var msg = res.message;
                                if (status == 'true') {
                                    var orderid = res.orderid;
                                    var amount = res.amount;
                                    document.getElementById("orderid").value = orderid;
                                    $("#amount").append('&#8358;', amount);
                                    document.getElementById("amtpay").value = amount;
                                    $(".payment").removeClass("hidden");
                                    $(".order").addClass("hidden");
                                    //remloader();
                                } else {
                                    notify(msg);
                                    //remloader();
                                    document.getElementById("submitOrder").innerHTML = 'Submit';
                                }

                            },
                            error: function(res) {
                                console.log(res);
                                notify('Error in connection');
                                document.getElementById("submitOrder").innerHTML = 'Submit';
                                //remloader();
                            }
                        });
                    }
                    //$("#amount").append('&#8358;', price);
                    //document.getElementById("amtpay").value = price;
                }

            );
        }
    });
}
//pay with wallet
$("#payWithWallet").click(function(e) {
    //loader();
    document.getElementById("payWithWallet").innerHTML = 'Loading';
    e.preventDefault();
    var amount = $("#amtpay").val();
    var orderid = $("#orderid").val();
    if (amount == "") {
        alert('Error');
        document.getElementById("payWithWallet").innerHTML = 'WALLET';
        //remloader();
    } else if (orderid == "") {
        alert('Order error');
        document.getElementById("payWithWallet").innerHTML = 'WALLET';
        //remloader();
    } else {
        $.ajax({
            url: "https://api.chibs.com.ng/paywallet.php",
            type: "POST",
            data: {
                email: email,
                token: token,
                amount: amount,
                orderid: orderid
            },
            header: {
                Accept: 'application/json'
            },
            success: function(res) {
                console.log(res);
                var stat = res.status;
                var msg = res.message;
                if (stat == 'true') {
                    alert('Payment successful');
                    window.location = 'index.html';
                    //remloader();
                } else {
                    alert(msg);
                    document.getElementById("payWithWallet").innerHTML = 'WALLET';
                    //remloader();
                }
            },
            error: function(res) {
                console.log(res);
                alert('Error in connection');
                document.getElementById("payWithWallet").innerHTML = 'WALLET';
                //remloader();
                //pickup phone number bulk sms setting redirect to map page
            }
        });
    }
});

//pay with card
const API_publicKey = "FLWPUBK-2bddb5d9d87af78804d6c583587dcb3a-X";

function payWithRave() {
    var amount = $("#amtpay").val();
    var orderid = $("#orderid").val();
    if (amount == "") {
        alert('Error');
    } else if (orderid == "") {
        alert('Error');
    } else {
        var x = getpaidSetup({
            PBFPubKey: API_publicKey,
            customer_email: email,
            amount: amount,
            customer_phone: "234099940409",
            currency: "NGN",
            txref: "rave-123456",
            meta: [{
                metaname: "flightID",
                metavalue: "AP1234"
            }],
            onclose: function() {},
            callback: function(response) {
                var txref = response.data.txRef; // collect txRef returned and pass to a server page to complete status check.
                flwref = response.data.tx.flwRef;
                console.log("This is the response returned after a charge", response);
                if (response.tx.chargeResponseCode == "00" || response.tx.chargeResponseCode == "0") {
                    //alert('success');
                    document.getElementById("makePay").innerHTML = 'Loading...';
                    $.ajax({
                        url: "https://api.chibs.com.ng/paywithcard.php",
                        type: "POST",
                        data: {
                            email: email,
                            token: token,
                            amount: amount,
                            orderid: orderid,
                            ref: flwref
                        },
                        header: {
                            Accept: 'application/json'
                        },
                        success: function(res) {
                            console.log(res);
                            var stat = res.status;
                            var msg = res.message;
                            if (stat == 'true') {
                                notify('Payment successful');
                                window.location = 'index.html';
                            } else {
                                notify(msg);
                            }
                        },
                        error: function(res) {
                            console.log(res);
                            alert('Error in connection');
                        }
                    });
                    // redirect to a success page
                } else {
                    notify("Error making payment");
                    // redirect to a failure page.
                }

                x.close(); // use this to close the modal immediately after payment.
            }
        });
    }
}