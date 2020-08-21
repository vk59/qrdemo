const html5QrCode = new Html5Qrcode(/* element id */ "reader", true);
let cameraNum=-1
let cameras

function startCamera() {
    cameras.then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        // devicesLength = devices.length
        if (cameraNum == -1) {
            cameraNum = devices.length - 1;
        }
        console.log("Camera Number: " + cameraNum)
        if (devices && devices.length) {
            cameraId = devices[cameraNum].id;
            return scanning(cameraId)
        }
    }).catch(err => {
        console.log("GetCameras. Error: " + err)
    });
}

function start() {
    cameras = Html5Qrcode.getCameras()
    startCamera()
}

function scanning() {
    html5QrCode.start(
        cameraId,
        {
            fps: 10,    // Optional frame per seconds for qr code scanning
            qrbox: 500 // Optional if you want bounded box UI
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

function onChangeCameraClick(){
    cameraNum--
    startCamera()
    scanning()
}

start();
