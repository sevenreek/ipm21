onmessage = function(e) {
    console.log('Message received from main script');
    var customer = e.data;
    for (var key in customer) {
        customer[key] = invertString(customer[key]);
    }

    console.log('Posting message back to main script');
    postMessage(customer);
}


function invertString(str) {
    return [...str].map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('');
}