function Print_Table(Plan){
    var Table = document.getElementById("Plan_Table");
    var tab = '<table class="table table-striped table-bordered table-hover">';
    tab += (ShownTab.PrintPlanTableTitle() + '<tbody>');
    for (var i = 0; i < Plan.length; i++) {
        if (Plan[i][0] == 0) break;
        tab += ("<tr><td>" + (i+1) + "</td>");
        tab += PrintMissionsNumber(Plan, i);
        tab += PrintResourceContract(Plan, i);
        tab += ShownTab.PrintTableCustomize(Plan, i);
    }
    tab += '</tr></tbody>'
    Table.innerHTML = tab;
    $(function (){$("[data-toggle='tooltip']").tooltip();})
}

function PrintMissionsNumber(Plan, row) {
    var tab = "";
    for (var i = 0; i < 4; i++) {
        if (Plan[row][i] % 4 == 0) tab += ("<td>" + (parseInt(Plan[row][i] / 4) - 1) + "-4</td>");
        else tab += ("<td>" + (parseInt(Plan[row][i] / 4)) + "-" + Plan[row][i] % 4 + "</td>");
    }
    return tab;
}

function PrintResourceContract(Plan, row) {
    var tab = "";
    var Hours = ShownTab.get_Hours_PrintResourceContract();
    tab += ("<td>" + (Math.round(Plan[row][4] * Hours * 10) / 10) + "</td>");
    tab += ("<td>" + (Math.round(Plan[row][5] * Hours * 10) / 10) + "</td>");
    tab += ("<td>" + (Math.round(Plan[row][6] * Hours * 10) / 10) + "</td>");
    tab += ("<td>" + (Math.round(Plan[row][7] * Hours * 10) / 10) + "</td>");
    if (Plan[row][8] == 0) tab += ("<td>--</td>");
    else tab += ("<td>" + (Math.round(Plan[row][8] * Hours * 100) / 100) + "</td>");
    if (Plan[row][9] == 0) tab += ("<td>--</td>");
    else tab += ("<td>" + (Math.round(Plan[row][9] * Hours * 100) / 100) + "</td>");
    if (Plan[row][10] == 0) tab += ("<td>--</td>");
    else tab += ("<td>" + (Math.round(Plan[row][10] * Hours * 100) / 100) + "</td>");
    return tab;
}