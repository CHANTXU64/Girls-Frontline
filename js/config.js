/**
 * 通过localstorage的存储数据来初始化HTML页面
 */
function setPageByLocalStorage() {
    LS_setDescription();
    LS_setLocalstorageWarning();
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
    LS_setSavedOrMissionsShow();
}

/**
 * @param {boolean} display
 */
function LS_setDescription(display = storageGetItem("Description_Display")) {
    if (display === false)
        document.getElementById("description").style.display = "none";
}

/**
 * @param {boolean} display
 */
function LS_setLocalstorageWarning(display = storageGetItem("LocalstorageWarning_Display")) {
    if (display === false)
        document.getElementById("localstorageWarning").style.display = "none";
}

/**
 * @param {string} htmlTab
 */
function LS_setHTMLtab(htmlTab = storageGetItem("TabName")) {
    if (htmlTab === "Timetable")
        ChangeTab("Timetable");
    else
        ChangeTab("Anytime");
}

/**
 * @param {string} PerHourOrTotal
 */
function LS_setPerHourOrTotal(PerHourOrTotal = storageGetItem("HourlyOrTotal")) {
    if (PerHourOrTotal === "PerHour") {
        storageSetItem("HourlyOrTotal", "PerHour");
        document.getElementById("Display_PerHour").checked = true;
    }
    else {
        storageSetItem("HourlyOrTotal", "Total");
        document.getElementById("Display_Total").checked = true;
    }
}

/**
 * @param {Array.<number>} Custom
 */
function LS_setTabAnytimeCustom(Custom = storageGetItem("TabAnytimeCustom")) {
    if (Custom !== "noStorage") {
        var Tab = new Tab_Anytime;
        Tab.applySavedCustom(Custom);
    }
}

/**
 * @param {Array.<number>} Custom
 */
function LS_setTabTimetableCustom(Custom = storageGetItem("TabTimetableCustom")) {
    if (Custom !== "noStorage") {
        var Tab = new Tab_Timetable;
        Tab.applySavedCustom(Custom);
    }
}

/**
 * @param {number} Rate
 */
function LS_setGreatSuccessRate(Rate = storageGetItem("GreatSuccessRate")) {
    if (Rate !== "noStorage")
        Input_setGreatSuccessRate(Rate);
}

/**
 * @param {boolean} is_UP
 */
function LS_setGreatSuccessRateUP(is_UP = storageGetItem("Is_GreatSuccessRateUP")) {
    if (is_UP !== "noStorage")
        Input_setGreatSuccessUpRate(is_UP, false);
}

/**
 * @param {number} Chapter
 */
function LS_setSelectChapter(Chapter = storageGetItem("ChapterLimit")) {
    if (Chapter !== "noStorage")
        Input_setSelectChapter(Chapter);
}

/**
 * @param {number} Weight
 */
function LS_setContractWeight(Weight = storageGetItem("ContractWeight")) {
    if (Weight !== "noStorage")
        Input_setContractWeight(Weight);
}

/**
 * @param {Array.<number>} Target
 */
function LS_setTarget(Target = storageGetItem("TargetValue")) {
    if (Target !== "noStorage")
        Input_setTarget(Target);
}

/**
 * @param {Saved._saved} saved
 */
function LS_setSaved(saved = storageGetItem("Saved")) {
    if (saved !== "noStorage")
        Saved.setSaved(saved);
}

/**
 * @param {boolean} IsSavedPanelShow
 */
function LS_setSavedOrMissionsShow(IsSavedPanelShow = storageGetItem("IsSavedPanelShow")) {
    if (IsSavedPanelShow === true) {
        if (Saved.getSaved().length === 0)
            storageSetItem("IsSavedPanelShow", false);
        else {
            document.getElementById("MissionTable_card").style.transition = "none";
            document.getElementById("Saved_card").style.transition = "none";
            $("#Saved_card").collapse('show');
            $("#MissionTable_card").collapse('hide');
        }
    }
}

/**
 * @type {{version: string, TabName: string, HourlyOrTotal: string, TabAnytimeCustom: Array.<number>,
 * TabTimetableCustom: Array.<number>, GreatSuccessRate: number, Is_GreatSuccessRateUp: boolean,
 * ChapterLimit: number, ContractWeight: number, TargetValue: Array.<number>, Saved: Saved._saved}}
 */
const config_data_type_v_1_x_x = 0;

/**
 * 导出配置
 */
