window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
    window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
    window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const OBJECT_STORE_NAME = "customer";
const DATABASE_NAME = "customers";
const CURRENT_DATABASE_VERSION = 2;

const initialDBData = [
    { name: "Sebastian Galecki", email: "sgalecki@mail.com", phone: "123456789", address: "Galecka 30", pid: "AB123123" },
    { name: "Karol Galecki", email: "kgalecki@mail.com", phone: "987654321", address: "Galecka 30", pid: "AB123125" }
];

var db;
var request = window.indexedDB.open(DATABASE_NAME, CURRENT_DATABASE_VERSION);

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
    console.log("DB Upgrade needed");
    if (event.oldVersion < 1) {
        console.log("Creating version 1");
        var objectStore = db.createObjectStore(OBJECT_STORE_NAME, { autoIncrement: true });
        for (var i in initialDBData) {
            objectStore.add(initialDBData[i]);
        }
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("pid", "pid", { unique: false });
        objectStore.createIndex("address", "address", { unique: false });
    } else if (event.oldVersion < 2) {
        console.log("Updating to version 2");
        var objectStore = request.transaction.objectStore(OBJECT_STORE_NAME);
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                if (cursor.value.age !== undefined) {
                    delete cursor.value.age;
                }
                if (cursor.value.address == undefined) {
                    cursor.value.address = "";
                }
                if (cursor.value.pid == undefined) {
                    cursor.value.pid = "";
                }
                cursor.continue();
            }
        };
        if (!objectStore.contains("name"))
            objectStore.createIndex("name", "name", { unique: false });
        if (!objectStore.contains("pid"))
            objectStore.createIndex("pid", "pid", { unique: false });
        if (!objectStore.contains("address"))
            objectStore.createIndex("address", "address", { unique: false });
    }
}

function filterResults(str, fields) {
    var customerTable = document.getElementById("customer-table");
    var rowCount = customerTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        customerTable.deleteRow(i);
    }
    var objectStore = db.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME);

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            var anyFieldContainsStr = false;
            fields.forEach(function(field) {
                if (cursor.value[field].toLowerCase().includes(str)) {
                    anyFieldContainsStr = true;
                    break;
                }
            })
            if (!anyFieldContainsStr) return;
            var row = customerTable.insertRow(customerTable.rows.length);
            var idCell = row.insertCell(0);
            idCell.innerHTML = "<a href=\"#\" onClick=\"selectModifyCustomer(" + cursor.key + ")\">" + cursor.key + "</a>";
            var nameCell = row.insertCell(1);
            nameCell.innerHTML = cursor.value.name;
            var pidCell = row.insertCell(2);
            pidCell.innerHTML = cursor.value.pid;
            var emailCell = row.insertCell(3);
            emailCell.innerHTML = cursor.value.email;
            var phoneCell = row.insertCell(4);
            phoneCell.innerHTML = cursor.value.phone;
            var addressCell = row.insertCell(5);
            addressCell.innerHTML = cursor.value.address;
            var deleteCell = row.insertCell(6);
            deleteCell.innerHTML = "<a href=\"#\" onClick=\"deleteCustomer(" + cursor.key + ")\">X</a>";
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

function repopulateTable() {
    var customerTable = document.getElementById("customer-table");
    var rowCount = customerTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        customerTable.deleteRow(i);
    }
    var objectStore = db.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME);

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            var row = customerTable.insertRow(customerTable.rows.length);
            var idCell = row.insertCell(0);
            idCell.innerHTML = "<a href=\"#\" onClick=\"selectModifyCustomer(" + cursor.key + ")\">" + cursor.key + "</a>";
            var nameCell = row.insertCell(1);
            nameCell.innerHTML = cursor.value.name;
            var pidCell = row.insertCell(2);
            pidCell.innerHTML = cursor.value.pid;
            var emailCell = row.insertCell(3);
            emailCell.innerHTML = cursor.value.email;
            var phoneCell = row.insertCell(4);
            phoneCell.innerHTML = cursor.value.phone;
            var addressCell = row.insertCell(5);
            addressCell.innerHTML = cursor.value.address;
            var deleteCell = row.insertCell(6);
            deleteCell.innerHTML = "<a href=\"#\" onClick=\"deleteCustomer(" + cursor.key + ")\">X</a>";
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
    var customerPid = document.getElementById("customer-pid").value;
    var customerEmail = (document.getElementById("customer-email").value);
    var customerPhone = (document.getElementById("customer-tel").value);
    var customerAddress = (document.getElementById("customer-address").value);
    if (customerID == -1) { // add new

        var request = objectStore.add({
            name: customerName,
            pid: customerPid,
            email: customerEmail,
            phone: customerPhone,
            address: customerAddress
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
            data.pid = customerPid;
            data.address = customerAddress;
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
            document.getElementById("customer-pid").value = data.pid;
            document.getElementById("customer-name").value = data.name;
            document.getElementById("customer-email").value = data.email;
            document.getElementById("customer-tel").value = data.phone;
            document.getElementById("customer-address").value = data.address;
            document.getElementById("customer-submit").value = 'Modyfikuj';
        };
    } else {
        document.getElementById("customer-pid").value = '';
        document.getElementById("customer-name").value = '';
        document.getElementById("customer-email").value = '';
        document.getElementById("customer-tel").value = '';
        document.getElementById("customer-address").value = '';
        document.getElementById("customer-submit").value = 'Dodaj';
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});

function deleteCustomer(id) {
    var objectStore = db.transaction(["customer"], "readwrite").objectStore("customer");
    var request = objectStore.delete(id);
    request.onsuccess = function(event) {
        console.log("Deleted customer");
        window.location.reload(false);
    };
}