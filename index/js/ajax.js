function ajaxGet(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    }
    xhr.open('get', url + '?' + data, 'true');
    xhr.send(null);
}

function ajaxPost(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    }
    xhr.open('post', url, 'true');
    xhr.setRequestHeader('Content-type', 'applicaton/x-www-form-urlencoded');
    xhr.send(data);
}