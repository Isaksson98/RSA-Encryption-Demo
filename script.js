
function getInputValue() {

    var inputVal = document.getElementById("myInput").value;
    var letter_arr = inputVal.split("");
    var ascii_arr = []
    for (var i = 0; i < letter_arr.length; i++) {
        ascii_arr[i] = inputVal.charCodeAt(i);
    }
    document.getElementById("ascii").value = ascii_arr;

    var p = parseInt(document.getElementById("p").value);
    var q = parseInt(document.getElementById("q").value);
    var e = parseInt(document.getElementById("e").value);

    //Compute encryption

    var n = p * q
    var lambda = (p - 1) * (q - 1)

    c = []
    for (var i = 0; i < letter_arr.length; i++) {
        c[i] = (ascii_arr[i] ** e) % n
    }

    public_key = [e, n]


    //Send data
    document.getElementById("infosent").innerHTML = 'Public key: ' + public_key + '\nEncrypted message: ' + c

    decrypt(d, n, c, lambda, e)

}

function decrypt(d, n, c, lambda, e) {

    m_2 = []
    m_3 = []

    d = modInverse(e, lambda)

    private_key = [d, n]
    debugger
    for (var i = 0; i < c.length; i++) {

        m_2[i] = modulo(c[i], d, n)
        m_3[i] = String.fromCharCode(m_2[i])
    }

    document.getElementById("d").innerHTML = 'Private Key: ' + private_key + '\nc^d mod n: ' + c[0] + '^' + d + ' mod ' + n + '=' + m_2[0];
    document.getElementById("response").value = c;
    document.getElementById("decrypted").value = m_2;
    document.getElementById("decryptedString").value = m_3.join('');
}


function modulo(n, p, m) {
    var result = 1;
    while (p--) {
        result = (result * n) % m;
    }

    return result;
}

function modInverse(a, m) {

    // validate inputs
    [a, m] = [Number(a), Number(m)]
    if (Number.isNaN(a) || Number.isNaN(m)) {
        return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
        return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = m
    while (b) {
        [a, b] = [b, a % b]
        s.push({ a, b })
    }
    if (a !== 1) {
        alert('inverse does not exists')
        return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for (let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}