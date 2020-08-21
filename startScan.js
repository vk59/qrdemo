const html5QrCode = new Html5Qrcode(/* element id */ "reader", true);
function start() {
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
            let cameraId = devices[0].id;
            return scanning(cameraId)
        }
    }).catch(err => {
        console.log("GetCameras. Error: " + err)
    });
}

function scanning(cameraId) {
    html5QrCode.start(
        cameraId,
        {
            fps: 10,    // Optional frame per seconds for qr code scanning
            qrbox: 250  // Optional if you want bounded box UI
        },
        qrCodeMessage => {
            document.getElementById("output").innerText = qrCodeMessage
            console.log("Message: " + qrCodeMessage)
        },
        errorMessage => {
            console.log("Error: " + errorMessage)
        })
        .catch(err => {
            console.log("Start failed. Error: " + err)
        });
}

function stopScan(html5QrCode) {
    html5QrCode.stop().then(ignore => {
        // QR Code scanning is stopped.
    }).catch(err => {
        // Stop failed, handle it.
    });
}

start();
