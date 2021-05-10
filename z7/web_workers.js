window.addEventListener('DOMContentLoaded', (event) => {
    var inverterWorker = new Worker('invert_letter.js');
    var imageFilterWorker = new Worker('compute_rgb.js');
    inverterWorker.onmessage = function(e) {
        putCustomerToForm(e.data);
        sendFormToColorWorker(imageFilterWorker); // react to inver letters in form
    }
    var invertButton = document.getElementById('customer-invert');

    invertButton.addEventListener('click', function(e) {
        console.log('Message posted to worker');
        inverterWorker.postMessage(getCustomerJSONFromForm());
    });




    imageFilterWorker.onmessage = function(e) {
        console.log("set color to ", e.data);
        document.getElementById('left-image-container').style.setProperty('--image-filter-color', `rgb(${e.data.r}, ${e.data.g}, ${e.data.b})`);
    }
    var urlElement = document.getElementById('image-url');
    urlElement.addEventListener('input', function(e) {
        console.log("Should change");
        document.getElementById('left-image-container').style.backgroundImage = `url(${urlElement.value})`;
    });
    var form = document.getElementById("customer-edit-form");
    // react to form changes
    form.addEventListener("input", function() {
        sendFormToColorWorker(imageFilterWorker);
        console.log("Form has changed!");
    });
    // react to generate customer
    var generateButton = document.getElementById('customer-generate');
    generateButton.addEventListener('click', function(e) {
        sendFormToColorWorker(imageFilterWorker);
    });

});

function sendFormToColorWorker(imageFilterWorker) {
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
        pid: document.getElementById("customer-pid").value
    };
}

function putCustomerToForm(data) {
    document.getElementById("customer-pid").value = data.pid;
    document.getElementById("customer-name").value = data.name;
    document.getElementById("customer-email").value = data.email;
    document.getElementById("customer-tel").value = data.phone;
    document.getElementById("customer-address").value = data.address;
}