class Tab {
	constructor() {}

	setTime() {}
	_checkDataLegalityAndCorrect_Time() {}

	setResourceIncreasingRate() {
		var GreatSuccessRate_UP = Function_GreatSuccessRateUP();
		var GreatSuccessRate = parseFloat($("#GreatSuccessRate").val());
		this.ResourceIncreasingRate = 1 + (GreatSuccessRate + GreatSuccessRate_UP) / 200;
	}

	_setPlanListCustomizer() {
		this._PlanListCustomizer = [];
	}
	getPlanListCustomizer() {
		return this._PlanListCustomizer;
	}

	getUnableLogistic() {
		var Unable_0 = setUnableLogistic();
		var Unable_1 = this._setUnableLogisticCustomize_1(Unable_0);
		var Unable_2 = this._setUnableLogisticCustomize_2(Unable_1);
		return Unable_2;
	}
	_setUnableLogisticCustomize_1(UnableLogistic) {
		var startTime = parseFloat($("#Time_Limit_start").val());
		var endTime = parseFloat($("#Time_Limit_end").val());
		for (var i = 0; i < Q.length; i++) {
            if (this._notInLimitTime(Q[i][8], startTime, endTime)) {
                if (UnableLogistic.indexOf(i) == -1) {
                    UnableLogistic.push(i);
                }
            }
		}
		return UnableLogistic;
	}
	_setUnableLogisticCustomize_2(UnableLogistic) {
		return UnableLogistic;
	}
	_notInLimitTime(xtime, startTime, endTime) {
		if (xtime < startTime && Math.abs(xtime - startTime) > 0.02) return true;
		if (xtime > endTime && Math.abs(xtime - endTime) > 0.02) return true;
		return false;
	}

	Calculate_Current(MissionsNumber) {}
	_calculateCurrentByResourceIncreasingRate(CurrentValue) {
		for (var i = 0; i < 4; i++) {
			CurrentValue[i] *= this.ResourceIncreasingRate;
		}
		return CurrentValue;
	}

	PrintPlanTableTitle() {}
	_title = '<thead><tr><th class="col-0.3">#</th><th>关卡1</th><th>关卡2</th><th>关卡3</th><th>关卡4</th>';
	_titleEnd = '</tr></thead>';

	get_Hours_PrintResourceContract() {//用于计算平均每小时还是总共 资源和契约量
		return 1;
	}

	PrintTableCustomize(plan, row) {
		return "";
	}
}

class Tab_Anytime extends Tab {
	setTime() {
		if (!is_Tab_Anytime_CaculateOneDay()) {
			this.TotalTime = 1;
			return;
		}
		this.TotalTime = parseFloat($("#Tab_Anytime_Time").val());
	}

	Calculate_Current(Number) {
		var CurrentValue = new Array(7);
		for (var i = 0; i < 7; i++) {
			CurrentValue[i] = Q[Number[0]][i + 1] + Q[Number[1]][i + 1] + Q[Number[2]][i + 1] + Q[Number[3]][i + 1];
		}
		return this._calculateCurrentByResourceIncreasingRate(CurrentValue);
	}

	PrintPlanTableTitle() {
		var title;
		if (is_Tab_Anytime_CaculateOneDay()) {
			title = this._title + '<th>人力/d</th><th>弹药/d</th><th>口粮/d</th><th>零件/d</th><th>人形/d</th><th>装备/d</th><th>快建/d</th><th>最短时间</th><th>最长时间</th>' + this._titleEnd;
		}
		else {
			title = this._title + '<th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>最短时间</th><th>最长时间</th>' + this._titleEnd;
		}
		return title;
	}

	get_Hours_PrintResourceContract() {
		if (is_Tab_Anytime_CaculateOneDay()) return this.TotalTime;
		else return 1;
	}

