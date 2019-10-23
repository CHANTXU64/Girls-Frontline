window.onload = function () {
    var Table = document.getElementById("Plan_Table");
    var tab = '点击 <span style="color:deepskyblue">开始排序</span> 按钮，排序前三十六的结果将在这里显示';
    Table.innerHTML = tab;
}

//注释
$(function (){$("[data-toggle='tooltip']").tooltip();})

//标签页
$(function (){
    $('[href=#Tab_Anytime]').on("shown.bs.tab", function(){
        ShownTab = new Tab_Anytime;
        if (document.getElementById('toggle-event').checked) {
            $(".Demand span").html("每天需求量");
        }
        else {
            $(".Demand span").html("平均每小时需求量");
        }
        TimeLimit_enable();
    });
    $('[href=#Tab_SingleTime]').on("shown.bs.tab", function(){
        ShownTab = new Tab_SingleTime;
        $(".Demand span").html("单次需求量");
        TimeLimit_disable();
    });
    $('[href=#Tab_Intervals]').on("shown.bs.tab", function(){
        ShownTab = new Tab_Intervals;
        $(".Demand span").html("平均每小时需求量");
        TimeLimit_disable();
    });
})
function TimeLimit_enable() {
    $("#Time_Limit_start").removeAttr("disabled");
    $("#Time_Limit_end").removeAttr("disabled");
}
function TimeLimit_disable() {
    $("#Time_Limit_start").val(0);
    $("#Time_Limit_start").attr('disabled', "true");
    $("#Time_Limit_end").val(24);
    $("#Time_Limit_end").attr('disabled', "true");
}

//同步更新大成功UP增加概率
$(function (){
    $("#GreatSuccessRate").on('input propertychange',function() {
        if (IsGreatSuccessRateUp()) {
            var UpRate;
            switch(true) {
                case $("#GreatSuccessRate").val() < 15:
                    UpRate = 15; break;
                case $("#GreatSuccessRate").val() > 60:
                    UpRate = 30; break;
                default :
                    UpRate = 15 + Math.floor(($("#GreatSuccessRate").val() - 15) / 3);
            }
            document.getElementById('Display_UPRate').innerHTML = ("+" + UpRate);
        }
    });
})
function IsGreatSuccessRateUp() {
    if (document.getElementById('GreatSuccessRateUp').checked) return 1;
    else return 0;
}

function Tab_Anytime_hourorday() {
    var hours = parseFloat($("#Time_Anytime_hours").val()) + parseFloat($("#Time_Anytime_minutes").val()) / 60;
    if (document.getElementById('toggle-event').checked) {
        $(".Demand span").html("每天需求量");
        $("#Time_Anytime_hours").removeAttr("disabled");
        $("#Time_Anytime_minutes").removeAttr("disabled");
        $("#MT").val($("#MT").val() * hours);
        $("#AT").val($("#AT").val() * hours);
        $("#RT").val($("#RT").val() * hours);
        $("#PT").val($("#PT").val() * hours);
        $("#TT").val($("#TT").val() * hours);
        $("#ET").val($("#ET").val() * hours);
        $("#QT").val($("#QT").val() * hours);
    }
    else {
        $(".Demand span").html("平均每小时需求量");
        $("#Time_Anytime_hours").attr('disabled', "true"); 
        $("#Time_Anytime_minutes").attr('disabled', "true");
        $("#MT").val($("#MT").val() / hours);
        $("#AT").val($("#AT").val() / hours);
        $("#RT").val($("#RT").val() / hours);
        $("#PT").val($("#PT").val() / hours);
        $("#TT").val($("#TT").val() / hours);
        $("#ET").val($("#ET").val() / hours);
        $("#QT").val($("#QT").val() / hours);
    }
}

function Function_GreatSuccessRateUP() {
    CheckDataLegalityAndCorrect_GreatSuccessRate();
    var UpRate = 0;
    if (IsGreatSuccessRateUp()) {
        UpRate = 15 + Math.floor(($("#GreatSuccessRate").val() - 15) / 3);
        document.getElementById('Display_UPRate').innerHTML = ("+" + UpRate);
        return UpRate;
    }
    else {
        document.getElementById('Display_UPRate').innerHTML = "";
        return UpRate;
    }
}
function CheckDataLegalityAndCorrect_GreatSuccessRate() {
    var Rate = $("#GreatSuccessRate");
    if (Rate.val()==="" || isNaN(Rate.val()) || Rate.val()<15) Rate.val(15);
    if (Rate.val()>60) Rate.val(60);
}

function setTarget(TargetInfo) {
    var MT = $("#MT");
    var AT = $("#AT");
    var RT = $("#RT");
    var PT = $("#PT");
    switch (TargetInfo) {
        case 1:
            MT.val(130); AT.val(130); RT.val(130); PT.val(130); break;
        case 2:
            MT.val(430); AT.val(430); RT.val(130); PT.val(230); break;
        case 3:
            MT.val(430); AT.val(130); RT.val(430); PT.val(230); break;
        case 4:
            MT.val(130); AT.val(430); RT.val(430); PT.val(130); break;
        case 5:
            MT.val(730); AT.val(630); RT.val(130); PT.val(430); break;
        case 6:
            MT.val(8000); AT.val(2000); RT.val(8000); PT.val(4000); break;
        case 7:
            MT.val(1); AT.val(1); RT.val(1); PT.val(1); break;
        case 8:
            MT.val(1); AT.val(0); RT.val(0); PT.val(0); break;
        case 9:
            MT.val(0); AT.val(1); RT.val(0); PT.val(0); break;
        case 10:
            MT.val(0); AT.val(0); RT.val(1); PT.val(0); break;
        case 11:
            MT.val(0); AT.val(0); RT.val(0); PT.val(1); break;
    }
}

function ChangeTarget(ID, changevalue) {
    ID.val(parseFloat(ID.val()) + changevalue);
    if (ID.val() < 0) ID.val(0);c
}