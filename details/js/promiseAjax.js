//使用promise封装ajaxs请求

function promiseAjax(params) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            }
        }
        if (params.method == "get" && params.data) {
            xhr.open(params.method, params.url + '?' + params.data, true);
        } else {
            xhr.open(params.method, params.url, true);
        }
        if (params.method == 'post') {
            xhr.setRequestHeader('Content-type', 'application/X-www-form-urlencoded');
        }
        if (params.method == "get") {
            xhr.send(null);
        } else {
            xhr.send(params.data || '');
        }
    })
}