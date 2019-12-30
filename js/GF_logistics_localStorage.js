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
        var storageValue = JSON.stringify(Value);
        localStorage.setItem(Key, storageValue);
    }
}

function storageGetItem(Key) {
    if (CAN_LOCALSTORAGE_WORK) {
        var storageValue = localStorage.getItem(Key);
        if (storageValue === null)
            return "noStorage";
        else
            return JSON.parse(storageValue);
    }
    else
        return "noStorage";
}

function setPageByLocalStorage() {
    LS_setHTMLtab();
    LS_setPerHourOrTotal();
    LS_setTabAnytimeCustom();
    LS_setTabTimetableCustom();
    LS_setGreatSuccessRate();
    LS_setGreatSuccessRateUP();
    LS_setSelectChapter();
    LS_setContractWeight();
    LS_setTarget();
    LS_setSaved();
}

function LS_setHTMLtab(htmltab = storageGetItem("HTMLtab")) {
    if (htmltab === "Timetable") {
        IS_ChangeTabByJS = true;
        ChangeTab(htmltab);
    }
    else {
        IS_ChangeTabByJS = true;
        ChangeTab("Anytime");
    }
}

function LS_setPerHourOrTotal(PerHourOrTotal = storageGetItem("PerHourOrTotal")) {
    if (PerHourOrTotal === "PerHour")
        changeCalculateOutput_Hour(false);
    else
        changeCalculateOutput_Total(false);
}

function LS_setTabAnytimeCustom(Custom = storageGetItem("TabAnytimeCustom")) {
    if (Custom !== "noStorage") {
        var Tab = new Tab_Anytime;
        Tab.ApplySaved_Custom(Custom);
    }
}

function LS_setTabTimetableCustom(Custom = storageGetItem("TabTimetableCustom")) {
    if (Custom !== "noStorage") {
        var Tab = new Tab_Timetable;
        Tab.ApplySaved_Custom(Custom);
    }
}

function LS_setGreatSuccessRate(Rate = storageGetItem("GreatSuccessRate")) {
    if (Rate !== "noStorage")
        Input_setGreatSuccessRate(Rate);
}

function LS_setGreatSuccessRateUP(is_UP = storageGetItem("is_GreatSuccessRateUP")) {
    if (is_UP !== "noStorage")
        Input_setGreatSuccessUpRate(is_UP, false);
}

function LS_setSelectChapter(Chapter = storageGetItem("SelectChapter")) {
    if (Chapter !== "noStorage")
        Input_setSelectChapter(Chapter);
}

function LS_setContractWeight(Weight = storageGetItem("ContractWeight")) {
    if (Weight !== "noStorage")
        Input_setContractWeight(Weight);
}

function LS_setTarget(Target = storageGetItem("TargetValue")) {
    if (Target !== "noStorage")
        Input_setTarget(Target);
}

function LS_setSaved(Saved = storageGetItem("SAVED")) {
    if (Saved !== "noStorage")
        Saved_importAndCover_SAVED(Saved);
}

//ShownTab-PerHourOrTotal-TabAnytimeCustom-TabTimetableCustom-GreatSuccessRate-GreatSuccessRateUP-SelectChapter-ContractWeight-Target-Saved
function Config_export(){
    var data = [];
    data.push(HTMLtab);
    if (is_CalculateByHour())
        data.push("PerHour");
    else
        data.push("Total");
    var Tab = new Tab_Anytime;
    data.push(Tab.Saved_Custom());
    Tab = new Tab_Timetable;
    data.push(Tab.Saved_Custom());
    data.push(Input_getGreatSuccessRate());
    data.push(IsGreatSuccessRateUp());
    data.push(Input_getSelectChapter());
    data.push(Input_getContractWeight());
    data.push(Input_getTarget_Correct());
    data.push(SAVED);
    var MD5 = md5(data);
    var config = {data: [], MD5: ""};
    config.data = data;
    config.MD5 = MD5;
    prompt("export", JSON.stringify(config));
}

function setPageByImport(input) {
    try {
        var config = JSON.parse(input);
        var MD5 = md5(config.data);
        var result = MD5 === config.MD5
    } catch (ex) {}
    if (result) {
        setPageByImport_main(config.data);
    }
    else
        alert(language.JS.Saved_alert);
}

function setPageByImport_main(data) {
    LS_setHTMLtab(data[0]);
    LS_setPerHourOrTotal(data[1]);
    LS_setTabAnytimeCustom(data[2]);
    LS_setTabTimetableCustom(data[3]);
    LS_setGreatSuccessRate(data[4]);
    LS_setGreatSuccessRateUP(data[5]);
    LS_setSelectChapter(data[6]);
    LS_setContractWeight(data[7]);
    LS_setTarget(data[8]);
    LS_setSaved(data[9]);
}