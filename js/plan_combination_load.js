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
        html += '<label for="PC_' + name + class_name[i] + '" class="' + class_name[i] + ' input-group-label input-group-text"';
        html += 'id="PC_' + name + class_name[i] + '_label"></label>';
        html += '<input id="PC_' + name + class_name[i] + '" type="number" class="form-control ' + class_name[i] + '_placeholder" value="0" min="0" autocomplete="off"></div>';
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