	PrintTableCustomize(plan, row) {
		var tab = "";
		tab += ("<td>" + (Math.round(Math.min(Q[plan.List[row][0]][8],Q[plan.List[row][1]][8],Q[plan.List[row][2]][8],Q[plan.List[row][3]][8]) * 100) / 100) + "h</td>");
		tab += ("<td>" + (Math.round(Math.max(Q[plan.List[row][0]][8],Q[plan.List[row][1]][8],Q[plan.List[row][2]][8],Q[plan.List[row][3]][8]) * 100) / 100) + "h</td>");
		return tab;
	}
}

class Tab_SingleTime extends Tab {
	setTime() {
		this._checkDataLegalityAndCorrect_Time();
		var Hours = parseFloat($("#Time_SingleTime_hours").val());
		var Minutes = parseFloat($("#Time_SingleTime_minutes").val());
		this.TotalTime = Hours + Minutes / 60;
	}
	_checkDataLegalityAndCorrect_Time() {
		var Hours = getPositiveValueFromHTML($("#Time_SingleTime_hours"));
		var Minutes = getPositiveValueFromHTML($("#Time_SingleTime_minutes"));
		var total_time = Hours + Minutes / 60;
		if (total_time == 0) {
			alert("时长不能为0！");
			throw"--";
		}
	}

	_setUnableLogisticCustomize_2(UnableLogistic) { //排除超时后勤
		for (var i = 0; i < Q.length; i++) {
            if (Q[i][8] > this.TotalTime) {
                if (UnableLogistic.indexOf(i) == -1) {
                    UnableLogistic.push(i);
                }
            }
		}
		return UnableLogistic;
	}

