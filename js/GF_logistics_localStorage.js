function storageSetItem(Key, Value) {
    if (localStorageWorks()) {
        window.localStorage.setItem(Key, Value);
    }
}

function storageGetItem(Key) {
    if (localStorageWorks()) {
        return window.localStorage.getItem(Key);
    }
    else {
        return "noStorage";
    }
}

function localStorageWorks() {
    try {
        localStorage.setItem("test_Dlz3bH", "KwNYPCpyH7yl2S1K");
        var result = localStorage.getItem("test_Dlz3bH") == "KwNYPCpyH7yl2S1K";
        localStorage.removeItem("test_Dlz3bH");
        return result;
    } catch (ex) {}
}

function checkLocalStorage() {
    if (alertLocalstorageDoesNotWork()) {
        return;
    }
    checkLSLanguage();
}

function alertLocalstorageDoesNotWork() {
    if (!localStorageWorks()) {
        var tab = '<div class="alert alert-danger" style="color:#000000">' + language.HTMLJS.localstorageDoesNotWork + '</div>';
        document.getElementById("localstorageDoesNotWork").innerHTML = tab;
        return true;
    }
    return false;
}

function checkLSLanguage() {
    if (storageGetItem("lang")) {
        switch(storageGetItem("lang")) {
            case 'zh-cn':
                language = languages["zh-cn"];
                break;
            case 'zh-hk':
                language = languages["zh-hk"];
                break;
            case 'noStorage':
                language = languages["zh-cn"];
                break;
        }
    }
}