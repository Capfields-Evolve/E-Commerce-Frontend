/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        /*cordova.plugins.notification.local.setDefaults({
            led: { color: '#FF00FF', on: 500, off: 500 },
            vibrate: true
        });
        cordova.plugins.notification.local.schedule({
            title: 'My first notification',
            text: 'Thats pretty easy...',
            foreground: true
        });*/

        document.getElementById('customSwitch0').addEventListener('click', function() {
            Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);

            function isAvailableSuccess(result) {
                alert("Fingerprint available");
                /*
                result depends on device and os. 
                iPhone X will return 'face' other Android or iOS devices will return 'finger'  
                */
                /*alert("Fingerprint available");
                 */
            }

            function isAvailableError(error) {
                // 'error' will be an object with an error code and message
                alert(error.message);
            }
        });
        var token = localStorage.getItem("token");
        console.log(token);
        document.getElementById('finger').addEventListener('click', function() {
            Fingerprint.show({
                description: "Sign In"
            }, successCallback, errorCallback);

            function successCallback() {
                //alert("Authentication successful");
                var mail = $("#logmail").val();
                localStorage.setItem("email", mail);
                location.replace("index.html");

            }

            function errorCallback(error) {
                alert("Authentication invalid " + error.message);

            }
        })
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();