	Calculate_Current(Number) {
		var CurrentValue = new Array(7);
		for (var i = 0; i < 7; i++) {
			CurrentValue[i] = (Q[Number[0]][i + 1] * Q[Number[0]][8] + Q[Number[1]][i + 1] * Q[Number[1]][8] + Q[Number[2]][i + 1] * Q[Number[2]][8] + Q[Number[3]][i + 1] * Q[Number[3]][8]) / this.TotalTime;
		}
		return this._calculateCurrentByResourceIncreasingRate(CurrentValue);
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

class Tab_Timetable extends Tab {
	constructor() {
		super();
		this.TimeList_html = [];
		this.TimeList = [];
	}

	setTime() {
		for (var i = 0; i < this.TimeList_html.length; i++) {
			this.TimeList[i] = this.TimeList_html[i];
		}
		this.TimeList = this.TimeList.sort(sortNumber);
		this.TimeList.unshift(0);
		this.TotalTime = Tab_Timetable_getMaxTime();
		this.TimeList.push(this.TotalTime);
	}

	_setUnableLogisticCustomize_2(UnableLogistic) { //排除超时后勤
		for (var i = 0; i < Q.length; i++) {
            if (Q[i][8] > this.TotalTime) {
                if (UnableLogistic.indexOf(i) == -1) {
                    UnableLogistic.push(i);
                }
            }
		}
		return UnableLogistic;
	}

	Calculate_Current(Number) {
		var CurrentValue = new Array(7);
		var times = [0, 0, 0, 0];
		var CurrentValue_n = new Array(7);
		for (var i = 0; i < CurrentValue_n.length; i++) {
			CurrentValue_n[i] = new Array(4);
		}
		for (var i = 0; i < 4; i++) {
			var Time_List = [];
			for (var ii = 0; ii < this.TimeList.length; ii++) {
				Time_List[ii] = this.TimeList[ii];
			}
			for (var ii = 1; ii < Time_List.length; ii++) {
				if (Q[Number[i]][8] <= Time_List[ii] - Time_List[0]) {
					times[i]++;
					Time_List.splice(0, ii);
					ii = 0;
				}
			}
			for (var ii = 0; ii < 7; ii++) {
				CurrentValue_n[ii][i] = Q[Number[i]][ii + 1] * Q[Number[i]][8] * times[i] / this.TotalTime;
			}
		}
		for (var i = 0; i < 7; i++) {
			CurrentValue[i] = CurrentValue_n[i][0] + CurrentValue_n[i][1] + CurrentValue_n[i][2] + CurrentValue_n[i][3];
		}
		return this._calculateCurrentByResourceIncreasingRate(CurrentValue);
	}

	PrintPlanTableTitle() {
		var title;
		if (is_Tab_Timetable_CaculateOnce()) {
			title = this._title + '<th>人力</th><th>弹药</th><th>口粮</th><th>零件</th><th>人形</th><th>装备</th><th>快建</th>' + this._titleEnd;
		}
		else {
			title = this._title + '<th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th>' + this._titleEnd;
		}
		return title;
	}

	get_Hours_PrintResourceContract() {
		if (is_Tab_Timetable_CaculateOnce()) return this.TotalTime;
		else return 1;
	}
}

function sortNumber(a, b) {
	return a - b;
}

class Tab_Intervals extends Tab {
	setTime() {
		this._checkDataLegalityAndCorrect_Time();
		var Hours = parseFloat($("#Time_Intervals_hours").val());
		var Minutes = parseFloat($("#Time_Intervals_minutes").val());
		this.TotalTime = Hours + Minutes / 60;
	}
	_checkDataLegalityAndCorrect_Time() {
		var Hours = getPositiveValueFromHTML($("#Time_Intervals_hours"));
		var Minutes = getPositiveValueFromHTML($("#Time_Intervals_minutes"));
		var total_time = Hours + Minutes / 60;
		if (total_time == 0) {
			var r = confirm("间隔时长为0，请使用\"随时能收后勤\"一栏来计算组合方案");
			if (r == true) {
				location.reload();
			}
			throw"--";
		}
	}

	Calculate_Current(Number) {
		var CurrentValue = new Array(7);
		var times = [1, 1, 1, 1];
		var CurrentValue_n = new Array(7);
		for (var i = 0; i < CurrentValue_n.length; i++) {
			CurrentValue_n[i] = new Array(4);
		}
		for (var i = 0; i < 4; i++) {
			while (times[i] * this.TotalTime < Q[Number[i]][8]) times[i]++;
			for (var ii = 0; ii < 7; ii++) {
				CurrentValue_n[ii][i] = Q[Number[i]][ii + 1] * Q[Number[i]][8] / (times[i] * this.TotalTime);
			}
		}
		this._setPlanListCustomizer(times);
		for (var i = 0; i < 7; i++) {
			CurrentValue[i] = CurrentValue_n[i][0] + CurrentValue_n[i][1] + CurrentValue_n[i][2] + CurrentValue_n[i][3];
		}
		return this._calculateCurrentByResourceIncreasingRate(CurrentValue);
	}
	_setPlanListCustomizer(times) {
		var One_cycle_time = this._calculateArrayLeastCommonMultiple(times) * this.TotalTime;
		this._PlanListCustomizer = [One_cycle_time];
	}
	_calculateArrayLeastCommonMultiple(array) {
		var arr = array;
		for (var i = 0; i < (arr.length - 1); i++) {
			arr[i+1] = arr[i] * arr[i+1] / this._gcd(arr[i], arr[i + 1]);
		}
		return arr[arr.length - 1];
	}
	_gcd(a, b) {
		if (b) while ((a %= b) && (b %= a));
		return a + b;
	}

	PrintPlanTableTitle() {
		var title;
		title = this._title + '<th>人力/h</th><th>弹药/h</th><th>口粮/h</th><th>零件/h</th><th>人形/h</th><th>装备/h</th><th>快建/h</th><th>最长时间</th><th><a href="#" data-toggle="tooltip" data-placement="top" title="一周期指从全部后勤同时开始到下一次全部后勤同时收取这段时间">一个周期</a></th>' + this._titleEnd;
		return title;
	}

	PrintTableCustomize(plan, row) {
		var tab = "";
		tab += ("<td>" + (Math.round(Math.max(Q[plan.List[row][0]][8],Q[plan.List[row][1]][8],Q[plan.List[row][2]][8],Q[plan.List[row][3]][8]) * 100) / 100) + "h</td>");
		tab += ("<td>" + (Math.round(plan.List[row].Customizer * 10) / 10) + "h</td>");
		return tab;
	}
}