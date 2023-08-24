export function setCookie(key, value, exdays = 7) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toGMTString();
    document.cookie = key + '=' + value + '; ' + expires;
}

export function getCookie(cname) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
}

export function delCookie(name) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}
