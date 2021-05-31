function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


window.addEventListener('DOMContentLoaded', (event) => {
    var invoiceID = document.getElementById('invoice-id-date');
    var seller = document.getElementById('invoice-seller');
    var buyer = document.getElementById('invoice-buyer');
    var productName = document.getElementById('invoice-item-name');
    var productPrice = document.getElementById('invoice-item-price');
    var totalPrice = document.getElementById('invoice-total');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var d = new Date();
    invoiceID.innerHTML = `Faktura: ${getRandomInt(100,999)}/${d.getMonth()}/${d.getFullYear()}`
    buyer.innerHTML =
        `${urlParams.get('name')}<br />
        ${urlParams.get('email')}<br />
        ${urlParams.get('address')}<br />
        ${urlParams.get('phone')}<br />
        ${urlParams.get('pid')}<br />`
    productName.innerHTML = `${urlParams.get('pname')}`;
    productPrice.innerHTML = `${urlParams.get('pname')}`;
    productPrice.totalPrice = `${urlParams.get('pname')}`;
});