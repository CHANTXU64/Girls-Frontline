class Tab {
	TotalTime = 1;
	
	setTime() {}
	CheckDataLegalityAndCorrect_Time() {}
	
	TimeMustBeNonNegativeNumber(Hours, Minutes) {
		if (is_Non_positive_number(Hours.val())) Hours.val(0);
		if (is_Non_positive_number(Minutes.val())) Minutes.val(0);
	}

	getTime() {
		return this.TotalTime;
	}

	getUnableLogistic() {
		var Unable_0 = setUnableLogistic();
		var Unable_1 = this.setUnableLogisticCustomize_1(Unable_0);
		var Unable_2 = this.setUnableLogisticCustomize_2(Unable_1);
		return Unable_2;
	}
	setUnableLogisticCustomize_1(UnableLogistic) {
		return UnableLogistic;
	}
	setUnableLogisticCustomize_2(UnableLogistic) {
		return UnableLogistic;
	}

	Calculate_Current(MissionsNumber, ResourceIncreasingRate) {}

	PrintPlanTableTitle() {}
	_title = '<thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th>';
	_titleEnd = '</tr></thead>';

	get_Hours_PrintResourceContract() {//用于计算平均每小时还是总共 资源和契约量
		return 1;
	}

	PrintTableCustomize(Plan, row) {
		return "";
	}
}

class Tab_Anytime extends Tab {
	setTime() {
		if (!document.getElementById('toggle-event').checked) {
			this.TotalTime = 1;
			return;
		}
		this.CheckDataLegalityAndCorrect_Time();
		var Hours = parseFloat($("#Time_Anytime_hours").val());
		var Minutes = parseFloat($("#Time_Anytime_minutes").val());
		this.TotalTime = Hours + Minutes / 60;
	}
	CheckDataLegalityAndCorrect_Time() {
		var Hours = $("#Time_Anytime_hours");
		var Minutes = $("#Time_Anytime_minutes");
		this.TimeMustBeNonNegativeNumber(Hours, Minutes);
		var total_time = parseFloat(Hours.val()) + parseFloat(Minutes.val()) / 60;
		if (total_time > 24) {
			Hours.val(24);
			Minutes.val(0);
		}
		if (total_time == 0) {
			alert("每天执行后勤时长不能为0！");
			throw"--";
		}
	}

	Calculate_Current(Number, ResourceIncreasingRate) {
		var CurrentValue = new Array(7);
		for (var i = 0; i < 7; i++) {
			CurrentValue[i] = Q[Number[0] - 1][i + 1] + Q[Number[1] - 1][i + 1] + Q[Number[2] - 1][i + 1] + Q[Number[3] - 1][i + 1];
		}
		for (var i = 0; i < 4; i++) {
			CurrentValue[i] *= ResourceIncreasingRate;
		}
		return CurrentValue;
	}

	PrintPlanTableTitle() {
		var title;
		if (document.getElementById('toggle-event').checked) {
			title = this._title + '<th>人力/d</th><th>弹药/d</th><th>口粮/d</th><th>零件/d</th><th>人形/d</th><th>装备/d</th><th>快建/d</th><th>最短时间</th><th>最长时间</th>' + this._titleEnd;
		}
		else {
			title = this._title + '<th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>最短时间</th><th>最长时间</th>' + this._titleEnd;
		}
		return title;
	}

	get_Hours_PrintResourceContract() {
		if (!document.getElementById('toggle-event').checked) return 1;
		else return this.TotalTime;
	}

	PrintTableCustomize(Plan, row) {
		var tab = "";
		tab += ("<td>" + (Math.round(Math.min(Q[Plan[row][0] - 1][8],Q[Plan[row][1] - 1][8],Q[Plan[row][2] - 1][8],Q[Plan[row][3] - 1][8]) * 100) / 100) + "h</td>");
		tab += ("<td>" + (Math.round(Math.max(Q[Plan[row][0] - 1][8],Q[Plan[row][1] - 1][8],Q[Plan[row][2] - 1][8],Q[Plan[row][3] - 1][8]) * 100) / 100) + "h</td>");
		return tab;
	}
}

class Tab_SingleTime extends Tab {
	setTime() {
		this.CheckDataLegalityAndCorrect_Time();
		var Hours = parseFloat($("#Time_SingleTime_hours").val());
		var Minutes = parseFloat($("#Time_SingleTime_minutes").val());
		this.TotalTime = Hours + Minutes / 60;
	}
	CheckDataLegalityAndCorrect_Time() {
		var Hours = $("#Time_SingleTime_hours");
		var Minutes = $("#Time_SingleTime_minutes");
		this.TimeMustBeNonNegativeNumber(Hours, Minutes);
		var total_time = parseFloat(Hours.val()) + parseFloat(Minutes.val()) / 60;
		if (total_time == 0) {
			alert("时长不能为0！");
			throw"--";
		}
	}

