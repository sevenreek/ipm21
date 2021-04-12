window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
    window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
    window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const initialDBData = [
    { name: "Sebastian Galecki", age: 18, email: "sgalecki@mail.com", phone: "123456789" },
    { name: "Karol Galecki", age: 26, email: "kgalecki@mail.com", phone: "987654321" }
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
    var objectStore = db.createObjectStore("customer", { autoIncrement: true });

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
        if (cursor) {
            var row = customerTable.insertRow(customerTable.rows.length);
            var idCell = row.insertCell(0);
            idCell.innerHTML = "<a href=\"#\" onClick=\"selectModifyCustomer(" + cursor.key + ")\">" + cursor.key + "</a>";
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
            var row = customerTable.insertRow(customerTable.rows.length);
            var newCell = row.insertCell(0);
            newCell.innerHTML = "<a href=\"#\" onClick=\"selectModifyCustomer(" + -1 + ")\">" + -1 + "</a>";;
            var nameCell = row.insertCell(1);
            nameCell.innerHTML = "Nowy";
            console.log("Loaded all entries!");
        }
    };
}

function modifyCustomer() {

    var objectStore = db.transaction(["customer"], "readwrite").objectStore("customer");
    var customerID = parseInt(document.getElementById("customer-id").value);
    var customerName = (document.getElementById("customer-name").value);
    var customerAge = parseInt(document.getElementById("customer-age").value);
    var customerEmail = (document.getElementById("customer-email").value);
    var customerPhone = (document.getElementById("customer-tel").value);
    if (customerID == -1) { // add new

        var request = objectStore.add({
            name: customerName,
            age: customerAge,
            email: customerEmail,
            phone: customerPhone
        });
        request.onsuccess = function(event) {
            console.log("Added new customer.");
            window.location.reload(false);
        };
        request.onerror = function(event) {
            alert("Failed to add new customer");
        };

    } else {
        var request = objectStore.get(customerID);
        request.onerror = function(event) {
            alert("Customer with that ID does not exist.");
        };
        request.onsuccess = function(event) {
            var data = event.target.result;
            console.log(data);
            console.log(event.target);
            data.age = customerAge;
            data.name = customerName;
            data.email = customerEmail;
            data.phone = customerPhone;

            // Put this updated object back into the database.
            var requestUpdate = objectStore.put(data, customerID);
            requestUpdate.onerror = function(event) {
                alert("Customer could not be updated.");
            };
            requestUpdate.onsuccess = function(event) {
                console.log("Updated customer");
                window.location.reload(false);

            };
        };
    }
}

function selectModifyCustomer(id) {
    document.getElementById("customer-id").value = id;
    if (id != -1) {
        var objectStore = db.transaction(["customer"], "readwrite").objectStore("customer");
        var request = objectStore.get(id);
        request.onsuccess = function(event) {
            var data = event.target.result;
            document.getElementById("customer-age").value = data.age;
            document.getElementById("customer-name").value = data.name;
            document.getElementById("customer-email").value = data.email;
            document.getElementById("customer-tel").value = data.phone;
            document.getElementById("customer-submit").value = 'Modyfikuj';
        };
    } else {
        document.getElementById("customer-age").value = '';
        document.getElementById("customer-name").value = '';
        document.getElementById("customer-email").value = '';
        document.getElementById("customer-tel").value = '';
        document.getElementById("customer-submit").value = 'Dodaj';
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

});