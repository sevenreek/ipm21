var inverterWorker = new Worker('invert_letter.js');
var imageFilterWorker = new Worker('compute_rgb.js');
window.addEventListener('DOMContentLoaded', (event) => {




    inverterWorker.onmessage = function(e) {
        putCustomerToForm(e.data);
        sendFormToColorWorker(); // react to inver letters in form
    }
    var invertButton = document.getElementById('customer-invert');

    invertButton.addEventListener('click', function(e) {
        console.log('Message posted to worker');
        inverterWorker.postMessage(getCustomerJSONFromForm());
    });




    var urlElement = document.getElementById('image-url');
    imageFilterWorker.onmessage = function(e) {
        console.log("set color to ", e.data);
        //document.getElementById('left-image-container').style.setProperty('--image-filter-color', `rgb(${e.data.r}, ${e.data.g}, ${e.data.b})`);
        OVERLAY_COLOR = `rgb(${e.data.r}, ${e.data.g}, ${e.data.b}, 0.5)`;
        drawImage(urlElement.value, OVERLAY_COLOR);
    }
    urlElement.addEventListener('input', function(e) {
        console.log("Should change");
        //document.getElementById('img-canvas').style.backgroundImage = `url(${urlElement.value})`;
        drawImage(urlElement.value, OVERLAY_COLOR);

    });
    var form = document.getElementById("customer-edit-form");
    // react to form changes
    form.addEventListener("input", function() {
        sendFormToColorWorker();
        console.log("Form has changed!");
    });
    // react to generate customer
    var generateButton = document.getElementById('customer-generate');
    generateButton.addEventListener('click', function(e) {
        sendFormToColorWorker();
    });

});
var OVERLAY_COLOR = 'rgba(255,0,0,0.5)';

function drawImage(url, overlayColor) {
    var canvas = document.getElementById('img-canvas');
    var content = canvas.getContext('2d');
    image = new Image();
    image.src = url;
    image.crossOrigin = "Anonymous";
    image.onload = function() {
        content.drawImage(image, 0, 0, canvas.width, canvas.height);
        content.fillStyle = overlayColor;
        content.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function clearCanvas() {
    var canvas = document.getElementById('img-canvas');
    var content = canvas.getContext('2d');
    content.clearRect(0, 0, canvas.width, canvas.height);
}

function sendFormToColorWorker() {
    var data = getCustomerJSONFromForm();
    data.url = document.getElementById("image-url").value;
    imageFilterWorker.postMessage(data);
}



function getCustomerJSONFromForm() {
    return {
        name: document.getElementById("customer-name").value,
        email: document.getElementById("customer-email").value,
        phone: document.getElementById("customer-tel").value,
        address: document.getElementById("customer-address").value,
        pid: document.getElementById("customer-pid").value,
        image: document.getElementById("image-url").value
    };
}

function putCustomerToForm(data) {
    document.getElementById("customer-pid").value = data.pid;
    document.getElementById("customer-name").value = data.name;
    document.getElementById("customer-email").value = data.email;
    document.getElementById("customer-tel").value = data.phone;
    document.getElementById("customer-address").value = data.address;
    document.getElementById("image-url").value = URL.createObjectURL(data.image);
}