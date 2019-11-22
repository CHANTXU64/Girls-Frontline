function loadHTML_PlanTable() {
    var Table = document.getElementById("Plan_Table");
    var tab = '点击 <span style="color:deepskyblue">开始排序</span> 按钮，排序前三十六的结果将在这里显示';
    Table.innerHTML = tab;
}

function loadHTML_Target() {
    var HTML = '<h4 class="Demand"><span>平均每小时需求量</span></h4>';
    HTML += '<p><button type="button" class="btn btn-default"onclick="setTarget(1)">手枪HG</button> ';
    HTML += '<button type="button" class="btn btn-default"onclick="setTarget(2)">冲锋枪SMG</button> ';
    HTML += '<button type="button" class="btn btn-default"onclick="setTarget(3)">步枪RF</button></p>';
    HTML += '<p><button type="button" class="btn btn-default"onclick="setTarget(4)">突击步枪AR</button> ';
    HTML += '<button type="button" class="btn btn-default"onclick="setTarget(5)">机枪MG</button> ';
    HTML += '<button type="button" class="btn btn-default"onclick="setTarget(6)">霰弹枪SG</button></p>';
    HTML += '<p><button type="button" class="btn btn-default" onclick="setTarget(7)">均衡</button> ';
    HTML += '<button type="button" class="btn btn-danger" onclick="setTarget(8)">清零</button></p>';
    var TargetName = ['人力', '弹药', '口粮', '零件', '人形', '装备', '快建', '快修'];
    var Target = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    for (var i = 0; i < 4; i++) {
        HTML += '<div class="form-group input-group"style="margin-bottom: 10px;"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;">';
        HTML += TargetName[i];
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-100)"><b>&minus;</b></button><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-10)">&minus;</button></div><input type="text"class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),10)">+</button><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),100)"><b>&plus;</b></button></div></div>';
    }
    for (var i = 4; i < 8; i++) {
        HTML += '<div class="form-group input-group"style="margin-bottom: 10px;"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;">';
        HTML += TargetName[i];
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-1)"><b>&minus;</b></button><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),-0.1)">&minus;</button></div><input type="text"class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onclick="this.select()"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),0.1)">+</button><button class="btn btn-default"type="button"style="padding-right:10px;padding-left:10px;"onclick="ChangeTarget($(\'#';
        HTML += Target[i];
        HTML += '\'),1)"><b>&plus;</b></button></div></div>';
    }
    document.getElementById("target").innerHTML = HTML;
}