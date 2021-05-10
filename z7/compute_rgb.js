onmessage = function(e) {
    console.log('Message received from main script');
    var gigaSum = 0;
    var customer = e.data;
    for (var key in customer) {
        gigaSum += sumLetters(customer[key]);
    }

    console.log('Posting message back to main script');
    postMessage({
        'r': gigaSum % 255,
        'g': 255 - (gigaSum % 255),
        'b': ((0.5 * (gigaSum % 255)) > 125) ? 99 : 199,
    });
}


function sumLetters(str) {
    var sum = 0;
    var i = str.length;
    while (i--) {
        var code = str.charCodeAt(i);
        if (code >= 65 && code <= 90) // uppercase
        {
            sum += code - 64 + 30; // A=1+30
        } else if (code >= 97 && code <= 122) // lowercase
        {
            sum += code - 96;
        }
    }

}