/**
 * 版本
 *
 * 注意, 会导致LOCAL_STORAGE_KEY改变,
 * 可能需要修改html中的script(当用js切换nav显示时, 4.4.1bootstrap会在全部东西处理完后开始切换动画, 避免阻塞, 事先切换nav)
 */
const VERSION = "1.1.0-rc";

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
        if (sessionStorage.getItem("GF_Logistics_windowOnload") === "failed")
            removeStorageAndWarnDueToFailedWindowLoad();
        sessionStorage.setItem("GF_Logistics_windowOnload", "failed");
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
    let storage_v0 = localStorage.getItem("GF_Logistics");
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
    sessionStorage.removeItem("GF_Logistics_windowOnload");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem("GF_Logistics");
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
        _updateLSFrom_v_0_x_x_To_v_1_x_x();
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
//IsSavedPanelShow - "已保存"是否展开

/**
 * 从v0.x.x版本localstorage转换为v1.x.x版本, 并删除原来的存储数据
 */
function _updateLSFrom_v_0_x_x_To_v_1_x_x() {
    let LS_Key = "GF_Logistics";
    let LS_data = localStorage.getItem(LS_Key);
    if (LS_data === null)
        return ;
    try {
        let data = JSON.parse(LS_data);
        LS_data = data;
    } catch (ex) {
        console.error("v0storage, storage: " + LS_data);
        LS_data = {};
    }

    let newData = {};
    newData.Lang = LS_data.lang;
    newData.Description_Display = LS_data.Description_Display;
    newData.LocalstorageWarning_Display = LS_data.LocalstorageWarning_Display;
    newData.TabName = LS_data.HTML_TAB;
    newData.HourlyOrTotal = LS_data.PerHourOrTotal;
    newData.TabAnytimeCustom = LS_data.TabAnytimeCustom;
    newData.TabTimetableCustom = LS_data.TabTimetableCustom;
    newData.GreatSuccessRate = LS_data.GreatSuccessRate;
    newData.Is_GreatSuccessRateUP = LS_data.is_GreatSuccessRateUP;
    newData.ChapterLimit = LS_data.SelectChapter;
    newData.ContractWeight = LS_data.ContractWeight;
    newData.TargetValue = LS_data.TargetValue;
    newData.Saved = _savedData_v_0_x_x_To_v_1_x_x(LS_data.SAVED);
    newData.IsSavedPanelShow = LS_data.IsSavedShow;
    let storageValue = JSON.stringify(newData)

    localStorage.setItem("GF_Logistics_v1.x.x", storageValue);
    localStorage.removeItem(LS_Key);
}
/**
 * 将v0版本saved数转换成v1版本的saved数据
 * @param {Array} v_0_x_x_savedData - v0.x.x版本的saved数据
 * @returns {Saved._saved} v1.x.x版本的saved数据
 */
function _savedData_v_0_x_x_To_v_1_x_x(v_0_x_x_savedData = []) {
    let v_1_x_x_savedData = [];
    for (let i = 0; i < v_0_x_x_savedData.length; i++) {
        let data = v_0_x_x_savedData[i].data;
        let newData = {};
        newData.name = data[0];
        newData.TabName = data[1];
        newData.GSRate = data[2];
        newData.is_UP = data[3];
        newData.Chapter = data[4];
        newData.TabCustom = data[5];
        newData.Missions = data[6];
        newData.startTime = data[7];

        v_1_x_x_savedData.push(newData);
    }
    return v_1_x_x_savedData;
}

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
