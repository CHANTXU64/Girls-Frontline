function Get_Plan_Main() {
    test_chant = 0;
    test_chant_2 = 0;
    var Hours = 0;
    var plan = new Plan(100, 13)
    // switch (method) {
    //     case 1:
    //         JudgeEmpty($("#Time_Anytime_hours"));
    //         JudgeEmpty($("#Time_Anytime_minutes"));
    //         break;
    //     case 2:
    //         JudgeEmpty($("#Time_SingleTime_hours"));
    //         JudgeEmpty($("#Time_SingleTime_minutes"));
    //         break;
    //     case 3:
    //         JudgeEmpty($("#Time_Intervals_hours"));
    //         JudgeEmpty($("#Time_Intervals_minutes"));
    //         break;
    // }
    var TargetValue = getTargetValue();//目标值
    var Weights = getWeights();
    AdjustWeightsByTargetValue(Weights, TargetValue);
    var CurrentValue = [0, 0, 0, 0, 0, 0, 0];//现值
    var ResourceIncreasingRate = CalculateResourceIncreasingRate();
    var UnableLogistic = setUnableLogistic(parseFloat($("#MapLimit").val()));
    Q_init_Contract();//一定要在后面
    switch (method) {
        case 1:
            Hours = parseFloat($("#Time_Anytime_hours").val()) + parseFloat($("#Time_Anytime_minutes").val()) / 60;
            if (Hours == 0) {
                confirm("每天执行后勤时长不能为0！");
                return 0;
            }
            break;
        case 2:
            Hours = parseFloat($("#Time_SingleTime_hours").val()) + parseFloat($("#Time_SingleTime_minutes").val()) / 60;
            if (Hours == 0) {
                confirm("时长不能为0！");
                return 0;
            }
            //排除超时后勤
            for (var i = 1; i <= Q.length; i++) {
                if (Q[i - 1][8] > Hours) {
                    if (UnableLogistic.indexOf(i) == -1) {
                        UnableLogistic.push(i);
                    }
                }
            }
            break;
        case 3:
            Hours = parseFloat($("#Time_Intervals_hours").val()) + parseFloat($("#Time_Intervals_minutes").val()) / 60;
            if (Hours == 0) {
                var r = confirm("间隔时长为0，请使用\"随时能收后勤\"一栏来计算组合方案");
                if (r == true) {
                    $('a[href="#method_1"]').tab('show');
                    method = 1;
                }
                return 0;
            }
            break;
    }
    CorrectTargetValue(TargetValue);//目标值修正
    for (var n1 = 1; n1 <= (Q.length - 3); n1++) {
        if (UnableLogistic.indexOf(n1) != -1) continue;
        for (var n2 = n1 + 1; n2 <= (Q.length - 2); n2++) {
            if (UnableLogistic.indexOf(n2) != -1) continue;
            for (var n3 = n2 + 1; n3 <= (Q.length - 1); n3++) {
                if (UnableLogistic.indexOf(n3) != -1) continue;
                for (var n4 = n3 + 1; n4 <= Q.length; n4++) {
                    if (UnableLogistic.indexOf(n4) != -1) continue;
                    var Plan_value = 0;
                    switch(method) {
                        case 1:
                            for (var i = 0; i < 4; i++) {
                                CurrentValue[i] = ResourceIncreasingRate * (Q[n1 - 1][i + 1] + Q[n2 - 1][i + 1] + Q[n3 - 1][i + 1] + Q[n4 - 1][i + 1]);
                            }
                            for (var i = 4; i < 7; i++) {
                                CurrentValue[i] = Q[n1 - 1][i + 1] + Q[n2 - 1][i + 1] + Q[n3 - 1][i + 1] + Q[n4 - 1][i + 1]
                            }
                            break;
                        case 2:
                            for (var i = 0; i < 4; i++) {
                                CurrentValue[i] = ResourceIncreasingRate * 
                                    (Q[n1 - 1][i + 1] * Q[n1 - 1][8] + Q[n2 - 1][i + 1]* Q[n2 - 1][8] + Q[n3 - 1][i + 1]* Q[n3 - 1][8] + Q[n4 - 1][i + 1]* Q[n4 - 1][8]) / Hours;
                            }
                            for (var i = 4; i < 7; i++) {
                                CurrentValue[i] = (Q[n1 - 1][i + 1] * Q[n1 - 1][8] + Q[n2 - 1][i + 1]* Q[n2 - 1][8] + Q[n3 - 1][i + 1]* Q[n3 - 1][8] + Q[n4 - 1][i + 1]* Q[n4 - 1][8]) / Hours;
                            }
                            break;
                        case 3:
                            var times = [1, 1, 1, 1];
                            var number = [n1, n2, n3, n4];
                            var MC_n = [0, 0, 0, 0];
                            var AC_n = [0, 0, 0, 0];
                            var RC_n = [0, 0, 0, 0];
                            var PC_n = [0, 0, 0, 0];
                            var GC_n = [0, 0, 0, 0];
                            var EC_n = [0, 0, 0, 0];
                            var FC_n = [0, 0, 0, 0];
                            for (var i = 0; i < 4; i++) {
                                while (times[i] * Hours < Q[number[i] - 1][8]) times[i] += 1;
                                MC_n[i] = Q[number[i] - 1][1] * Q[number[i] - 1][8] / (times[i] * Hours);
                                AC_n[i] = Q[number[i] - 1][2] * Q[number[i] - 1][8] / (times[i] * Hours);
                                RC_n[i] = Q[number[i] - 1][3] * Q[number[i] - 1][8] / (times[i] * Hours);
                                PC_n[i] = Q[number[i] - 1][4] * Q[number[i] - 1][8] / (times[i] * Hours);
                                GC_n[i] = Q[number[i] - 1][5] * Q[number[i] - 1][8] / (times[i] * Hours);
                                EC_n[i] = Q[number[i] - 1][6] * Q[number[i] - 1][8] / (times[i] * Hours);
                                FC_n[i] = Q[number[i] - 1][7] * Q[number[i] - 1][8] / (times[i] * Hours);
                            }
                            CurrentValue[0] = ResourceIncreasingRate * (MC_n[0] + MC_n[1] + MC_n[2] + MC_n[3]);
                            CurrentValue[1] = ResourceIncreasingRate * (AC_n[0] + AC_n[1] + AC_n[2] + AC_n[3]);
                            CurrentValue[2] = ResourceIncreasingRate * (RC_n[0] + RC_n[1] + RC_n[2] + RC_n[3]);
                            CurrentValue[3] = ResourceIncreasingRate * (PC_n[0] + PC_n[1] + PC_n[2] + PC_n[3]);
                            CurrentValue[4] = GC_n[0] + GC_n[1] + GC_n[2] + GC_n[3];
                            CurrentValue[5] = EC_n[0] + EC_n[1] + EC_n[2] + EC_n[3];
                            CurrentValue[6] = FC_n[0] + FC_n[1] + FC_n[2] + FC_n[3];
                            One_cycle_time = CalculateArrayLeastCommonMultiple(times) * Hours;
                            break;
                    }
                    Plan_value = Value(Weights, TargetValue, CurrentValue);
                    var MissionsNumber = [n1, n2, n3, n4];
                    plan.push(MissionsNumber, CurrentValue, Plan_value)
                }
            }
        }
    }
    Print_Table(method, plan.List, Hours);
}

