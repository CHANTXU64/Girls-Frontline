function Print_Table(method, Plan, Hours){
    var Table = document.getElementById("Plan_Table");
    var tab;
    switch (method) {
        case 1:
            if (document.getElementById('toggle-event').checked) tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/d</th><th>弹药/d</th><th>口粮/d</th><th>零件/d</th><th>人形/d</th><th>装备/d</th><th>快建/d</th><th>最短时间</th><th>最长时间</th></tr></thead>';
            else tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>最短时间</th><th>最长时间</th></tr></thead>';
            tab += '<tbody>'; break;
        case 2:
            tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力</th><th>弹药</th><th>口粮</th><th>零件</th><th>人形</th><th>装备</th><th>快建</th></tr></thead>';
            tab += '<tbody>'; break;
        case 3:
            tab = '<table class="table table-striped table-bordered table-hover"><thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th><th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>最长时间</th><th><a href="#" data-toggle="tooltip" data-placement="top" title="一周期指从全部后勤同时开始到下一次全部后勤同时收取这段时间">一个周期</a></th></tr></thead>';
            tab += '<tbody>'; break;
    }
    for (var i = 1; i <= Plan.length; i++) {
        if (Plan[i - 1][0] === 0) break;
        tab += ("<tr><td>" + i + "</td>");
        for (var ii = 0; ii <= 3; ii++) {
            if (Plan[i - 1][ii] % 4 === 0) tab += ("<td>" + (parseInt(Plan[i - 1][ii] / 4) - 1) + "-4</td>");
            else tab += ("<td>" + (parseInt(Plan[i - 1][ii] / 4)) + "-" + Plan[i - 1][ii] % 4 + "</td>");
        }
        if ((method === 1 && document.getElementById('toggle-event').checked) || method === 2) {
            tab += ("<td>" + (Math.round(Plan[i - 1][4] * Hours * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][5] * Hours * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][6] * Hours * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][7] * Hours * 10) / 10) + "</td>");
            if (Plan[i - 1][8] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][8] * Hours * 100) / 100) + "</td>");
            if (Plan[i - 1][9] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][9] * Hours * 100) / 100) + "</td>");
            if (Plan[i - 1][10] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][10] * Hours * 100) / 100) + "</td>");
        }
        else {
            tab += ("<td>" + (Math.round(Plan[i - 1][4] * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][5] * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][6] * 10) / 10) + "</td>");
            tab += ("<td>" + (Math.round(Plan[i - 1][7] * 10) / 10) + "</td>");
            if (Plan[i - 1][8] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][8] * 100) / 100) + "</td>");
            if (Plan[i - 1][9] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][9] * 100) / 100) + "</td>");
            if (Plan[i - 1][10] == 0) tab += ("<td>--</td>");
            else tab += ("<td>" + (Math.round(Plan[i - 1][10] * 100) / 100) + "</td>");
        }
        switch (method) {
            case 1:
                tab += ("<td>" + (Math.round(Math.min(Q[Plan[i-1][0]-1][8],Q[Plan[i-1][1]-1][8],Q[Plan[i-1][2]-1][8],Q[Plan[i-1][3]-1][8]) * 100) / 100) + "h</td>");
                tab += ("<td>" + (Math.round(Math.max(Q[Plan[i-1][0]-1][8],Q[Plan[i-1][1]-1][8],Q[Plan[i-1][2]-1][8],Q[Plan[i-1][3]-1][8]) * 100) / 100) + "h</td></tr>");
                break;
            case 2:
                tab += "</tr>"; break;
            case 3:
                tab += ("<td>" + (Math.round(Math.max(Q[Plan[i-1][0]-1][8],Q[Plan[i-1][1]-1][8],Q[Plan[i-1][2]-1][8],Q[Plan[i-1][3]-1][8]) * 100) / 100) + "h</td>");
                tab += ("<td>" + (Math.round(Plan[i - 1][12] * 10) / 10) + "h</td></tr>");
                break;
        }
    }
    Table.innerHTML = tab;
    $(function (){$("[data-toggle='tooltip']").tooltip();})
}