$(function (){
    $('[href=#lang-zh-CN]').on('click', function(){changelang('zh-CN')});
    $('[href=#lang-zh-TW]').on('click', function(){changelang('zh-TW')});
})

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
})

$(function (){
    $('input[id^=Display_]').on("click", function(){
        if (is_CalculateByHour())
            changeCalculateOutput_Hour();
        else
            changeCalculateOutput_Total();
    })
})

$(function (){
    $("#GreatSuccessRate").on('input propertychange',function() {
        var Rate = Input_getGreatSuccessRate();
        var is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP, false);
        var TotalRate = Rate + Input_getGreatSuccessUpRate(Rate);
        setQContract(TotalRate);
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#GreatSuccessRate").blur(function() {
        var Rate = Input_getGreatSuccessRate();
        storageSetItem("GreatSuccessRate", Rate);
    })
    $('#GreatSuccessRateUp').on('click', function() {
        var is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP);
        var TotalRate = Input_getTotalGreatSuccessRate(true);
        setQContract(TotalRate);
        PrintMissionTable();
        PrintPlanDetails();
        storageSetItem("is_GreatSuccessRateUP", is_RateUP);
    });
})

$(function() {
    $("#MapLimit").on('change', function() {
        PrintMissionTable();
        PrintPlanDetails();
        storageSetItem("SelectChapter", Input_getSelectChapter());
    });
})

