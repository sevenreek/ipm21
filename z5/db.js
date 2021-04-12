window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
    window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
    window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const initialDBData = [
    { id: 0, name: "Sebastian Galecki", age: 18, email: "sgalecki@mail.com", phone: "123456789" },
    { id: 1, name: "Karol Galecki", age: 26, email: "kgalecki@mail.com", phone: "987654321" }
];

var db;
var request = window.indexedDB.open("customers", 1);

request.onerror = function(event) {
    console.log("Error while opening IndexedDB.");
};

request.onsuccess = function(event) {
    db = request.result;
    console.log("IndexedDB opened: " + db);
    repopulateTable()

};

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("customer", { keyPath: "id" });

    for (var i in initialDBData) {
        objectStore.add(initialDBData[i]);
    }
}

function repopulateTable() {
    var customerTable = document.getElementById("customer-table");
    var rowCount = customerTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        customerTable.deleteRow(i);
    }
    var objectStore = db.transaction("customer").objectStore("customer");

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        var tableLength = 1; // headers
        if (cursor) {
            var row = customerTable.insertRow(tableLength++);
            var idCell = row.insertCell(0);
            idCell.innerHTML = cursor.key;
            var nameCell = row.insertCell(1);
            nameCell.innerHTML = cursor.value.name;
            var ageCell = row.insertCell(2);
            ageCell.innerHTML = cursor.value.age;
            var emailCell = row.insertCell(3);
            emailCell.innerHTML = cursor.value.email;
            var phoneCell = row.insertCell(4);
            phoneCell.innerHTML = cursor.value.phone;
            cursor.continue();
        } else {
            console.log("Loaded all entries!");
        }

    };
}

function modifyCustomer() {

}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

});