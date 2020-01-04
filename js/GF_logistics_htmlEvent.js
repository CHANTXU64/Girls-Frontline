$(function (){
    $('[href=#lang-zh-CN]').on('click', function(){changeLanguage('zh-CN');});
    $('[href=#lang-zh-TW]').on('click', function(){changeLanguage('zh-TW');});
});

$(function (){
    $("#neverShowAgain_description").on('click', function(){
        storageSetItem("Description_Display", false);
        document.getElementById("description").style.display = "none";
    });
    $("#neverShowAgain_localstorageWarning").on('click', function() {
        storageSetItem("LocalstorageWarning_Display", false);
        document.getElementById("localstorageWarning").style.display = "none";
    });
});

var IS_ChangeTabByJS = false;
$(function (){
    $('[href=#Tab_Anytime]').on("shown.bs.tab", function(){
        if (IS_ChangeTabByJS)
            IS_ChangeTabByJS = false;
        else
            ChangeTab_Anytime();
    });
    $('[href=#Tab_Timetable]').on("shown.bs.tab", function(){
        if (IS_ChangeTabByJS)
            IS_ChangeTabByJS = false;
        else
            ChangeTab_Timetable();
    });
});

$(function (){
    $('input[id^=Display_]').on("click", function(){
        if (is_CalculateByHour())
            changeCalculateOutput_Hour();
        else
            changeCalculateOutput_Total();
    });
    $("#Display_PerHour_text").on("keyup", function(e){
        if (e.which == 13) {
            document.getElementById("Display_PerHour").checked = true;
            changeCalculateOutput_Hour();
        }
    });
    $("#Display_Total_text").on("keyup", function(e){
        if (e.which == 13) {
            document.getElementById("Display_Total").checked = true;
            changeCalculateOutput_Total();
        }
    });
});

$(function (){
    $("#GreatSuccessRate").on('input propertychange',function() {
        const Rate = Input_getGreatSuccessRate();
        const is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP, false);
        const TotalRate = Rate + Input_getGreatSuccessUpRate(Rate);
        setQContract(TotalRate);
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#GreatSuccessRate").blur(function() {
        const Rate = Input_getGreatSuccessRate();
        storageSetItem("GreatSuccessRate", Rate);
    });
    $('#GreatSuccessRateUp').on('click', function() {
        const is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP);
        const TotalRate = Input_getTotalGreatSuccessRate(true);
        setQContract(TotalRate);
        PrintMissionTable();
        PrintPlanDetails();
        storageSetItem("is_GreatSuccessRateUP", is_RateUP);
    });
});

$(function() {
    $("#ChapterLimit").on('change', function() {
        PrintMissionTable();
        PrintPlanDetails();
        storageSetItem("SelectChapter", Input_getSelectChapter());
    });
});

