const PRODUCTS = [
    { name: "Gigabyte GeForce RTX 2060 OC 6GB GDDR6", price: "2969.0" },
    { name: "ASUS GeForce RTX 3070 TUF Gaming OC 8GB GDDR6", price: "7159.0" },
    { name: "KFA2 GeForce RTX 3090 HOF 24GB GDDR6X", price: "14999.0" },
    { name: "Fujitsu Quadro RTX 6000 24GB GDDR6", price: "18599.0" },
    { name: "PNY Quadro RTX 5000 16GB GDDR6", price: "11999.0" }
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

window.addEventListener('DOMContentLoaded', (event) => {
    populateSelect();
});