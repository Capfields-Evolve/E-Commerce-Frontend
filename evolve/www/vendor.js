function sector() {
    $.ajax({
        url: "https://evolve.capfields.com.ng/user_app/sector.php",
        type: "POST",
        headers: {
            Accept: 'application/json'
        },
        success: function(res) {
            console.log(res)
            seclist = '';
            $.each(res.sector, function(key, value) {
                seclist += '<option value="' + value.code + '">' + value.name + '</option>';
            });
            $("#sectorlist").append(seclist);
        },
        error: function(res) {
            console.log(res)
        }
    });
}

window.load = sector();

function producer() {
    $("#producerlist").text(' ');
    code = $("#sectorlist").val();
    if (code == "") {
        alert('Invalid selection');
    } else {
        $(".loaderr").removeClass("hidden");
        $.ajax({
            url: "https://evolve.capfields.com.ng/user_app/producer-list.php",
            type: "POST",
            headers: {
                Accept: 'application/json'
            },
            data: {
                code: code
            },
            success: function(res) {
                console.log(res)
                msg = res.message;
                if (msg == 'success') {
                    prodlist = '';
                    $.each(res.data, function(key, value) {
                        prodlist += '<div class="col-12 col-md-6 col-lg-4">';
                        prodlist += '<a href="producer-product.html?code=' + value.store_id + '">';
                        prodlist += '<div class="card shadow-sm border-0 mb-4">';
                        prodlist += '<div class="card-body">';
                        prodlist += '<div class="row">';
                        prodlist += '<div class="col-2 col-sm-3 col-md-4 col-lg-3 pr-0 align-self-center">';
                        prodlist += '<figure class="product-image my-0"><img src="img/store.png" alt="" class=""></figure>';
                        prodlist += '</div>';
                        prodlist += '<div class="col align-self-center">';
                        prodlist += '<div class="text-dark mb-1 h6 d-block">' + value.name + '</div>';
                        prodlist += '<div class="progress progress-sm mt-2">';
                        prodlist += '<div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>';
                        prodlist += '</div>';
                        prodlist += '</div>';
                        prodlist += '</div>';
                        prodlist += '</div>';
                        prodlist += '</div>';
                        prodlist += '</a>';
                        prodlist += '</div>';

                    });
                    $(".loaderr").addClass("hidden");
                    $("#producerlist").append(prodlist);
                } else {
                    alert(msg);
                    $(".loaderr").addClass("hidden");
                }
            },
            error: function(res) {
                console.log(res)
                alert('Error in connection');
                $(".loaderr").addClass("hidden");
            }
        });
    }
}
//all products
$.ajax({
    url: "https://evolve.capfields.com.ng/user_app/vendor_market.php",
    type: "GET",
    headers: {
        Accept: 'application/json'
    },
    data: {
        token: token,
        email: email
    },
    success: function(res) {
        console.log(res)
        msg = res.message;
        if (msg == 'success') {
            product = '';
            $.each(res.data, function(key, value) {
                product += '<div class="col-6 col-md-4 col-lg-3 col-xl-2">';
                product += '<div class="card shadow-sm border-0 mb-4">';
                product += '<div class="card-body">';
                product += '<button class="btn btn-sm btn-link p-0"><i class="material-icons md-18">favorite_outline</i></button>';
                product += '<div class="badge badge-success float-right mt-1">10% off</div>';
                product += '<figure class="product-image"><img src="https://evolve.capfields.com.ng/view/vendor_products/' + value.photo1 + '" alt="" class=""></figure>';
                product += '<a href="product-details.html?type=vendor.html&code=' + value.product_code + '" class="text-dark mb-1 mt-2 h6 d-block textwrap">' + value.product + '</a>';
                product += '<p class="text-secondary small mb-2 storetextwrap">' + value.store_id + '</p>';
                product += '<h5 class="text-success font-weight-normal mb-0">&#8358;' + value.price + '<sup>.00</sup></h5>';
                product += '<a href="addtocart.html?type=vendor.html&pcode=' + value.product_code + '"><button class="btn btn-default button-rounded-36 shadow-sm float-bottom-right"><i class="material-icons md-18">shopping_cart</i></button></a>';
                product += ' </div>';
                product += ' </div>';
                product += ' </div>';
            });
            $("#products").append(product);
            $(".loader").addClass("hidden");
        }
    },
    error: function(res) {
        console.log(res)
    }
});

function goBack() {
    window.history.back();
}