	setUnableLogisticCustomize_2(UnableLogistic) {//排除超时后勤
		for (var i = 0; i < Q.length; i++) {
            if (Q[i][8] > ShownTab.TotalTime) {
                if (UnableLogistic.indexOf(i) == -1) {
                    UnableLogistic.push(i);
                }
            }
		}
		
	}

	Calculate_Current(Number, ResourceIncreasingRate) {
		var CurrentValue = new Array(7);
		for (var i = 0; i < 7; i++) {
			CurrentValue[i] = (Q[Number[0] - 1][i + 1] * Q[Number[0] - 1][8] + Q[Number[1] - 1][i + 1] * Q[Number[1] - 1][8] + Q[Number[2] - 1][i + 1] * Q[Number[2] - 1][8] + Q[Number[3] - 1][i + 1] * Q[Number[3] - 1][8]) / this.TotalTime;
		}
		for (var i = 0; i < 4; i++) {
			CurrentValue[i] *= ResourceIncreasingRate;
		}
		return CurrentValue;
	}

	PrintPlanTableTitle() {
		var title;
		title = this._title + '<th>人力</th><th>弹药</th><th>口粮</th><th>零件</th><th>人形</th><th>装备</th><th>快建</th>' + this._titleEnd;
		return title;
	}

	get_Hours_PrintResourceContract() {
		return this.TotalTime;
	}
}

class Tab_Intervals extends Tab {
	setTime() {
		this.CheckDataLegalityAndCorrect_Time();
		var Hours = parseFloat($("#Time_Intervals_hours").val());
		var Minutes = parseFloat($("#Time_Intervals_minutes").val());
		this.TotalTime = Hours + Minutes / 60;
	}
	CheckDataLegalityAndCorrect_Time() {
		var Hours = $("#Time_Intervals_hours");
		var Minutes = $("#Time_Intervals_minutes");
		this.TimeMustBeNonNegativeNumber(Hours, Minutes);
		var total_time = parseFloat(Hours.val()) + parseFloat(Minutes.val()) / 60;
		if (total_time == 0) {
			var r = confirm("间隔时长为0，请使用\"随时能收后勤\"一栏来计算组合方案");
			if (r == true) {
				$('a[href="#Tab_Anytime"]').tab('show');
				ShownTab = new Tab_Anytime;
			}
			throw"--";
		}
	}

	Calculate_Current(Number, ResourceIncreasingRate) {
		var CurrentValue = new Array(7);
		var times = [1, 1, 1, 1];
		var CurrentValue_n = new Array(7);
		for (var i = 0; i < CurrentValue_n.length; i++) {
			CurrentValue_n[i] = new Array(4);
		}
		for (var i = 0; i < 4; i++) {
			while (times[i] * this.TotalTime < Q[Number[i] - 1][8]) times[i]++;
			for (var ii = 0; ii < 7; ii++) {
				CurrentValue_n[ii][i] = Q[Number[i] - 1][ii + 1] * Q[Number[i] - 1][8] / (times[i] * this.TotalTime);
			}
		}
		for (var i = 0; i < 7; i++) {
			CurrentValue[i] = CurrentValue_n[i][0] + CurrentValue_n[i][1] + CurrentValue_n[i][2] + CurrentValue_n[i][3];
		}
		for (var i = 0; i < 4; i++) {
			CurrentValue[i] *= ResourceIncreasingRate;
		}
		One_cycle_time = this.CalculateArrayLeastCommonMultiple(times) * this.TotalTime;
		return CurrentValue;
	}
	CalculateArrayLeastCommonMultiple(array) {
		var arr = array;
		for (var i = 0; i < (arr.length - 1); i++) {
			arr[i+1] = arr[i] * arr[i+1] / this.gcd(arr[i], arr[i + 1]);
		}
		return arr[arr.length - 1];
	}
	gcd(a, b) {
		if (b) while ((a %= b) && (b %= a));
		return a + b;
	}

	PrintPlanTableTitle() {
		var title;
		title = this._title + '<th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>最长时间</th><th><a href="#" data-toggle="tooltip" data-placement="top" title="一周期指从全部后勤同时开始到下一次全部后勤同时收取这段时间">一个周期</a></th>' + this._titleEnd;
		return title;
	}

	PrintTableCustomize(Plan, row) {
		var tab = "";
		tab += ("<td>" + (Math.round(Math.max(Q[Plan[row][0] - 1][8],Q[Plan[row][1] - 1][8],Q[Plan[row][2] - 1][8],Q[Plan[row][3] - 1][8]) * 100) / 100) + "h</td>");
		tab += ("<td>" + (Math.round(Plan[row][12] * 10) / 10) + "h</td>");
		return tab;
	}
}