function config_export() {
    /**@type {config_data_type_v_1_x_x} */
    let data = {};
    data.version = VERSION;
    let ShownTab = getShownTab();
    data.TabName = ShownTab.name;
    if (is_CalculateByHour())
        data.HourlyOrTotal = "PerHour";
    else
        data.HourlyOrTotal = "Total";
    let Tab = new Tab_Anytime;
    data.TabAnytimeCustom = Tab.getSavedCustom();
    Tab = new Tab_Timetable;
    data.TabTimetableCustom = Tab.getSavedCustom();
    data.GreatSuccessRate = Input_getGreatSuccessRate();
    data.Is_GreatSuccessRateUp = IsGreatSuccessRateUp();
    data.ChapterLimit = Input_getSelectChapter();
    data.ContractWeight = Input_getContractWeight();
    data.TargetValue = Input_getTarget_Correct();
    data.Saved = Saved.getSaved();
    data.PlanCombination = plan_combination_getConfigData();

    let SHA1 = sha1(JSON.stringify(data));
    let config = {
        data: data,
        SHA1: SHA1
    };
    config = JSON.stringify(config);
    config = LZString.compressToBase64(config);

    let config_elem = document.getElementById("Config_exportInput");
    config_elem.value = config;
}

/**
 * 导入配置
 * @param {string} input - 导入的数据
 */
function setPageByImport(input) {
    //debug
    if (input === "clearCONSOLE") {
        CONSOLE = "";
        if (CAN_STORAGE_WORK)
            sessionStorage.removeItem("GF_Logistics_console");
        return ;
    }
    if ((input === "clearSTORAGE" || input === "clear") && CAN_STORAGE_WORK) {
        sessionStorage.removeItem("GF_Logistics_console");
        sessionStorage.removeItem("GF_Logistics_windowOnload");
        localStorage.removeItem("GF_Logistics");
        localStorage.removeItem("GF_Logistics_v1.x.x");
        localStorage.removeItem("GF_Logistics_PC_v1.x.x");
        localStorage.removeItem("GF_Logistics_vDevelop.x.x");
        localStorage.removeItem("GF_Logistics_PC_vDevelop.x.x");
        return ;
    }
    if (input === "runERROR") {
        runError();
        return ;
    }
    if (input === "debug") {
        $('#importSaved_input').val(CONSOLE);
        return ;
    }

    //当有saved, 询问是否要覆盖当前config, 否则退出
    if (Saved.getSaved().length !== 0)
        Modal.confirm(language.JS.config_alert, function () {setPageByImport_ok(input);});
    else
        setPageByImport_ok(input);
}

/**
 * 确认导入配置
 * @param {*} input - 导入的数据
 */
function setPageByImport_ok(input) {
    try {
        //尝试导入v0版本
        var config = JSON.parse(input);
        let SHA1 = sha1(JSON.stringify(config.data));
        var result = SHA1 === config.SHA1;
    } catch (ex) {}
    if (result) {
        setPageByImport_main_v_0_x_x(config.data);
        delete_rankingResults();
        HTML_AllowRankingInput();
    }
    else {
        try {
            //尝试导入v1版本
            input = LZString.decompressFromBase64(input);
            var config = JSON.parse(input);
            let SHA1 = sha1(JSON.stringify(config.data));
            var result = SHA1 === config.SHA1;
        } catch (ex) {}
        if (result) {
            setPageByImport_main(config.data);
            delete_rankingResults();
            HTML_AllowRankingInput();
        }
        else
            Modal.alert(language.JS.Saved_alert);
    }
}

/**
 * 从v1.x.x版本的config导入到page
 * @param {config_data_type_v_1_x_x} data
 */
function setPageByImport_main(data) {
    LS_setHTMLtab(data.TabName);
    LS_setPerHourOrTotal(data.HourlyOrTotal);
    LS_setTabAnytimeCustom(data.TabAnytimeCustom);
    LS_setTabTimetableCustom(data.TabTimetableCustom);
    LS_setGreatSuccessRate(data.GreatSuccessRate);
    LS_setGreatSuccessRateUP(data.Is_GreatSuccessRateUp);
    LS_setSelectChapter(data.ChapterLimit);
    LS_setContractWeight(data.ContractWeight);
    LS_setTarget(data.TargetValue);
    LS_setSaved(data.Saved);

    MissionsDetails.setSelectedMissions([]);
    MissionsDetails.print();
    printPlanDetails();

    plan_combination_init(data.PlanCombination);
}

/**
 * 从v0.x.x版本的config导入到page
 * @param {Array} data - v0.x.x版本的config.data
 */
function setPageByImport_main_v_0_x_x(data) {
    /**@type {config_data_type_v_1_x_x} */
    let data_v_1_x_x = {};
    data_v_1_x_x.version = "0.x.x";
    data_v_1_x_x.TabName = data[0];
    data_v_1_x_x.HourlyOrTotal = data[1];
    data_v_1_x_x.TabAnytimeCustom = data[2];
    data_v_1_x_x.TabTimetableCustom = data[3];
    data_v_1_x_x.GreatSuccessRate = data[4];
    data_v_1_x_x.Is_GreatSuccessRateUp = data[5];
    data_v_1_x_x.ChapterLimit = data[6];
    data_v_1_x_x.ContractWeight = data[7];
    data_v_1_x_x.TargetValue = data[8];
    data_v_1_x_x.Saved = _savedData_v_0_x_x_To_v_1_x_x(data[9]);

    setPageByImport_main(data_v_1_x_x);
}
