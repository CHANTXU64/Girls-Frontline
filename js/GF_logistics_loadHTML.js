function loadHTML_Target() {
    var HTML = '<h4 id="Demand"></h4>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_HG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_SMG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_RF" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_AR" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_MG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_SG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_2221" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-danger"id="setTarget_Clear" style="margin-right: 5px; margin-bottom: 5px;"></button>';
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
    document.getElementById("target").innerHTML = HTML;
}

function loadHTML_language() {
    document.documentElement.lang = language.lang;
    document.title = language.title;
    for (var i in language.HTML) {
        $('#'+i).html(language.HTML[i]);
    }
    delete_PlanTable();
    HTML_AllowInput();
    document.getElementById("tab_Timetable_deleteall").title = language.HTMLJS.tab_Timetable_deleteall;

    //------
    var MissionTabHead = document.getElementsByClassName("th-inner");
    var lang = language.JS;
    var MissionTabHead_text = [lang.Mission, lang.Manp, lang.Ammu, lang.Rati, lang.Part, lang.TPro, lang.Equi, lang.QPro, lang.QRes, lang.Time];
    for (var i = 0; i < 10; i++) {
        MissionTabHead[i].innerHTML = MissionTabHead_text[i];
        MissionTabHead[i].style.cursor = "pointer";
    }
    if (MissionTabHead.length > 10) {
        for (var i = 0; i < 10; i++) {
            MissionTabHead[10 + i].innerHTML = MissionTabHead_text[i];
        }
    }
    //-------

    if (is_CalculateByHour()) {
        $("#Demand").html(language.HTMLJS.Demand_hour);
    }
    else {
        $("#Demand").html(language.HTMLJS.Demand_total);
    }
    PrintPlanDetails();
}