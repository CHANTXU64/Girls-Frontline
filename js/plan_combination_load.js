function plan_combination_load_demand() {
    let html = '';
    const Target = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    document.getElementById("PlanCombination_demand_re").innerHTML = plan_combination_load_demand_main(Target.slice(0, 4));
    document.getElementById("PlanCombination_demand_co").innerHTML = plan_combination_load_demand_main(Target.slice(4, 8));
}

function plan_combination_load_demand_main(Target) {
    let html = '';
    for (let i = 0; i < 4; ++i) {
        html += '<div class="col-md-2 mb-3 input-group input-group-regular">'; 
        html += '<label for="PC_' + Target[i] + '" class="input-group-label input-group-text"';
        html += 'id="PC_' + Target[i] + '_label"></label>';
        html += '<input id="PC_' + Target[i] + '" type="number" class="form-control" value="0" min="0" autocomplete="off"></div>';
    }
    return html;
}