//Tab_Anytime
$(function() {
    $("#Time_Anytime_hours").on('input propertychange', function() {
        if (!is_CalculateByHour()) {
            var ShownTab = getShownTab();
            ShownTab.setTime(false);
            TABLE_CALCULATE_TOTAL_TIME = ShownTab.TotalTime;
        }
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#Time_Anytime_hours").blur(function () {Tab_Anytime_changeStorageCustom()});
    $("#Time_Anytime_minutes").on('input propertychange', function() {
        if (!is_CalculateByHour()) {
            var ShownTab = getShownTab();
            ShownTab.setTime(false);
            TABLE_CALCULATE_TOTAL_TIME = ShownTab.TotalTime;
        }
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#Time_Anytime_minutes").blur(function () {Tab_Anytime_changeStorageCustom()});
    $("#Tab_Anytime_MinimumIntervalTime_minutes").on('input propertychange', function() {
        PrintMissionTable();
        PrintPlanDetails();
    });
    $("#Tab_Anytime_MinimumIntervalTime_minutes").blur(function () {Tab_Anytime_changeStorageCustom()});
})
function Tab_Anytime_changeStorageCustom() {
    var Tab = new Tab_Anytime;
    storageSetItem("TabAnytimeCustom", Tab.Saved_Custom());
}

//Tab_Timetable
$(function() {
    $("#Time_Timetable_hours").on('input propertychange',function() {_Tab_Timetable_changeMaxTime()});
    $("#Time_Timetable_hours").blur(function() {Tab_Timetable_changeStorageCustom()});
    $("#Time_Timetable_minutes").on('input propertychange',function() {_Tab_Timetable_changeMaxTime()});
    $("#Time_Timetable_minutes").blur(function() {Tab_Timetable_changeStorageCustom()});
    $('#Tab_Timetable_AddNewTimePoint').on('click', function() {
        var newTime = Input_getTimetableNewTotalTime_Correct();
        var TotalTime = Input_getTimetableTotalTime();
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
    });
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
})
function _Tab_Timetable_changeMaxTime() {
    var TotalTime = Input_getTimetableTotalTime();
    Input_setTimetableTotalTime(TotalTime);
    if (!is_CalculateByHour()) {
        TABLE_CALCULATE_TOTAL_TIME = TotalTime;
    }
    PrintMissionTable();
    PrintPlanDetails();
}
function Tab_Timetable_changeStorageCustom() {
    var Tab = new Tab_Timetable;
    storageSetItem("TabTimetableCustom", Tab.Saved_Custom());
}

$(function() {
    $("#ContractWeight").change(function() {
        storageSetItem("ContractWeight", Input_getContractWeight());
    });
})

$(function() {
    $("#target").on('click', 'button[id^=setTarget_]', function() {
        setTarget(stringSliceFromLast_(this.id));
    })
    $("#target").on('click', 'button[id^=Target_minus_]', function() {ChangeTarget(this.id)});
    $("#target").on('click', 'button[id^=Target_plus_]', function() {ChangeTarget(this.id)});
})

$(function() {
    $("#target").on('blur', "#MT", function() {TargetChangeStorage()});
    $("#target").on('blur', "#AT", function() {TargetChangeStorage()});
    $("#target").on('blur', "#RT", function() {TargetChangeStorage()});
    $("#target").on('blur', "#PT", function() {TargetChangeStorage()});
    $("#target").on('blur', "#TT", function() {TargetChangeStorage()});
    $("#target").on('blur', "#ET", function() {TargetChangeStorage()});
    $("#target").on('blur', "#QPT", function() {TargetChangeStorage()});
    $("#target").on('blur', "#QRT", function() {TargetChangeStorage()});
})
function TargetChangeStorage() {
    storageSetItem("TargetValue", Input_getTarget_Correct());
}

$(function() {
    $('#start_sorting').on('click', function() {start_sorting_main()});
    $("#clear_sorting").on('click', function() {HTML_AllowInput()});
})

//排序结果点击
$(function() {
    $("#Plan_Table").on('click', 'tr[id^=print_result_plan_tr_]', function() {
        var number = parseInt(stringSliceFromLast_(this.id));
        if (this.className != "success") {
            for (var i = 0; i < RESULT_PLAN.length; i++) {
                document.getElementById("print_result_plan_tr_" + i).className = "";
            }
            this.className = "success";
            MissionTable_resultPlan_select(number);
        }
        else
            this.className = "";
    })
})

//对排序结果某一项排序
$(function() {
    $("#Plan_Table").on('click', 'th[id^=resultPlan_Mission_]', function() {
        RESULT_PLAN_SORT_BY = "Ranking";
        resultPlan_sortByColumn(0, "ascending");
    });
    $("#Plan_Table").on('click', '#resultPlan_Manp', function() {
        RESULT_PLAN_SORT_BY = "Manp";
        resultPlan_sortByColumn(5);
    });
    $("#Plan_Table").on('click', '#resultPlan_Ammu', function() {
        RESULT_PLAN_SORT_BY = "Ammu";
        resultPlan_sortByColumn(6);
    });
    $("#Plan_Table").on('click', '#resultPlan_Rati', function() {
        RESULT_PLAN_SORT_BY = "Rati";
        resultPlan_sortByColumn(7);
    });
    $("#Plan_Table").on('click', '#resultPlan_Part', function() {
        RESULT_PLAN_SORT_BY = "Part";
        resultPlan_sortByColumn(8);
    });
    $("#Plan_Table").on('click', '#resultPlan_TPro', function() {
        RESULT_PLAN_SORT_BY = "TPro";
        resultPlan_sortByColumn(9);
    });
    $("#Plan_Table").on('click', '#resultPlan_Equi', function() {
        RESULT_PLAN_SORT_BY = "Equi";
        resultPlan_sortByColumn(10);
    });
    $("#Plan_Table").on('click', '#resultPlan_QPro', function() {
        RESULT_PLAN_SORT_BY = "QPro";
        resultPlan_sortByColumn(11);
    });
    $("#Plan_Table").on('click', '#resultPlan_QRes', function() {
        RESULT_PLAN_SORT_BY = "QRes";
        resultPlan_sortByColumn(12);
    });
})

$(function () {
    $("#Plan_Table").on('click', 'button[id^=FineTuning_minus_]', function() {FineTuning(-1, stringSliceFromLast_(this.id))});
    $("#Plan_Table").on('click', 'button[id^=FineTuning_plus_]', function() {FineTuning(1, stringSliceFromLast_(this.id))});
})

$(function() {
    $("#importSaved_importButton").on('click', function() {
        var input = $("#importSaved_input").val();
        Saved_import(input);
        $("#importSaved_input").val("");
    });
    $("#Saved_Body").on('click', 'button[id^=SavedTable_apply_]', function() {Saved_apply(parseInt(stringSliceFromLast_(this.id)))});
    $("#Saved_Body").on('input propertychange', 'input[id^=SavedTable_name_]', function() {Saved_rename(parseInt(stringSliceFromLast_(this.id)))});
    $("#Saved_Body").on('keyup', 'input[id^=SavedTable_name_]', function(e) {
        var key = e.which;
        if (key == 13) {
            var id = "#" + this.id;
            $(id).attr('readOnly', true);
        }
    });
    $("#Saved_Body").on('blur', 'input[id^=SavedTable_name_]', function() {
        var id = "#" + this.id;
        $(id).attr('readOnly', true);
    });
    $("#Saved_Body").on('click', 'button[id^=SavedTable_rename_]', function() {
        var Row = parseInt(stringSliceFromLast_(this.id));
        var name_elem_id = "#SavedTable_name_" + Row;
        $(name_elem_id).attr('readOnly', false);
        $(name_elem_id).focus();
        $(name_elem_id).select();
    });
    $("#Saved_Body").on('click', 'button[id^=SavedTable_up_]', function() {Saved_upThisRow(parseInt(stringSliceFromLast_(this.id)))});
    $("#Saved_Body").on('click', 'button[id^=SavedTable_down_]', function() {Saved_downThisRow(parseInt(stringSliceFromLast_(this.id)))});
    $("#Saved_Body").on('click', 'button[id^=SavedTable_export_]', function() {Saved_export(parseInt(stringSliceFromLast_(this.id)))});
    $("#Saved_Body").on('click', 'button[id^=SavedTable_delete_]', function() {Saved_deleteThisRow(parseInt(stringSliceFromLast_(this.id)))});
})

$(function() {
    $("#MissionTable_panel").on('click', 'tr[id^=MissionTable_]', function() {
        var number = parseInt(stringSliceFromLast_(this.id));
        if (this.className === "success")
            MissionTable_cancelSelectThisRow(number);
        else
            MissionTable_selectThisRow(number);
    })
})

$(function() {
    $("#savePlan").on('click', function() {saveThisPlan()})
})

$(function() {
    $("#Capture").on('click', function() {
        html2canvas(document.getElementById("PlanDetails"), {logging:false,scale:1}).then(function(canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'Capture.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    })
})

$(function() {
    $("#Config_export").on('click', function() {Config_export()});
    $("#Config_importButton").on('click', function() {
        var input = $("#Config_input").val();
        setPageByImport(input);
        $("#Config_input").val("");
    });
})