class Tab {
	showntab = "Anytime";
	Hours = 0;
	Minutes = 0;
	
	CheckDataLegalityAndCorrect_Time();
	setTime();

	getTime() {
		return this.Hours + this.Minutes / 60;
	}

	Calculate_Current();
}

class Tab_Anytime extends Tab {
	CheckDataLegalityAndCorrect_Time() {
		var Hours = $("#Time_Anytime_hours");
		var Minutes = $("#Time_Anytime_minutes");
		if (is_Non_positive_number(Hours.val())) Hours.val(0);
		if (is_Non_positive_number(Minutes.val())) Minutes.val(0);
		var total_time = parseFloat(Hours.val()) + parseFloat(Minutes.val()) / 60;
		if (total_time > 24) {
			Hours.val(24);
			Minutes.val(0);
		}
	}
	setTime() {
		this.CheckDataLegalityAndCorrect_Time();
		this.Hours = parseFloat($("#Time_Anytime_hours").val());
		this.Minutes = parseFloat($("#Time_Anytime_minutes"));
	}
	Calculate_Current() {
		
	}
}

class Tab_SingleTime extends Tab {
	CheckDataLegalityAndCorrect_Time() {
		var Hours = $("#Time_SingleTime_hours");
		var Minutes = $("#Time_SingleTime_minutes");
		if (is_Non_positive_number(Hours.val())) Hours.val(0);
		if (is_Non_positive_number(Minutes.val())) Minutes.val(0);
	}
	setTime() {
		this.CheckDataLegalityAndCorrect_Time();
		this.Hours = parseFloat($("#Time_SingleTime_hours"));
		this.Minutes = parseFloat($("#Time_SingleTime_minutes"));
	}
	Calculate_Current() {

	}
}

