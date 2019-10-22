function Get_Plan_Main() {
    CheckDataLegalityAndCorrect();
    var TargetValue = getTarget();
    if (TargetValue == [0,0,0,0,0,0,0]) {
        confirm("需求不能全为0");
        return 0;
    }
    var Weights = getWeight();
    var Time = getTime();
    
    Q_init_Contract();



    
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
