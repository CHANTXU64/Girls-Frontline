function loadHTML_Target() {
    var HTML = '<h4 id="Demand"></h4>';
    HTML += '<p><button type="button" class="btn btn-default"onclick="setTarget(1)"id="setTargetHG"></button> ';
    HTML += '<button type="button" class="btn btn-default"onclick="setTarget(2)"id="setTargetSMG"></button> ';
    HTML += '<button type="button" class="btn btn-default"onclick="setTarget(3)"id="setTargetRF"></button></p>';
    HTML += '<p><button type="button" class="btn btn-default"onclick="setTarget(4)"id="setTargetAR"></button> ';
    HTML += '<button type="button" class="btn btn-default"onclick="setTarget(5)"id="setTargetMG"></button> ';
    HTML += '<button type="button" class="btn btn-default"onclick="setTarget(6)"id="setTargetSG"></button></p>';
    HTML += '<p><button type="button" class="btn btn-default" onclick="setTarget(7)"id="setTarget2221"></button> ';
    HTML += '<button type="button" class="btn btn-danger" onclick="setTarget(8)"id="setTargetClear"></button></p>';
    var TargetName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    var Target = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    for (var i = 0; i < 4; i++) {
        HTML += '<div class="form-group input-group"style="margin-bottom: 10px;"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;"';
        HTML += 'id=' + TargetName[i] + '>';
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1 onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-100)"><b>&minus;</b></button><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1 onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-10)">&minus;</button></div><input type="text"class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"tabindex=-1 onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),10)">+</button><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"tabindex=-1 onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),100)"><b>&plus;</b></button></div></div>';
    }
    for (var i = 4; i < 8; i++) {
        HTML += '<div class="form-group input-group"style="margin-bottom: 10px;"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;"';
        HTML += 'id=' + TargetName[i] + '>';
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1 onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-1)"><b>&minus;</b></button><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1 onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-0.1)">&minus;</button></div><input type="text"class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"tabindex=-1 onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),0.1)">+</button><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"tabindex=-1 onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),1)"><b>&plus;</b></button></div></div>';
    }
    document.getElementById("target").innerHTML = HTML;
}

function loadHTML_language() {
    document.documentElement.lang = language.lang;
    document.title = language.title;
    for (i in language.HTML) {
        $('#'+i).html(language.HTML[i]);
    }
    document.getElementById("Plan_Table").innerHTML = language.HTMLJS.plantabletip;
    document.getElementById("tab_Timetable_deleteall").title = language.HTMLJS.tab_Timetable_deleteall;
    switch(HTMLtab) {
        case "Anytime":
            ChangeTab_Anytime();
            break;
        case "SingleTime":
            ChangeTab_SingleTime();
            break;
        case "Timetable":
            ChangeTab_Timetable();
            break;
        case "Intervals":
            ChangeTab_Intervals();
            break;
    }
    alertLocalstorageDoesNotWork();
}