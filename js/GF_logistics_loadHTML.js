function loadHTML_PlanTable() {
    var Table = document.getElementById("Plan_Table");
    var tab = '点击 <span style="color:deepskyblue">开始排序</span> 按钮，排序前三十六的结果将在这里显示';
    Table.innerHTML = tab;
}

function loadHTML_Weights() {
    var HTML = "一般不用更改，当对结果不满意可以进行适当修改";
    var WeightsName = ['人力', '弹药', '口粮', '零件', '人形', '装备', '快建'];
    var Weights = ['Mw', 'Aw', 'Rw', 'Pw', 'Tw', 'Ew', 'Qw'];
    for (var i = 0; i < 7; i++) {
        HTML += '<div class="form-group input-group"><span class="input-group-addon">'
        HTML += WeightsName[i];
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"type="button"style="border-radius:0;"onclick="ChangeTarget($(\'#';
        HTML += Weights[i];
        HTML += '\'),-0.1)">&minus;</button></div><input type="text"class="form-control"placeholder="非负数"id=\'';
        HTML += Weights[i];
        HTML += '\'value=1 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"onclick="ChangeTarget($(\'#';
        HTML += Weights[i];
        HTML += '\'),0.1)">&plus;</button></div></div>';
    }
    document.getElementById("weights").innerHTML = HTML;
}

function loadHTML_Target() {
    var HTML = '<h4 class="Demand"><span>平均每小时需求量</span></h4>';
    var TargetName = ['人力', '弹药', '口粮', '零件', '人形', '装备', '快建'];
    var Target = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QT'];
    for (var i = 0; i < 4; i++) {
        HTML += '<div class="form-group input-group"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;">';
        HTML += TargetName[i];
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-100)"><b>&minus;</b></button><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-10)">&minus;</button></div><input type="text"class="form-control"id="';
        HTML += Target[i];
        HTML += '"placeholder="非负数"value=0 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),10)">+</button><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),100)"><b>&plus;</b></button></div></div>';
    }
    for (var i = 4; i < 7; i++) {
        HTML += '<div class="form-group input-group"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;">';
        HTML += TargetName[i];
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-1)">&minus;</button></div><input type="text"class="form-control"id="';
        HTML += Target[i];
        HTML += '"placeholder="非负数"value=0 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),1)">+</button></div></div>';
    }
    document.getElementById("target").innerHTML = HTML;
}