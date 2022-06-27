var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
var code = getUrlParameter('code');


function checkTrace() {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/trace.php",
        type: "POST",
        headers: {
            Accept: 'application/json'
        },
        data: {
            code: code,
            email: email,
            token: token
        },
        success: function(res) {
            console.log(res);
            msg = res.message;
            if (msg == 'success') {
                table = '';
                $.each(res.product, function(key, value) {
                    table += '<tr>';
                    table += '<td>' + value.p_name + '</td>';
                    table += '<td><a href="view.html?img=' + value.photo + '"><img src="https://evolve.capfields.com.ng/agent_app/uploads/' + value.photo + '" id="sky" onclick="zoomout()" alt="product" height="50px"></a></td>';
                    table += '<td>' + value.status + '</td>';
                    table += '<td><button class="btn btn-success btn-block shadow-sm" style="text-transform:capitalize;border-radius:25px;padding:8px;width:100px" onclick="$.ajax({url: \'https://evolve.capfields.com.ng/user_app/app.php\', type: \'POST\', headers:{Accept: \'application/json\'}, data: {email: email, token: token, pcode: ' + value.p_code + ', cartcode: ' + value.cartcode + ', id: ' + value.id + '}, success: function(res){console.log(res); msg=res.message; if(msg==\'success\'){alert(\'Approval successful\'); $(\'#table\').text(\' \'); checkTrace();}}, error: function(res){console.log(res)}})">Approve</button></td>';
                    table += '<td><button class="btn btn-danger btn-block shadow-sm" style="text-transform:capitalize;border-radius:25px;padding:8px;width:100px" onclick="$(\'.reject\').removeClass(\'hidden\'); document.getElementById(\'pcode\').value=' + value.p_code + '; document.getElementById(\'cartcode\').value=' + value.cartcode + '; document.getElementById(\'pid\').value=' + value.id + '">Reject</button></td>';
                    table += '</tr>';
                });
                $("#table").append(table);
                $(".tprod").removeClass("hidden");
            } else if (msg == 'no order') {
                $(".noorder").removeClass("hidden");
            } else {
                alert(msg);
            }
        },
        error: function(res) {
            console.log(res);
        }
    });
}

window.load = checkTrace();

/*function zoomin() {
    var myImg = document.getElementById("sky");
    var currWidth = myImg.clientWidth;
    if (currWidth == 500) {
        alert("Maximum zoom-in level reached.");
    } else {
        myImg.style.width = (currWidth + 50) + "px";
    }
}

function zoomout() {
    var myImg = document.getElementById("sky");
    var currWidth = myImg.clientWidth;
    if (currWidth == 50) {
        alert("Maximum zoom-out level reached.");
    } else {
        myImg.style.width = (currWidth - 50) + "px";
    }
}*/

$("#rejectP").click(function(e) {
    e.preventDefault();
    note = $("#rejnote").val();
    pcode = $("#pcode").val();
    cartcode = $("#cartcode").val();
    id = $("#pid").val();
    if (note == "") {
        alert('Enter rejection note');
    } else if (pcode == "") {
        alert('Error occurred');
    } else if (cartcode == "") {
        alert('Error occurred');
    } else if (id == "") {
        alert('Error occurred');
    } else {
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/reject.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                email: email,
                token: token,
                pcode: pcode,
                cartcode: cartcode,
                id: id,
                note: note
            },
            success: function(res) {
                console.log(res)
                msg = res.message;
                if (msg == 'success') {
                    $("#table").text(' ');
                    checkTrace();
                    document.getElementById("rejnote").value = ' ';
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