class Tab_Intervals extends Tab {
	CheckDataLegalityAndCorrect_Time() {
		var Hours = $("#Time_Intervals_hours");
		var Minutes = $("#Time_Intervals_minutes");
		if (is_Non_positive_number(Hours.val())) Hours.val(0);
		if (is_Non_positive_number(Minutes.val())) Minutes.val(0);
	}
	setTime() {
		this.CheckDataLegalityAndCorrect_Time();
		this.Hours = parseFloat($("#Time_Intervals_hours"));
		this.Minutes = parseFloat($("#Time_Intervals_minutes"));
	}
	Calculate_Current() {
	
	}
}

function CheckDataLegalityAndCorrect() {
    CheckDataLegalityAndCorrect_TargetWeight();
	CheckDataLegalityAndCorrect_onedatTime();
    CheckDataLegalityAndCorrect_TotalTime();
	CheckDataLegalityAndCorrect_LimitTime();
    CheckDataLegalityAndCorrect_GreatSuccessRate();
}
function CheckDataLegalityAndCorrect_TargetWeight() {
    var arr = [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QT"),
        $("#Mw"), $("#Aw"), $("#Rw"), $("#Pw"), $("#Tw"), $("#Ew"), $("#Qw")];
    for (var i = 0; i < 14; i++) {
        if (is_Non_positive_number(arr[i].val())) arr[i].val(0);
    }
}
function CheckDataLegalityAndCorrect_onedatTime() {
	var Hours = $("#Time_Anytime_hours");
	var Minutes = $("#Time_Anytime_minutes");
	if (is_Non_positive_number(Hours.val())) Hours.val(0);
	if (is_Non_positive_number(Minutes.val())) Minutes.val(0);
	var total_time = parseFloat(Hours.val()) + parseFloat(Minutes.val()) / 60;
	if (total_time > 24) {
		Hours.val(24);
		Minutes.val(0);
	}
}
function CheckDataLegalityAndCorrect_TotalTime() {
	var Hours = $("#Time_SingleTime_hours");
	var Minutes = $("#Time_SingleTime_minutes");
	if (is_Non_positive_number(Hours.val())) Hours.val(0);
	if (is_Non_positive_number(Minutes.val())) Hours.val(0);

	
	
}
function CheckDataLegalityAndCorrect_GreatSuccessRate() {
    var Rate = $("#GreatSuccessRate");
    if (Rate.val()==="" || isNaN(Rate.val()) || Rate.val()<15) Rate.val(15);
    if (Rate.val()>60) Rate.val(60);
}
function is_Non_positive_number(x) {
	if (x==="" || isNaN(x) || x < 0) return true;
	else return false;
}

function getTarget() {
    var arr = new Array(7);
    arr[0] = parseFloat($("#MT").val());
    arr[1] = parseFloat($("#AT").val());
    arr[2] = parseFloat($("#RT").val());
    arr[3] = parseFloat($("#PT").val());
    arr[4] = parseFloat($("#TT").val());
    arr[5] = parseFloat($("#ET").val());
    arr[6] = parseFloat($("#QT").val());
    return arr;
}
function getWeight() {
    var arr = new Array(7);
    CheckDataLegalityAndCorrect_TargetWeight();//////////////////////
    arr[0] = $("#MT").val() == 0? 0:parseFloat($("#Mw").val());
    arr[1] = $("#AT").val() == 0? 0:parseFloat($("#Aw").val());
    arr[2] = $("#RT").val() == 0? 0:parseFloat($("#Rw").val());
    arr[3] = $("#PT").val() == 0? 0:parseFloat($("#Pw").val());
    arr[4] = $("#TT").val() == 0? 0:parseFloat($("#Tw").val());
    arr[5] = $("#ET").val() == 0? 0:parseFloat($("#Ew").val());
    arr[6] = $("#QT").val() == 0? 0:parseFloat($("#Qw").val());
    return arr;
}
function getTime() {

}
