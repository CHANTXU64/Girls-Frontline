var SAVED = [];

//[名称-计算方式-大成功概率-是否UP-关卡解锁-计算方式的详情-选择的关卡-开始时间]-md5
function saveThisPlan() {
    if (SAVED.length >= 999) {
        alert(language.JS.Saved_alert2);
        return;
    }
    var name = prompt(language.JS.plzInputPlanName, language.JS.planDefaultName);
    if (name == null)
        return;
    if (name == "")
        name = language.JS.planDefaultName;
    var GreatSuccessRate = Input_getGreatSuccessRate();
    var is_UP = IsGreatSuccessRateUp();
    var SelectChapter = Input_getSelectChapter();
    var newData = [];
    var ShownTab = getShownTab();
    var Saved_Custom = ShownTab.Saved_Custom();
    var SelectMissions = MISSION_TABLE_SELECT.slice();
    let StartTime = Input_getStartTime();
    newData.push(name);
    newData.push(HTML_TAB);
    newData.push(GreatSuccessRate);
    newData.push(is_UP);
    newData.push(SelectChapter);
    newData.push(Saved_Custom);
    newData.push(SelectMissions);
    newData.push(StartTime);
    var newSave = {data:[], MD5:""};
    newSave.data = newData;
    newSave.MD5 = md5(JSON.stringify(newData));
    SAVED.push(newSave);
    storageSetItem("SAVED", SAVED);
    PrintSavedThisRow(SAVED.length - 1);
}

function PrintSavedThisRow(Row) {
    if (Row === 0)
        document.getElementById("NoSaved").style.display = "none";
    var HTML = "";
    HTML += '<tr id="SavedTable_row_' + Row + '"';
    HTML += '><td><button type="button" class="btn btn-default"id="SavedTable_apply_' + Row + '" title="' + language.HTMLJS.SavedTable_apply + '" style="background-color: #88E063;">';
    HTML += '<span class="glyphicon glyphicon-ok"style="top: 2px;" /></button></td><td><div class="form-group input-group" style="margin-bottom: 0px;">';
    HTML += '<input type="text" class="form-control" style="min-width: 140px;"id="SavedTable_name_' + Row + '" placeholder="' + language.HTMLJS.SavedTable_name + '"';
    HTML += 'value="' + SAVED[Row].data[0] + '"readonly="readonly">';
    HTML += '<div class="input-group-btn"><button type="button" class="btn btn-default"id="SavedTable_rename_' + Row + '" title="' + language.HTMLJS.SavedTable_rename + '"><span class="glyphicon glyphicon-pencil"style="top: 2px;" /></button></div>';
    HTML += '</div></td>';
    HTML += '<td><div class="btn-group" style="min-width: 80px;"><button type="button" class="btn btn-default"id="SavedTable_up_' + Row + '"" title="' + language.HTMLJS.SavedTable_up + '"';
    if (Row === 0)
        HTML += 'disabled="disabled"';
    HTML += '>';
    HTML += '<span class="glyphicon glyphicon-arrow-up"style="top: 2px;" /></button>';
    HTML += '<button type="button" class="btn btn-default"id="SavedTable_down_' + Row + '" title="' + language.HTMLJS.SavedTable_down + '"';
    if (Row === SAVED.length - 1)
        HTML += 'disabled="disabled"';
    HTML +='><span class="glyphicon glyphicon-arrow-down"style="top: 2px;" /></button></div></td>';
    HTML += '<td><button type="button" class="btn btn-default"id="SavedTable_export_' + Row + '" title="' + language.HTMLJS.SavedTable_export + '"><span class="glyphicon glyphicon-export"style="top: 2px;" /></button></td>';
    HTML += '<td><button type="button" class="btn btn-default"id="SavedTable_delete_' + Row + '" title="' + language.HTMLJS.SavedTable_delete + '" style="background-color: #F48380;"><span class="glyphicon glyphicon-trash"style="top: 2px;" /></button></td></tr>';
    $("#Saved_Body").append(HTML);
    if (Row !== 0)
        $("#SavedTable_down_" + (Row - 1)).removeAttr("disabled");
}

