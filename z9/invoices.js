const PRODUCTS = [
    { name: "RTX 2060", price: "2969" },
    { name: "RTX 2070", price: "7159" },
    { name: "RTX 2080", price: "14999" },
    { name: "RTX 3070", price: "18599" },
    { name: "RTX 3080", price: "11999" }
];

function populateSelect() {
    var productSelect = document.getElementById('product');
    PRODUCTS.forEach((p, i) => {
        var option = document.createElement("option");
        option.text = p.name;
        option.value = i;
        productSelect.appendChild(option);

    });

}

function generateInvoice() {
    //var url = new URL(window.location.hostname + "/invoice.html");
    var customerName = (document.getElementById("customer-name").value);
    var customerPid = document.getElementById("customer-pid").value;
    var customerEmail = (document.getElementById("customer-email").value);
    var customerPhone = (document.getElementById("customer-tel").value);
    var customerAddress = (document.getElementById("customer-address").value);
    var productIndex = (document.getElementById("product").value);
    var productName = PRODUCTS[productIndex].name;
    var productPrice = PRODUCTS[productIndex].price;
    window.open(
        `invoice.html?pname=${productName}\
        &pprice=${productPrice}\
        &name=${customerName}\
        &email=${customerEmail}\
        &address=${customerAddress}\
        &pid=${customerPid}\
        &phone=${customerPhone}`, '_blank').focus();
}

window.addEventListener('DOMContentLoaded', (event) => {
    populateSelect();
});