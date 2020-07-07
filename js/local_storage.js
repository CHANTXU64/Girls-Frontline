/**
 * 用于判断浏览器是否能使用storage
 *
 * 在window.onload初始化, 之后将不再改变
 * @type {boolean}
 */
let CAN_STORAGE_WORK;

/**
 * localstorage存储使用的key
 * @example GF_Logistics_v1.x.x
 */
const LOCAL_STORAGE_KEY = "GF_Logistics_v" + VERSION.slice(0, VERSION.indexOf(".")) + ".x.x";

/**
 * 在window.onload使用, 设置CAN_LOCALSTORAGE_WORK,
 * 并且在HTML页面上显示信息
 */
function checkLocalStorageWork() {
    CAN_STORAGE_WORK = _localStorageWorks() && _sessionStorageWorks();
    if (CAN_STORAGE_WORK !== true) {
        CAN_STORAGE_WORK = false;
        document.getElementById("localstorageWarning").style.display = "none";
        document.getElementById("neverShowAgain_description").style.display = "none";
        document.getElementById("description").style.paddingRight = "1.25rem";
    }
    else {
        document.getElementById("localstorageDoesNotWork").style.display = "none";
        if (sessionStorage.getItem("GF_Logistics_windowOnloadFailed") === "2")
            removeStorageAndWarnDueToFailedWindowLoad();
        let loadFailed = sessionStorage.getItem("GF_Logistics_windowOnloadFailed") || 0;
        sessionStorage.setItem("GF_Logistics_windowOnloadFailed", ++loadFailed);
    }
}
/**判断浏览器是否能使用local storage */
function _localStorageWorks() {
    try {
        let Random1 = Math.random();
        let Random2 = Math.random();
        localStorage.setItem("test_PzrJwG" + Random1, "Rx3IyFdmJMji0Alo" + Random2);
        let result = localStorage.getItem("test_PzrJwG" + Random1) == "Rx3IyFdmJMji0Alo" + Random2;
        localStorage.removeItem("test_PzrJwG" + Random1);
        return result;
    } catch (ex) {
        return false;
    }
}
/**判断浏览器是否能使用session storage */
function _sessionStorageWorks() {
    try {
        let Random1 = Math.random();
        let Random2 = Math.random();
        sessionStorage.setItem("test_QQ15L2X" + Random1, "MVQYqpFNO8WU6Flc" + Random2);
        let result = sessionStorage.getItem("test_QQ15L2X" + Random1) == "MVQYqpFNO8WU6Flc" + Random2;
        sessionStorage.removeItem("test_QQ15L2X" + Random1);
        return result;
    } catch (ex) {
        return false;
    }
}

function removeStorageAndWarnDueToFailedWindowLoad() {
    let storage_v1 = localStorage.getItem(LOCAL_STORAGE_KEY);
    let data = {};
    data.userAgent = navigator.userAgent;
    data.appName = navigator.appName;
    data.appCodeName = navigator.appCodeName;
    data.appVersion = navigator.appVersion;
    data.appMinorVersion = navigator.appMinorVersion;
    data.platform = navigator.platform;
    data.cookieEnabled = navigator.cookieEnabled;
    data.onLine = navigator.onLine;
    data.language = navigator.language;
    data.localStorage_v0 = storage_v0;
    data.localStorage_v1 = storage_v1;
    data.console = sessionStorage.getItem("GF_Logistics_console");

    let warn = "<div class=\"alert alert-danger\" style=\"color:#000000; cursor: default;\">";
    warn += language_zh_CN.JS.FailedWindowLoadWarn + "<br>";
    warn += language_zh_TW.JS.FailedWindowLoadWarn + "<br>";
    warn += language_en.JS.FailedWindowLoadWarn + "<br>";
    warn += "<br><code style=\"color:#000000; cursor:auto\">";
    warn += JSON.stringify(data);
    warn += "</code></div>";
    $("#description").before(warn);

    //删除所有可能相关的localstorage
    sessionStorage.removeItem("GF_Logistics_windowOnloadFailed");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem("GF_Logistics_PC_v" + VERSION.slice(0, VERSION.indexOf(".")) + ".x.x");
}

/**
 * 如果不存在目前版本对应的localstorage,
 * 尝试从以前版本的localstorage转换过来
 */
function updateLocalStorage() {
    if (!CAN_STORAGE_WORK)
        return ;
    let LS_data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (LS_data === null) {
    }
}

//v1.x.x localstorage 键名
//Lang - 语言
//Description_Display - 说明警告是否显示
//LocalstorageWarning_Display - web存储警告是否显示
//TabName - ShownTab的name
//HourlyOrTotal - 以每小时显示还是以总计显示
//TabAnytimeCustom - AnyTime中的数据
//TabTimetable - Timetable中的数据
//GreatSuccessRate - 大成功基础概率
//Is_GreatSuccessRateUP - 是否UP
//ChapterLimit - 解锁章节
//ContractWeight - 契约权重
//TargetValue - 需求值
//Saved - 已保存的方案
//TargetSaved - 保存的需求量
//IsSavedPanelShow - "已保存"是否展开

/**
 * 向localstorage存入数据, 不用考虑localstorage是否能工作
 * @param {string} Key - 存储名称
 * @param {*} Value - 存储数据
 */
function storageSetItem(Key, Value) {
    if (CAN_STORAGE_WORK) {
        let storageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
        try {
            let Value = JSON.parse(storageValue);
            storageValue = Value;
        } catch (ex) {
            console.error("storageGetItem, storage: " + storageValue);
            storageValue = {};
        }
        if (storageValue === null)
            storageValue = {};
        storageValue[Key] = Value;
        storageValue.version = VERSION;
        storageValue = JSON.stringify(storageValue);
        localStorage.setItem(LOCAL_STORAGE_KEY, storageValue);
    }
}

/**
 * 向localstorage取出数据
 * @param {string} Key - 存储名称
 * @returns {*} 存储数据, 若无数据则返回"noStorage"
 */
function storageGetItem(Key) {
    if (CAN_STORAGE_WORK) {
        let storageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storageValue === null)
            return "noStorage";
        else {
            try {
                let Value = JSON.parse(storageValue);
                storageValue = Value;
            } catch (ex) {
                console.error("storageGetItem, storage: " + storageValue);
                storageValue = {};
            }
            let Value = storageValue[Key];
            if (Value === undefined)
                return "noStorage";
            else
                return Value;
        }
    }
    else
        return "noStorage";
}
