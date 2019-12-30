var CAN_LOCALSTORAGE_WORK;

function checkLocalStorageWork() {
    CAN_LOCALSTORAGE_WORK = _localStorageWorks();
    if (CAN_LOCALSTORAGE_WORK !== true)
        CAN_LOCALSTORAGE_WORK = false;
    else
        document.getElementById("localstorageDoesNotWork").style.display = "none";
}
function _localStorageWorks() {
    try {
        localStorage.setItem("test_Dlz3bH", "KwNYPCpyH7yl2S1K");
        var result = localStorage.getItem("test_Dlz3bH") == "KwNYPCpyH7yl2S1K";
        localStorage.removeItem("test_Dlz3bH");
        return result;
    } catch (ex) {}
}

function storageSetItem(Key, Value) {
    if (CAN_LOCALSTORAGE_WORK) {
        localStorage.setItem(Key, Value);
    }
}

function storageGetItem(Key) {
    if (CAN_LOCALSTORAGE_WORK) {
        var returnValue = localStorage.getItem(Key);
        if (returnValue === null)
            return "noStorage";
        else
            return returnValue;
    }
    else
        return "noStorage";
}

function checkLocalStorage() {
    LS_setHTMLtab();
    LS_setPerHourOrTotal();
}

function LS_setHTMLtab() {
    var htmltab = storageGetItem("HTMLtab")
    if (htmltab === "Timetable") {
        IS_ChangeTabByJS = true;
        ChangeTab(htmltab);
    }
    else {
        IS_ChangeTabByJS = true;
        ChangeTab("Anytime");
    }
}

function LS_setPerHourOrTotal() {
    var PerHourOrTotal = storageGetItem("PerHourOrTotal");
    if (PerHourOrTotal === "Total") {
        changeCalculateOutput_Total();
    }
}