//Tab_Anytime
$(function() {
    $("#Time_Anytime_hours").on('input propertychange', function() {
        if (!is_CalculateByHour()) {
            const TotalTime = Input_getAnytimeTotalTime();
            TABLE_CALCULATE_TOTAL_TIME = TotalTime;
        }
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#Time_Anytime_hours").blur(function () {Tab_Anytime_changeStorageCustom();});
    $("#Time_Anytime_minutes").on('input propertychange', function() {
        if (!is_CalculateByHour()) {
            const TotalTime = Input_getAnytimeTotalTime();
            TABLE_CALCULATE_TOTAL_TIME = TotalTime;
        }
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#Time_Anytime_minutes").blur(function () {Tab_Anytime_changeStorageCustom();});
    $("#Tab_Anytime_MinimumIntervalTime_minutes").on('input propertychange', function() {
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#Tab_Anytime_MinimumIntervalTime_minutes").blur(function () {Tab_Anytime_changeStorageCustom();});
});
function Tab_Anytime_changeStorageCustom() {
    let tab = new Tab_Anytime;
    storageSetItem("TabAnytimeCustom", tab.Saved_Custom());
}

//Tab_Timetable
$(function() {
    $("#Time_Timetable_hours").on('input propertychange',function() {_Tab_Timetable_changeMaxTime();});
    $("#Time_Timetable_hours").blur(function() {Tab_Timetable_changeStorageCustom();});
    $("#Time_Timetable_minutes").on('input propertychange',function() {_Tab_Timetable_changeMaxTime();});
    $("#Time_Timetable_minutes").blur(function() {Tab_Timetable_changeStorageCustom();});
    $("#Tab_Timetable_new_hours").keyup(function(e) {
        if (e.which == 13)
            $("#Tab_Timetable_new_minutes").focus();
    });
    $("#Tab_Timetable_new_minutes").keyup(function(e) {
        if (e.which == 13) {
            if ($("#Tab_Timetable_new_hours").val() !== "")
                $("#Tab_Timetable_new_hours").focus();
            Tab_Timetable_AddNew();
        }
    });
    $('#Tab_Timetable_AddNewTimePoint').on('click', function() {Tab_Timetable_AddNew();});
    $("#Tab_Timetable_range").on('click', 'button[id^=Tab_Timetable_range_thumb_]', function() {
        var time = parseFloat(stringSliceFromLast_(this.id));
        Tab_Timetable_DeleteThisTimePoint(time);
        PrintMissionTable();
        PrintPlanDetails();
        Tab_Timetable_changeStorageCustom();
    });
    $('#tab_Timetable_deleteall').on('click', function() {
        Tab_Timetable_DeleteAllTimePoint();
        PrintMissionTable();
        PrintPlanDetails();
        Tab_Timetable_changeStorageCustom();
    });
});
function _Tab_Timetable_changeMaxTime() {
    const TotalTime = Input_getTimetableTotalTime();
    Input_setTimetableTotalTime(TotalTime);
    if (!is_CalculateByHour()) {
        TABLE_CALCULATE_TOTAL_TIME = TotalTime;
    }
    PrintMissionTable();
    PrintPlanDetails();
}
function Tab_Timetable_changeStorageCustom() {
    let Tab = new Tab_Timetable;
    storageSetItem("TabTimetableCustom", Tab.Saved_Custom());
}
function Tab_Timetable_AddNew() {
    const newTime = Input_getTimetableNewTotalTime_Correct();
    const TotalTime = Input_getTimetableTotalTime();
    switch (true) {
        case newTime === 0:
            alert(language.JS.tab_Timetable_alert1);
            break;
        case newTime > TotalTime:
            alert(language.JS.tab_Timetable_alert2);
            break;
        case newTime === TotalTime || Tab_Timetable_TIMELIST.indexOf(newTime) !== -1:
            alert(language.JS.tab_Timetable_alert3);
            break;
        default:
            Tab_Timetable_AddNewTimePoint(newTime);
    }
    if (Tab_Timetable_TIMELIST.length === 0)
        Tab_Timetable_InputTotalTime_enable();
    else
        Tab_Timetable_InputTotalTime_disable();
    PrintMissionTable();
    PrintPlanDetails();
    Tab_Timetable_changeStorageCustom();
}

$(function() {
    $("#ContractWeight").change(function() {
        storageSetItem("ContractWeight", Input_getContractWeight());
    });
});

$(function() {
    $("#target").on('click', 'button[id^=setTarget_]', function() {
        setTarget(stringSliceFromLast_(this.id));
    });
    $("#target").on('click', 'button[id^=Target_minus_]', function() {ChangeTarget(this.id);});
    $("#target").on('click', 'button[id^=Target_plus_]', function() {ChangeTarget(this.id);});
});

$(function() {
    $("#target").on('blur', "#MT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#MT", function(e) {
        if (e.which == 13)
            $("#AT").focus();
    });
    $("#target").on('blur', "#AT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#AT", function(e) {
        if (e.which == 13)
            $("#RT").focus();
    });
    $("#target").on('blur', "#RT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#RT", function(e) {
        if (e.which == 13)
            $("#PT").focus();
    });
    $("#target").on('blur', "#PT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#PT", function(e) {
        if (e.which == 13)
            $("#TT").focus();
    });
    $("#target").on('blur', "#TT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#TT", function(e) {
        if (e.which == 13)
            $("#ET").focus();
    });
    $("#target").on('blur', "#ET", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#ET", function(e) {
        if (e.which == 13)
            $("#QPT").focus();
    });
    $("#target").on('blur', "#QPT", function() {TargetChangeStorage();});
    $("#target").on('keyup', "#QPT", function(e) {
        if (e.which == 13)
            $("#QRT").focus();
    });
    $("#target").on('blur', "#QRT", function() {TargetChangeStorage();});
});
function TargetChangeStorage() {
    storageSetItem("TargetValue", Input_getTarget_Correct());
}

$(function() {
    $('#start_sorting').on('click', function() {start_sorting_main();});
    $("#clear_sorting").on('click', function() {
        delete_PlanTable();
        HTML_AllowInput();
    });
});

$(function() {
    $("#Plan_Table").on('shown.bs.collapse', '#FineTuningTool', function() {
        if (!IsMobile())
            document.getElementById("FineTuningTool").style.transition = "";
    });
});

//排序结果点击
$(function() {
    $("#Plan_Table").on('click', 'tr[id^=print_result_plan_tr_]', function() {
        _PlanSort(this);
    });
    $("#Plan_Table").on('keyup', 'tr[id^=print_result_plan_tr_]', function(e) {
        if (e.which == 13)
            _PlanSort(this);
    });
});
function _PlanSort(elem) {
    const number = parseInt(stringSliceFromLast_(elem.id));
    if (elem.className != "success") {
        for (let i = 0; i < RESULT_PLAN.length; i++) {
            document.getElementById("print_result_plan_tr_" + i).className = "";
        }
        elem.className = "success";
        MissionTable_resultPlan_select(number);
    }
    else
        elem.className = "";
}

//对排序结果某一项排序
$(function() {
    $("#Plan_Table").on('click', '#resultPlan_Mission', function() {
        RESULT_PLAN_SORT_BY = "Ranking";
        resultPlan_sortByColumn(0, "ascending");
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Mission', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Ranking";
            resultPlan_sortByColumn(0, "ascending");
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_Manp', function() {
        RESULT_PLAN_SORT_BY = "Manp";
        resultPlan_sortByColumn(5);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Manp', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Manp";
            resultPlan_sortByColumn(5);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_Ammu', function() {
        RESULT_PLAN_SORT_BY = "Ammu";
        resultPlan_sortByColumn(6);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Ammu', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Ammu";
            resultPlan_sortByColumn(6);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_Rati', function() {
        RESULT_PLAN_SORT_BY = "Rati";
        resultPlan_sortByColumn(7);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Rati', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Rati";
            resultPlan_sortByColumn(7);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_Part', function() {
        RESULT_PLAN_SORT_BY = "Part";
        resultPlan_sortByColumn(8);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Part', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Part";
            resultPlan_sortByColumn(8);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_TPro', function() {
        RESULT_PLAN_SORT_BY = "TPro";
        resultPlan_sortByColumn(9);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_TPro', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "TPro";
            resultPlan_sortByColumn(9);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_Equi', function() {
        RESULT_PLAN_SORT_BY = "Equi";
        resultPlan_sortByColumn(10);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_Equi', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "Equi";
            resultPlan_sortByColumn(10);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_QPro', function() {
        RESULT_PLAN_SORT_BY = "QPro";
        resultPlan_sortByColumn(11);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_QPro', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "QPro";
            resultPlan_sortByColumn(11);
        }
    });
    $("#Plan_Table").on('click', '#resultPlan_QRes', function() {
        RESULT_PLAN_SORT_BY = "QRes";
        resultPlan_sortByColumn(12);
    });
    $("#Plan_Table").on('keyup', '#resultPlan_QRes', function(e) {
        if (e.which == 13) {
            RESULT_PLAN_SORT_BY = "QRes";
            resultPlan_sortByColumn(12);
        }
    });
});

$(function () {
    $("#Plan_Table").on('click', 'button[id^=FineTuning_minus_]', function() {FineTuning(-1, stringSliceFromLast_(this.id));});
    $("#Plan_Table").on('click', 'button[id^=FineTuning_plus_]', function() {FineTuning(1, stringSliceFromLast_(this.id));});
});

$(function() {
    $("#Saved_heading").on('keyup', function(e) {
        if (e.which == 13) {
            $("#MissionTable_panel").collapse('hide');
            $("#Saved").collapse('show');
        }
    });
    $("#importSaved_importButton").on('click', function() {
        const input = $("#importSaved_input").val();
        Saved_import(input);
        $("#importSaved_input").val("");
    });
    $("#Saved_Body").on('click', 'button[id^=SavedTable_apply_]', function() {Saved_apply(parseInt(stringSliceFromLast_(this.id)));});
    $("#Saved_Body").on('input propertychange', 'input[id^=SavedTable_name_]', function() {Saved_rename(parseInt(stringSliceFromLast_(this.id)));});
    $("#Saved_Body").on('keyup', 'input[id^=SavedTable_name_]', function(e) {
        const key = e.which;
        if (key == 13) {
            const id = "#" + this.id;
            $(id).attr('readOnly', true);
        }
    });
    $("#Saved_Body").on('blur', 'input[id^=SavedTable_name_]', function() {
        const id = "#" + this.id;
        $(id).attr('readOnly', true);
    });
    $("#Saved_Body").on('click', 'button[id^=SavedTable_rename_]', function() {
        const Row = parseInt(stringSliceFromLast_(this.id));
        const name_elem_id = "#SavedTable_name_" + Row;
        $(name_elem_id).attr('readOnly', false);
        $(name_elem_id).focus();
        $(name_elem_id).select();
    });
    $("#Saved_Body").on('click', 'button[id^=SavedTable_up_]', function() {Saved_upThisRow(parseInt(stringSliceFromLast_(this.id)));});
    $("#Saved_Body").on('click', 'button[id^=SavedTable_down_]', function() {Saved_downThisRow(parseInt(stringSliceFromLast_(this.id)));});
    $("#Saved_Body").on('click', 'button[id^=SavedTable_export_]', function() {Saved_export(parseInt(stringSliceFromLast_(this.id)));});
    $("#Saved_Body").on('click', 'button[id^=SavedTable_delete_]', function() {Saved_deleteThisRow(parseInt(stringSliceFromLast_(this.id)));});
});

$(function() {
    $("#MissionTable_heading").on('keyup', function(e) {
        if (e.which == 13) {
            $("#MissionTable_panel").collapse('show');
            $("#Saved").collapse('hide');
        }
    });
    $("#MissionTable_head_Mission").on('click', function() {
        quick_sort_expand_ascending(MISSION_TABLE, 12);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Mission").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_ascending(MISSION_TABLE, 12);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Manp").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 1);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Manp").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 1);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Ammu").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 2);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Ammu").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 2);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Rati").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 3);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Rati").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 3);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Part").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 4);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Part").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 4);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_TPro").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 5);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_TPro").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 5);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Equi").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 6);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Equi").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 6);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_QPro").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 7);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_QPro").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 7);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_QRes").on('click', function() {
        quick_sort_expand_descending(MISSION_TABLE, 8);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_QRes").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_descending(MISSION_TABLE, 8);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_head_Time").on('click', function() {
        quick_sort_expand_ascending(MISSION_TABLE, 9);
        PrintMissionTable(false);
    });
    $("#MissionTable_head_Time").on('keyup', function(e) {
        if (e.which == 13) {
            quick_sort_expand_ascending(MISSION_TABLE, 9);
            PrintMissionTable(false);
        }
    });
    $("#MissionTable_panel").on('click', 'tr[id^=MissionTable_]', function() {MissionTable_clickThisRow(this);});
    $("#MissionTable_panel").on('keyup', 'tr[id^=MissionTable_]', function(e) {
        if (e.which == 13)
            MissionTable_clickThisRow(this);
    });
});
function MissionTable_clickThisRow(elem) {
    const number = parseInt(stringSliceFromLast_(elem.id));
    if (elem.className === "success")
        MissionTable_cancelSelectThisRow(number);
    else
        MissionTable_selectThisRow(number);
}

$(function() {
    $("#MissionTable_panel").on('shown.bs.collapse', function() {
        storageSetItem("IsSavedShow", false);
    });
    $("#MissionTable_panel").on('hidden.bs.collapse', function() {
        if (!IsMobile())
            document.getElementById("MissionTable_panel").style.transition = "";
    });
    $("#Saved").on('shown.bs.collapse', function() {
        storageSetItem("IsSavedShow", true);
        if (!IsMobile())
            document.getElementById("Saved").style.transition = "";
    });
});

$(function() {
    $("#savePlan").on('click', function() {saveThisPlan();});
});

$(function() {
    $("#Capture").on('click', function() {
        html2canvas(document.getElementById("PlanDetails"), {logging:false,scale:1}).then(function(canvas) {
            let link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'Capture.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
});

$(function() {
    $("#Config_export").on('click', function() {Config_export();});
    $("#Config_importButton").on('click', function() {
        const input = $("#Config_importInput").val();
        setPageByImport(input);
        $("#Config_importInput").val("");
    });
});