let PLAN_COMBINATION_READY = false;

function plan_combination_load() {
    const class_name = ['Manp', 'Ammu', 'Rati', 'Part', 'TPro', 'Equi', 'QPro', 'QRes'];
    const name = ['current_', 'demand_', 'target_'];
    for (let i = 0; i < name.length; ++i) {
        document.getElementById("PlanCombination_" + name[i] + "re").innerHTML = plan_combination_load_main(name[i], class_name.slice(0, 4));
        document.getElementById("PlanCombination_" + name[i] + "co").innerHTML = plan_combination_load_main(name[i], class_name.slice(4, 8));
    }
}

function plan_combination_load_main(name, class_name) {
    let html = '';
    for (let i = 0; i < 4; ++i) {
        html += '<div class="col-sm-3 col-6 mb-2 input-group input-group-regular">';
        html += '<label for="PC_' + name + class_name[i] + '" class="reAndco-label ' + class_name[i] + ' input-group-label input-group-text"';
        html += 'id="PC_' + name + class_name[i] + '_label"></label>';
        html += '<input id="PC_' + name + class_name[i] + '" type="number" class="autoEnter ';
        if (class_name[i] === 'QRes')
            html += 'autoEnterEnd';
        html += ' form-control ' + class_name[i] + '_placeholder" value="0" min="0" autocomplete="off"></div>';
    }
    return html;
}

function Consumption_load() {
    const class_name = ['Manp', 'Ammu', 'Rati', 'Part', 'TPro', 'Equi', 'QPro', 'QRes'];
    document.getElementById("Consumption_re").innerHTML = Consumption_load_main(class_name.slice(0, 4));
    document.getElementById("Consumption_co").innerHTML = Consumption_load_main(class_name.slice(4, 8));
}

function Consumption_load_main(class_name) {
    let html = '';
    for (let i = 0; i < 4; ++i) {
        html += '<div class="col-sm-3 col-6 input-group-regular mb-2">';
        html += '<input type="number" class="form-control ' + class_name[i] + '_placeholder" id="Consumption_' + class_name[i] + '" autocomplete="off"></div>';
    }
    return html;
}

const consumption_preset = [
    [2160,  1860,  1510,  1360,  5,  8,  4,  8], //日常全勤
    [9600/7, 12100/7, 12100/7, 6100/7, 10/7, 14/7, 14/7, 19/7],//周常全勤
    [-900,  -900,  -900,  -300,  0,  0,  0,  0], //前进营地8:00
    [-500,  -500,  -500,  -500,  0,  -1, 0,  0], //500*4妖精
    [-2000, -500,  -2000, -1000, 0,  -1, 0,  0], //2021妖精
    [-500,  -2000, -2000, -1000, 0,  -1, 0,  0], //0221妖精
    [-2000, -2000, -2000, -1000, 0,  -1, 0,  0], //2221妖精
    [-270,  -270,  -270,  -90,   0,  0,  0,  0], //7-1自律
    [-540,  -540,  -540,  -180,  0,  0,  0,  0], //7-4自律
    [-760,  -760,  -760,  -250,  0,  0,  0,  0], //11-5自律
    [-130,  -130,  -130,  -130,  -1, 0,  0,  0], //HG
    [-430,  -430,  -130,  -230,  -1, 0,  0,  0], //SMG
    [-430,  -130,  -430,  -230,  -1, 0,  0,  0], //RF
    [-130,  -430,  -430,  -130,  -1, 0,  0,  0], //AR
    [-730,  -630,  -130,  -430,  -1, 0,  0,  0], //MG
    [-6000, -2000, -6000, -4000, -1, 0,  0,  0], //SG
    [-300,  -300,  -300,  -100,  0,  0,  0,  0], //前进营地2:00
    [-600,  -600,  -600,  -200,  0,  0,  0,  0], //前进营地5:00
];

function Consumption_load_preset_select() {
    let length = consumption_preset.length;
    let tab = "<option value=\"0\" id=\"consumption_preset\" selected></option>";
    for (let i = 0; i < length; ++i) {
        tab += "<option id=\"consumption_preset_" + i + "\"></option>";
    }
    document.getElementById("Consumption_select").innerHTML = tab;
}

function Consumption_load_preset_select_lang() {
    let length = consumption_preset.length;
    let lang = language.JS;
    document.getElementById("consumption_preset").innerHTML = lang["C_preset"];
    for (let i = 0; i < length; ++i) {
        document.getElementById("consumption_preset_" + i).innerHTML = lang["C_preset_" + i];
    }
}
