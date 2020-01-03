let FineTuning_TargetValue_Original = new Array(8);
let FineTuning_TargetValue = new Array(8);
function setFineTuning_TargetValue(TargetValue) {
    for (let i = 0; i < 8; i++) {
        FineTuning_TargetValue_Original[i] = TargetValue[i];
        FineTuning_TargetValue[i] = TargetValue[i];
    }
}

let FineTuning_ShownTab;
function setFineTuning_ShownTab(ShownTab) {
    FineTuning_ShownTab = ShownTab;
}

function getHTMLFineTuningTool() {
    const TargetName = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    const lang = language.JS;
    const TargetHTMLText = [lang.Manp, lang.Ammu, lang.Rati, lang.Part, lang.TPro, lang.Equi, lang.QPro, lang.QRes];
    let HTML = '<div class="panel panel-default" style="margin-bottom:5px">';
    HTML += '<div class="panel-heading">';
    HTML += '<h4 class="panel-title"><a data-toggle="collapse" href="#FineTuningTool" class="collapsed">' + lang.FineTuningTool + '</a></h4></div>';
    HTML += '<div id="FineTuningTool" class="panel-collapse collapse">';
    HTML += '<div class="panel-body">';
    for (let i = 0; i < 8; i++) {
        if (i === 0)
            HTML += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">';
        if (i === 4)
            HTML += '</div> <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">';
        HTML += '<div class="form-group input-group" style="margin-bottom: 10px;">';
        HTML += '<span class="input-group-addon" id="FineTuningTool_' + TargetName[i] + '">' + TargetHTMLText[i] + '</span>';
        HTML += '<div class="input-group-btn">';
        HTML += '<button class="btn btn-default col-lg-6 col-md-6 col-sm-6 col-xs-6" type="button" id="FineTuning_minus_' + TargetName[i] + '"';
        if (FineTuning_TargetValue_Original[i] === 0)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] - FineTuning_TargetValue_Original[i] / 50 <= 0)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] - FineTuning_TargetValue_Original[i] / 50 < FineTuning_TargetValue_Original[i] * 0.8)
            HTML += 'disabled="disabled"';
        HTML += '><b>-</b></button>';
        HTML += '<button class="btn btn-default col-lg-6 col-md-6 col-sm-6 col-xs-6" type="button" id="FineTuning_plus_' + TargetName[i] + '"';
        if (FineTuning_TargetValue_Original[i] === 0)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] + FineTuning_TargetValue_Original[i] / 50 >= 1)
            HTML += 'disabled="disabled"';
        else if (FineTuning_TargetValue[i] - FineTuning_TargetValue_Original[i] / 50 > FineTuning_TargetValue_Original[i] * 1.2)
            HTML += 'disabled="disabled"';
        HTML += '><b>+</b></button>';
        HTML += '</div></div>';
    }
    HTML += '</div></div></div></div>';
    return HTML;
}

function FineTuning(Operator, ID) {
    const TargetName = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    const IDNumber = TargetName.indexOf(ID);
    if (Operator === -1) {
        FineTuning_TargetValue[IDNumber] -= FineTuning_TargetValue_Original[IDNumber] / 50;
    }
    else {
        FineTuning_TargetValue[IDNumber] += FineTuning_TargetValue_Original[IDNumber] / 50;
    }
    FineTuning_main();
}

function FineTuning_main() {
    let plan = new Plan(FineTuning_ShownTab, 16, FineTuning_TargetValue);
    const Q_Valid_length = FineTuning_ShownTab.Qvalid.length;
    const n1_max = Q_Valid_length - 3;
    const n2_max = Q_Valid_length - 2;
    const n3_max = Q_Valid_length - 1;
    const n4_max = Q_Valid_length;
    for (let n1 = 0; n1 < n1_max; n1++) {
        for (let n2 = n1 + 1; n2 < n2_max; n2++) {
            for (let n3 = n2 + 1; n3 < n3_max; n3++) {
                for (let n4 = n3 + 1; n4 < n4_max; n4++) {
                    plan.CalculateAndPush([n1, n2, n3, n4]);
                }
            }
        }
    }
    plan.print(true, RESULT_PLAN_SORT_BY); 
}