document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    $("#uploadPop").click(function() {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            allowEdit: false,
            correctOrientation: true, //Corrects Android orientation quirks
            targetWidth: 300,
            targetHeight: 400
        });

        function onFail(message) {
            alert('Failed because: ' + message);
        }

        function onSuccess(fileURL) {
            document.getElementById("uploadPop").innerHTML = 'Uploading...';
            //var fileURL = "cdvfile://localhost/persistent/img/banner.png";
            var uri = encodeURI("https://evolve.capfields.com.ng/user_app/uploadpop.php");
            //alert(fileURL)
            var cartcode = document.getElementById("cartcode").value;
            var email = localStorage.getItem("email");
            var token = localStorage.getItem("token");

            var params = new Object();
            params.email = email; //you can send additional info with the file
            params.token = token;
            params.cartcode = '123456';

            var options = new FileUploadOptions();
            options.fileKey = "pic"; //depends on the api
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            console.log(options.fileName);
            options.mimeType = "example/jpeg";
            options.params = params;
            options.httpMethod = "POST";
            options.chunkedMode = true; //this is important to send both data and files

            var headers = { 'Accept': "application/json" };

            options.headers = headers;

            var ft = new FileTransfer();
            ft.upload(fileURL, uri, win, fail, options);
            //ft.upload(imageUriToUpload, url, succesFileTransfer, errorFileTransfer, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            var resp = JSON.parse(r.response);
            msg = resp.message;
            //alert(r.response);
            //alert(resp)
            if (msg == 'success') {
                alert('Upload successful');
                $("#confirmDelivery").removeClass("hidden");
            } else {
                alert(msg);
                document.getElementById("uploadPop").innerHTML = 'Upload POP';
            }
        }

        function fail(error) {
            alert("An error occurred");
            console.log("upload error source " + error.source);
            //alert(error.source)
            //alert(error.target)
            console.log("upload error target " + error.target);
            document.getElementById("takePicture").innerHTML = 'Upload POP';
        }
    })
}