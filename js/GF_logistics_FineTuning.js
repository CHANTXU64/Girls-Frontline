function getHTMLFineTuningTool(expanded) {
    var TargetName = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    var lang = language.JS;
    var TargetHTMLText = [lang.Manp, lang.Ammu, lang.Rati, lang.Part, lang.TPro, lang.Equi, lang.QPro, lang.QRes];
    HTML = '<div class="panel panel-default" style="max-width: 400px; margin-bottom:5px">';
    HTML += '<div class="panel-heading">';
    HTML += '<h4 class="panel-title"><a data-toggle="collapse" href="#FineTuningTool" class="collapsed" aria-expanded="'+expanded+'">' + lang.FineTuningTool + '</a></h4></div>';
    HTML += '<div id="FineTuningTool" class="panel-collapse collapse';
    if (expanded)
        HTML += 'in';
    HTML += '">';
    HTML += '<div class="panel-body">';
    for (var i = 0; i < 8; i++) {
        HTML += '<div class="form-group input-group" style="margin-bottom: 10px;">';
        HTML += '<span class="input-group-addon" id="FineTuningTool_' + TargetName[i] + '">' + TargetHTMLText[i] + '</span>';
        HTML += '<div class="input-group-btn">';
        HTML += '<button class="btn btn-default col-lg-6" type="button" id="FineTuning_minus_' + TargetName[i] + '"';
        if (FineTuning_TargetValue_Original[i] == 0)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] - FineTuning_TargetValue_Original[i] / 100 <= 0)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] - FineTuning_TargetValue_Original[i] / 100 < FineTuning_TargetValue_Original[i] * 0.9)
            HTML += 'disabled="disabled"';
        HTML += '><b>-</b></button>';
        HTML += '<button class="btn btn-default col-lg-6" type="button" id="FineTuning_plus_' + TargetName[i] + '"';
        if (FineTuning_TargetValue_Original[i] == 0)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] + FineTuning_TargetValue_Original[i] / 100 >= 1)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] - FineTuning_TargetValue_Original[i] / 100 > FineTuning_TargetValue_Original[i] * 1.1)
            HTML += 'disabled="disabled"';
        HTML += '><b>+</b></button>';
        HTML += '</div></div>';
    }
    HTML += '</div></div></div>';
    return HTML;
}

var FineTuning_TargetValue_Original = new Array(8);
var FineTuning_TargetValue = new Array(8);
function setFineTuning_TargetValue(TargetValue) {
    for (var i = 0; i < 8; i++) {
        FineTuning_TargetValue_Original[i] = TargetValue[i];
        FineTuning_TargetValue[i] = TargetValue[i];
    }
}

var FineTuning_ShownTab;
function setFineTuning_ShownTab(ShownTab) {
    FineTuning_ShownTab = ShownTab;
}

function FineTuning(Operator, ID) {
    var TargetName = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    var IDNumber = TargetName.indexOf(ID);
    if (Operator === -1) {
        FineTuning_TargetValue[IDNumber] -= FineTuning_TargetValue_Original[IDNumber] / 100;
        // FineTuning_TargetValue[IDNumber] -= 0.01;
    }
    else {
        FineTuning_TargetValue[IDNumber] += FineTuning_TargetValue_Original[IDNumber] / 100;
        // FineTuning_TargetValue[IDNumber] += 0.01;
    }
    FineTuning_main();
}

function FineTuning_main() {
    var plan = new Plan(FineTuning_ShownTab, 16, FineTuning_TargetValue);
    var Q_Valid_length = FineTuning_ShownTab.Qvalid.length;
    for (var n1 = 0; n1 < (Q_Valid_length - 3); n1++) {
        for (var n2 = n1 + 1; n2 < (Q_Valid_length - 2); n2++) {
            for (var n3 = n2 + 1; n3 < (Q_Valid_length - 1); n3++) {
                for (var n4 = n3 + 1; n4 < Q_Valid_length; n4++) {
                    plan.CalculateAndPush([n1, n2, n3, n4]);
                }
            }
        }
    }
    plan.print(true, RESULT_PLAN_SORT_BY); 
}

$(function() {
    $("#Plan_Table").on('click', 'button[id^=FineTuning_minus_]', function() {FineTuning(-1, stringSliceFromLast_(this.id))});
    $("#Plan_Table").on('click', 'button[id^=FineTuning_plus_]', function() {FineTuning(1, stringSliceFromLast_(this.id))});
})