function loadHTML_Target() {
    var HTML = '';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_HG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_SMG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_RF" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_AR" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_MG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_SG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_2221" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-danger"id="setTarget_Clear" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    document.getElementById("setTargetButton").innerHTML = HTML;
    HTML = '';
    var TargetName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    var Target = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    for (var i = 0; i < 4; i++) {
        HTML += '<div class="form-group input-group"style="margin-bottom: 10px;"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;"';
        HTML += 'id=' + TargetName[i] + '>';
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"type="button"id="Target_minus_100_'+Target[i]+'"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '<b>&minus;</b></button><button class="btn btn-default"type="button"id="Target_minus_10_'+Target[i]+'"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '&minus;</button></div><input type="number" pattern="\d*" min="0"class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"id="Target_plus_10_'+Target[i]+'"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '+</button><button class="btn btn-default"type="button"id="Target_plus_100_'+Target[i]+'"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '<b>&plus;</b></button></div></div>';
    }
    for (var i = 4; i < 8; i++) {
        HTML += '<div class="form-group input-group"style="margin-bottom: 10px;"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;"';
        HTML += 'id=' + TargetName[i] + '>';
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"id="Target_minus_1_'+Target[i]+'"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '<b>&minus;</b></button><button class="btn btn-default"type="button"id="Target_minus_0.1_'+Target[i]+'"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '&minus;</button></div><input type="number" pattern="\d*" min="0" step="0.01" class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"id="Target_plus_0.1_'+Target[i]+'"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '+</button><button class="btn btn-default"type="button"id="Target_plus_1_'+Target[i]+'"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '<b>&plus;</b></button></div></div>';
    }
    document.getElementById("setTargetInput").innerHTML = HTML;
}

function loadHTML_language() {
    document.documentElement.lang = language.lang;
    document.title = language.title;
    for (var i in language.HTML) {
        $('#'+i).html(language.HTML[i]);
    }

    //ResultPlan--------
    delete_PlanTable();
    HTML_AllowInput();
    //------------------
    document.getElementById("tab_Timetable_deleteall").title = language.HTMLJS.tab_Timetable_deleteall;

    //PlanDetails------
    _PrintPlanDetails_ShownTab();
    _PrintPlanDetails_TotalTime();
    _PrintPlanDetails_GreatSuccessRate();
    $("#PlanDetails_PerHour_title").html(language.JS.PerHour);
    $("#PlanDetails_Total_title").html(language.JS.Total);
    //-----------------

    if (is_CalculateByHour()) {
        $("#Demand").html(language.HTMLJS.Demand_hour);
    }
    else {
        $("#Demand").html(language.HTMLJS.Demand_total);
    }
}