function Saved_apply(Row) {
    var savedData = SAVED[Row].data;
    var htmltab = savedData[1];
    IS_ChangeTabByJS = true;
    ChangeTab(htmltab);
    Input_setGreatSuccessRate(savedData[2]);
    Input_setGreatSuccessUpRate(savedData[3]);
    Input_setSelectChapter(savedData[4]);
    var ShownTab = getShownTab();
    ShownTab.ApplySaved_Custom(savedData[5]);
    MISSION_TABLE_SELECT = savedData[6].slice();
    if (savedData[7] !== undefined)//兼容以前的版本
        Input_setStartTime(savedData[7]);
    else
        Input_setStartTime(0);
    delete_PlanTable();
    HTML_AllowInput();
    if (!is_CalculateByHour()) {
        ShownTab.setTime(false);
        TABLE_CALCULATE_TOTAL_TIME = ShownTab.TotalTime;
    }
    PrintMissionTable();
    PrintPlanDetails();
}

function Saved_rename(Row) {
    var elem_id = "#SavedTable_name_" + Row;
    var elem = $(elem_id);
    var newName = elem.val();
    SAVED[Row].data[0] = newName;
    SAVED[Row].MD5 = md5(JSON.stringify(SAVED[Row].data));
    storageSetItem("SAVED", SAVED);
}

function Saved_upThisRow(Row) {
    $("#SavedTable_name_" + Row).val(SAVED[Row - 1].data[0]);
    $("#SavedTable_name_" + (Row - 1)).val(SAVED[Row].data[0]);
    [SAVED[Row], SAVED[Row - 1]] = [SAVED[Row - 1], SAVED[Row]];
    storageSetItem("SAVED", SAVED);
}

function Saved_downThisRow(Row) {
    $("#SavedTable_name_" + Row).val(SAVED[Row + 1].data[0]);
    $("#SavedTable_name_" + (Row + 1)).val(SAVED[Row].data[0]);
    [SAVED[Row], SAVED[Row + 1]] = [SAVED[Row + 1], SAVED[Row]];
    storageSetItem("SAVED", SAVED);
}

function Saved_export(Row) {
    var text = JSON.stringify(SAVED[Row]);
    prompt("export", text);
}

function Saved_deleteThisRow(Row, NeedWarning = true) {
    var flag = true;
    if (NeedWarning) {
        var name = SAVED[Row].data[0];
        var warning = language.JS.deleteSavedWarning_1 + '"' + name + '"' + language.JS.deleteSavedWarning_2;
        var flag = confirm(warning);
    }
    if (flag) {
        for (var i = Row; i < SAVED.length - 1; i++) {
            $("#SavedTable_name_" + i).val(SAVED[i + 1].data[0]);
        }
        var removeElem = document.getElementById("SavedTable_row_" + (SAVED.length - 1));
        document.getElementById("Saved_Body").removeChild(removeElem);
        SAVED.splice(Row, 1);
        storageSetItem("SAVED", SAVED);
        if (SAVED.length !== 0) {
            $("#SavedTable_up_0").attr("disabled", "true");
            $("#SavedTable_down_" + (SAVED.length - 1)).attr("disabled", "true");
        }
        else
            document.getElementById("NoSaved").style.display = "";
    }
}

function Saved_import(input) {
    try {
        var newSaved = JSON.parse(input);
        var MD5 = md5(JSON.stringify(newSaved.data));
        var result = MD5 === newSaved.MD5
    } catch (ex) {}
    if (result) {
        SAVED.push(newSaved);
        storageSetItem("SAVED", SAVED);
        PrintSavedThisRow(SAVED.length - 1);
    }
    else
        alert(language.JS.Saved_alert);
}

function Saved_importAndCover_SAVED(Saved_Arr) {
    while(SAVED.length !== 0)
        Saved_deleteThisRow(0, false);
    for (var i = 0; i < Saved_Arr.length; i++) {
        if (md5(JSON.stringify(Saved_Arr[i].data)) !== Saved_Arr[i].MD5)
            return false;
        SAVED.push(Saved_Arr[i]);
        storageSetItem("SAVED", SAVED);
        PrintSavedThisRow(SAVED.length - 1);
    }
    return true;
}