/**
 * [GF_logistics]{@link https://github.com/CHANTXU64/Girls-Frontline}
 *
 * @namespace GF_logistics
 * @version 1.0.0
 * @author ChantXu64 [chantxu@outlook.com]
 * @copyright ChantXu64
 * @license MIT
 */
 
"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//捕获错误信息
window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
    console.error("错误信息：" + errorMessage + ", 出错文件：" + scriptURI + ", 出错文件：" + scriptURI + ", 出错行号：" + lineNumber + ", 出错列号：" + columnNumber + ", 错误详情：" + errorObj);
};
/**
 * @type {language_zh_CN|language_zh_TW|language_en}
 */
var language = void 0;
var language_zh_CN = {
    lang: "zh-Hans",
    title: "少女前线-后勤组合排序器",
    HTML: {
        header: "后勤组合排序器 ",
        Config_text: "全局数据",
        description_text: "计算结果只和资源（或契约）之间的比例有关。计算结果为均值。",
        neverShowAgain_description: "[&times;]<u>不再显示</u>",
        localstorageDoesNotWork: "因某些原因，Web存储无法工作，需要手动导出配置",
        localstorageWarning_text: "网页使用Web存储，清除浏览器缓存会导致数据清除，请定期手动导出并保存你的数据。",
        neverShowAgain_localstorageWarning: "[&times;]<u>不再显示</u>",
        setting: "设置",
        Tab_Anytime_name: "连续后勤",
        Tab_Timetable_name: "时间计划表",
        tab_Anytime_time: "后勤总时长",
        tab_Anytime_hour: "小时",
        tab_Anytime_minute: "分钟",
        tab_Anytime_MinimumIntervalTime: "最短间隔时间",
        tab_Anytime_MinimumIntervalTime_minute: "分钟",
        tab_Timetable_time: "后勤总时长",
        tab_Timetable_hour: "小时",
        tab_Timetable_minute: "分钟",
        tab_Timetable_addtimeh5: "新添加一个收取后勤时间点:",
        tab_Timetable_new_hour: "小时",
        tab_Timetable_new_minute: "分钟",
        h4GreatSuccessRate: "后勤队伍平均大成功概率",
        GreatSuccessRateUp_text: "后勤大成功UP",
        h4ChapterLimit: "章节解锁",
        Display_PerHour_text: "以每小时显示",
        Display_Total_text: "以总计显示",
        ContractWeight_notImportant: "契约不重要",
        ContractWeight_Important: "契约重要",
        start_ranking: "开始排序",
        clear_ranking: "清除排序结果",
        result: "排序结果",
        Manp: "人力",
        Ammu: "弹药",
        Rati: "口粮",
        Part: "零件",
        TPro: "人形",
        Equi: "装备",
        QPro: "快建",
        QRes: "快修",
        setTarget_HG: "手枪HG",
        setTarget_SMG: "冲锋枪SMG",
        setTarget_RF: "步枪RF",
        setTarget_AR: "突击步枪AR",
        setTarget_MG: "机枪MG",
        setTarget_SG: "霰弹枪SG",
        setTarget_2221: "均衡",
        setTarget_Clear: "清零",
        MissionTableTitle: "关卡",
        MissionTable_head_Mission: "关卡",
        MissionTable_head_Manp: "人力",
        MissionTable_head_Ammu: "弹药",
        MissionTable_head_Rati: "口粮",
        MissionTable_head_Part: "零件",
        MissionTable_head_TPro: "人形",
        MissionTable_head_Equi: "装备",
        MissionTable_head_QPro: "快建",
        MissionTable_head_QRes: "快修",
        MissionTable_head_Time: "时间",
        PlanDetailsTitle: "方案详情",
        PlanDetails_Mission: "关卡",
        PlanDetails_Manp: "人力",
        PlanDetails_Ammu: "弹药",
        PlanDetails_Rati: "口粮",
        PlanDetails_Part: "零件",
        PlanDetails_TPro: "人形",
        PlanDetails_Equi: "装备",
        PlanDetails_QPro: "快建",
        PlanDetails_QRes: "快修",
        PlanDetails_Time: "时间",
        savePlan: "保存方案",
        Capture: "捕获",
        PlanDetails_InputStartTime_label: "后勤开始时间",
        PlanDetails_InputExecutionTimes_label: "后勤执行次数",
        Saved_Title: "已保存的",
        NoSaved: "空",
        start_ranking_html: "点击 <span style=\"color:#165399\">开始排序</span> 按钮，排序前十六的结果将在这里显示",
        permanentAddress: "永久地址: ",
        calcTargetValueTool_title: "计算需求量工具",
        calcTargetValueTool_text_ResourceContract: "资源契约",
        calcTargetValueTool_Manp_text: "人力",
        calcTargetValueTool_Ammu_text: "弹药",
        calcTargetValueTool_Rati_text: "口粮",
        calcTargetValueTool_Part_text: "零件",
        calcTargetValueTool_TPro_text: "人形",
        calcTargetValueTool_Equi_text: "装备",
        calcTargetValueTool_QPro_text: "快建",
        calcTargetValueTool_QRes_text: "快修",
        calcTargetValueTool_text_target: "目标值",
        calcTargetValueTool_text_current: "现值",
        calcTargetValueTool_text_result: "结果",
        calcTargetValueTool_InputExecutionTimes_label: "后勤执行次数",
        calcTargetValueTool_clear: "重置",
        calcTargetValueTool_startCalc: "计算",
        calcTargetValueTool_apply_text: "应用"
    },
    HTMLJS: {
        placeholder: {
            Config_importInput: "导出或导入的配置",
            Time_Anytime_hours: "总时长小时数",
            Time_Anytime_minutes: "总时长分钟数",
            Tab_Anytime_MinimumIntervalTime_minutes: "最小时间间隔分钟数",
            Time_Timetable_hours: "总时长小时数",
            Time_Timetable_minutes: "总时长分钟数",
            Tab_Timetable_new_hours: "新时间点小时数",
            Tab_Timetable_new_minutes: "新时间点分钟数",
            GreatSuccessRate: "大成功基础概率",
            MT: "人力需求量",
            AT: "弹药需求量",
            RT: "口粮需求量",
            PT: "零件需求量",
            TT: "人形需求量",
            ET: "装备需求量",
            QPT: "快建需求量",
            QRT: "快修需求量",
            importSaved_input: "导出或导入的数据",
            PlanDetails_InputExecutionTimes: "执行次数"
        },
        title: {
            Config_importButton: "导入全局数据",
            Config_export: "导出全局数据",
            tab_Timetable_deleteall: "删除全部时间点",
            Tab_Timetable_AddNewTimePoint: "添加一个收取后勤时间点",
            ChapterLimit: "最大已解锁的战役章节",
            ContractWeight: "契约权重",
            Target_minus_100_MT: "人力需求量减少100",
            Target_minus_10_MT: "人力需求量减少10",
            Target_plus_10_MT: "人力需求量增加10",
            Target_plus_100_MT: "人力需求量增加100",
            Target_minus_100_AT: "弹药需求量减少100",
            Target_minus_10_AT: "弹药需求量减少10",
            Target_plus_10_AT: "弹药需求量增加10",
            Target_plus_100_AT: "弹药需求量增加100",
            Target_minus_100_RT: "口粮需求量减少100",
            Target_minus_10_RT: "口粮需求量减少10",
            Target_plus_10_RT: "口粮需求量增加10",
            Target_plus_100_RT: "口粮需求量增加100",
            Target_minus_100_PT: "零件需求量减少100",
            Target_minus_10_PT: "零件需求量减少10",
            Target_plus_10_PT: "零件需求量增加10",
            Target_plus_100_PT: "零件需求量增加100",
            Target_minus_1_TT: "人形需求量减少1",
            Target_minus_01_TT: "人形需求量减少0.1",
            Target_plus_01_TT: "人形需求量增加0.1",
            Target_plus_1_TT: "人形需求量增加1",
            Target_minus_1_ET: "装备需求量减少1",
            Target_minus_01_ET: "装备需求量减少0.1",
            Target_plus_01_ET: "装备需求量增加0.1",
            Target_plus_1_ET: "装备需求量增加1",
            Target_minus_1_QPT: "快建需求量减少1",
            Target_minus_01_QPT: "快建需求量减少0.1",
            Target_plus_01_QPT: "快建需求量增加0.1",
            Target_plus_1_QPT: "快建需求量增加1",
            Target_minus_1_QRT: "快修需求量减少1",
            Target_minus_01_QRT: "快修需求量减少0.1",
            Target_plus_01_QRT: "快修需求量增加0.1",
            Target_plus_1_QRT: "快修需求量增加1",
            importSaved_importButton: "导入数据"
        },
        Demand_hour: "平均每小时需求量",
        Demand_total: "总需求量",
        Timetable_deletePoint: "删除这个时间点",
        SavedTable_apply: "应用方案",
        SavedTable_name: "方案名称",
        SavedTable_rename: "重命名方案",
        SavedTable_up: "往上移动",
        SavedTable_down: "往下移动",
        SavedTable_export: "导出方案",
        SavedTable_delete: "删除方案",
        FineTuning_minus: "减小需求量",
        FineTuning_plus: "增大需求量"
    },
    JS: {
        chapter_start: "第",
        chapter_end: "战役",
        number: function number(num) {
            //author: zdluffy
            //CC 4.0 BY-SA
            //https://blog.csdn.net/zdluffy/article/details/98970516
            var AA = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
            var BB = ["", "十", "百", "千", "万", "十万", "百万", "千万", "亿"];
            var res = "";
            var numstr = "" + num;
            var k = numstr.length;
            for (var i = 0; i < numstr.length; i++) {
                var tmp = numstr[i] - '0';
                var bIndex = k - i - 1;
                if (0 === tmp) {
                    if ("0" === numstr[i - 1] || i === numstr.length - 1) //处理2003、230出现多余的零
                        continue;else if (bIndex >= 4 && 0 === bIndex % 4) //处理2103243在万位出现多余的零
                        res = res + BB[bIndex];else res = res + AA[tmp]; //正常零
                } else {
                    res = res + AA[tmp];
                    if (numstr.length === 2 && numstr[0] === '1' && i === 0) res = ""; //12读作十二，把1删掉
                    if (0 === bIndex % 4) //万、亿位的要输出
                        res = res + BB[bIndex];else //"十万","百万","千万"其实就是一摆设，万不输出
                        res = res + BB[bIndex % 4];
                }
            }
            return res;
        },

        Manp: "人力",
        Ammu: "弹药",
        Rati: "口粮",
        Part: "零件",
        TPro: "人形",
        Equi: "装备",
        QPro: "快建",
        QRes: "快修",
        FineTuningManp: "人力",
        FineTuningAmmu: "弹药",
        FineTuningRati: "口粮",
        FineTuningPart: "零件",
        FineTuningTPro: "人形",
        FineTuningEqui: "装备",
        FineTuningQPro: "快建",
        FineTuningQRes: "快修",
        FineTuningTool: "微调工具",
        TargetValue0_alert: "需求不能全为0！",
        tab_Anytime_alert1: "总时长不能为0！",
        tab_Timetable_alert1: "不需要在后勤开始点再添加收取时间点",
        tab_Timetable_alert2: "添加的收取时间点不能超过最大时限",
        tab_Timetable_alert3: "已经添加过这个收取时间点",
        tab_Timetable_alert4: "总时长不能为0！",
        Mission: "关卡",
        MinIntervalTime: "最短间隔",
        NoPlan: "没有合适的方案",
        NoMission: "没有可用的关卡",
        PlanDetails_calculateMethod: "计算方式",
        total_time: "总时长",
        total_greatSuccessRate: "大成功总概率",
        PerHour: "平均/h",
        Total: "总计",
        ExecutionTimes: "执行次数",
        plzInputPlanName: "请输入方案名称",
        planDefaultName: "自定义",
        deleteSavedWarning_1: "是否要删除这个名为",
        deleteSavedWarning_2: "的配置？",
        Saved_alert: "导入的数据有问题！",
        Saved_alert2: "保存的数量过多，不能再添加",
        config_alert: "这将会覆盖现有所有的数据，是否要继续？",
        FailedWindowLoadWarn: "可能由于Web存储数据不正确, 导致网页崩溃. 您可以将下面的数据报告到GitHub或发送邮件到chantxu@outlook.com"
    },
    CSS: {
        TargetValueSpan_Width: "55px",
        FineTuningButton_Width: "60%"
    }
};
var language_zh_TW = {
    lang: "zh-Hant",
    title: "少女前線-後勤組合排序器",
    HTML: {
        header: "後勤組合排序器 ",
        Config_text: "全局數據",
        description_text: "計算結果只和資源（或契約）之間的比例有關。計算結果為期望值。",
        neverShowAgain_description: "[&times;]<u>不再顯示</u>",
        localstorageDoesNotWork: "因某些原因，Web存儲無法工作，需要手動導出配置",
        localstorageWarning_text: "網頁使用Web存儲，清除瀏覽器緩存會導致數據清除，請定期手動導出並保存你的數據。",
        neverShowAgain_localstorageWarning: "[&times;]<u>不再顯示</u>",
        setting: "設置",
        Tab_Anytime_name: "連續後勤",
        Tab_Timetable_name: "時間計劃表",
        tab_Anytime_time: "後勤總時長",
        tab_Anytime_hour: "小時",
        tab_Anytime_minute: "分鐘",
        tab_Anytime_MinimumIntervalTime: "最短間隔時間",
        tab_Anytime_MinimumIntervalTime_minute: "分鐘",
        tab_Timetable_time: "後勤總時長",
        tab_Timetable_hour: "小時",
        tab_Timetable_minute: "分鐘",
        tab_Timetable_addtimeh5: "新添加一個收取後勤時間點:",
        tab_Timetable_new_hour: "小時",
        tab_Timetable_new_minute: "分鐘",
        h4GreatSuccessRate: "後勤隊伍平均大成功概率",
        GreatSuccessRateUp_text: "後勤大成功UP",
        h4ChapterLimit: "章節解鎖",
        Display_PerHour_text: "以每小時顯示",
        Display_Total_text: "以總計顯示",
        ContractWeight_notImportant: "契約不重要",
        ContractWeight_Important: "契約重要",
        start_ranking: "開始排序",
        clear_ranking: "清除排序結果",
        result: "排序結果",
        Manp: "人力",
        Ammu: "彈藥",
        Rati: "口糧",
        Part: "零件",
        TPro: "人形",
        Equi: "裝備",
        QPro: "快建",
        QRes: "快修",
        setTarget_HG: "手槍HG",
        setTarget_SMG: "衝鋒槍SMG",
        setTarget_RF: "步槍RF",
        setTarget_AR: "突擊步槍AR",
        setTarget_MG: "機槍MG",
        setTarget_SG: "霰彈槍SG",
        setTarget_2221: "均衡",
        setTarget_Clear: "清零",
        MissionTableTitle: "關卡",
        MissionTable_head_Mission: "關卡",
        MissionTable_head_Manp: "人力",
        MissionTable_head_Ammu: "彈藥",
        MissionTable_head_Rati: "口糧",
        MissionTable_head_Part: "零件",
        MissionTable_head_TPro: "人形",
        MissionTable_head_Equi: "裝備",
        MissionTable_head_QPro: "快建",
        MissionTable_head_QRes: "快修",
        MissionTable_head_Time: "時間",
        PlanDetailsTitle: "方案詳情",
        PlanDetails_Mission: "關卡",
        PlanDetails_Manp: "人力",
        PlanDetails_Ammu: "彈藥",
        PlanDetails_Rati: "口糧",
        PlanDetails_Part: "零件",
        PlanDetails_TPro: "人形",
        PlanDetails_Equi: "裝備",
        PlanDetails_QPro: "快建",
        PlanDetails_QRes: "快修",
        PlanDetails_Time: "時間",
        savePlan: "保存方案",
        Capture: "捕獲",
        PlanDetails_InputStartTime_label: "後勤開始時間",
        PlanDetails_InputExecutionTimes_label: "執行次數",
        Saved_Title: "已保存的",
        NoSaved: "空",
        start_ranking_html: "點擊 <span style=\"color:#165399\">開始排序</span> 按鈕，排序前十六的結果將在這裡顯示",
        permanentAddress: "永久地址: ",
        calcTargetValueTool_title: "計算需求量工具",
        calcTargetValueTool_text_ResourceContract: "資源契約",
        calcTargetValueTool_Manp_text: "人力",
        calcTargetValueTool_Ammu_text: "彈藥",
        calcTargetValueTool_Rati_text: "口糧",
        calcTargetValueTool_Part_text: "零件",
        calcTargetValueTool_TPro_text: "人形",
        calcTargetValueTool_Equi_text: "裝備",
        calcTargetValueTool_QPro_text: "快建",
        calcTargetValueTool_QRes_text: "快修",
        calcTargetValueTool_text_target: "目標值",
        calcTargetValueTool_text_current: "現值",
        calcTargetValueTool_text_result: "結果",
        calcTargetValueTool_InputExecutionTimes_label: "後勤執行次數",
        calcTargetValueTool_clear: "重置",
        calcTargetValueTool_startCalc: "計算",
        calcTargetValueTool_apply_text: "應用"
    },
    HTMLJS: {
        placeholder: {
            Config_importInput: "導出或導入的數據",
            Time_Anytime_hours: "總時長小時數",
            Time_Anytime_minutes: "總時長分鐘數",
            Tab_Anytime_MinimumIntervalTime_minutes: "最小時間間隔分鐘數",
            Time_Timetable_hours: "總時長小時數",
            Time_Timetable_minutes: "總時長分鐘數",
            Tab_Timetable_new_hours: "新時間點小時數",
            Tab_Timetable_new_minutes: "新時間點分鐘數",
            GreatSuccessRate: "大成功基礎概率",
            MT: "人力需求量",
            AT: "彈藥需求量",
            RT: "口糧需求量",
            PT: "零件需求量",
            TT: "人形需求量",
            ET: "裝備需求量",
            QPT: "快建需求量",
            QRT: "快修需求量",
            importSaved_input: "導出或導入的數據",
            PlanDetails_InputExecutionTimes: "後勤執行次數"
        },
        title: {
            Config_importButton: "導入全局數據",
            Config_export: "導出全局數據",
            tab_Timetable_deleteall: "刪除全部時間點",
            Tab_Timetable_AddNewTimePoint: "添加一個收取後勤時間點",
            ChapterLimit: "最大已解鎖的戰役章節",
            ContractWeight: "契約權重",
            Target_minus_100_MT: "人力需求量減少100",
            Target_minus_10_MT: "人力需求量減少10",
            Target_plus_10_MT: "人力需求量增加10",
            Target_plus_100_MT: "人力需求量增加100",
            Target_minus_100_AT: "彈藥需求量減少100",
            Target_minus_10_AT: "彈藥需求量減少10",
            Target_plus_10_AT: "彈藥需求量增加10",
            Target_plus_100_AT: "彈藥需求量增加100",
            Target_minus_100_RT: "口糧需求量減少100",
            Target_minus_10_RT: "口糧需求量減少10",
            Target_plus_10_RT: "口糧需求量增加10",
            Target_plus_100_RT: "口糧需求量增加100",
            Target_minus_100_PT: "零件需求量減少100",
            Target_minus_10_PT: "零件需求量減少10",
            Target_plus_10_PT: "零件需求量增加10",
            Target_plus_100_PT: "零件需求量增加100",
            Target_minus_1_TT: "人形需求量減少1",
            Target_minus_01_TT: "人形需求量減少0.1",
            Target_plus_01_TT: "人形需求量增加0.1",
            Target_plus_1_TT: "人形需求量增加1",
            Target_minus_1_ET: "裝備需求量減少1",
            Target_minus_01_ET: "裝備需求量減少0.1",
            Target_plus_01_ET: "装备需求量增加0.1",
            Target_plus_1_ET: "装备需求量增加1",
            Target_minus_1_QPT: "快建需求量減少1",
            Target_minus_01_QPT: "快建需求量減少0.1",
            Target_plus_01_QPT: "快建需求量增加0.1",
            Target_plus_1_QPT: "快建需求量增加1",
            Target_minus_1_QRT: "快修需求量減少1",
            Target_minus_01_QRT: "快修需求量減少0.1",
            Target_plus_01_QRT: "快修需求量增加0.1",
            Target_plus_1_QRT: "快修需求量增加1",
            importSaved_importButton: "導入數據"
        },
        Demand_hour: "平均每小時需求量",
        Demand_total: "總需求量",
        Timetable_deletePoint: "刪除這個時間點",
        SavedTable_apply: "應用方案",
        SavedTable_name: "方案名稱",
        SavedTable_rename: "重命名方案",
        SavedTable_up: "往上移動",
        SavedTable_down: "往下移動",
        SavedTable_export: "導出方案",
        SavedTable_delete: "刪除方案",
        FineTuning_minus: "減小需求量",
        FineTuning_plus: "增大需求量"
    },
    JS: {
        chapter_start: "第",
        chapter_end: "戰役",
        number: function number(num) {
            //author: zdluffy
            //CC 4.0 BY-SA
            //https://blog.csdn.net/zdluffy/article/details/98970516
            var AA = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
            var BB = ["", "十", "百", "千", "萬", "十萬", "百萬", "千萬", "億"];
            var res = "";
            var numstr = "" + num;
            var k = numstr.length;
            for (var i = 0; i < numstr.length; i++) {
                var tmp = numstr[i] - '0';
                var bIndex = k - i - 1;
                if (0 === tmp) {
                    if ("0" === numstr[i - 1] || i === numstr.length - 1) //处理2003、230出现多余的零
                        continue;else if (bIndex >= 4 && 0 === bIndex % 4) //处理2103243在万位出现多余的零
                        res = res + BB[bIndex];else res = res + AA[tmp]; //正常零
                } else {
                    res = res + AA[tmp];
                    if (numstr.length === 2 && numstr[0] === '1' && i === 0) res = ""; //12读作十二，把1删掉
                    if (0 === bIndex % 4) //万、亿位的要输出
                        res = res + BB[bIndex];else //"十万","百万","千万"其实就是一摆设，万不输出
                        res = res + BB[bIndex % 4];
                }
            }
            return res;
        },

        Manp: "人力",
        Ammu: "彈藥",
        Rati: "口糧",
        Part: "零件",
        TPro: "人形",
        Equi: "裝備",
        QPro: "快建",
        QRes: "快修",
        FineTuningManp: "人力",
        FineTuningAmmu: "彈藥",
        FineTuningRati: "口糧",
        FineTuningPart: "零件",
        FineTuningTPro: "人形",
        FineTuningEqui: "裝備",
        FineTuningQPro: "快建",
        FineTuningQRes: "快修",
        FineTuningTool: "微調工具",
        TargetValue0_alert: "需求不能全為0！",
        tab_Anytime_alert1: "總時長不能為0！",
        tab_Timetable_alert1: "不需要在後勤開始點再添加收取時間點",
        tab_Timetable_alert2: "添加的收取時間點不能超過最大時限",
        tab_Timetable_alert3: "已經添加過這個收取時間點",
        tab_Timetable_alert4: "總時長不能為0！",
        Mission: "關卡",
        MinIntervalTime: "最短間隔",
        NoPlan: "沒有合適的方案",
        NoMission: "沒有可用的關卡",
        PlanDetails_calculateMethod: "計算方式",
        total_time: "總時長",
        total_greatSuccessRate: "大成功總概率",
        PerHour: "平均/h",
        Total: "總計",
        ExecutionTimes: "執行次數",
        plzInputPlanName: "請輸入方案名稱",
        planDefaultName: "自定義",
        deleteSavedWarning_1: "是否要刪除這個名為",
        deleteSavedWarning_2: "的配置？",
        Saved_alert: "導入的數據有問題！",
        Saved_alert2: "保存的數量過多，不能再添加",
        config_alert: "這將會覆蓋現有所有的數據，是否要繼續？",
        FailedWindowLoadWarn: "可能由於Web存儲數據不正確, 導致網頁崩潰. 您可以將下面的數據報告到GitHub或發​​送郵件到chantxu@outlook.com"
    },
    CSS: {
        TargetValueSpan_Width: "55px",
        FineTuningButton_Width: "60%"
    }
};
var language_en = {
    lang: "en",
    title: "Girls' Frontline Logistics Combination Calculator",
    HTML: {
        header: "Logistics Combination Calculator ",
        Config_text: "All configurations",
        description_text: "The calculation results are only related to the ratio of resources (or contracts). The calculation results are expected value.",
        neverShowAgain_description: "[&times;] <u>never show again</u>",
        localstorageDoesNotWork: "For some reason, Web storage doesn't work, you need to manually export the configurations.",
        localstorageWarning_text: "The pages use Web storage. Clearing the browser cache will cause all data to be cleared. Please manually export and save your data regularly.",
        neverShowAgain_localstorageWarning: "[&times;] <u>never show again</u>",
        setting: "Setting",
        Tab_Anytime_name: "Continuous Logistics",
        Tab_Timetable_name: "Timetable",
        tab_Anytime_time: "Total Logistics Time",
        tab_Anytime_hour: "hr",
        tab_Anytime_minute: "min",
        tab_Anytime_MinimumIntervalTime: "Minimum Interval Time",
        tab_Anytime_MinimumIntervalTime_minute: "min",
        tab_Timetable_time: "Total Logistics Time",
        tab_Timetable_hour: "hr",
        tab_Timetable_minute: "min",
        tab_Timetable_addtimeh5: "Add a new deployment logistics time point:",
        tab_Timetable_new_hour: "hr",
        tab_Timetable_new_minute: "min",
        h4GreatSuccessRate: "Average Great Success Rate",
        GreatSuccessRateUp_text: "Great Success rate up",
        h4ChapterLimit: "Unlocked chapter",
        Display_PerHour_text: "Hourly",
        Display_Total_text: "Total",
        ContractWeight_notImportant: "Contract Weight: 0~100",
        ContractWeight_Important: "",
        start_ranking: "Start Ranking",
        clear_ranking: "Clear Ranking Results",
        result: "Ranking Results",
        Manp: "Mpwr",
        Ammu: "Ammo",
        Rati: "Ration",
        Part: "Parts",
        TPro: "T-Doll",
        Equi: "Eqpt",
        QPro: "QProd",
        QRes: "QRest",
        setTarget_HG: "Hand Gun",
        setTarget_SMG: "Sub-Machine Gun",
        setTarget_RF: "Rifle",
        setTarget_AR: "Assault Rifle",
        setTarget_MG: "Machine Gun",
        setTarget_SG: "Shotgun",
        setTarget_2221: "Balanced",
        setTarget_Clear: "Clear",
        MissionTableTitle: "Missions",
        MissionTable_head_Mission: "Mission",
        MissionTable_head_Manp: "Mpwr",
        MissionTable_head_Ammu: "Ammo",
        MissionTable_head_Rati: "Ration",
        MissionTable_head_Part: "Parts",
        MissionTable_head_TPro: "T-Doll",
        MissionTable_head_Equi: "Eqpt",
        MissionTable_head_QPro: "QProd",
        MissionTable_head_QRes: "QRest",
        MissionTable_head_Time: "Time",
        PlanDetailsTitle: "Plan Details",
        PlanDetails_Mission: "Mission",
        PlanDetails_Manp: "Mpwr",
        PlanDetails_Ammu: "Ammo",
        PlanDetails_Rati: "Ration",
        PlanDetails_Part: "Parts",
        PlanDetails_TPro: "T-Doll",
        PlanDetails_Equi: "Eqpt",
        PlanDetails_QPro: "QProd",
        PlanDetails_QRes: "QRest",
        PlanDetails_Time: "Time",
        savePlan: "Save Plan",
        Capture: "Capture",
        PlanDetails_InputStartTime_label: "Start Time",
        PlanDetails_InputExecutionTimes_label: "Execution Times",
        Saved_Title: "Saved Plan",
        NoSaved: "No Saved Plan",
        start_ranking_html: "Click <span style=\"color:#165399\">Start Ranking</span> button, top sixteen results will display here",
        permanentAddress: "Address: ",
        calcTargetValueTool_title: "Calculate Demand Tool",
        calcTargetValueTool_text_ResourceContract: "Value",
        calcTargetValueTool_Manp_text: "Mpwr",
        calcTargetValueTool_Ammu_text: "Ammo",
        calcTargetValueTool_Rati_text: "Ration",
        calcTargetValueTool_Part_text: "Parts",
        calcTargetValueTool_TPro_text: "T-Doll",
        calcTargetValueTool_Equi_text: "Eqpt",
        calcTargetValueTool_QPro_text: "QProd",
        calcTargetValueTool_QRes_text: "QRest",
        calcTargetValueTool_text_target: "Target",
        calcTargetValueTool_text_current: "Current",
        calcTargetValueTool_text_result: "Result",
        calcTargetValueTool_InputExecutionTimes_label: "Execution Times",
        calcTargetValueTool_clear: "Clear",
        calcTargetValueTool_startCalc: "Calculate",
        calcTargetValueTool_apply_text: "Apply"
    },
    HTMLJS: {
        placeholder: {
            Config_importInput: "Exported or imported configurations",
            Time_Anytime_hours: "Hours of total time",
            Time_Anytime_minutes: "Minutes of total time",
            Tab_Anytime_MinimumIntervalTime_minutes: "Minutes of minimum interval time",
            Time_Timetable_hours: "Hours of total time",
            Time_Timetable_minutes: "Minutes of total time",
            Tab_Timetable_new_hours: "Hours of new time point",
            Tab_Timetable_new_minutes: "Minutes of new time point",
            GreatSuccessRate: "Great Success base rate",
            MT: "Manpower demand",
            AT: "Ammunition demand",
            RT: "Ration demand",
            PT: "Parts demand",
            TT: "T-Doll Contract demand",
            ET: "Equipment Contract demand",
            QPT: "Quick Production Contract demand",
            QRT: "Quick Restoration Contract demand",
            importSaved_input: "Exported or imported data",
            PlanDetails_InputExecutionTimes: "Number of executions"
        },
        title: {
            Config_importButton: "Import configurations",
            Config_export: "Export configurations",
            tab_Timetable_deleteall: "Delete all points",
            Tab_Timetable_AddNewTimePoint: "Add a deployment logistics time point",
            ChapterLimit: "Maximum unlocked chapter",
            ContractWeight: "Contract Weight",
            Target_minus_100_MT: "Reduced Manpower demand by 100",
            Target_minus_10_MT: "Reduced Manpower demand by 10",
            Target_plus_10_MT: "Increase Manpower demand by 10",
            Target_plus_100_MT: "Increase Manpower demand by 100",
            Target_minus_100_AT: "Reduced Ammunition demand by 100",
            Target_minus_10_AT: "Reduced Ammunition demand by 10",
            Target_plus_10_AT: "Increase Ammunition demand by 10",
            Target_plus_100_AT: "Increase Ammunition demand by 100",
            Target_minus_100_RT: "Reduced Ration demand by 100",
            Target_minus_10_RT: "Reduced Ration demand by 10",
            Target_plus_10_RT: "Increase Ration demand by 10",
            Target_plus_100_RT: "Increase Ration demand by 100",
            Target_minus_100_PT: "Reduced Parts demand by 100",
            Target_minus_10_PT: "Reduced Parts demand by 10",
            Target_plus_10_PT: "Increase Parts demand by 10",
            Target_plus_100_PT: "Increase Parts demand by 100",
            Target_minus_1_TT: "Reduced T-Doll Contract demand by 1",
            Target_minus_01_TT: "Reduced T-Doll Contract demand by 0.1",
            Target_plus_01_TT: "Increase T-Doll Contract demand by 0.1",
            Target_plus_1_TT: "Increase T-Doll Contract demand by 1",
            Target_minus_1_ET: "Reduced Equipment Contract demand by 1",
            Target_minus_01_ET: "Reduced Equipment Contract demand by 0.1",
            Target_plus_01_ET: "Increase Equipment Contract demand by 0.1",
            Target_plus_1_ET: "Increase Equipment Contract demand by 1",
            Target_minus_1_QPT: "Reduced Quick Production Contract demand by 1",
            Target_minus_01_QPT: "Reduced Quick Production Contract demand by 0.1",
            Target_plus_01_QPT: "Increase Quick Production Contract demand by 0.1",
            Target_plus_1_QPT: "Increase Quick Production Contract demand by 1",
            Target_minus_1_QRT: "Reduced Quick Restoration Contract demand by 1",
            Target_minus_01_QRT: "Reduced Quick Restoration Contract demand by 0.1",
            Target_plus_01_QRT: "Increase Quick Restoration Contract demand by 0.1",
            Target_plus_1_QRT: "Increase Quick Restoration Contract demand by 1",
            importSaved_importButton: "Import Plan"
        },
        Demand_hour: "Hourly demand",
        Demand_total: "Total demand",
        Timetable_deletePoint: "Delete this point",
        SavedTable_apply: "Apply",
        SavedTable_name: "Plan Name",
        SavedTable_rename: "Rename",
        SavedTable_up: "Move Up",
        SavedTable_down: "Move Down",
        SavedTable_export: "Export Plan",
        SavedTable_delete: "Delete Plan",
        FineTuning_minus: "Reduce demand",
        FineTuning_plus: "Increase demand"
    },
    JS: {
        chapter_start: "Chapter ",
        chapter_end: "",
        number: function number(num) {
            return num;
        },

        Manp: "Mpwr",
        Ammu: "Ammo",
        Rati: "Ration",
        Part: "Parts",
        TPro: "T-Doll",
        Equi: "Eqpt",
        QPro: "QProd",
        QRes: "QRest",
        FineTuningManp: "Manpower",
        FineTuningAmmu: "Ammunition",
        FineTuningRati: "Ration",
        FineTuningPart: "Parts",
        FineTuningTPro: "T-Doll",
        FineTuningEqui: "Equipment",
        FineTuningQPro: "Q-Production",
        FineTuningQRes: "Q-Restoration",
        FineTuningTool: "Fine Tuning Tool",
        TargetValue0_alert: "Demand cannot all be 0!",
        tab_Anytime_alert1: "Total time cannot be 0!",
        tab_Timetable_alert1: "Cannot add deployment time point at the beginning",
        tab_Timetable_alert2: "The deployment time point added cannot exceed the total time",
        tab_Timetable_alert3: "Already added this time point",
        tab_Timetable_alert4: "Total time cannot be 0!",
        Mission: "Missions",
        MinIntervalTime: "Min Intvl",
        NoPlan: "No suitable plan",
        NoMission: "No available missions",
        PlanDetails_calculateMethod: "Mode",
        total_time: "Total time",
        total_greatSuccessRate: "Great Success Rate",
        PerHour: "Hourly",
        Total: "Total",
        ExecutionTimes: "Executions",
        plzInputPlanName: "Please enter the plan name",
        planDefaultName: "Custom",
        deleteSavedWarning_1: "Do you want to delete this configuration named ",
        deleteSavedWarning_2: "?",
        Saved_alert: "There is a problem with the imported data!",
        Saved_alert2: "Too many saved plan, cannot add anymore",
        config_alert: "This operation will overwrite all configurations. Do you want to continue?",
        FailedWindowLoadWarn: "The webpage may crash due to incorrect web storage. You can report the following data to GitHub or send to chantxu@outlook.com"
    },
    CSS: {
        TargetValueSpan_Width: "66px",
        FineTuningButton_Width: "40%"
    }
};
/**
 * @file 一维数组, 二维数组快速排序
 * @see https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F#JavaScript
 */

var Range = function Range() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Range);

    this.start = s;
    this.end = e;
};

/**
 * 对一维数组降序排序, 会改变传入数组
 * @param {Array.<number>} arr
 */


function quick_sort_descending(arr) {
    // r[]模擬堆疊,p為數量,r[p++]為push,r[--p]為pop且取得元素
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) continue;
        var mid = arr[range.end];
        var left = range.start;
        var right = range.end - 1;
        while (left < right) {
            while (arr[left] > mid && left < right) {
                left++;
            }while (arr[right] <= mid && left < right) {
                right--;
            }var _ref = [arr[right], arr[left]];
            arr[left] = _ref[0];
            arr[right] = _ref[1];
        }
        if (arr[left] <= arr[range.end]) {
            ;
            var _ref2 = [arr[range.end], arr[left]];
            arr[left] = _ref2[0];
            arr[range.end] = _ref2[1];
        } else left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

/**
 * 对一维数组升序排序, 会改变传入数组
 * @param {Array.<number>} arr
 */
function quick_sort_ascending(arr) {
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) continue;
        var mid = arr[range.end];
        var left = range.start;
        var right = range.end - 1;
        while (left < right) {
            while (arr[left] < mid && left < right) {
                left++;
            }while (arr[right] >= mid && left < right) {
                right--;
            }var _ref3 = [arr[right], arr[left]];
            arr[left] = _ref3[0];
            arr[right] = _ref3[1];
        }
        if (arr[left] >= arr[range.end]) {
            ;
            var _ref4 = [arr[range.end], arr[left]];
            arr[left] = _ref4[0];
            arr[range.end] = _ref4[1];
        } else left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

/**
 * 对二维数组某一列降序排序, 会改变传入数组
 * @param {Array.<Array>} arr - 需要排序的列必须为number类型
 * @param {number} compare_Column - 需要排序的列
 */
function quick_sort_expand_descending(arr, compare_Column) {
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) continue;
        var mid = arr[range.end][compare_Column];
        var left = range.start;
        var right = range.end - 1;
        while (left < right) {
            while (arr[left][compare_Column] >= mid && left < right) {
                left++;
            }while (arr[right][compare_Column] < mid && left < right) {
                right--;
            }var _ref5 = [arr[right], arr[left]];
            arr[left] = _ref5[0];
            arr[right] = _ref5[1];
        }
        if (arr[left][compare_Column] < arr[range.end][compare_Column]) {
            ;
            var _ref6 = [arr[range.end], arr[left]];
            arr[left] = _ref6[0];
            arr[range.end] = _ref6[1];
        } else left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

/**
 * 对二维数组某一列升序排序, 会改变传入数组
 * @param {Array.<Array>} arr - 需要排序的列必须为number类型
 * @param {number} compare_Column - 需要排序的列
 */
function quick_sort_expand_ascending(arr, compare_Column) {
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) continue;
        var mid = arr[range.end][compare_Column];
        var left = range.start;
        var right = range.end - 1;
        while (left < right) {
            while (arr[left][compare_Column] <= mid && left < right) {
                left++;
            }while (arr[right][compare_Column] > mid && left < right) {
                right--;
            }var _ref7 = [arr[right], arr[left]];
            arr[left] = _ref7[0];
            arr[right] = _ref7[1];
        }
        if (arr[left][compare_Column] > arr[range.end][compare_Column]) {
            ;
            var _ref8 = [arr[range.end], arr[left]];
            arr[left] = _ref8[0];
            arr[range.end] = _ref8[1];
        } else left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}

/**
 * 专门用于对二维数组的关卡名称一列升序排序, 会改变传入数组
 * @param {Array.<Array.<string>>} arr - 关卡列必须为string类型
 * @param {number} Mission_Column - 关卡列
 */
function quick_sort_expand_ascending_missionName(arr, Mission_Column) {
    var r = new Array(arr.length);
    var p = 0;
    r[p++] = new Range(0, arr.length - 1);
    while (p) {
        var range = r[--p];
        if (range.start >= range.end) continue;
        var mid = parseInt(arr[range.end][Mission_Column].replace(/[^0-9]/ig, ""));
        var left = range.start;
        var right = range.end - 1;
        while (left < right) {
            while (parseInt(arr[left][Mission_Column].replace(/[^0-9]/ig, "")) < mid && left < right) {
                left++;
            }while (parseInt(arr[right][Mission_Column].replace(/[^0-9]/ig, "")) >= mid && left < right) {
                right--;
            }var _ref9 = [arr[right], arr[left]];
            arr[left] = _ref9[0];
            arr[right] = _ref9[1];
        }
        if (parseInt(arr[left][Mission_Column].replace(/[^0-9]/ig, "")) >= parseInt(arr[range.end][Mission_Column].replace(/[^0-9]/ig, ""))) {
            ;
            var _ref10 = [arr[range.end], arr[left]];
            arr[left] = _ref10[0];
            arr[range.end] = _ref10[1];
        } else left++;
        r[p++] = new Range(range.start, left - 1);
        r[p++] = new Range(left + 1, range.end);
    }
}
/**
 * 返回字符串最后一个"_"字符后面的内容
 * @param {string} str - 字符串
 * @param {number=} end - End index
 */
function stringSliceFromLast_(str, end) {
    var start = str.lastIndexOf("_");
    if (end === undefined) return str.slice(start + 1);else return str.slice(start + 1, end);
}

/**
 * 适用于非负数
 *
 * 当数大于100, 返回不保留小数.
 * 当数大于10, 返回保留一位小数.
 * 当数小于10, 返回两位小数.
 * @param {number} number
 */
function NumberAutoExact(number) {
    var newNumber = void 0;
    if (number > 100) newNumber = Math.round(number);else if (number > 10) newNumber = Math.round(number * 10) / 10;else newNumber = Math.round(number * 100) / 100;
    return newNumber;
}

/**
 * 将总分钟数转换为HH:mm格式, 没有上限
 * @param {number} Minutes - 总分钟数
 */
function TimeFormat(Minutes) {
    Minutes = Math.round(Minutes);
    var hours = parseInt(Minutes / 60);
    var minutes = Minutes % 60;
    if ((minutes + "").length < 2) minutes = "0" + minutes;
    return hours + ':' + minutes;
}

/**
 * 将总分钟数转换为HH:mm格式, 最大为23:59
 * @param {number} Minutes - 总分钟数
 */
function TimeFormat_Day(Minutes) {
    Minutes = Math.round(Minutes);
    var TotalMinutes = Minutes % 1440;
    return TimeFormat(TotalMinutes);
}

/**
 * 判断x是否为非正数(或0)
 * 
 * 是, 返回false. 否, 返回true
 */
function is_NonPositiveNumberOrInfinity(x) {
    if (x === "" || isNaN(x) || x < 0 || x === "Infinity") return true;else return false;
}

/**
 * 从JQ_selector取得非负数. 如果不为非负数, 返回0, 且由NeedCorrection决定是否修改JQ_selector为0
 * @param {Object} JQ_selector - Jquery选择器
 * @param {boolean=} NeedCorrection - 默认为falsen
 */
function getPositiveValueFromHTML(JQ_selector) {
    var NeedCorrection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var Value = void 0;
    if (is_NonPositiveNumberOrInfinity(JQ_selector.val())) Value = 0;else Value = parseFloat(JQ_selector.val());
    if (NeedCorrection) JQ_selector.val(Value);
    return Value;
}

//移除数组中值为val的所有元素
Array.prototype.remove = function (val) {
    var i = 0;
    while (i < this.length) {
        if (this[i] === val) this.splice(i, 1);else i++;
    }
};

//移除数组中值为val的第一个元素
Array.prototype.remove_First = function (val) {
    var i = 0;
    while (i < this.length) {
        if (this[i] === val) {
            this.splice(i, 1);
            break;
        } else i++;
    }
};

/**
 * 计算数组中的最大值
 * @param {Array.<number>} Arr
 * @returns {number} 数组最大值
 */
function ArrayMax(Arr) {
    var max = 0;
    var Arr_length = Arr.length;
    for (var i = 0; i < Arr_length; i++) {
        max = max > Arr[i] ? max : Arr[i];
    }
    return max;
}

/**
 * 计算数组中的最小值
 * @param {Array.<number>} Arr
 * @returns {number} 数组最小值
 */
function ArrayMin(Arr) {

    var min = Arr[0];
    var Arr_length = Arr.length;
    for (var i = 0; i < Arr_length; i++) {
        min = min < Arr[i] ? min : Arr[i];
    }
    return min;
}

/**
 * sort()方法, 数字按升序排序
 * @param {number} a
 * @param {number} b
 */
function sortNumber(a, b) {
    return a - b;
}

/**
 * sort()方法, 将关卡字符串按升序排序
 * @param {string} a
 * @param {string} b
 */
function sortStringNumber(a, b) {
    var aa = void 0,
        bb = void 0;
    aa = parseInt(a.replace(/[^0-9]/ig, ""));
    bb = parseInt(b.replace(/[^0-9]/ig, ""));
    return aa - bb;
}

/**
 * 判断设备是否是移动设备
 * @return {boolean}
 */
function IsMobile() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "KFAPWI"];
    var flag = false;
    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) !== -1) {
            flag = true;
            break;
        }
    }
    return flag;
}

//重写console方法, 获取控制台信息
var CONSOLE = "";
if (console) {
    var _console = {
        log: console.log,
        info: console.info,
        debug: console.debug,
        warn: console.warn,
        error: console.error
    };
    console.log = function (data) {
        var date = new Date();
        var CONSOLE_ = date.toLocaleString() + " log: " + JSON.stringify(data) + "\n";
        CONSOLE = CONSOLE + CONSOLE_;
        CONSOLE = limitCONSOLELength(CONSOLE);
        try {
            CONSOLE_ = sessionStorage.getItem("GF_Logistics_console") + CONSOLE_;
            CONSOLE_ = limitCONSOLELength(CONSOLE_);
            sessionStorage.setItem("GF_Logistics_console", CONSOLE_);
        } catch (ex) {}
        _console.log.apply(this, Array.prototype.slice.call(arguments, 0));
    };
    console.warn = function (a) {
        var date = new Date();
        var CONSOLE_ = date.toLocaleString() + " warn: " + JSON.stringify(data) + "\n";
        CONSOLE = CONSOLE + CONSOLE_;
        CONSOLE = limitCONSOLELength(CONSOLE);
        try {
            CONSOLE_ = sessionStorage.getItem("GF_Logistics_console") + CONSOLE_;
            CONSOLE_ = limitCONSOLELength(CONSOLE_);
            sessionStorage.setItem("GF_Logistics_console", CONSOLE_);
        } catch (ex) {}
        _console.warn.apply(this, Array.prototype.slice.call(arguments, 0));
    };
    console.error = function (a) {
        var date = new Date();
        var CONSOLE_ = date.toLocaleString() + " error: " + JSON.stringify(a) + "\n";
        CONSOLE = CONSOLE + CONSOLE_;
        CONSOLE = limitCONSOLELength(CONSOLE);
        try {
            CONSOLE_ = sessionStorage.getItem("GF_Logistics_console") + CONSOLE_;
            CONSOLE_ = limitCONSOLELength(CONSOLE_);
            sessionStorage.setItem("GF_Logistics_console", CONSOLE_);
        } catch (ex) {}
        _console.error.apply(this, Array.prototype.slice.call(arguments, 0));
    };
}
/**限制CONSOLE长度 */
function limitCONSOLELength(console_string) {
    var maxLength = 10000;
    var length = console_string.length;
    if (length > maxLength) return console_string.slice(length - maxLength);else return console_string;
}

function error() {
    var a = 0;
    return a.getItem();
}
/**
 * 0后勤战役编号-1人力-2弹药-3口粮-4零件-5人形-6装备-7快建-8快修-9时间(minute)
 * 
 * 0The Logistics Support Number-1Manpower-2Ammunition-3Ratins-4Parts-5T_Doll Production Contract-
 * 6Equipment Development Contract-7Quick Production Contract-8Quick Restoration Contract-9Time(minute)
 * 
 * 由于契约不同于资源的大成功概率计算. 在Q中, 暂时未填入契约的值, 专门使用setQContract()函数来计算契约值
 * @type {Array.<[string, number, number, number, number, number, number, number, number, number]>}
 */
var Q = [["0-1", 0, 145, 145, 0, 0, 0, 0, 0, 50], ["0-2", 550, 0, 0, 350, 0, 0, 0, 0, 180], ["0-3", 900, 900, 900, 250, 0, 0, 0, 0, 720], ["0-4", 0, 1200, 800, 750, 0, 0, 0, 0, 1440], ["1-1", 10, 30, 15, 0, 0, 0, 0, 0, 15], ["1-2", 0, 40, 60, 0, 0, 0, 0, 0, 30], ["1-3", 30, 0, 30, 10, 0, 0, 0, 0, 60], ["1-4", 160, 160, 0, 0, 0, 0, 0, 0, 120], ["2-1", 100, 0, 0, 30, 0, 0, 0, 0, 40], ["2-2", 60, 200, 80, 0, 0, 0, 0, 0, 90], ["2-3", 10, 10, 10, 230, 0, 0, 0, 0, 240], ["2-4", 0, 250, 600, 60, 0, 0, 0, 0, 360], ["3-1", 50, 0, 75, 0, 0, 0, 0, 0, 20], ["3-2", 0, 120, 70, 30, 0, 0, 0, 0, 45], ["3-3", 0, 300, 0, 0, 0, 0, 0, 0, 90], ["3-4", 0, 0, 300, 300, 0, 0, 0, 0, 300], ["4-1", 0, 185, 185, 0, 0, 0, 0, 0, 60], ["4-2", 0, 0, 0, 210, 0, 0, 0, 0, 120], ["4-3", 800, 550, 0, 0, 0, 0, 0, 0, 360], ["4-4", 400, 400, 400, 150, 0, 0, 0, 0, 480], ["5-1", 0, 0, 100, 45, 0, 0, 0, 0, 30], ["5-2", 0, 600, 300, 0, 0, 0, 0, 0, 150], ["5-3", 800, 400, 400, 0, 0, 0, 0, 0, 240], ["5-4", 100, 0, 0, 700, 0, 0, 0, 0, 420], ["6-1", 300, 300, 0, 100, 0, 0, 0, 0, 120], ["6-2", 0, 200, 550, 100, 0, 0, 0, 0, 180], ["6-3", 0, 0, 200, 500, 0, 0, 0, 0, 300], ["6-4", 800, 800, 800, 0, 0, 0, 0, 0, 720], ["7-1", 650, 0, 650, 0, 0, 0, 0, 0, 150], ["7-2", 0, 650, 0, 300, 0, 0, 0, 0, 240], ["7-3", 900, 600, 600, 0, 0, 0, 0, 0, 330], ["7-4", 250, 250, 250, 600, 0, 0, 0, 0, 480], ["8-1", 150, 150, 150, 0, 0, 0, 0, 0, 60], ["8-2", 0, 0, 0, 450, 0, 0, 0, 0, 180], ["8-3", 400, 800, 800, 0, 0, 0, 0, 0, 360], ["8-4", 1500, 400, 400, 100, 0, 0, 0, 0, 540], ["9-1", 0, 0, 100, 50, 0, 0, 0, 0, 30], ["9-2", 180, 0, 180, 100, 0, 0, 0, 0, 90], ["9-3", 750, 750, 0, 0, 0, 0, 0, 0, 270], ["9-4", 500, 900, 900, 0, 0, 0, 0, 0, 420], ["10-1", 140, 200, 0, 0, 0, 0, 0, 0, 40], ["10-2", 0, 240, 180, 0, 0, 0, 0, 0, 100], ["10-3", 0, 480, 480, 300, 0, 0, 0, 0, 320], ["10-4", 660, 660, 660, 330, 0, 0, 0, 0, 600], ["11-1", 350, 1050, 0, 0, 0, 0, 0, 0, 240], ["11-2", 360, 540, 540, 0, 0, 0, 0, 0, 240], ["11-3", 0, 750, 1500, 250, 0, 0, 0, 0, 480], ["11-4", 0, 1650, 0, 900, 0, 0, 0, 0, 600], ["12-1", 0, 220, 220, 0, 0, 0, 0, 0, 60], ["12-2", 360, 0, 0, 120, 0, 0, 0, 0, 90], ["12-3", 800, 1200, 1200, 0, 0, 0, 0, 0, 540], ["12-4", 1800, 0, 1800, 0, 0, 0, 0, 0, 720]];

/**
 * 计算后勤契约值
 * @param {number} TotalGreatSuccessRate - 总计大成功概率(单位%)
 * @example setQContract(60)
 */
function setQContract(TotalGreatSuccessRate) {
    var TotalRate = TotalGreatSuccessRate / 100;

    //人形契约 T-Doll Production Contract
    Q[1][5] = calculateContractValue(50, 50, TotalRate); //0-2
    Q[7][5] = calculateContractValue(20, 20, TotalRate); //1-4
    Q[11][5] = calculateContractValue(80, 80, TotalRate); //2-4
    Q[15][5] = calculateContractValue(40, 80, TotalRate); //???//3-4
    Q[18][5] = 0.7; //4-3
    Q[23][5] = calculateContractValue(40, 40, TotalRate); //5-4
    Q[29][5] = 0.6; //7-2
    Q[35][5] = calculateContractValue(90, 90, TotalRate); //???//8-4
    Q[38][5] = calculateContractValue(70, 70, TotalRate); //???//9-3
    Q[41][5] = 0.75; //10-2
    Q[44][5] = 8 / 16; //???//11-1
    Q[45][5] = 12 / 12; //???//11-2
    Q[51][5] = 12 / 12; //???//12-4

    //装备契约 Equipment Development Contract
    Q[2][6] = calculateContractValue(40, 80, TotalRate); //0-3
    Q[15][6] = calculateContractValue(40, 80, TotalRate); //???//3-4
    Q[16][6] = calculateContractValue(20, 20, TotalRate); //4-1
    Q[22][6] = calculateContractValue(50, 50, TotalRate); //5-3
    Q[26][6] = calculateContractValue(60, 60, TotalRate); //6-3
    Q[30][6] = calculateContractValue(70, 70, TotalRate); //7-3
    Q[32][6] = calculateContractValue(40, 40, TotalRate); //8-1
    Q[39][6] = 1; //9-4
    Q[43][6] = calculateContractValue(50, 50, TotalRate); //???//10-4 (12 / 10) 60%
    Q[44][6] = 8 / 16; //???//11-1
    Q[48][6] = calculateContractValue(60, 60, TotalRate); //12-1 (42 / 7) 60%GreatSuccessRate

    //快建 Quick Production Contract
    Q[0][7] = calculateContractValue(20, 70, TotalRate); //0-1
    Q[10][7] = 0.5; //2-3
    Q[14][7] = calculateContractValue(40, 85, TotalRate); //3-3
    Q[17][7] = calculateContractValue(50, 50, TotalRate); //4-2
    Q[19][7] = 1; //4-4
    Q[25][7] = calculateContractValue(20, 70, TotalRate); //???//6-2
    Q[31][7] = calculateContractValue(80, 80, TotalRate); //???//7-4
    Q[34][7] = calculateContractValue(60, 90, TotalRate); //???//8-3
    Q[37][7] = calculateContractValue(25, 25, TotalRate); //9-2
    Q[41][7] = 0.25; //10-2
    Q[42][7] = calculateContractValue(30, 80, TotalRate); //???//10-3
    Q[47][7] = 1; //???//11-4
    Q[50][7] = 12 / 12; //???//12-3

    //快修 Quick Restoration Contract
    Q[0][8] = calculateContractValue(50, 70, TotalRate); //0-1
    Q[2][8] = calculateContractValue(40, 80, TotalRate); //0-3
    Q[6][8] = calculateContractValue(60, 60, TotalRate); //1-3
    Q[9][8] = calculateContractValue(30, 30, TotalRate); //2-2
    Q[10][8] = 0.5; //2-3
    Q[14][8] = calculateContractValue(45, 85, TotalRate); //3-3
    Q[18][8] = 0.3; //4-3
    Q[21][8] = calculateContractValue(80, 80, TotalRate); //5-2
    Q[25][8] = calculateContractValue(50, 70, TotalRate); //6-2
    Q[29][8] = 0.4; //7-2
    Q[33][8] = calculateContractValue(80, 80, TotalRate); //8-2
    Q[34][8] = calculateContractValue(30, 90, TotalRate); //???//8-3
    Q[42][8] = calculateContractValue(50, 80, TotalRate); //???//10-3
    Q[46][8] = calculateContractValue(50, 50, TotalRate); //???//11-3 (10 / 7) 60%
}
/**
 * 根据概率计算单次后勤获得的契约值
 * @param {number} BaseValue - 在0%大成功概率时获取该契约的概率(单位 %, 0~100)
 * @param {number} SumValue - 该后勤能获得的所有契约的BaseValue之和(单位 %, 0~100)
 * @param {number} TotalRate - 目前的总大成功概率(0~1)
 * @return {number} 进行一次后勤获得的契约数量
 * @example calculateContractValue(50, 100, 0.6)
 */
function calculateContractValue(BaseValue, SumValue, TotalRate) {
    return BaseValue / 100 + (BaseValue / SumValue - BaseValue / 100) * TotalRate;
}
/**版本 */
var VERSION = "1.0.0-alpha";

/**
 * 用于判断浏览器是否能使用storage
 * 
 * 在window.onload初始化, 之后将不再改变
 * @type {boolean}
 */
var CAN_STORAGE_WORK = void 0;

/**
 * localstorage存储使用的key
 * @example GF_Logistics_v1.x.x
 */
var LOCAL_STORAGE_KEY = "GF_Logistics_v" + VERSION.slice(0, VERSION.indexOf(".")) + ".x.x";

/**
 * 在window.onload使用, 设置CAN_LOCALSTORAGE_WORK, 
 * 并且在HTML页面上显示信息
 */
function checkLocalStorageWork() {
    CAN_STORAGE_WORK = _localStorageWorks() && _sessionStorageWorks();
    if (CAN_STORAGE_WORK !== true) {
        CAN_STORAGE_WORK = false;
        document.getElementById("localstorageWarning").style.display = "none";
        document.getElementById("neverShowAgain_description").style.display = "none";
    } else {
        document.getElementById("localstorageDoesNotWork").style.display = "none";
        if (sessionStorage.getItem("GF_Logistics_windowOnload") === "failed") removeStorageAndWarnDueToFailedWindowLoad();
        sessionStorage.setItem("GF_Logistics_windowOnload", "failed");
    }
}
/**判断浏览器是否能使用local storage */
function _localStorageWorks() {
    try {
        var Random1 = Math.random();
        var Random2 = Math.random();
        localStorage.setItem("test_PzrJwG" + Random1, "Rx3IyFdmJMji0Alo" + Random2);
        var result = localStorage.getItem("test_PzrJwG" + Random1) == "Rx3IyFdmJMji0Alo" + Random2;
        localStorage.removeItem("test_PzrJwG" + Random1);
        return result;
    } catch (ex) {
        return false;
    }
}
/**判断浏览器是否能使用session storage */
function _sessionStorageWorks() {
    try {
        var Random1 = Math.random();
        var Random2 = Math.random();
        sessionStorage.setItem("test_QQ15L2X" + Random1, "MVQYqpFNO8WU6Flc" + Random2);
        var result = sessionStorage.getItem("test_QQ15L2X" + Random1) == "MVQYqpFNO8WU6Flc" + Random2;
        sessionStorage.removeItem("test_QQ15L2X" + Random1);
        return result;
    } catch (ex) {
        return false;
    }
}

function removeStorageAndWarnDueToFailedWindowLoad() {
    var storage_v1 = localStorage.getItem(LOCAL_STORAGE_KEY);
    var storage_v0 = localStorage.getItem("GF_Logistics");
    var data = {};
    data.userAgent = navigator.userAgent;
    data.appName = navigator.appName;
    data.appCodeName = navigator.appCodeName;
    data.appVersion = navigator.appVersion;
    data.appMinorVersion = navigator.appMinorVersion;
    data.platform = navigator.platform;
    data.cookieEnabled = navigator.cookieEnabled;
    data.onLine = navigator.onLine;
    data.language = navigator.language;
    data.localStorage_v0 = storage_v0;
    data.localStorage_v1 = storage_v1;
    data.console = sessionStorage.getItem("GF_Logistics_console");

    var warn = "<div class=\"alert alert-danger\" style=\"color:#000000; cursor: default;\">";
    warn += language_zh_CN.JS.FailedWindowLoadWarn + "<br>";
    warn += language_zh_TW.JS.FailedWindowLoadWarn + "<br>";
    warn += language_en.JS.FailedWindowLoadWarn + "<br>";
    warn += "<br><code style=\"color:#000000; cursor:auto\">";
    warn += JSON.stringify(data);
    warn += "</code></div>";
    $("#description").before(warn);

    //删除所有可能相关的localstorage
    sessionStorage.removeItem("GF_Logistics_windowOnload");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem("GF_Logistics");
}

/**
 * 如果不存在目前版本对应的localstorage, 
 * 尝试从以前版本的localstorage转换过来
 */
function updateLocalStorage() {
    if (!CAN_STORAGE_WORK) return;
    var LS_data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (LS_data === null) {
        _updateLSFrom_v_0_x_x_To_v_1_x_x();
    }
}

/**
 * 从v0.x.x版本localstorage转换为v1.x.x版本, 并删除原来的存储数据
 */
function _updateLSFrom_v_0_x_x_To_v_1_x_x() {
    var LS_Key = "GF_Logistics";
    var LS_data = localStorage.getItem(LS_Key);
    if (LS_data === null) return;
    try {
        var _data = JSON.parse(LS_data);
        LS_data = _data;
    } catch (ex) {
        console.error("v0storage, storage: " + LS_data);
        LS_data = {};
    }

    var newData = {};
    newData.Lang = LS_data.lang;
    newData.Description_Display = LS_data.Description_Display;
    newData.LocalstorageWarning_Display = LS_data.LocalstorageWarning_Display;
    newData.TabName = LS_data.HTML_TAB;
    newData.HourlyOrTotal = LS_data.PerHourOrTotal;
    newData.TabAnytimeCustom = LS_data.TabAnytimeCustom;
    newData.TabTimetableCustom = LS_data.TabTimetableCustom;
    newData.GreatSuccessRate = LS_data.GreatSuccessRate;
    newData.Is_GreatSuccessRateUP = LS_data.is_GreatSuccessRateUP;
    newData.ChapterLimit = LS_data.SelectChapter;
    newData.ContractWeight = LS_data.ContractWeight;
    newData.TargetValue = LS_data.TargetValue;
    newData.Saved = _savedData_v_0_x_x_To_v_1_x_x(LS_data.SAVED);
    newData.IsSavedPanelShow = LS_data.IsSavedShow;
    newData.CalcTargetValueTool_Target = LS_data.CalcTargetValueTool_Target;
    newData.CalcTargetValueTool_Current = LS_data.CalcTargetValueTool_Current;
    newData.CalcTargetValueTool_ExecutionTimes = LS_data.CalcTargetValueTool_ExecutionTimes;
    var storageValue = JSON.stringify(newData);

    localStorage.setItem("GF_Logistics_v1.x.x", storageValue);
    localStorage.removeItem(LS_Key);
}
/**
 * 将v0版本saved数转换成v1版本的saved数据
 * @param {Array} v_0_x_x_savedData - v0.x.x版本的saved数据
 * @returns {Saved._saved} v1.x.x版本的saved数据
 */
function _savedData_v_0_x_x_To_v_1_x_x() {
    var v_0_x_x_savedData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var v_1_x_x_savedDate = [];
    for (var i = 0; i < v_0_x_x_savedData.length; i++) {
        var _data2 = v_0_x_x_savedData[i].data;
        var newData = {};
        newData.name = _data2[0];
        newData.TabName = _data2[1];
        newData.GSRate = _data2[2];
        newData.is_UP = _data2[3];
        newData.Chapter = _data2[4];
        newData.TabCustom = _data2[5];
        newData.Missions = _data2[6];
        newData.startTime = _data2[7];

        v_1_x_x_savedDate.push(newData);
    }
    return v_1_x_x_savedDate;
}

/**
 * 向localstorage存入数据, 不用考虑localstorage是否能工作
 * @param {string} Key - 存储名称
 * @param {*} Value - 存储数据
 */
function storageSetItem(Key, Value) {
    if (CAN_STORAGE_WORK) {
        var storageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
        try {
            var _Value = JSON.parse(storageValue);
            storageValue = _Value;
        } catch (ex) {
            console.error("storageGetItem, storage: " + storageValue);
            storageValue = {};
        }
        if (storageValue === null) storageValue = {};
        storageValue[Key] = Value;
        storageValue.version = VERSION;
        storageValue = JSON.stringify(storageValue);
        localStorage.setItem(LOCAL_STORAGE_KEY, storageValue);
    }
}

/**
 * 向localstorage取出数据
 * @param {string} Key - 存储名称
 * @returns {*} 存储数据, 若无数据则返回"noStorage"
 */
function storageGetItem(Key) {
    if (CAN_STORAGE_WORK) {
        var storageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storageValue === null) return "noStorage";else {
            try {
                var _Value2 = JSON.parse(storageValue);
                storageValue = _Value2;
            } catch (ex) {
                console.error("storageGetItem, storage: " + storageValue);
                storageValue = {};
            }
            var Value = storageValue[Key];
            if (Value === undefined) return "noStorage";else return Value;
        }
    } else return "noStorage";
}
/**
 * 时间表数组, 不包括0和结束时间
 * @type {Array.<number>} 
 */
var Tab_Timetable_TIMELIST = [];

/**
 * 由于改变总时间改变时间表的总时间提示
 */
function Tab_Timetable_changeSliderTotalTime() {
    var TotalTime = Input_getTimetableTotalTime();
    if (TotalTime > 4320) {
        TotalTime = 4320;
        Input_setTimetableTotalTime(4320);
    }
    document.getElementById('Tab_Timetable_range_tooltip_0_value').innerHTML = TimeFormat(TotalTime);
    MissionsDetails.print();
    printPlanDetails();
}

/**
 * 添加一个时间点
 * @param {number} time - 新添加的时间
 */
function Tab_Timetable_AddNewTimePoint(time) {
    //将此时间点添加进数组
    Tab_Timetable_TIMELIST.push(time);
    quick_sort_ascending(Tab_Timetable_TIMELIST);

    var maxTime = Input_getTimetableTotalTime();
    var timeList_length = Tab_Timetable_TIMELIST.length;

    var index = Tab_Timetable_TIMELIST.indexOf(time);
    //若在最后面添加时间点, 则直接添加
    //否则由于要考虑提示位置需要改变之后点的提示位置, 全部重新设置
    if (index === timeList_length - 1) {
        var position = time / maxTime * 100 + '%';
        var newPointHTML = _Tab_Timetable_getNewThumb(time, position);
        newPointHTML += _Tab_Timetable_getNewTooltip(time, position, index);
        $("#Tab_Timetable_range").append(newPointHTML);
    } else {
        var TimetableRange_HTML = _Tab_Timetable_getSliderAndAllPointsHTML(maxTime, Tab_Timetable_TIMELIST);
        document.getElementById("Tab_Timetable_range").innerHTML = TimetableRange_HTML;
    }
}

/**
 * 重新设置全部时间表
 * @param {Array.<number>} timeList - 新的时间表
 */
function Tab_Timetable_setTimePoints(timeList) {
    Tab_Timetable_TIMELIST = timeList;
    if (timeList.length === 0) Tab_Timetable_InputTotalTime_enable();else Tab_Timetable_InputTotalTime_disable();

    var maxTime = Input_getTimetableTotalTime();
    var TimetableRange_HTML = _Tab_Timetable_getSliderAndAllPointsHTML(maxTime, timeList);
    document.getElementById("Tab_Timetable_range").innerHTML = TimetableRange_HTML;
}

/**
 * 获得时间表slider的原始HTML
 * @param {number} totalTime - 后勤总时间
 */
function _Tab_Timetable_getSliderHTML(totalTime) {
    var sliderHTML = '<div inverse-left style="width:70%;"></div><div inverse-right style="width:70%;"></div><div range style="left:0%;right:0%; background-color:#CCC;"></div>';
    sliderHTML += '<span thumb id="Tab_Timetable_range_thumb"style="left:100%; background-color:rgb(221, 155, 155); cursor:default;"></span>';
    sliderHTML += '<div id="Tab_Timetable_range_tooltip"class="tooltip right custom-tooltip"style="right: -72px; top:-15px; cursor: default;">';
    sliderHTML += '<div class="tooltip-arrow"></div><div id="Tab_Timetable_range_tooltip_0_value"class="tooltip-inner">';
    sliderHTML += TimeFormat(totalTime) + '</div></div>';
    return sliderHTML;
}

/**
 * 获取时间表slider和所有时间点HTML
 * @param {number} totalTime - 后勤总时间
 * @param {Array.<number>} timeList - 时间表
 */
function _Tab_Timetable_getSliderAndAllPointsHTML(totalTime, timeList) {
    var HTML = _Tab_Timetable_getSliderHTML(totalTime);
    var timeList_length = timeList.length;
    for (var i = 0; i < timeList_length; i++) {
        var position = timeList[i] / totalTime * 100 + '%';
        var pointHTML = _Tab_Timetable_getNewThumb(timeList[i], position);
        pointHTML += _Tab_Timetable_getNewTooltip(timeList[i], position, i);
        HTML += pointHTML;
    }
    return HTML;
}

/**
 * 返回点的HTML
 * @param {number} time - 时间
 * @param {string} position - 时间点的位置(%), 如60%
 */
function _Tab_Timetable_getNewThumb(time, position) {
    var HTML = '<button class="slider-button" id="Tab_Timetable_range_thumb_' + time + '"';
    HTML += 'style="left:' + position + ';" title="' + language.HTMLJS.Timetable_deletePoint + '">';
    HTML += '<span class="glyphicon glyphicon-remove-circle" style="font-size: 22px;"></span></button>';
    return HTML;
}

/**
 * 返回点的提示的HTML, 由该时间在总时间的索引来判断提示在上还是在下
 * @param {number} time - 时间
 * @param {string} position - 时间点的位置(%), 如60%
 * @param {number} pointIndex - 该时间在总时间表的索引
 */
function _Tab_Timetable_getNewTooltip(time, position, pointIndex) {
    var HTML = '<div id="Tab_Timetable_range_tooltip_' + time + '"';
    if (pointIndex % 2 === 0) HTML += 'class="slider-Tooltip-top tooltip top custom-tooltip"';else HTML += 'class="slider-Tooltip-bottom tooltip bottom custom-tooltip"';
    HTML += 'style="left:' + position + ';">';
    HTML += '<div class="tooltip-arrow"></div><div class="tooltip-inner">';
    HTML += TimeFormat(time) + '</div></div>';
    return HTML;
}

/**
 * 删除一个时间点
 * @param {number} time - 要删除的时间
 */
function Tab_Timetable_DeleteThisTimePoint(time) {
    var index = Tab_Timetable_TIMELIST.indexOf(time);
    //如果删除最后一个时间点, 则直接删除
    //否则要考虑在此之后的时间点的提示位置, 需要重新设置时间表
    if (index === Tab_Timetable_TIMELIST.length - 1) {
        var thumb_id = "Tab_Timetable_range_thumb_" + time;
        var tooltip_id = "Tab_Timetable_range_tooltip_" + time;
        var thumb_obj = document.getElementById(thumb_id);
        var tooltip_obj = document.getElementById(tooltip_id);
        var parent_obj = document.getElementById('Tab_Timetable_range');
        parent_obj.removeChild(thumb_obj);
        parent_obj.removeChild(tooltip_obj);
        Tab_Timetable_TIMELIST.remove_First(time);
    } else {
        Tab_Timetable_TIMELIST.remove_First(time);
        Tab_Timetable_setTimePoints(Tab_Timetable_TIMELIST);
    }
    if (Tab_Timetable_TIMELIST.length === 0) Tab_Timetable_InputTotalTime_enable();
}

/**
 * 删除全部时间点
 */
function Tab_Timetable_DeleteAllTimePoint() {
    if (Tab_Timetable_TIMELIST.length === 0) return;
    Tab_Timetable_TIMELIST = [];
    var maxTime = Input_getTimetableTotalTime();
    var TimetableRange_HTML = _Tab_Timetable_getSliderHTML(maxTime);
    document.getElementById("Tab_Timetable_range").innerHTML = TimetableRange_HTML;
    Tab_Timetable_InputTotalTime_enable();
}

/**
 * 启用总时间输入
 */
function Tab_Timetable_InputTotalTime_enable() {
    $("#Time_Timetable_hours").removeAttr("disabled");
    $("#Time_Timetable_minutes").removeAttr("disabled");
}

/**
 * 在存在时间点时禁用总时间输入.
 */
function Tab_Timetable_InputTotalTime_disable() {
    $("#Time_Timetable_hours").attr('disabled', "true");
    $("#Time_Timetable_minutes").attr('disabled', "true");
}
function is_CalculateByHour() {
    return !!document.getElementById('Display_PerHour').checked;
}

/** @returns {number} */
function Input_getGreatSuccessRate() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var Rate_elem = $("#GreatSuccessRate");
    var Rate = Rate_elem.val();
    if (is_NonPositiveNumberOrInfinity(Rate) || Rate < 15) Rate = 15;else if (Rate > 69) Rate = 69;else Rate = Math.round(Rate);
    if (NeedCorrection) Rate_elem.val(Rate);
    return Rate;
}

/** @param {number} Rate - 大成功基础概率 */
function Input_setGreatSuccessRate(Rate) {
    $("#GreatSuccessRate").val(Rate);
    setQContract(Input_getTotalGreatSuccessRate());
    storageSetItem("GreatSuccessRate", Rate);
}

function IsGreatSuccessRateUp() {
    return !!document.getElementById('GreatSuccessRateUp').checked;
}

/**
 * 根据基础大成功概率返回增加的概率, 必须为整数
 * @param {number} Index_BaseRate - 基础大成功概率
 * @returns {string} 增加的概率
 */
function _getGreatSuccessUpRate(Index_BaseRate) {
    /**当基础后勤大成功概率为i时, 增加的概率为第i个元素 */
    var Array_GreatSuccessRate = ["15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15", "15 / 16", "15 / 16", "16", "16", "16 / 17", "17", "17 / 18", "17 / 18", "17 / 18", "18 / 19", "18 / 19", "19", "19", "19 / 20", "20", "20 / 21", "20 / 21", "20 / 21", "21 / 22", "21 / 22", "22", "22", "22 / 23", "23", "23 / 24", "23 / 24", "23 / 24", "24 / 25", "24 / 25", "25", "25", "25 / 26", "26", "26 / 27", "26 / 27", "26 / 27", "27 / 28", "27 / 28", "28", "28", "28 / 29", "29", "29 / 30", "29 / 30", "29 / 30", "30 / 31", "30 / 31", "31", "31", "31 / 21", "32", "32 / 33", "32 / 33", "32", "31"];
    return Array_GreatSuccessRate[Index_BaseRate];
}

/** @param {number} GreatSuccessRate - 大成功基础概率 */
function Input_getGreatSuccessUpRate(GreatSuccessRate) {
    if (IsGreatSuccessRateUp()) return parseInt(_getGreatSuccessUpRate(GreatSuccessRate).substr(0, 2));else return 0;
}

function Input_getTotalGreatSuccessRate() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var BaseRate = Input_getGreatSuccessRate(NeedCorrection);
    var UpRate = Input_getGreatSuccessUpRate(BaseRate);
    return BaseRate + UpRate;
}

/** @param {boolean} is_RateUP - 是否大成功概率提升 */
function Input_setGreatSuccessUpRate(is_RateUP) {
    var NeedCorrectBaseRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var checkbox_elem = document.getElementById("GreatSuccessRateUp");
    var UpRateText_elem = document.getElementById("Display_UPRate");
    if (is_RateUP === false) {
        checkbox_elem.checked = false;
        UpRateText_elem.innerHTML = "";
    } else {
        checkbox_elem.checked = true;
        var BaseRate = Input_getGreatSuccessRate(NeedCorrectBaseRate);
        UpRateText_elem.innerHTML = "+" + _getGreatSuccessUpRate(BaseRate);
    }
    setQContract(Input_getTotalGreatSuccessRate());
    storageSetItem("Is_GreatSuccessRateUP", is_RateUP);
}

/**
 * 返回目标值(需求量), NeedCorrection 默认为true 
 * @param {*} Target_JQ_selector - Target的jQuery选择器, 也可以是选择器数组
 */
function Input_getTarget_Correct() {
    var Target_JQ_selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QPT"), $("#QRT")];
    var NeedCorrection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (Array.isArray(Target_JQ_selector)) return _getValue_Arr(Target_JQ_selector, NeedCorrection);else return getPositiveValueFromHTML(Target_JQ_selector, NeedCorrection);
}
/**
 * @param {Array} Target_JQ_selector_Arr - jQuery选择器数组
 * @param {boolean} NeedCorrection - 是否需要修正
 */
function _getValue_Arr(Target_JQ_selector_Arr, NeedCorrection) {
    var TargetValue_Arr = [];
    for (var i = 0; i < Target_JQ_selector_Arr.length; i++) {
        TargetValue_Arr.push(getPositiveValueFromHTML(Target_JQ_selector_Arr[i], NeedCorrection));
    }
    return TargetValue_Arr;
}

/**
 * 
 * @param {number|Array.<number>} TargetValue
 * @param {*} Target_JQ_selector - Target的jQuery选择器, 也可以是选择器数组
 */
function Input_setTarget() {
    var TargetValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0, 0, 0, 0, 0, 0, 0];
    var Target_JQ_selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [$("#MT"), $("#AT"), $("#RT"), $("#PT"), $("#TT"), $("#ET"), $("#QPT"), $("#QRT")];

    if (Array.isArray(TargetValue)) _setTarget_arr(TargetValue, Target_JQ_selector);else _setTarget_one(TargetValue, Target_JQ_selector);
    storageSetItem("TargetValue", Input_getTarget_Correct());
}
/**
 * 
 * @param {Array.<number>} TargetValue_Arr
 * @param {Array} Target_JQ_selector_Arr - jQuery选择器数组
 */
function _setTarget_arr(TargetValue_Arr, Target_JQ_selector_Arr) {
    for (var i = 0; i < TargetValue_Arr.length; i++) {
        _setTarget_one(TargetValue_Arr[i], Target_JQ_selector_Arr[i]);
    }
}
/** @param {number} TargetValue */
function _setTarget_one(TargetValue, Target_JQ_selector) {
    if (TargetValue < 0) Target_JQ_selector.val(0);else Target_JQ_selector.val(Math.round(TargetValue * 100) / 100);
}

function Input_getContractWeight() {
    return parseInt($('#ContractWeight').val());
}

function Input_setContractWeight() {
    var ContractWeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

    $("#ContractWeight").val(ContractWeight);
    var ContractWeight_Corrected = Input_getContractWeight();
    document.getElementById("ContractWeight_range").style.right = 100 - ContractWeight_Corrected + "%";
    document.getElementById("ContractWeight_thumb").style.left = ContractWeight_Corrected + "%";
    storageSetItem("ContractWeight", ContractWeight_Corrected);
}

function Input_getSelectChapter() {
    return parseInt($("#ChapterLimit").val());
}

function Input_setSelectChapter() {
    var ChapterValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Q.length / 4 - 1;

    $("#ChapterLimit").val(ChapterValue);
    var Chapter = $("#ChapterLimit").val();
    if (Chapter === null) $("#ChapterLimit").val(Q.length / 4 - 1);
    storageSetItem("ChapterLimit", Input_getSelectChapter());
}

//Anytime---------
function Input_getAnytimeHours() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    return getPositiveValueFromHTML($("#Time_Anytime_hours"), NeedCorrection);
}
function Input_getAnytimeMinutes() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    return getPositiveValueFromHTML($("#Time_Anytime_minutes"), NeedCorrection);
}
function Input_getAnytimeTotalTime() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var hours = Input_getAnytimeHours(NeedCorrection);
    var minutes = Input_getAnytimeMinutes(NeedCorrection);
    return hours * 60 + minutes;
}

function Input_setAnytimeHours() {
    var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

    $("#Time_Anytime_hours").val(hours);
}
function Input_setAnytimeMinutes() {
    var minutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    $("#Time_Anytime_minutes").val(minutes);
}
function Input_setAnytimeTotalTime() {
    var TotalMinutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 960;

    var hours = parseInt(TotalMinutes / 60);
    var minutes = TotalMinutes % 60;
    Input_setAnytimeHours(hours);
    Input_setAnytimeMinutes(minutes);
}

function Input_getAnytimeMinimumIntervalTime() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    return getPositiveValueFromHTML($("#Tab_Anytime_MinimumIntervalTime_minutes"), NeedCorrection);
}

function Input_setAnytimeMinimumIntervalTime() {
    var MinimumIntervalTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    $("#Tab_Anytime_MinimumIntervalTime_minutes").val(MinimumIntervalTime);
}
//----------------

//Timetable-------
function Input_getTimetableHours() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    return getPositiveValueFromHTML($("#Time_Timetable_hours"), NeedCorrection);
}
function Input_getTimetableMinutes() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    return getPositiveValueFromHTML($("#Time_Timetable_minutes"), NeedCorrection);
}
function Input_getTimetableTotalTime() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var hours = Input_getTimetableHours(NeedCorrection);
    var minutes = Input_getTimetableMinutes(NeedCorrection);
    return hours * 60 + minutes;
}

function Input_setTimetableHours() {
    var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

    $("#Time_Timetable_hours").val(hours);
}
function Input_setTimetableMinutes() {
    var minutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    $("#Time_Timetable_minutes").val(minutes);
}
function Input_setTimetableTotalTime() {
    var TotalMinutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    var NeedDrawing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (NeedDrawing) document.getElementById('Tab_Timetable_range_tooltip_0_value').innerHTML = TimeFormat(TotalMinutes);
    var hours = parseInt(TotalMinutes / 60);
    var minutes = TotalMinutes % 60;
    Input_setTimetableHours(hours);
    Input_setTimetableMinutes(minutes);
}

/**NeedCorrection 默认为true */
function Input_getTimetableNewHours_Correct() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var hours = getPositiveValueFromHTML($("#Tab_Timetable_new_hours"), NeedCorrection);
    if (NeedCorrection) $("#Tab_Timetable_new_hours").val("");
    return hours;
}
/**NeedCorrection 默认为true */
function Input_getTimetableNewMinutes_Correct() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var minutes = getPositiveValueFromHTML($("#Tab_Timetable_new_minutes"), NeedCorrection);
    if (NeedCorrection) $("#Tab_Timetable_new_minutes").val("");
    return minutes;
}
/**NeedCorrection 默认为true */
function Input_getTimetableNewTotalTime_Correct() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var hours = Input_getTimetableNewHours_Correct(NeedCorrection);
    var minutes = Input_getTimetableNewMinutes_Correct(NeedCorrection);
    return hours * 60 + minutes;
}

/** @param {Array.<number>} TimeList */
function Input_setTimetableTimetable(TimeList) {
    // Tab_Timetable_DeleteAllTimePoint();
    Tab_Timetable_setTimePoints(TimeList);
}
//----------------

/**
 * 获取设置后勤开始时间
 * @returns {number} 从零点开始到开始时间的总分钟数
 */
function Input_getStartTime() {
    var startTime = $("#PlanDetails_InputStartTime").val();
    var hours = parseFloat(startTime.substr(0, 2));
    if (isNaN(hours)) return 0;
    var minutes = parseFloat(startTime.substr(3, 2));
    if (isNaN(minutes)) minutes = 0;
    return hours * 60 + minutes;
}

/** @param {number} StartTime - 从零点开始到开始时间的总分钟数 */
function Input_setStartTime() {
    var StartTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var startTimeString = TimeFormat_Day(StartTime);
    if (startTimeString.indexOf(":") !== 2) startTimeString = "0" + startTimeString;
    $("#PlanDetails_InputStartTime").val(startTimeString);
}

/** @returns {number} Number of executions */
function Input_getExecutionTimes() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var Times_elem = $("#PlanDetails_InputExecutionTimes");
    var Times = Times_elem.val();
    if (is_NonPositiveNumberOrInfinity(Times) || Times < 1) Times = 1;else if (Times > 999) Times = 999;else Times = Math.round(Times);
    if (NeedCorrection) Times_elem.val(Times);
    return Times;
}

//calcTargetValueTool-------
function Input_getCalcTargetValueTool_Target() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var Target_JQ_selector = [$("#calcTargetValueTool_Target_Manp"), $("#calcTargetValueTool_Target_Ammu"), $("#calcTargetValueTool_Target_Rati"), $("#calcTargetValueTool_Target_Part"), $("#calcTargetValueTool_Target_TPro"), $("#calcTargetValueTool_Target_Equi"), $("#calcTargetValueTool_Target_QPro"), $("#calcTargetValueTool_Target_QRes")];
    return _getValue_Arr(Target_JQ_selector, NeedCorrection);
}

function Input_setCalcTargetValueTool_Target() {
    var TargetValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0, 0, 0, 0, 0, 0, 0];

    var Target_JQ_selector = [$("#calcTargetValueTool_Target_Manp"), $("#calcTargetValueTool_Target_Ammu"), $("#calcTargetValueTool_Target_Rati"), $("#calcTargetValueTool_Target_Part"), $("#calcTargetValueTool_Target_TPro"), $("#calcTargetValueTool_Target_Equi"), $("#calcTargetValueTool_Target_QPro"), $("#calcTargetValueTool_Target_QRes")];
    _setTarget_arr(TargetValue, Target_JQ_selector);
    storageSetItem("CalcTargetValueTool_Target", Input_getCalcTargetValueTool_Target());
}

function Input_getCalcTargetValueTool_Current() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var Current_JQ_selector = [$("#calcTargetValueTool_Current_Manp"), $("#calcTargetValueTool_Current_Ammu"), $("#calcTargetValueTool_Current_Rati"), $("#calcTargetValueTool_Current_Part"), $("#calcTargetValueTool_Current_TPro"), $("#calcTargetValueTool_Current_Equi"), $("#calcTargetValueTool_Current_QPro"), $("#calcTargetValueTool_Current_QRes")];
    return _getValue_Arr(Current_JQ_selector, NeedCorrection);
}

function Input_setCalcTargetValueTool_Current() {
    var CurrentValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0, 0, 0, 0, 0, 0, 0];

    var Current_JQ_selector = [$("#calcTargetValueTool_Current_Manp"), $("#calcTargetValueTool_Current_Ammu"), $("#calcTargetValueTool_Current_Rati"), $("#calcTargetValueTool_Current_Part"), $("#calcTargetValueTool_Current_TPro"), $("#calcTargetValueTool_Current_Equi"), $("#calcTargetValueTool_Current_QPro"), $("#calcTargetValueTool_Current_QRes")];
    _setTarget_arr(CurrentValue, Current_JQ_selector);
    storageSetItem("CalcTargetValueTool_Current", Input_getCalcTargetValueTool_Current());
}

/** @returns {number} Number of executions */
function Input_getCalcTargetValueTool_InputExecutionTimes() {
    var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var Times_elem = $("#calcTargetValueTool_InputExecutionTimes");
    var Times = Times_elem.val();
    if (is_NonPositiveNumberOrInfinity(Times) || Times < 1) Times = 1;else if (Times > 999) Times = 999;else Times = Math.round(Times);
    if (NeedCorrection) Times_elem.val(Times);
    return Times;
}

function Input_setCalcTargetValueTool_InputExecutionTimes() {
    var ExecutionTimes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var Times_elem = $("#calcTargetValueTool_InputExecutionTimes");
    ExecutionTimes = Math.round(ExecutionTimes);
    Times_elem.val(ExecutionTimes);
    storageSetItem("CalcTargetValueTool_ExecutionTimes", Input_getCalcTargetValueTool_InputExecutionTimes());
}
//--------------------------

var Tab = function () {
    function Tab() {
        _classCallCheck(this, Tab);

        this._title = '<thead><tr style="cursor:pointer;"><th style="width:20%;" colspan="4" tabindex="0" id="resultPlan_Mission">' + language.JS.Mission + '</th>';
        this._titleEnd = '</tr></thead>';
        this._totalTime = 0;

        /**
         * Tab的名称
         * @public
         */
        this.name = "";

        /**
         * 用于getTotalTime()调用, 当计算过TotalTime后将不再计算一遍
         * @private
         */
        this._setTimeFlag = false;

        /**
         * 用于getQValid()调用, 当计算过QValid后将不再重新计算
         * @private
         */
        this._setQValidFlag = false;

        /**
         * 用于getCurrentMax()调用, 当计算过CurrentMax后将不再重新计算
         * @private
         */
        this._setCurrentMaxFlag = false;

        /**
         * 方案(4个关卡)的8项资源契约最大值, 用于归一化
         * @type {Array.<number>}
         * @private
         */
        this._currentValueMax = [];

        /**
         * 根据不同的计算方式计算出各个关卡的资源契约值, 同时根据一些条件排除不要的关卡, 加快计算速度
         * 
         * 0后勤战役编号-1人力-2弹药-3口粮-4零件-5人形-6装备-7快建-8快修-9时间-10收取后勤时间表
         * @type {Array.<[string, number, number, number, number, number, number, number, number, number, Array.<number>]>}
         * @private
         */
        this._QValid = [];
    }

    /**
     * 该页面是否正在显示(展开)?
     * @returns {boolean}
     * @public
     */


    _createClass(Tab, [{
        key: "_setTime",


        /**
         * 设置后勤总时间以及其他时间
         * @param {boolean} NeedCorrection - 是否需要修正page中不恰当的输入
         * @private
         */
        value: function _setTime(NeedCorrection) {
            if (this._setTimeFlag === true) return;
            this._setTimeFlag = true;
        }

        /**
         * 返回后勤总时间, 如果之前已经调用过, 将不会再计算一遍TotalTime, 也不会再修正
         * @param {boolean=} NeedCorrection - 是否需要修正page中不恰当的输入, 默认为true
         * @public
         */

    }, {
        key: "getTotalTime",
        value: function getTotalTime() {
            var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (!this._setTimeFlag) this._setTime(NeedCorrection);
            return this._totalTime;
        }

        /**
         * 设置QValid
         * @param {boolean=} NeedCorrection - 是否需要修正page中不恰当的输入, 默认为true
         * @public
         */

    }, {
        key: "setQValid",
        value: function setQValid() {
            var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (this._setQValidFlag === true) return;
            this._setQValidFlag = true;
        }
        /**
         * 获取需要排除的后勤
         * @return {Array.<number>}
         * @private
         */

    }, {
        key: "_getUnableLogistic",
        value: function _getUnableLogistic() {
            var Unable_0 = this._setUnableLogistic();
            var Unable_1 = this._setUnableLogisticCustomize(Unable_0);
            return Unable_1;
        }
        /**
         * 根据最大解锁的后勤排除后勤
         * @private
         */

    }, {
        key: "_setUnableLogistic",
        value: function _setUnableLogistic() {
            var ChapterLimit = Input_getSelectChapter();

            var index = 4 * (ChapterLimit + 1);
            var UnableNumber = [];
            var Q_MaxIndex = Q.length - 1;
            while (index <= Q_MaxIndex) {
                UnableNumber.push(index++);
            }return UnableNumber;
        }
        /**
         * 排除超时后勤
         * @param {Array.<number>} UnableLogistic - 之前排除的后勤
         * @private
         */

    }, {
        key: "_setUnableLogisticCustomize",
        value: function _setUnableLogisticCustomize(UnableLogistic) {
            for (var i = 0; i < Q.length; i++) {
                if (Q[i][9] > this._totalTime) {
                    if (UnableLogistic.indexOf(i) === -1) {
                        UnableLogistic.push(i);
                    }
                }
            }
            return UnableLogistic;
        }

        /**
         * 返回QValid
         * 
         * 0后勤战役编号-1人力-2弹药-3口粮-4零件-5人形-6装备-7快建-8快修-9时间-10收取后勤时间表
         * @param {boolean} NeedCorrection - 是否需要修正page中不恰当的输入
         * @public
         */

    }, {
        key: "getQValid",
        value: function getQValid(NeedCorrection) {
            if (!this._setQValidFlag === true) this.setQValid(NeedCorrection);
            return this._QValid.slice();
        }

        /**
         * 返回QValid长度
         * @param {boolean} NeedCorrection - 是否需要修正page中不恰当的输入, 默认为false
         * @public
         */

    }, {
        key: "getQValidLength",
        value: function getQValidLength() {
            var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (!this._setQValidFlag === true) this.setQValid(NeedCorrection);
            return this._QValid.length;
        }

        /**
         * 设置各个资源契约的最大值CurrentValue_MAX, 
         * 在此之前需要先设置QValid
         * @private
         */

    }, {
        key: "_setCurrentMax",
        value: function _setCurrentMax() {

            if (this._setCurrentMaxFlag === true) return;
            var currentValueMax = [0, 0, 0, 0, 0, 0, 0, 0];
            var Qvalid_length = this._QValid.length;
            for (var i = 0; i < 8; i++) {
                var CurrentValueMax_0 = new Array(Qvalid_length);
                for (var ii = 0; ii < Qvalid_length; ii++) {
                    CurrentValueMax_0[ii] = this._QValid[ii][i + 1];
                }
                quick_sort_descending(CurrentValueMax_0);
                currentValueMax[i] = CurrentValueMax_0[0] + CurrentValueMax_0[1] + CurrentValueMax_0[2] + CurrentValueMax_0[3];
            }
            this._currentValueMax = currentValueMax;
            this._setCurrentMaxFlag = true;
        }

        /**
         * 获取方案(4个关卡)各个资源契约的最大值
         * @public
         */

    }, {
        key: "getCurrentValueMax",
        value: function getCurrentValueMax() {

            if (!this._setCurrentMaxFlag === true) this._setCurrentMax();
            return this._currentValueMax;
        }

        /**
         * 删除价值低的关卡
         * 
         * 由于关卡太多导致计算缓慢, 可通过关卡价值删去价值低的关卡, 来提高计算速度
         * @param {number} QValid_MaxLength - 最后剩余的总关卡数
         * @param {Array.<number>} targetValue - 目标值
         * @param {Array.<number>=} missionValue - 其他方法计算的关卡价值
         * @public
         */

    }, {
        key: "deleteUselessMissions",
        value: function deleteUselessMissions(QValid_MaxLength, targetValue, missionValue) {
            if (this._QValid.length <= QValid_MaxLength) return;

            if (missionValue === undefined) missionValue = this._calculateMissionValue(targetValue);else {
                var missionValue_1 = missionValue;
                var missionValue_2 = this._calculateMissionValue(targetValue);
                missionValue = this._pulsMissionValue(missionValue_1, missionValue_2);
            }

            //创建一个Qvalid关卡价值数组, 删除价值低的关卡
            var Qvalid_length = this._QValid.length;
            var Qvalid_missionValue = new Array(Qvalid_length);
            for (var i = 0; i < Qvalid_length; i++) {
                Qvalid_missionValue[i] = [i, missionValue[i]];
            }
            quick_sort_expand_descending(Qvalid_missionValue, 1);
            Qvalid_missionValue.splice(0, QValid_MaxLength);
            //必须倒序, 才不会在删除对应Qvalid出错
            quick_sort_expand_descending(Qvalid_missionValue, 0);

            //删除对应的Qvalid
            for (var _i = 0; _i < Qvalid_missionValue.length; _i++) {

                this._QValid.splice(Qvalid_missionValue[_i][0], 1);
            }
        }
        /**
         * 根据目标需求计算关卡价值, 为资源契约乘对应的需求量
         * @param {Array.<number>} targetRatio - 目标资源契约的比值(8数组)
         * @private
         */

    }, {
        key: "_calculateMissionValue",
        value: function _calculateMissionValue(targetRatio) {
            //计算各个资源契约最大值
            var currentValueMax = [0, 0, 0, 0, 0, 0, 0, 0];
            var QValid_length = this._QValid.length;
            for (var i = 0; i < 8; i++) {
                for (var ii = 0; ii < QValid_length; ii++) {
                    currentValueMax[i] = Math.max(currentValueMax[i], this._QValid[ii][i + 1]);
                }
            }

            //由于需要归一化, 先除最大值以便后续计算
            var ratioDividedByCurrentMax = [];
            for (var _i2 = 0; _i2 < 8; _i2++) {
                if (currentValueMax[_i2] !== 0) ratioDividedByCurrentMax.push(targetRatio[_i2] / currentValueMax[_i2]);else ratioDividedByCurrentMax.push(0);
            }

            //计算关卡价值
            var missionValue = [];
            for (var _i3 = 0; _i3 < QValid_length; _i3++) {
                var value = 0;
                var QValid_iRow = this._QValid[_i3];
                for (var _ii = 0; _ii < 8; _ii++) {
                    value += QValid_iRow[_ii + 1] * ratioDividedByCurrentMax[_ii];
                }
                missionValue.push(value);
            }
            return missionValue;
        }
        /**
         * 综合两种方案价值
         * @param {Array.<number>} value_1 - 第一种方案价值
         * @param {Array.<number>} value_2 - 第二种方案价值
         * @returns {Array.<number>}
         * @private
         */

    }, {
        key: "_pulsMissionValue",
        value: function _pulsMissionValue(value_1, value_2) {

            var length = value_1.length;

            //归一化第一种方案价值
            var value_1_min = ArrayMin(value_1);
            var value_1_relative = ArrayMax(value_1) - value_1_min;
            if (value_1_relative !== 0) {
                for (var i = 0; i < length; i++) {
                    value_1[i] = (value_1[i] - value_1_min) / value_1_relative;
                }
            }

            //归一化第二种方案价值
            var value_2_min = ArrayMin(value_2);
            var value_2_relative = ArrayMax(value_2) - value_2_min;
            if (value_2_relative !== 0) {
                for (var _i4 = 0; _i4 < length; _i4++) {
                    value_2[_i4] = (value_2[_i4] - value_2_min) / value_2_relative;
                }
            }

            var value = new Array(length);
            for (var _i5 = 0; _i5 < length; _i5++) {
                value[_i5] = value_1[_i5] + value_2[_i5];
            }
            return value;
        }

        /**
         * 归一化QValid
         * @public
         */

    }, {
        key: "normalizedQValid",
        value: function normalizedQValid() {
            var currentValueMAX = this.getCurrentValueMax();
            var Qvalid_length = this._QValid.length;
            for (var i = 0; i < Qvalid_length; i++) {
                for (var ii = 0; ii < 8; ii++) {
                    if (currentValueMAX[ii] !== 0) this._QValid[i][ii + 1] /= currentValueMAX[ii];
                }
            }
        }

        /**
         * 根据输入的关卡返回8项资源契约的总计值
         * @param {number} Mission_n1 关卡1
         * @param {number} Mission_n2 关卡2
         * @param {number} Mission_n3 关卡3
         * @param {number} Mission_n4 关卡4
         * @public
         */

    }, {
        key: "calculateCurrentValue",
        value: function calculateCurrentValue(Mission_n1, Mission_n2, Mission_n3, Mission_n4) {
            var CurrentValue = [0, 0, 0, 0, 0, 0, 0, 0];
            var Qvalid = this._QValid;
            var n1 = Qvalid[Mission_n1];
            var n2 = Qvalid[Mission_n2];
            var n3 = Qvalid[Mission_n3];
            var n4 = Qvalid[Mission_n4];
            for (var i = 0; i < 8; i++) {
                CurrentValue[i] = n1[i + 1] + n2[i + 1] + n3[i + 1] + n4[i + 1];
            }
            return CurrentValue;
        }

        /**
         * 输出排序结果的自定义项的表头
         * @returns {string}
         * @public
         */

    }, {
        key: "printPlanTableTitle",
        value: function printPlanTableTitle() {}

        /**
         * 输出排序结果的自定义项
         * @param {number} Mission_n1 关卡1
         * @param {number} Mission_n2 关卡2
         * @param {number} Mission_n3 关卡3
         * @param {number} Mission_n4 关卡4
         * @returns {Array.<string>}
         * @public
         */

    }, {
        key: "printTableCustomize",
        value: function printTableCustomize(Mission_n1, Mission_n2, Mission_n3, Mission_n4) {
            return [];
        }

        /**
         * 已保存方案需要保存后勤总时间等其他Tab数据
         * @returns {Array} 已保存的方案中的自定义部分
         * @public
         */

    }, {
        key: "getSavedCustom",
        value: function getSavedCustom() {
            return [];
        }

        /**
         * 应用已保存的方案中的自定义部分
         * @param {Array} Saved_Custom - 已保存的方案中的自定义部分
         * @public
         */

    }, {
        key: "applySavedCustom",
        value: function applySavedCustom(Saved_Custom) {}

        /**
         * 打印方案详情自定义内容的标题
         * @public
         */

    }, {
        key: "planDetailsCustom_Title",
        value: function planDetailsCustom_Title() {
            return "";
        }

        /**
         * 根据传入的方案打印方案详情自定义内容的内容, 关卡数量小于等于4
         * @param {Array.<string>} Missions - 需要打印的关卡们的名称
         * @public
         */

    }, {
        key: "planDetailsCustom_Content",
        value: function planDetailsCustom_Content(Missions) {
            return "";
        }
    }], [{
        key: "isThisTabShow",
        value: function isThisTabShow() {}
    }]);

    return Tab;
}();

/**
 * @extends Tab
 */


var Tab_Anytime = function (_Tab) {
    _inherits(Tab_Anytime, _Tab);

    function Tab_Anytime() {
        _classCallCheck(this, Tab_Anytime);

        var _this = _possibleConstructorReturn(this, (Tab_Anytime.__proto__ || Object.getPrototypeOf(Tab_Anytime)).call(this));

        _this.name = "Anytime";
        _this.PlanTableResourceAndContractWidth = "8.88%";
        /**
         * 存储方案用时, 用于计算最小间隔时间时加快寻找速度
         * @type {Array.<number>}
         */
        _this.Qvalid_Time = [];
        _this.MinimumIntervalTime = 0;
        return _this;
    }

    /**
     * 该页面是否正在显示(展开)?
     * @returns {boolean}
     * @public
     */


    _createClass(Tab_Anytime, [{
        key: "_setTime",


        /**
         * 设置后勤总时间以及最小间隔时间
         * @param {boolean} NeedCorrection - 是否需要修正page中不恰当的输入
         * @private
         */
        value: function _setTime(NeedCorrection) {
            if (this._setTimeFlag === true) return;
            this._totalTime = Input_getAnytimeTotalTime(NeedCorrection);
            if (NeedCorrection) {
                if (this._totalTime === 0) {
                    alert(language.JS.tab_Anytime_alert1);
                    throw "Warning: Total time cannot be 0!";
                }
            }
            this.MinimumIntervalTime = Input_getAnytimeMinimumIntervalTime(NeedCorrection);
            this._setTimeFlag = true;
        }

        /**
         * @param {boolean=} NeedCorrection - 是否需要修正page中不恰当的输入, 默认为true
         * @public
         */

    }, {
        key: "setQValid",
        value: function setQValid() {
            var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (this._setQValidFlag === true) return;

            //该函数需要使用this._totalTime
            this._setTime(NeedCorrection);

            var totalGreatSuccessRate = Input_getTotalGreatSuccessRate(NeedCorrection);
            var resourceIncreasingRate = 1 + totalGreatSuccessRate / 200;

            var UnableLogistic = this._getUnableLogistic();
            for (var i = 0; i < Q.length; i++) {
                if (UnableLogistic.indexOf(i) === -1) {
                    //this.Qvalid 的一行
                    var newrow = [];
                    newrow.push(Q[i][0]);

                    //该关卡在后勤总时间内可执行次数
                    var times = 0;
                    while ((++times + 1) * Q[i][9] <= this._totalTime) {}

                    for (var ii = 1; ii < 5; ii++) {
                        newrow.push(Q[i][ii] * times * resourceIncreasingRate / this._totalTime);
                    }
                    for (var _ii2 = 5; _ii2 < 9; _ii2++) {
                        newrow.push(Q[i][_ii2] * times / this._totalTime);
                    }
                    newrow.push(Q[i][9]);
                    var CollectTimetable = [];
                    for (var _ii3 = 1; _ii3 <= times; _ii3++) {
                        CollectTimetable.push(Q[i][9] * _ii3);
                    }
                    newrow.push(CollectTimetable);
                    this._QValid.push(newrow);
                    this.Qvalid_Time.push(Q[i][9]);
                }
            }
            //为优化后面计算最小间隔时间做准备, 计算最小间隔时间的函数的传入时间Time_Arr必须从小到大
            quick_sort_expand_ascending(this._QValid, 9);
            quick_sort_ascending(this.Qvalid_Time);
            this._setQValidFlag = true;
        } //End setValidQAndReturnLengthAndSetCurrentMax()
        /**
         * 排除超时后勤以及在总时间内的时间间隔小于最小间隔时间的关卡(等于0的除外)
         * @param {Array.<number>} UnableLogistic - 之前排除的后勤
         * @private
         */

    }, {
        key: "_setUnableLogisticCustomize",
        value: function _setUnableLogisticCustomize(UnableLogistic) {
            for (var i = 0; i < Q.length; i++) {
                if (Q[i][9] > this._totalTime || Q[i][9] < this.MinimumIntervalTime) {
                    if (UnableLogistic.indexOf(i) === -1) {
                        UnableLogistic.push(i);
                    }
                }
                var IntervalTime_lastTimeToTotalTime = this._totalTime % Q[i][9];
                if (IntervalTime_lastTimeToTotalTime < this.MinimumIntervalTime && IntervalTime_lastTimeToTotalTime !== 0) {
                    if (UnableLogistic.indexOf(i) === -1) {
                        UnableLogistic.push(i);
                    }
                }
            }
            return UnableLogistic;
        }

        /**
         * 根据输入的关卡返回8项资源契约的总计值, 若最小间隔时间小于设置的最小间隔时间, 
         * 返回[-1, -1, -1, -1, -1, -1, -1, -1]
         * @param {number} Mission_n1 关卡1
         * @param {number} Mission_n2 关卡2
         * @param {number} Mission_n3 关卡3
         * @param {number} Mission_n4 关卡4
         * @public
         */

    }, {
        key: "calculateCurrentValue",
        value: function calculateCurrentValue(Mission_n1, Mission_n2, Mission_n3, Mission_n4) {
            var Qvalid_Time = this.Qvalid_Time;
            var MinimumIntervalTime = this.MinimumIntervalTime;
            //当设置的最小后勤时间为0时, 跳过计算最小间隔时间
            if (MinimumIntervalTime) {
                var Time = [Qvalid_Time[Mission_n1], Qvalid_Time[Mission_n2], Qvalid_Time[Mission_n3], Qvalid_Time[Mission_n4]];

                //若各个关卡在第一次部署后的间隔时间已经小于设置的最小间隔时间, 不必再精确计算最小间隔时间, 直接返回
                var IntervalTime = Math.min(Time[1] - Time[0] === 0 ? MinimumIntervalTime : Time[1] - Time[0], Time[2] - Time[1] === 0 ? MinimumIntervalTime : Time[2] - Time[1], Time[3] - Time[2] === 0 ? MinimumIntervalTime : Time[3] - Time[2]);
                if (IntervalTime < MinimumIntervalTime) return [-1, -1, -1, -1, -1, -1, -1, -1];

                IntervalTime = calculateIntervalTimeMin(Time, this._totalTime);
                if (IntervalTime < MinimumIntervalTime) return [-1, -1, -1, -1, -1, -1, -1, -1];
            }
            return _get(Tab_Anytime.prototype.__proto__ || Object.getPrototypeOf(Tab_Anytime.prototype), "calculateCurrentValue", this).call(this, Mission_n1, Mission_n2, Mission_n3, Mission_n4);
        }

        /**
         * 删除价值低的关卡
         * 
         * 由于关卡太多导致计算缓慢, 可通过关卡价值删去价值低的关卡, 来提高计算速度
         * @param {number} Qvalid_MaxLength - 最后剩余的总关卡数
         * @param {Array.<number>} targetValue - 目标值
         * @param {Array.<number>=} missionValue - 关卡价值
         * @public
         */

    }, {
        key: "deleteUselessMissions",
        value: function deleteUselessMissions(Qvalid_MaxLength, targetValue, missionValue) {
            _get(Tab_Anytime.prototype.__proto__ || Object.getPrototypeOf(Tab_Anytime.prototype), "deleteUselessMissions", this).call(this, Qvalid_MaxLength, targetValue, missionValue);

            //还需重新设置对应的QValid_Time
            var Qvalid_length = this._QValid.length;
            var Qvalid_Time = [];
            for (var i = 0; i < Qvalid_length; i++) {
                Qvalid_Time.push(this._QValid[i][9]);
            }
            this.Qvalid_Time = Qvalid_Time;
        }

        /**
         * 输出排序结果的自定义项的表头
         * @public
         */

    }, {
        key: "printPlanTableTitle",
        value: function printPlanTableTitle() {
            var title = "";
            if (is_CalculateByHour()) {
                title = this._title + '<th style="width:8.88%;" tabindex="0" id="resultPlan_Manp">' + language.JS.Manp + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Ammu">' + language.JS.Ammu + '/h</th><th style="width:8.88%;"tabindex="0" id="resultPlan_Rati">' + language.JS.Rati + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Part">' + language.JS.Part + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_TPro">' + language.JS.TPro + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Equi">' + language.JS.Equi + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_QPro">' + language.JS.QPro + '/h</th><th style="width:8.88%;" tabindex="0" id="resultPlan_QRes">' + language.JS.QRes + '/h</th><th style="width:8.88%;cursor:default;">' + language.JS.MinIntervalTime + '</th>' + this._titleEnd;
            } else {
                title = this._title + '<th style="width:8.88%;" tabindex="0" id="resultPlan_Manp">' + language.JS.Manp + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Ammu">' + language.JS.Ammu + '</th><th style="width:8.88%;"tabindex="0" id="resultPlan_Rati">' + language.JS.Rati + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Part">' + language.JS.Part + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_TPro">' + language.JS.TPro + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_Equi">' + language.JS.Equi + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_QPro">' + language.JS.QPro + '</th><th style="width:8.88%;" tabindex="0" id="resultPlan_QRes">' + language.JS.QRes + '</th><th style="width:8.88%;cursor:default;">' + language.JS.MinIntervalTime + '</th>' + this._titleEnd;
            }
            return title;
        }

        /**
         * 输出排序结果的自定义项, 最小间隔时间
         * @param {number} Mission_n1 关卡1
         * @param {number} Mission_n2 关卡2
         * @param {number} Mission_n3 关卡3
         * @param {number} Mission_n4 关卡4
         * @public
         */

    }, {
        key: "printTableCustomize",
        value: function printTableCustomize(Mission_n1, Mission_n2, Mission_n3, Mission_n4) {
            var tab = [];
            var NumberTime = [this.Qvalid_Time[Mission_n1], this.Qvalid_Time[Mission_n2], this.Qvalid_Time[Mission_n3], this.Qvalid_Time[Mission_n4]];
            tab.push(calculateIntervalTimeMin(NumberTime, this._totalTime) + "m");
            return tab;
        }

        /**
         * 已保存方案需要保存后勤总时间等其他Tab数据
         * @return {Array.<number>} 后勤总时间与最小间隔时间
         * @public
         */

    }, {
        key: "getSavedCustom",
        value: function getSavedCustom() {
            var Saved_Custom = [];
            var TotalTime = Input_getAnytimeTotalTime();
            Saved_Custom.push(TotalTime);
            var MinimumIntervalTime = Input_getAnytimeMinimumIntervalTime();
            Saved_Custom.push(MinimumIntervalTime);
            return Saved_Custom;
        }

        /**
         * 应用已保存的方案中的自定义部分, 
         * 包括后勤总时间与最小间隔时间
         * @param {Array.<number>} Saved_Custom - 已保存的方案中的自定义部分
         * @public
         */

    }, {
        key: "applySavedCustom",
        value: function applySavedCustom(Saved_Custom) {
            var TotalTime = Saved_Custom[0];
            var MinimumIntervalTime = Saved_Custom[1];
            Input_setAnytimeTotalTime(TotalTime);
            Input_setAnytimeMinimumIntervalTime(MinimumIntervalTime);
            storageSetItem("TabAnytimeCustom", Saved_Custom);
        }

        /**
         * 打印方案详情自定义的标题 - 最小时间间隔
         * @public
         */

    }, {
        key: "planDetailsCustom_Title",
        value: function planDetailsCustom_Title() {
            return language.JS.MinIntervalTime;
        }

        /**
         * 根据传入的方案打印方案详情自定义内容的内容(最小时间间隔), 关卡数量小于等于4
         * @param {Array.<string>} Missions - 需要打印的关卡们的名称
         * @public
         */

    }, {
        key: "planDetailsCustom_Content",
        value: function planDetailsCustom_Content(Missions) {
            var MissionTime = [];
            var TotalMinutes = this.getTotalTime(false);
            for (var i = 0; i < Missions.length; i++) {
                for (var ii = 0; ii < Q.length; ii++) {
                    if (Q[ii][0] === Missions[i]) {
                        MissionTime.push(Q[ii][9]);
                        break;
                    }
                }
            }

            //若关卡数量不足4, 将剩下的空填入TotalMinutes
            //且升序排序, 以使calculateIntervalTimeMin()能够正常工作
            for (var _i6 = Missions.length; _i6 < 4; _i6++) {
                MissionTime.push(TotalMinutes);
            }
            quick_sort_ascending(MissionTime);

            var MinIntervalTime = calculateIntervalTimeMin(MissionTime, TotalMinutes);
            return TimeFormat(MinIntervalTime);
        }
    }], [{
        key: "isThisTabShow",
        value: function isThisTabShow() {
            return !!$("#Tab_Anytime").hasClass("active");
        }
    }]);

    return Tab_Anytime;
}(Tab);
/**
 * 依据四个关卡时间和后勤总时间计算最小时间间隔
 * 
 * 会改变Time_Arr!!!
 * 
 * Time_Arr必须从小到大排序!!!
 * @param {Array.<number>} Time_Arr - 四个关卡的时间
 * @param {number} Total_Time - 后勤总时间
 */


function calculateIntervalTimeMin(Time_Arr, Total_Time) {
    var minIntervalTime = Time_Arr[0];

    //首先计算所有关卡最后一次完成后到后勤总时间结束的间隔, 计算出最小时间间隔
    //由于在if (Time_Arr_length === 1)会直接返回计算的最小时间间隔, 所以必须先计算这个
    for (var i = 0; i < 4; i++) {
        var IntervalTime_lastTimeToTotalTime = Total_Time % Time_Arr[i];
        if (IntervalTime_lastTimeToTotalTime !== 0) minIntervalTime = minIntervalTime < IntervalTime_lastTimeToTotalTime ? minIntervalTime : IntervalTime_lastTimeToTotalTime;
    }

    //保存各个关卡时间, Time_Arr之后会用于保存各个关卡后勤的下一次结束时间
    var t0 = Time_Arr[0];
    var t1 = Time_Arr[1];
    var t2 = Time_Arr[2];
    var t3 = Time_Arr[3];

    //为简化计算, 显然当a关卡的时间为b关卡的时间的因数时, 只可考虑a关卡, 不必再计算b关卡
    //将b关卡的时间设置为后勤总时间, 或直接设置Time_Arr_length来减少计算
    var Time_Arr_length = 4;
    if (t3 % t2 === 0 || t3 % t1 === 0 || t3 % t0 === 0) {
        Time_Arr_length--;
    }
    if (t2 % t1 === 0 || t2 % t0 === 0) {
        if (Time_Arr_length === 3) Time_Arr_length--;else Time_Arr[2] = Total_Time;
    }
    if (t1 % t0 === 0) {
        if (Time_Arr_length === 2) Time_Arr_length--;else Time_Arr[1] = Total_Time;
    }

    if (Time_Arr_length === 1) return minIntervalTime;

    //上次Time_Arr的最小值
    var Time_Arr_min_0 = t0;

    while (Time_Arr_min_0 < Total_Time) {
        //找出Time_Arr(各个关卡后勤的下一次结束时间)的最小值并将此项加上对应的关卡时间
        var Time_Arr_min = Total_Time;
        var ii = 0;
        var _i7 = -1;
        while (++_i7 < Time_Arr_length) {
            if (Time_Arr[_i7] <= Time_Arr_min) {
                Time_Arr_min = Time_Arr[_i7];
                ii = _i7;
            }
        }
        switch (ii) {
            case 0:
                Time_Arr[0] += t0;break;
            case 1:
                Time_Arr[1] += t1;break;
            case 2:
                Time_Arr[2] += t2;break;
            case 3:
                Time_Arr[3] += t3;break;
        }

        var IntervalTime = Time_Arr_min - Time_Arr_min_0;
        if (IntervalTime === 0) continue;
        Time_Arr_min_0 = Time_Arr_min;
        minIntervalTime = minIntervalTime < IntervalTime ? minIntervalTime : IntervalTime;
    }
    return minIntervalTime;
} //End calculateIntervalTimeMin()

/**
 * @extends Tab
 */

var Tab_Timetable = function (_Tab2) {
    _inherits(Tab_Timetable, _Tab2);

    function Tab_Timetable() {
        _classCallCheck(this, Tab_Timetable);

        var _this2 = _possibleConstructorReturn(this, (Tab_Timetable.__proto__ || Object.getPrototypeOf(Tab_Timetable)).call(this));

        _this2.name = "Timetable";
        _this2._QValid = [];
        /**
         * 时间表
         * @type {Array.<number>}
         * @private
         */
        _this2.TimeList = [];
        _this2.PlanTableResourceAndContractWidth = "10%";
        return _this2;
    }

    /**
     * 该页面是否正在显示(展开)?
     * @returns {boolean}
     * @public
     */


    _createClass(Tab_Timetable, [{
        key: "_setTime",


        /**
         * 设置后勤总时间以及时间表时间
         * @param {boolean} NeedCorrection - 是否需要修正page中不恰当的输入
         * @private
         */
        value: function _setTime(NeedCorrection) {
            if (this._setTimeFlag === true) return;
            this.TimeList = Tab_Timetable_TIMELIST.slice().sort(sortNumber);
            this.TimeList.unshift(0);
            this._totalTime = Input_getTimetableTotalTime(NeedCorrection);
            if (NeedCorrection) {
                if (this._totalTime === 0) {
                    alert(language.JS.tab_Timetable_alert4);
                    HTML_AllowRankingInput();
                    throw "Warning: Total time cannot be 0!";
                }
            }
            this.TimeList.push(this._totalTime);
            this._setTimeFlag = true;
        }

        /**
         * @param {boolean=} NeedCorrection - 是否需要修正page中不恰当的输入, 默认为true
         * @public
         */

    }, {
        key: "setQValid",
        value: function setQValid() {
            var NeedCorrection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (this._setQValidFlag === true) return;

            //该函数需要使用时间有关的变量
            this._setTime(NeedCorrection);

            var totalGreatSuccessRate = Input_getTotalGreatSuccessRate(NeedCorrection);
            var resourceIncreasingRate = 1 + totalGreatSuccessRate / 200;

            var UnableLogistic = this._getUnableLogistic();
            for (var i = 0; i < Q.length; i++) {
                if (UnableLogistic.indexOf(i) === -1) {
                    var newrow = [];
                    newrow.push(Q[i][0]);

                    //该关卡在后勤总时间内可执行次数, 和关卡每个结束时间
                    var times = 0;
                    var CollectTimetable = [];
                    var ii0 = 0;
                    for (var ii = 1; ii < this.TimeList.length; ii++) {
                        if (Q[i][9] <= this.TimeList[ii] - this.TimeList[ii0]) {
                            times++;
                            CollectTimetable.push(this.TimeList[ii0] + Q[i][9]);
                            ii0 = ii;
                        }
                    }

                    for (var _ii4 = 1; _ii4 < 5; _ii4++) {
                        newrow.push(Q[i][_ii4] * times * resourceIncreasingRate / this._totalTime);
                    }
                    for (var _ii5 = 5; _ii5 < 9; _ii5++) {
                        newrow.push(Q[i][_ii5] * times / this._totalTime);
                    }
                    newrow.push(Q[i][9]);
                    newrow.push(CollectTimetable);
                    this._QValid.push(newrow);
                }
            }
            this._setQValidFlag = true;
        }

        /**
         * 输出排序结果的自定义项的表头
         * @public
         */

    }, {
        key: "printPlanTableTitle",
        value: function printPlanTableTitle() {
            var title = "";
            if (is_CalculateByHour()) {
                title = this._title + '<th style="width:10%;" tabindex="0" id="resultPlan_Manp">' + language.JS.Manp + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_Ammu">' + language.JS.Ammu + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_Rati">' + language.JS.Rati + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_Part">' + language.JS.Part + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_TPro">' + language.JS.TPro + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_Equi">' + language.JS.Equi + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_QPro">' + language.JS.QPro + '/h</th><th style="width:10%;" tabindex="0" id="resultPlan_QRes">' + language.JS.QRes + '/h</th>' + this._titleEnd;
            } else {
                title = this._title + '<th style="width:10%;" tabindex="0" id="resultPlan_Manp">' + language.JS.Manp + '</th><th style="width:10%;" tabindex="0" id="resultPlan_Ammu">' + language.JS.Ammu + '</th><th style="width:10%;" tabindex="0" id="resultPlan_Rati">' + language.JS.Rati + '</th><th style="width:10%;" tabindex="0" id="resultPlan_Part">' + language.JS.Part + '</th><th style="width:10%;" tabindex="0" id="resultPlan_TPro">' + language.JS.TPro + '</th><th style="width:10%;" tabindex="0" id="resultPlan_Equi">' + language.JS.Equi + '</th><th style="width:10%;" tabindex="0" id="resultPlan_QPro">' + language.JS.QPro + '</th><th style="width:10%;" tabindex="0" id="resultPlan_QRes">' + language.JS.QRes + '</th>' + this._titleEnd;
            }
            return title;
        }

        /**
         * 已保存方案需要保存后勤总时间等其他Tab数据
         * @return {[number, Array.<number>]} 后勤总时间和时间表
         * @public
         */

    }, {
        key: "getSavedCustom",
        value: function getSavedCustom() {
            var Saved_Custom = [];
            var TotalTime = Input_getTimetableTotalTime();
            Saved_Custom.push(TotalTime);
            var Timetable = Tab_Timetable_TIMELIST.slice();
            Saved_Custom.push(Timetable);
            return Saved_Custom;
        }

        /**
         * 应用已保存的方案中的自定义部分, 
         * 包括后勤总时间与时间表时间
         * @param {[number, Array.<number>]} Saved_Custom - 已保存的方案中的自定义部分
         * @public
         */

    }, {
        key: "applySavedCustom",
        value: function applySavedCustom(Saved_Custom) {
            var TotalTime = Saved_Custom[0];
            Input_setTimetableTotalTime(TotalTime);
            var Timetable = Saved_Custom[1];
            Input_setTimetableTimetable(Timetable);
            storageSetItem("TabTimetableCustom", Saved_Custom);
        }
    }], [{
        key: "isThisTabShow",
        value: function isThisTabShow() {
            return !!$("#Tab_Timetable").hasClass("active");
        }
    }]);

    return Tab_Timetable;
}(Tab);

/**
 * 获取当前的Tab
 * 
 * 不会返回Tab类型, 为保证注释能够符合不同子类, 将父类放入首位
 * @return {Tab|Tab_Anytime|Tab_Timetable}
 */


function getShownTab() {
    var ShownTab = void 0;
    if (Tab_Anytime.isThisTabShow()) ShownTab = new Tab_Anytime();else if (Tab_Timetable.isThisTabShow()) ShownTab = new Tab_Timetable();
    return ShownTab;
}

/**
 * 由Tab的名称返回Tab类型
 * 
 * 不会返回{Tab}类型, 为保证注释能够符合不同子类, 将父类放入首位
 * @param {string} tab_name - Tab名称
 * @return {Tab|Tab_Anytime|Tab_Timetable}
 */
function getTabByName(tab_name) {
    var tab = void 0;
    switch (tab_name) {
        case "Anytime":
            tab = new Tab_Anytime();
            break;
        case "Timetable":
            tab = new Tab_Timetable();
            break;
    }
    return tab;
}
/**
 * 加载填写需求量的页面
 */
function loadHTML_Target() {
    var HTML = '';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_HG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_SMG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_RF" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_AR" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_MG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_SG" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-default"id="setTarget_2221" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    HTML += '<button type="button" class="btn btn-danger"id="setTarget_Clear" style="margin-right: 5px; margin-bottom: 5px;"></button>';
    document.getElementById("setTargetButton").innerHTML = HTML;
    HTML = '';
    var TargetName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    var Target = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
    for (var i = 0; i < 4; i++) {
        HTML += '<div class="form-group input-group"style="margin-bottom: 10px;"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;cursor:default;"';
        HTML += 'id=' + TargetName[i] + '>';
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"type="button"id="Target_minus_100_' + Target[i] + '"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '<b>&minus;</b></button><button class="btn btn-default"type="button"id="Target_minus_10_' + Target[i] + '"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '&minus;</button></div><input type="number" min="0"class="form-control"id="';
        HTML += Target[i];
        HTML += '"value=0 onfocus="this.select();"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"id="Target_plus_10_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '+</button><button class="btn btn-default"type="button"id="Target_plus_100_' + Target[i] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '<b>&plus;</b></button></div></div>';
    }
    for (var _i8 = 4; _i8 < 8; _i8++) {
        HTML += '<div class="form-group input-group"style="margin-bottom: 10px;"><span class="input-group-addon"style="padding-right:10px;padding-left:10px;cursor:default;"';
        HTML += 'id=' + TargetName[_i8] + '>';
        HTML += '</span><div class="input-group-btn"><button class="btn btn-default"id="Target_minus_1_' + Target[_i8] + '"type="button"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '<b>&minus;</b></button><button class="btn btn-default"type="button"id="Target_minus_01_' + Target[_i8] + '"style="padding-right:10px;padding-left:10px;border-radius:0;"tabindex=-1>';
        HTML += '&minus;</button></div><input type="number" min="0" step="0.01" class="form-control"id="';
        HTML += Target[_i8];
        HTML += '"value=0 onfocus="this.select();"style="border-left-width:0"><div class="input-group-btn"><button class="btn btn-default"type="button"id="Target_plus_01_' + Target[_i8] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '+</button><button class="btn btn-default"type="button"id="Target_plus_1_' + Target[_i8] + '"style="padding-right:10px;padding-left:10px;"tabindex=-1>';
        HTML += '<b>&plus;</b></button></div></div>';
    }
    document.getElementById("setTargetInput").innerHTML = HTML;
}

/**解锁章节中的可选择的最小章节 */
var MIN_CHAPTER = 6;

/**
 * 加载解锁章节, 默认选择最大章节
 */
function loadHTML_ChapterLimit() {

    var MaxChapter = (Q.length - 4) / 4;
    var tab = "";
    for (var i = MIN_CHAPTER; i <= MaxChapter; i++) {
        if (i === MaxChapter) tab += "<option value=" + i + " id=\"chapter_" + i + "\" selected></option>";else tab += "<option value=" + i + " id=\"chapter_" + i + "\"></option>";
    }
    document.getElementById("ChapterLimit").innerHTML = tab;
}

/**
 * 加载全部语言内容
 */
function loadHTML_language() {
    var language_HTML = language.HTML;
    var language_HTMLJS = language.HTMLJS;
    var language_JS = language.JS;
    var language_CSS = language.CSS;

    document.documentElement.lang = language.lang;
    document.title = language.title;

    //normal------------
    for (var i in language_HTML) {
        document.getElementById(i).innerHTML = language_HTML[i];
    }
    for (var _i9 in language_HTMLJS.placeholder) {
        document.getElementById(_i9).placeholder = language_HTMLJS.placeholder[_i9];
    }
    for (var _i10 in language_HTMLJS.title) {
        document.getElementById(_i10).title = language_HTMLJS.title[_i10];
    }
    //------------------

    //ResultPlan--------
    delete_rankingResults();
    HTML_AllowRankingInput();

    //ChapterLimit------
    var MaxChapter = (Q.length - 4) / 4;
    for (var _i11 = MIN_CHAPTER; _i11 <= MaxChapter; _i11++) {
        document.getElementById("chapter_" + _i11).innerHTML = language_JS.chapter_start + language_JS.number(_i11) + language_JS.chapter_end;
    }

    //Timetable---------
    $("button[id^=Tab_Timetable_range_thumb_]").attr("title", language_HTMLJS.Timetable_deletePoint);

    //Saved-------------
    $("button[id^=SavedTable_apply_]").attr("title", language_HTMLJS.SavedTable_apply);
    $("input[id^=SavedTable_name_]").attr("placeholder", language_HTMLJS.SavedTable_name);
    $("button[id^=SavedTable_rename_]").attr("title", language_HTMLJS.SavedTable_rename);
    $("button[id^=SavedTable_up_]").attr("title", language_HTMLJS.SavedTable_up);
    $("button[id^=SavedTable_down_]").attr("title", language_HTMLJS.SavedTable_down);
    $("button[id^=SavedTable_export_]").attr("title", language_HTMLJS.SavedTable_export);
    $("button[id^=SavedTable_delete_]").attr("title", language_HTMLJS.SavedTable_delete);
    //------------------

    //PlanDetails-------
    var ShownTab = getShownTab();
    PlanDetails.printShownTab(ShownTab.name);
    PlanDetails.printTotalTime(ShownTab.getTotalTime(false));
    PlanDetails.printGreatSuccessRate(Input_getTotalGreatSuccessRate());
    PlanDetails.printExecutionTimes(Input_getExecutionTimes());
    $("#PlanDetails_PerHour_title").html(language_JS.PerHour);
    $("#PlanDetails_Total_title").html(language_JS.Total);
    $("#PlanDetails_TabCustom_Title").html(ShownTab.planDetailsCustom_Title());
    //------------------

    //demand title------
    if (is_CalculateByHour()) $("#Demand").html(language_HTMLJS.Demand_hour);else $("#Demand").html(language_HTMLJS.Demand_total);

    //style-------------
    document.getElementById("Manp").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("Ammu").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("Rati").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("Part").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("TPro").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("Equi").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("QPro").style.width = language_CSS.TargetValueSpan_Width;
    document.getElementById("QRes").style.width = language_CSS.TargetValueSpan_Width;
    //------------------
} //End loadHTML_language()

var PlanDetails = function () {
    function PlanDetails() {
        _classCallCheck(this, PlanDetails);
    }

    _createClass(PlanDetails, null, [{
        key: "printShownTab",

        /**
         * 打印计算方式
         * @param {string} HTML_TAB - 目前显示的Tab
         */
        value: function printShownTab(HTML_TAB) {
            var ShownTab_Name = "";
            switch (HTML_TAB) {
                case "Anytime":
                    ShownTab_Name = language.HTML.Tab_Anytime_name;
                    break;
                case "Timetable":
                    ShownTab_Name = language.HTML.Tab_Timetable_name;
                    break;
            }
            document.getElementById("PlanDetails_ShownTab").innerHTML = language.JS.PlanDetails_calculateMethod + ': ' + ShownTab_Name;
        }

        /**
         * 打印总时长
         * @param {number} TotalMinutes - 后勤总分钟数
         */

    }, {
        key: "printTotalTime",
        value: function printTotalTime(TotalMinutes) {
            document.getElementById("PlanDetails_TotalTime").innerHTML = language.JS.total_time + ": " + TimeFormat(TotalMinutes);
        }

        /**
         * 打印总大成功概率
         * @param {number} TotalGreatSuccessRate - 总大成功概率, 单位%, 范围0~100
         */

    }, {
        key: "printGreatSuccessRate",
        value: function printGreatSuccessRate(TotalGreatSuccessRate) {
            document.getElementById("PlanDetails_GreatSuccessRate").innerHTML = language.JS.total_greatSuccessRate + ": " + TotalGreatSuccessRate + "%";
        }

        /**
         * 打印后勤执行次数
         * @param {number} ExecutionTimes - 后勤执行次数
         */

    }, {
        key: "printExecutionTimes",
        value: function printExecutionTimes(ExecutionTimes) {
            document.getElementById("PlanDetails_ExecutionTimes").innerHTML = language.JS.ExecutionTimes + ": " + ExecutionTimes;
        }

        /**
         * 打印关卡详情, 关卡数量小于等于4
         * @param {Array.<Array.<string|number>>} missionsDetails - 需要打印的关卡们的详情, 0关卡名称-1~8资源契约-9关卡时间
         */

    }, {
        key: "printMissions",
        value: function printMissions(missionsDetails) {
            for (var i = 0; i < missionsDetails.length; i++) {
                var tab = "<td>" + missionsDetails[i][0] + "</td>";
                for (var ii = 1; ii < 9; ii++) {
                    tab += "<td>";
                    tab += NumberAutoExact(missionsDetails[i][ii] * 60);
                    tab += "</td>";
                }
                tab += "<td>" + TimeFormat(missionsDetails[i][9]) + "</td>";
                document.getElementById("PlanDetails_Mission_" + (i + 1)).innerHTML = tab;
            }
            for (var _i12 = missionsDetails.length; _i12 < 4; _i12++) {
                document.getElementById("PlanDetails_Mission_" + (_i12 + 1)).innerHTML = "";
            }
        }

        /**
         * 打印所有关卡资源契约Hourly, 关卡数量小于等于4, 最后一列打印Tab自定义标题
         * @param {Array.<Array.<number>>} missionsDetails - 需要打印的关卡们的详情, 1~8资源契约
         * @param {string} HTML_TAB - 目前显示的Tab
         */

    }, {
        key: "printMissionsHourly",
        value: function printMissionsHourly(missionsDetails, HTML_TAB) {
            //如果关卡数为0, 则内容为空
            if (missionsDetails.length === 0) {
                document.getElementById("PlanDetails_PerHour").innerHTML = "";
                return;
            }

            var tab = "<td id='PlanDetails_PerHour_title'>" + language.JS.PerHour + "</td>";
            for (var i = 1; i < 9; i++) {
                tab += "<td>";
                var ResourceContractValue = 0;
                for (var ii = 0; ii < missionsDetails.length; ii++) {
                    ResourceContractValue += missionsDetails[ii][i];
                }
                tab += NumberAutoExact(ResourceContractValue * 60);
                tab += "</td>";
            }

            //Tab自定义的标题
            tab += "<td id='PlanDetails_TabCustom_Title'>";
            var ShownTab = getTabByName(HTML_TAB);
            tab += ShownTab.planDetailsCustom_Title();
            tab += "</td>";

            document.getElementById("PlanDetails_PerHour").innerHTML = tab;
        }

        /**
         * 打印所有关卡资源契约Hourly, 关卡数量小于等于4, 最后一列打印Tab自定义内容(除数字不要有其他语言, 否则在更改语言时还需调用该函数)
         * @param {Array.<Array.<number>>} missionsDetails - 需要打印的关卡们的详情, 0关卡名称-1~8资源契约-9关卡时间
         * @param {number} TotalMinutes - 后勤总分钟数
         * @param {number} ExecutionTimes - 后勤执行次数
         * @param {string} HTML_TAB - 目前显示的Tab
         */

    }, {
        key: "printMissionsTotal",
        value: function printMissionsTotal(missionsDetails, TotalMinutes, ExecutionTimes, HTML_TAB) {
            //如果关卡数为0, 则内容为空
            if (missionsDetails.length === 0) {
                document.getElementById("PlanDetails_Total").innerHTML = "";
                return;
            }

            var tab = "<td id='PlanDetails_Total_title'>" + language.JS.Total + "</td>";
            for (var i = 1; i < 9; i++) {
                tab += "<td>";
                var ResourceContractValue = 0;
                for (var ii = 0; ii < missionsDetails.length; ii++) {
                    ResourceContractValue += missionsDetails[ii][i];
                }
                tab += NumberAutoExact(ResourceContractValue * TotalMinutes * ExecutionTimes);
                tab += "</td>";
            }

            //Tab自定义的内容
            var MissionsName = [];
            for (var _i13 = 0; _i13 < missionsDetails.length; _i13++) {
                MissionsName.push(missionsDetails[_i13][0]);
            }
            var ShownTab = getTabByName(HTML_TAB);
            tab += "<td>";
            tab += ShownTab.planDetailsCustom_Content(MissionsName) + "</td>";

            document.getElementById("PlanDetails_Total").innerHTML = tab;
        }

        /**
         * 打印关卡完成时间表的图表
         * @param {Array.<Array.<number>>} missionsDetails - 需要打印的关卡们的详情, 0关卡名称-9关卡时间-10关卡完成时间表
         * @param {number} TotalMinutes - 后勤总分钟数
         * @param {number} startTime - 后勤开始时间, 换算成从零点开始的总分钟数
         */

    }, {
        key: "printChart",
        value: function printChart(missionsDetails, TotalMinutes, startTime) {
            //若这次参数与上次参数一致, 则可以跳过这次完全一样的打印
            var lastParam = this._chartLastParam;
            if (missionsDetails.length === lastParam.missionsName.length) {
                if (TotalMinutes === lastParam.totalTime && startTime === lastParam.startTIme) {
                    var length = missionsDetails.length;
                    var flag = true;
                    for (var i = 0; i < length; i++) {
                        if (missionsDetails[i][0] !== lastParam.missionsName[i] || "" + missionsDetails[i][10] !== lastParam.collectTimetable[i]) flag = false;
                    }
                    if (flag === true) return;
                }
            }

            var Chart_elem = document.getElementById("PlanDetails_Chart");

            //判断打印之前是否已存在图表, 若存在选择更新或销毁(关卡数组为空), 否则添加图表
            var Chart = void 0; //图表实例
            if (Chart_elem.getAttribute("_echarts_instance_") === "" || Chart_elem.getAttribute("_echarts_instance_") === null) {
                if (missionsDetails.length === 0) {
                    //跳过打印图表
                    return;
                }
                Chart_elem.style.cssText = "width: 610px; height: 120px;";
                Chart = echarts.init(Chart_elem);
            } else {
                Chart = echarts.getInstanceByDom(Chart_elem);
                if (missionsDetails.length === 0) {
                    //销毁实例
                    Chart.dispose();
                    Chart_elem.style.cssText = "";
                    return;
                }
            }

            var missions_name = [];
            var missions_time = [];
            var missions_CollectTimetable = [];
            var dataCount = [];
            var types = [];
            var color = ['#A1C0FF', '#FF8C8A', '#75d874', '#FFDA93'];
            for (var _i14 = missionsDetails.length - 1; _i14 >= 0; _i14--) {
                missions_name.push(missionsDetails[_i14][0]);
                missions_time.push(missionsDetails[_i14][9]);
                missions_CollectTimetable.push(missionsDetails[_i14][10]);
                dataCount.push(missionsDetails[_i14][10].length);
                types.push({ name: missionsDetails[_i14][0], color: color[_i14] });
            }

            var data = [];
            var categories = ['0', '1', '2', '3'];

            //优化x坐标标签间隔
            var xAxis_interval = void 0;
            if (TotalMinutes <= 960) xAxis_interval = 60;else if (TotalMinutes <= 1920) xAxis_interval = 120;else if (TotalMinutes <= 2880) xAxis_interval = 180;else if (TotalMinutes <= 3840) xAxis_interval = 240;else xAxis_interval = 300;

            // Generate mock data
            echarts.util.each(categories, function (category, index) {
                var baseTime = void 0;
                for (var _i15 = 0; _i15 < dataCount[category]; _i15++) {
                    var typeItem = types[category];
                    var duration = missions_time[category];
                    data.push({
                        name: typeItem.name,
                        value: [index, baseTime = missions_CollectTimetable[category][_i15] - duration, baseTime += duration - 1, duration - 1],
                        itemStyle: {
                            normal: {
                                color: typeItem.color
                            }
                        }
                    });
                    data.push({
                        name: 'none',
                        value: [index, baseTime = missions_CollectTimetable[category][_i15] - 1, baseTime += 1, 1],
                        itemStyle: {
                            normal: {
                                color: '#000000'
                            }
                        }
                    });
                }
            });

            var option = {
                title: {
                    show: false
                },
                grid: {
                    left: 35,
                    right: 20,
                    top: 5,
                    bottom: 20,
                    height: 'auto'
                },
                xAxis: {
                    min: 0,
                    scale: true,
                    axisLabel: {
                        formatter: function formatter(val) {
                            return TimeFormat_Day(val + startTime);
                        }
                    },
                    max: TotalMinutes,
                    interval: xAxis_interval
                },
                yAxis: {
                    data: missions_name
                },
                series: [{
                    type: 'custom',
                    renderItem: renderItem,
                    itemStyle: {
                        normal: {
                            opacity: 0.8
                        }
                    },
                    encode: {
                        x: [1, 2],
                        y: 0
                    },
                    data: data
                }],
                animation: false,
                backgroundColor: "#FFFFFF"
            };

            Chart.setOption(option);

            //保存这次的参数
            lastParam.startTIme = startTime;
            lastParam.totalTime = TotalMinutes;
            var missions_length = missionsDetails.length;
            var missionsName = [];
            var collectTimetable = [];
            for (var _i16 = 0; _i16 < missions_length; _i16++) {
                missionsName.push(missionsDetails[_i16][0]);
                collectTimetable.push("" + missionsDetails[_i16][10]);
            }
            lastParam.missionsName = missionsName;
            lastParam.collectTimetable = collectTimetable;
        } //End printChart()

        /**
         * 打印完整的方案详情
         * @param {string} HTML_TAB - 目前显示的Tab
         * @param {number} TotalMinutes - 后勤总分钟数
         * @param {number} TotalGreatSuccessRate - 总大成功概率, 单位%, 范围0~100
         * @param {number} ExecutionTimes - 后勤执行次数
         * @param {Array.<Array.<number>>} MissionsDetails - 需要打印的关卡们的详情, 0关卡名称-1~8资源契约-9关卡时间-10关卡完成时间表
         * @param {number} startTime - 后勤开始时间, 换算成从零点开始的总分钟数
         */

    }, {
        key: "printAll",
        value: function printAll(HTML_TAB, TotalMinutes, TotalGreatSuccessRate, ExecutionTimes, MissionsDetails, startTime) {
            this.printShownTab(HTML_TAB);
            this.printTotalTime(TotalMinutes);
            this.printGreatSuccessRate(TotalGreatSuccessRate);
            this.printExecutionTimes(ExecutionTimes);
            this.printMissions(MissionsDetails);
            this.printMissionsHourly(MissionsDetails, HTML_TAB);
            this.printMissionsTotal(MissionsDetails, TotalMinutes, ExecutionTimes, HTML_TAB);
            this.printChart(MissionsDetails, TotalMinutes, startTime);
        }
    }]);

    return PlanDetails;
}();

/**
 * 用于保存上次打印chart的参数, 若这次参数一致则意味着chart没有改变, 可跳过打印
 * @type {{missionsName: Array.<string>, collectTimetable: Array.<string>, totalTime: number, startTIme: number}}
 */


PlanDetails._chartLastParam = { missionsName: [], collectTimetable: [], totalTime: -1, startTIme: -1 };

/**绘图Fun */
function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.5;
    var rectShape = echarts.graphic.clipRectByRect({
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height
    }, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
    });
    return rectShape && {
        type: 'rect',
        shape: rectShape,
        style: api.style()
    };
}

/**打印方案详情 */
function printPlanDetails() {
    var ShownTab = getShownTab();
    var TotalMinutes = ShownTab.getTotalTime(false);
    var TotalGreatSuccessRate = Input_getTotalGreatSuccessRate();
    var ExecutionTimes = Input_getExecutionTimes();
    var StartTime = Input_getStartTime();
    PlanDetails.printAll(ShownTab.name, TotalMinutes, TotalGreatSuccessRate, ExecutionTimes, MissionsDetails.getSelectedMissionsDetails(), StartTime);
}

var ResultsPlan = function () {
    function ResultsPlan() {
        _classCallCheck(this, ResultsPlan);
    }

    _createClass(ResultsPlan, null, [{
        key: "clear",

        /**
         * 清除ResultsPlan
         * @public
         */
        value: function clear() {
            this._lastResultsPlan = [];
            this._lastSortBy = "Ranking";
        }

        /**
         * 不安全地返回上次的resultsPlan
         * 
         * 0Ranking序号-1关卡1-2关卡2-3关卡3-4关卡4-5~12 8种资源契约-自定义内容...
         * @returns {Array.<Array>}
         * @public
         */

    }, {
        key: "getLastResultsPlan",
        value: function getLastResultsPlan() {
            return this._lastResultsPlan;
        }

        /**
         * 返回上次的排序方式
         * @public
         */

    }, {
        key: "getLastSortBy",
        value: function getLastSortBy() {
            return this._lastSortBy;
        }

        /**
         * 打印方案结果列表, 包括微调工具.
         * @param {Array.<Array>} result_plan - 需要打印的方案, 默认按上次的方案打印
         * @param {string} sortBy - 根据哪种方式进行排序, 默认按上次排序方式排序
         * @public
         */

    }, {
        key: "print",
        value: function print() {
            var result_plan = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._lastResultsPlan;
            var sortBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._lastSortBy;

            //隐藏"开始排序"提示
            document.getElementById("start_ranking_html").style.display = "none";

            //若没有方案, 则打印"没有方案"
            if (result_plan.length === 0) {
                document.getElementById("Plan_Table").innerHTML = language.JS.NoPlan;
                this.clear();
            } else {
                //保存Plan Table横向位置, 用于点击排序后或微调后恢复位置
                var table_scrollLeft = 0;
                var table_elem = document.getElementById("result_plan_table");
                if (table_elem !== null) table_scrollLeft = table_elem.scrollLeft;

                //根据sortBy对result_plan排序
                var sorted_result_plan = this.sortResultPlan(result_plan, sortBy);

                //开始打印
                var Table = document.getElementById("Plan_Table");
                Table.innerHTML = this._getPrintHtml(sorted_result_plan);

                //点击排序后或微调后恢复位置
                if (table_scrollLeft != 0) document.getElementById("result_plan_table").scrollLeft = table_scrollLeft;

                //保存此次打印用的方案与排序方式
                this._lastResultsPlan = sorted_result_plan;
                this._lastSortBy = sortBy;
            }
        } //End print

        /**
        * 对方案排序
        * @param {Array.<Array>} result_plan - 需要排序的方案
        * @param {string} sortBy - 排序方式
        * @returns {Array.<Array>} 排序后的方案
        * @public
        */

    }, {
        key: "sortResultPlan",
        value: function sortResultPlan(result_plan, sortBy) {
            var sorted_result_plan = result_plan.slice();
            switch (sortBy) {
                case "Ranking":
                    quick_sort_expand_ascending(sorted_result_plan, 0);break;
                case "Manp":
                    quick_sort_expand_descending(sorted_result_plan, 5);break;
                case "Ammu":
                    quick_sort_expand_descending(sorted_result_plan, 6);break;
                case "Rati":
                    quick_sort_expand_descending(sorted_result_plan, 7);break;
                case "Part":
                    quick_sort_expand_descending(sorted_result_plan, 8);break;
                case "TPro":
                    quick_sort_expand_descending(sorted_result_plan, 9);break;
                case "Equi":
                    quick_sort_expand_descending(sorted_result_plan, 10);break;
                case "QPro":
                    quick_sort_expand_descending(sorted_result_plan, 11);break;
                case "QRes":
                    quick_sort_expand_descending(sorted_result_plan, 12);break;
            }
            return sorted_result_plan;
        }

        /**
         * @param {Array.<Array>} sorted_result_plan - 需要打印的方案
         * @returns {string} 打印的html
         * @private
         */

    }, {
        key: "_getPrintHtml",
        value: function _getPrintHtml(sorted_result_plan) {
            var tab = "";
            tab += '<div class="table-responsive" id="result_plan_table" style="margin-bottom: 0;">';
            tab += '<table class="table table-striped table-hover table-responsive text-nowrap" style="margin-bottom: 0; text-align: center; border: 0;">';
            var ShownTab = getShownTab();
            tab += ShownTab.printPlanTableTitle() + '<tbody>';

            //所有资源契约值单位都为/min, 需要Minutes计算显示值
            var Minutes = 60;
            if (!is_CalculateByHour()) Minutes = ShownTab.getTotalTime(false);

            for (var i = 0; i < sorted_result_plan.length; i++) {
                tab += "<tr tabindex='0' id='print_result_plan_tr_" + i + "'>";
                for (var ii = 0; ii < 4; ii++) {
                    //关卡
                    tab += "<td style='width: 5%;'>";
                    tab += "" + sorted_result_plan[i][ii + 1];
                    tab += "</td>";
                }
                for (var _ii6 = 4; _ii6 < 8; _ii6++) {
                    //资源, 保留两位小数
                    tab += "<td style='width:" + ShownTab.PlanTableResourceAndContractWidth + "'>";
                    tab += "" + Math.round(sorted_result_plan[i][_ii6 + 1] * Minutes * 10) / 10;
                    tab += "</td>";
                }
                for (var _ii7 = 8; _ii7 < 12; _ii7++) {
                    //契约, 保留两位小数
                    tab += "<td style='width:" + ShownTab.PlanTableResourceAndContractWidth + ";'>";
                    tab += "" + Math.round(sorted_result_plan[i][_ii7 + 1] * Minutes * 100) / 100;
                    tab += "</td>";
                }

                //Tab自定义内容
                var one_plan_length = sorted_result_plan[0].length;
                for (var _ii8 = 13; _ii8 < one_plan_length; _ii8++) {
                    tab += "<td style='width:" + ShownTab.PlanTableResourceAndContractWidth + ";'>";
                    tab += sorted_result_plan[i][_ii8];
                    tab += "</td>";
                }

                tab += "</tr>";
            }
            tab += '</tbody>';
            return tab;
        } //End getPrintHtml

    }]);

    return ResultsPlan;
}();

/**
 * 上次打印时所用的结果方案
 * 
 * 0Ranking序号-1关卡1-2关卡2-3关卡3-4关卡4-5~12 8种资源契约-自定义内容...
 * @type {Array.<Array.<number|string>>}
 * @private
 */


ResultsPlan._lastResultsPlan = [];

/**
 * 上次的排序方式
 * @type {string}
 * @private
 */
ResultsPlan._lastSortBy;

/**
 * 是否有排序结果?
 * @returns {boolean}
 */
function hasResultPlan() {
    var Plan_Table_innerHTML = document.getElementById("Plan_Table").innerHTML;
    return Plan_Table_innerHTML !== "" && Plan_Table_innerHTML !== language.JS.NoPlan;
}
//微调工具在排序之后才能够使用
//使用start_ranking()最后计算的已经标准化归一化的目标值计算
//且Qvalid的length也已经被限制, 确保能够更快地计算出结果

var FineTuning = function () {
    function FineTuning() {
        _classCallCheck(this, FineTuning);
    }

    _createClass(FineTuning, null, [{
        key: "clear",

        /**
         * 清除FineTuning
         * @public
         */
        value: function clear() {
            this._TargetValue_Original = [0, 0, 0, 0, 0, 0, 0, 0];
            this._TargetValue = [0, 0, 0, 0, 0, 0, 0, 0];
            this._ShownTab = -1;
        }

        /**
         * 设置FineTuning
         * @param {Array.<number>} TargetValue
         * @param {Tab|Tab_Anytime|Tab_Timetable} ShownTab
         * @public
         */

    }, {
        key: "setFineTuning",
        value: function setFineTuning(TargetValue, ShownTab) {
            this._TargetValue_Original = TargetValue.slice();
            this._TargetValue = TargetValue.slice();
            this._ShownTab = ShownTab;
        }

        /**
         * 获取目标值
         * @public
         */

    }, {
        key: "getTargetValue",
        value: function getTargetValue() {
            return this._TargetValue.slice();
        }

        /**
         * 获取ShownTab对象
         * @public
         */

    }, {
        key: "getShownTab",
        value: function getShownTab() {
            return this._ShownTab;
        }

        /**
         * 对某一TargetValue进行修改
         * @param {number} Operator - 操作(减或加), 减为-1, 否则为1
         * @param {string} ID - 修改的某一Target的名称
         * @public
         */

    }, {
        key: "changeTargetValue",
        value: function changeTargetValue(Operator, ID) {
            var TargetName = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];
            var IDIndex = TargetName.indexOf(ID);
            if (Operator === -1) this._TargetValue[IDIndex] -= this._TargetValue_Original[IDIndex] / 50;else this._TargetValue[IDIndex] += this._TargetValue_Original[IDIndex] / 50;
        }
    }, {
        key: "print",
        value: function print() {
            //若没有方案结果, 则跳过
            if (!hasResultPlan()) return;

            var Tool = document.getElementById("FineTuning");
            var TargetName = ['MT', 'AT', 'RT', 'PT', 'TT', 'ET', 'QPT', 'QRT'];

            //如果已存在FineTuning, 不再重新打印, 只进行更新
            if (Tool.innerHTML !== "") {
                for (var i = 0; i < 8; i++) {
                    var Target_0 = this._TargetValue_Original[i];
                    var Target = this._TargetValue[i];
                    if (Target_0 === 0 || Target - Target_0 / 50 <= 0 || Target - Target_0 / 50 < Target_0 * 0.9) {
                        var minus_elem = $("#FineTuning_minus_" + TargetName[i]);
                        if (minus_elem.attr("disabled") !== "disabled") minus_elem.attr("disabled", "disabled");
                    } else {
                        var _minus_elem = $("#FineTuning_minus_" + TargetName[i]);
                        if (_minus_elem.attr("disabled") === "disabled") _minus_elem.removeAttr("disabled");
                    }
                    if (Target_0 === 0 || Target + Target_0 / 50 >= 1 || Target + Target_0 / 50 > Target_0 * 1.14) {
                        var plus_elem = $("#FineTuning_plus_" + TargetName[i]);
                        if (plus_elem.attr("disabled") !== "disabled") plus_elem.attr("disabled", "disabled");
                    } else {
                        var _plus_elem = $("#FineTuning_plus_" + TargetName[i]);
                        if (_plus_elem.attr("disabled") === "disabled") _plus_elem.removeAttr("disabled");
                    }
                }
                return;
            }

            var lang = language.JS;
            var TargetHTMLText = [lang.FineTuningManp, lang.FineTuningAmmu, lang.FineTuningRati, lang.FineTuningPart, lang.FineTuningTPro, lang.FineTuningEqui, lang.FineTuningQPro, lang.FineTuningQRes];
            var HTML = '<div class="panel panel-default" style="margin-bottom:5px">';
            HTML += '<div class="panel-heading">';
            HTML += '<h4 class="panel-title"><a data-toggle="collapse" id="FineTuningTool_panelTitle" href="#FineTuningTool" class="collapsed">' + lang.FineTuningTool + '</a></h4></div>';
            HTML += '<div id="FineTuningTool" class="panel-collapse collapse"';
            if (IsMobile()) HTML += 'style="transition: none;"';
            HTML += '>';
            HTML += '<div class="panel-body" style="padding-left: 5px; padding-right: 5px;">';
            for (var _i17 = 0; _i17 < 8; _i17++) {
                if (_i17 === 0) HTML += '<div class="col-lg-6 col-md-6 col-sm-6" style="padding-left: 5px; padding-right: 5px;">';
                if (_i17 === 4) HTML += '</div> <div class="col-lg-6 col-md-6 col-sm-6" style="padding-left: 5px; padding-right: 5px;">';
                HTML += '<div class="form-group input-group" style="margin-bottom: 10px; width: 100%;">';
                HTML += '<span class="input-group-addon" style="width:auto;" id="FineTuningTool_' + TargetName[_i17] + '">' + TargetHTMLText[_i17] + '</span>';
                HTML += '<div class="input-group-btn" style="width: ' + language.CSS.FineTuningButton_Width + ';">';
                HTML += '<button class="btn btn-default" style="width: 50%;" type="button" id="FineTuning_minus_' + TargetName[_i17] + '"';
                var _Target_ = this._TargetValue_Original[_i17];
                var _Target = this._TargetValue[_i17];
                if (_Target_ === 0 || _Target - _Target_ / 50 <= 0 || _Target - _Target_ / 50 < _Target_ * 0.9) HTML += 'disabled="disabled"';
                HTML += 'title="' + language.HTMLJS.FineTuning_minus + '"><b>-</b></button>';
                HTML += '<button class="btn btn-default" style="width: 50%;" type="button" id="FineTuning_plus_' + TargetName[_i17] + '"';
                if (_Target_ === 0 || _Target + _Target_ / 50 >= 1 || _Target + _Target_ / 50 > _Target_ * 1.14) HTML += 'disabled="disabled"';
                HTML += 'title="' + language.HTMLJS.FineTuning_plus + '"><b>+</b></button>';
                HTML += '</div></div>';
            }
            HTML += '</div></div></div></div>';
            Tool.innerHTML = HTML;
        }
    }]);

    return FineTuning;
}();

/**
 * 上次主排序留下的原始目标值
 * @type {Array.<number>}
 * @private
 */


FineTuning._TargetValue_Original = [];

/**
 * 微调后的目标值
 * @type {Array.<number>}
 * @private
 */
FineTuning._TargetValue = [];

/**
 * 上次主排序留下的原始ShownTab
 * @type {Tab|Tab_Anytime|Tab_Timetable}
 * @private
 */
FineTuning._ShownTab = -1;

var MissionsDetails = function () {
    function MissionsDetails() {
        _classCallCheck(this, MissionsDetails);
    }

    _createClass(MissionsDetails, null, [{
        key: "getSelectedMissions",

        /**
         * 返回已选择的关卡名称, 已按关卡名称排序
         * @param {boolean} NeedSort - 是否需要按关卡名称排序, 默认是
         * @public
         */
        value: function getSelectedMissions() {
            var NeedSort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            var selectedMissions = this._selectedMissions.slice();
            if (NeedSort) return selectedMissions.sort(sortStringNumber);else return selectedMissions;
        }

        /**
         * 重新设置selectedMissions数组
         * @param {Array.<string>} new_selectedMissions - 新的选择关卡
         */

    }, {
        key: "setSelectedMissions",
        value: function setSelectedMissions(new_selectedMissions) {

            this._selectedMissions = new_selectedMissions;
        }

        /**
         * 选中某一关卡, 添加进selectedMissions
         * @param {string} missionName - 增加的关卡的名称
         * @public
         */

    }, {
        key: "selectMission",
        value: function selectMission(missionName) {

            this._selectedMissions.push(missionName);
        }

        /**
         * 删去一个已选择的关卡
         * @param {string=} missionName - 删除关卡的名称, 默认值为数组中第一个关卡
         * @public
         */

    }, {
        key: "deleteSelectedMission",
        value: function deleteSelectedMission() {
            var missionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._selectedMissions[0];

            this._selectedMissions.remove_First(missionName);
        }

        /**
         * 返回已选择的关卡详情, 已按关卡名称排序
         * @public
         */

    }, {
        key: "getSelectedMissionsDetails",
        value: function getSelectedMissionsDetails() {
            var selectedMissionsDetails = [];
            var selectedMissions = this.getSelectedMissions();
            var mission_table = this._missionsTable;
            for (var i = 0; i < selectedMissions.length; i++) {
                var rowIndex = this.getMissionsTableRowIndex(selectedMissions[i]);
                selectedMissionsDetails.push(mission_table[rowIndex]);
            }
            return selectedMissionsDetails;
        }

        /**
         * 依据获取方式返回MissionsTable, 获取方式:
         * 
         * "default": 返回MissionsTable.slice()
         * 
         * "quick": 快速获取, 直接返回, 可能会修改MissionsTable, 不安全
         * 
         * "missionSort": 返回按方案名称排序的MissionsTable.slice()
         * @param {string=} method - 获取方式
         * @public
         */

    }, {
        key: "getMissionsTable",
        value: function getMissionsTable() {
            var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";

            switch (method) {
                case "default":
                    return this._missionsTable.slice();
                case "quick":
                    return this._missionsTable;
                case "missionSort":
                    var missionsTable = this._missionsTable.slice();
                    quick_sort_expand_ascending_missionName(missionsTable, 0);
                    return missionsTable;
            }
        }

        /**
         * 由关卡名称返回MissionsTable的行索引
         * @param {string} missionName - 关卡名称
         */

    }, {
        key: "getMissionsTableRowIndex",
        value: function getMissionsTableRowIndex(missionName) {
            var rowIndex = -1;
            var missionsTable_length = this._missionsTable.length;
            for (var i = 0; i < missionsTable_length; i++) {
                if (missionName === this._missionsTable[i][0]) {
                    rowIndex = i;
                    break;
                }
            }

            return rowIndex;
        }

        /**
         * 设置私有变量_missionsTable, 按关卡排序
         * @public
         */

    }, {
        key: "setMissionsTable",
        value: function setMissionsTable() {
            var ShownTab = getShownTab();
            this._missionsTable = ShownTab.getQValid(false);

            //Tab_Anytime为快速计算最小间隔, 不按关卡排序, 所以还得重新排序
            this._sortMissionsTable("Mission");
        }

        /**
         * 对missionsTable排序
         * @param {string} sortBy - 排序依据
         * @private
         */

    }, {
        key: "_sortMissionsTable",
        value: function _sortMissionsTable(sortBy) {
            switch (sortBy) {
                case "Mission":
                    quick_sort_expand_ascending_missionName(this._missionsTable, 0);
                    break;
                case "Manp":
                    quick_sort_expand_descending(this._missionsTable, 1);
                    break;
                case "Ammu":
                    quick_sort_expand_descending(this._missionsTable, 2);
                    break;
                case "Rati":
                    quick_sort_expand_descending(this._missionsTable, 3);
                    break;
                case "Part":
                    quick_sort_expand_descending(this._missionsTable, 4);
                    break;
                case "TPro":
                    quick_sort_expand_descending(this._missionsTable, 5);
                    break;
                case "Equi":
                    quick_sort_expand_descending(this._missionsTable, 6);
                    break;
                case "QPro":
                    quick_sort_expand_descending(this._missionsTable, 7);
                    break;
                case "QRes":
                    quick_sort_expand_descending(this._missionsTable, 8);
                    break;
                case "Time":
                    quick_sort_expand_ascending(this._missionsTable, 9);
                    break;

            }
        }

        /**
         * 打印方案详情, 第一次打印(或重新打印)必须以关卡排序, 不需要输入排序方式 
         * 若输入排序方式, 则不再重新计算MissionsTable
         * @param {string=} sortBy - 排序方式
         * @public
         */

    }, {
        key: "print",
        value: function print(sortBy) {
            //第一次打印, 设置MissionsTable, 否则设置sortBy
            if (sortBy !== undefined) this._sortMissionsTable(sortBy);else this.setMissionsTable();

            var missionsTable = this._missionsTable;
            var missionsTable_length = missionsTable.length;
            var selectedMissions = this.getSelectedMissions();

            //显示资源契约的值所需的分钟数
            var time_calculate = 60;
            if (!is_CalculateByHour()) {
                var ShownTab = getShownTab();
                time_calculate = ShownTab.getTotalTime(false);
            }

            //main
            var tab = "";
            for (var i = 0; i < missionsTable_length; i++) {
                tab += '<tr id="MissionTable_' + i + '" tabindex="0"';
                for (var ii = 0; ii < selectedMissions.length; ii++) {
                    if (selectedMissions[ii] === missionsTable[i][0]) {
                        selectedMissions.splice(ii, 1);
                        tab += 'class="success"';
                        break;
                    }
                }
                tab += '><td>' + missionsTable[i][0] + '</td>';
                for (var _ii9 = 1; _ii9 < 9; _ii9++) {
                    tab += '<td>' + NumberAutoExact(missionsTable[i][_ii9] * time_calculate) + '</td>';
                }
                tab += '<td>' + TimeFormat(missionsTable[i][9]) + '</td>';
                tab += '</tr>';
            }

            //当重新打印关卡详情时, 可能导致原先选择的关卡不再显示, 于是需要删除这些关卡
            for (var _i18 = 0; _i18 < selectedMissions.length; _i18++) {
                this._selectedMissions.remove_First(selectedMissions[_i18]);
            }

            if (missionsTable_length === 0) tab = '<tr><td colspan="10">' + language.JS.NoMission + '</td></tr>';

            document.getElementById("MissionTable_tbody").innerHTML = tab;
        } //End print

    }]);

    return MissionsDetails;
}();

/**
 * 关卡详情列表, 不一定按方案名称排序
 * @type {Array.<Array.<string|number>>}
 * @private
 */


MissionsDetails._missionsTable = [];

/**
 * 选择的关卡名称, 最多4个, 不一定按方案名称排序
 * @type {Array.<string>}
 * @private
 */
MissionsDetails._selectedMissions = [];
/**
 * 打印方案结果列表, 包括微调工具.
 * @param {Array.<Array>=} result_plan - 需要打印的方案, 默认按上次的方案打印
 * @param {string=} sortBy - 根据哪种方式进行排序, 默认按上次排序方式排序
 * @public
 */
function printResultsPlan(result_plan, sortBy) {
    ResultsPlan.print(result_plan, sortBy);
    FineTuning.print();

    //如果已经在MissionTable选择了四个关卡, 且这四个关卡就是result_plan的某一个方案, 则高亮
    var selectedMissions = MissionsDetails.getSelectedMissions();
    if (selectedMissions.length === 4) highlightResultsPlanRow(selectedMissions);
}

/**
 * 按照排序方式重新打印方案结果列表, 包括微调工具.
 * @param {string} sortBy - 根据哪种方式进行排序
 */
function sortResultsPlan(sortBy) {
    var result_plan = ResultsPlan.getLastResultsPlan();
    printResultsPlan(result_plan, sortBy);
}

/**
 * 若排序结果的某一方案满足missionsName, 高亮
 * @param {Array.<string>} missionsName - 4个关卡名称
 */
function highlightResultsPlanRow(missionsName) {
    var result_plan = ResultsPlan.getLastResultsPlan().slice();
    var result_plan_length = result_plan.length;
    for (var i = 0; i < result_plan_length; i++) {
        if (missionsName[0] === result_plan[i][1] && missionsName[1] === result_plan[i][2] && missionsName[2] === result_plan[i][3] && missionsName[3] === result_plan[i][4]) {
            $("#print_result_plan_tr_" + i).addClass("success");
            break;
        }
    }
}

/**
 * 点击某行的事件
 * @param {number} Row - 点击的行数
 */
function ResultsPlan_clickRow(Row) {
    var row_JQ_selector = $("#print_result_plan_tr_" + Row);
    if (!row_JQ_selector.hasClass("success")) {
        //该行未被选中, 选中
        //若其他行已被选中, 取消之前的选择
        var result_plan = ResultsPlan.getLastResultsPlan();
        var result_plan_length = result_plan.length;
        for (var i = 0; i < result_plan_length; i++) {
            var planRow_JQ_selector = $("#print_result_plan_tr_" + i);
            if (planRow_JQ_selector.hasClass("success")) planRow_JQ_selector.removeClass("success");
        }

        row_JQ_selector.addClass("success");

        //取消之前选择
        var selectedMissions = MissionsDetails.getSelectedMissions(false);
        for (var _i19 = 0; _i19 < selectedMissions.length; _i19++) {
            var index = MissionsDetails.getMissionsTableRowIndex(selectedMissions[_i19]);
            $("#MissionTable_" + index).removeClass("success");
        }
        for (var _i20 = 0; _i20 < 4; _i20++) {
            selectedMissions[_i20] = result_plan[Row][_i20 + 1];
        }

        MissionsDetails.setSelectedMissions(selectedMissions);
        printPlanDetails();
        for (var _i21 = 0; _i21 < 4; _i21++) {
            var _index = MissionsDetails.getMissionsTableRowIndex(selectedMissions[_i21]);
            $("#MissionTable_" + _index).addClass("success");
        }
    } else //该行已被选中, 取消选中
        row_JQ_selector.removeClass("success");
}

/**
 * 点击某行的事件
 * @param {number} Row - 点击的行数
 */
function MissionsDetails_clickRow(Row) {
    var row_JQ_selector = $("#MissionTable_" + Row);
    if (!row_JQ_selector.hasClass("success")) {
        //该行未被选中, 选中
        row_JQ_selector.addClass("success");
        //若已经选择了4个关卡, 则取消最开始选中的关卡
        var selectedMissions = MissionsDetails.getSelectedMissions(false);
        if (selectedMissions.length === 4) {
            var firstSelectedMissionIndex = MissionsDetails.getMissionsTableRowIndex(selectedMissions[0]);
            $("#MissionTable_" + firstSelectedMissionIndex).removeClass("success");
            MissionsDetails.deleteSelectedMission();
        }

        var missionName = MissionsDetails.getMissionsTable("quick")[Row][0];
        MissionsDetails.selectMission(missionName);
        printPlanDetails();

        //若已经选择了4个关卡, 则这四个关卡可能为排序结果的某一方案, 高亮那个方案
        if (selectedMissions.length >= 3 && hasResultPlan()) {
            var _selectedMissions = MissionsDetails.getSelectedMissions();
            highlightResultsPlanRow(_selectedMissions);
        }
    } else {
        //该行已被选中, 取消选中
        row_JQ_selector.removeClass("success");
        var _missionName = MissionsDetails.getMissionsTable("quick")[Row][0];
        MissionsDetails.deleteSelectedMission(_missionName);
        printPlanDetails();

        //若存在排序结果, 也取消排序结果的高亮
        if (hasResultPlan()) {
            var result_plan_length = ResultsPlan.getLastResultsPlan().length;
            for (var i = 0; i < result_plan_length; i++) {
                var tr_selector = $("#print_result_plan_tr_" + i);
                if (tr_selector.hasClass("success")) tr_selector.removeClass("success");
            }
        }
    }
}
window.onload = function () {
    checkLocalStorageWork();
    updateLocalStorage();

    setLanguage();

    loadHTML_Target();
    loadHTML_ChapterLimit();

    setPageByLocalStorage();

    //设置契约值(必要)
    var TotalGreatSuccessRate = Input_getTotalGreatSuccessRate(true);
    setQContract(TotalGreatSuccessRate);

    MissionsDetails.print();
    var ShownTab = getShownTab();
    PlanDetails.printShownTab(ShownTab.name);
    PlanDetails.printTotalTime(ShownTab.getTotalTime(false));
    PlanDetails.printGreatSuccessRate(TotalGreatSuccessRate);
    PlanDetails.printExecutionTimes(Input_getExecutionTimes());

    loadHTML_language();

    //根据移动设备或PC设备更改样式
    MobilePCDevice();

    //根据页面分辨率更改样式
    if (document.getElementById("setTargetInput").getBoundingClientRect().width <= 260) disableTargetButton();
    if (document.getElementById("wrapper").getBoundingClientRect().width <= 1600) document.getElementById("page-wrapper").style.marginLeft = "0";

    //用于checkLocalStorageWork()中检测是否由于localstorage不正确的数据导致浏览器崩溃
    if (CAN_STORAGE_WORK) sessionStorage.setItem("GF_Logistics_windowOnload", "success");
};

//当页面分辨率改变时调整样式
$(window).resize(function () {
    if (document.getElementById("setTargetInput").getBoundingClientRect().width <= 260) disableTargetButton();else enableTargetButton();
    if (document.getElementById("wrapper").getBoundingClientRect().width <= 1600) document.getElementById("page-wrapper").style.marginLeft = "0";else document.getElementById("page-wrapper").style.marginLeft = "250px";
});
/**Target宽度太短, 为避免输入框中看不全输入数字, 隐藏一些按钮 */
function disableTargetButton() {
    $("button[id^=Target_plus_10_]").attr("style", "display:none;");
    $("button[id^=Target_plus_0]").attr("style", "display:none;");
    $("button[id^=Target_minus_10_]").attr("style", "display:none;");
    $("button[id^=Target_minus_0]").attr("style", "display:none;");
}
/**Target宽度足够, 启用一些按钮 */
function enableTargetButton() {
    $("button[id^=Target_plus_10_]").attr("style", "padding-right:10px;padding-left:10px;border-radius:0;");
    $("button[id^=Target_plus_0]").attr("style", "padding-right:10px;padding-left:10px;border-radius:0;");
    $("button[id^=Target_minus_10_]").attr("style", "padding-right:10px;padding-left:10px;border-radius:0;");
    $("button[id^=Target_minus_0]").attr("style", "padding-right:10px;padding-left:10px;border-radius:0;");
}

/**根据localstorage或浏览器语言设置语言 */
function setLanguage() {
    var lang = storageGetItem("Lang");
    if (lang === "noStorage") lang = navigator.language || navigator.userLanguage;
    if (lang.substr(0, 2) === "zh") {
        switch (lang) {
            case "zh-HK":
            case "zh-TW":
            case "zh-MO":
                language = language_zh_TW;
                storageSetItem("Lang", "zh-TW");
                break;
            default:
                language = language_zh_CN;
                storageSetItem("Lang", "zh-CN");
        }
    } else {
        language = language_en;
        storageSetItem("Lang", "en");
    }
}

/**
 * 更改语言
 * @param {string} lang
 */
function changeLanguage(lang) {
    switch (lang) {
        case "zh-CN":
            storageSetItem("Lang", "zh-CN");
            language = language_zh_CN;
            break;
        case "zh-TW":
            storageSetItem("Lang", "zh-TW");
            language = language_zh_TW;
            break;
        case "en":
            storageSetItem("Lang", "en");
            language = language_en;
            break;
    }
    loadHTML_language();
}

/**根据移动设备或PC设备切换不同样式或进行优化 */
function MobilePCDevice() {
    if (IsMobile()) {
        document.getElementById("Saved").style.transition = "none";
        document.getElementById("MissionTable_panel").style.transition = "none";
        document.getElementById("calcTargetValueTool_panel").style.transition = "none";
        if (storageGetItem("IsSavedPanelShow") === "noStorage") {
            $("#MissionTable_panel").collapse("hide");
        }
        document.getElementById("page-header").style.marginTop = "20px";
        document.getElementById("container-fluid").style.padding = "0";
        document.getElementById("calcTargetValueTool_apply").innerHTML = "<span id=\"calcTargetValueTool_apply_text\">" + language.HTML.calcTargetValueTool_apply_text + "</span> &darr;";
    } else {
        document.getElementById("page-wrapper").style.marginLeft = "250px";
    }
}

//标签页
/**
 * 只更改Tab显示, 不更改由于Tab切换导致的其他模块
 * @param {string} tabName - tab名字
 * @param {boolean} isShow - 当点击HTML页面上的Tab标签切换, 不需要再通过该代码来重复切换Tab
 */
function ChangeTab(tabName) {
    var isShow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var Timetable_JQ_selector = $("#Tab_Timetable");
    var Anytime_JQ_selector = $("#Tab_Anytime");
    switch (tabName) {
        case "Anytime":
            if (isShow) $("#Tab_Anytime_name").tab("show");
            //用于getShownTab()判断目前显示的Tab, 现在添加class"in"会导致闪烁
            Timetable_JQ_selector.removeClass("active in");
            Anytime_JQ_selector.addClass("active");
            break;
        case "Timetable":
            if (isShow) $("#Tab_Timetable_name").tab("show");
            Anytime_JQ_selector.removeClass("active in");
            Timetable_JQ_selector.addClass("active");
            break;
    }
    storageSetItem("TabName", tabName);
}
/**更改Tab为Anytime, 包括其他模块 */
function ChangeTab_Anytime() {
    storageSetItem("TabName", "Anytime");
    ChangeTab("Anytime", false);
    delete_rankingResults();
    HTML_AllowRankingInput();
    MissionsDetails.print();
    printPlanDetails();
}
/**更改Tab为Timetable, 包括其他模块 */
function ChangeTab_Timetable() {
    storageSetItem("TabName", "Timetable");
    ChangeTab("Timetable", false);
    delete_rankingResults();
    HTML_AllowRankingInput();
    MissionsDetails.print();
    printPlanDetails();
}

/**更改为以每小时显示 */
function changeCalculateOutput_Hourly() {
    storageSetItem("HourlyOrTotal", "PerHour");
    $("#Demand").html(language.HTMLJS.Demand_hour);
    var ShownTab = getShownTab();
    var time = ShownTab.getTotalTime();
    var TargetValue = Input_getTarget_Correct();
    for (var i = 0; i < 8; i++) {
        TargetValue[i] = Math.round(TargetValue[i] / time * 6000) / 100;
    }
    Input_setTarget(TargetValue);
    MissionsDetails.print();
    if (hasResultPlan()) printResultsPlan();
}
/**更改为以总计显示 */
function changeCalculateOutput_Total() {
    storageSetItem("HourlyOrTotal", "Total");
    $("#Demand").html(language.HTMLJS.Demand_total);
    var ShownTab = getShownTab();
    var time = ShownTab.getTotalTime();
    var TargetValue = Input_getTarget_Correct();
    for (var i = 0; i < 8; i++) {
        TargetValue[i] = Math.round(TargetValue[i] * time * 100 / 60) / 100;
    }
    Input_setTarget(TargetValue);
    MissionsDetails.print();
    if (hasResultPlan()) printResultsPlan();
}

/**
 * 根据需求量的设定的按钮来设置需求量
 * @param {string} TargetInfo
 */
function setTarget(TargetInfo) {
    switch (TargetInfo) {
        case "HG":
            Input_setTarget([130, 130, 130, 130, 0, 0, 0, 0]);break;
        case "SMG":
            Input_setTarget([430, 430, 130, 230, 0, 0, 0, 0]);break;
        case "RF":
            Input_setTarget([430, 130, 430, 230, 0, 0, 0, 0]);break;
        case "AR":
            Input_setTarget([130, 430, 430, 130, 0, 0, 0, 0]);break;
        case "MG":
            Input_setTarget([730, 630, 130, 430, 0, 0, 0, 0]);break;
        case "SG":
            Input_setTarget([800, 200, 800, 400, 0, 0, 0, 0]);break;
        case "2221":
            Input_setTarget([400, 400, 400, 200, 0, 0, 0, 0]);break;
        case "Clear":
            Input_setTarget();
            Input_setContractWeight();
            break;
    }
}

/**
 * 按下某一需求量增减按钮来更改需求量
 * @param {string} FullID - 某一需求量增减按钮ID
 */
function ChangeTarget(FullID) {
    var ID = stringSliceFromLast_(FullID);
    var IDStart = FullID.indexOf(ID);
    var FullID_2 = FullID.slice(0, IDStart - 1);
    var changeValue = parseFloat(stringSliceFromLast_(FullID_2));
    if (FullID_2.slice(7, 8) === "m") changeValue *= -1;
    var id_JQ_selector = $("#" + ID);
    var OriginalValue = Input_getTarget_Correct(id_JQ_selector, false);
    Input_setTarget(OriginalValue + changeValue, id_JQ_selector);
}

function HTML_DisableRankingInput() {
    if (document.getElementById("start_ranking").style.display === "none") return;
    $("#Time_Anytime_hours").attr("disabled", "true");
    $("#Time_Anytime_minutes").attr("disabled", "true");
    $("#Tab_Anytime_MinimumIntervalTime_minutes").attr("disabled", "true");
    $("#Time_Timetable_hours").attr("disabled", "true");
    $("#Time_Timetable_minutes").attr("disabled", "true");
    $("#tab_Timetable_deleteall").attr("disabled", "true");
    $("button[id^=Tab_Timetable_range_thumb_]").attr("disabled", "true");
    $("#Tab_Timetable_new_hours").attr("disabled", "true");
    $("#Tab_Timetable_new_minutes").attr("disabled", "true");
    $("#Tab_Timetable_AddNewTimePoint").attr("disabled", "true");
    $("#GreatSuccessRate").attr("disabled", "true");
    $("#GreatSuccessRateUp").attr("disabled", "true");
    document.getElementById("GreatSuccessRateUp_text").style.cursor = "not-allowed";
    document.getElementById("GreatSuccessRateUp_label").style.cursor = "not-allowed";
    $("#ChapterLimit").attr("disabled", "true");
    $("#calcTargetValueTool_apply").attr("disabled", "true");
    $("#ContractWeight").attr("disabled", "true");
    document.getElementById("ContractWeight_thumb").style.backgroundColor = "#CCC";
    $("button[id^=setTarget_]").attr("disabled", "true");
    $("#MT").attr("disabled", "true");
    $("#AT").attr("disabled", "true");
    $("#RT").attr("disabled", "true");
    $("#PT").attr("disabled", "true");
    $("#TT").attr("disabled", "true");
    $("#ET").attr("disabled", "true");
    $("#QPT").attr("disabled", "true");
    $("#QRT").attr("disabled", "true");
    $("button[id^=Target_minus_]").attr("disabled", "true");
    $("button[id^=Target_plus_]").attr("disabled", "true");
    document.getElementById("start_ranking").style.display = "none";
    document.getElementById("clear_ranking").style.display = "";
}

function HTML_AllowRankingInput() {
    if (document.getElementById("start_ranking").style.display !== "none") return;
    $("#Time_Anytime_hours").removeAttr("disabled");
    $("#Time_Anytime_minutes").removeAttr("disabled");
    $("#Tab_Anytime_MinimumIntervalTime_minutes").removeAttr("disabled");
    if (Tab_Timetable_TIMELIST.length === 0) {
        $("#Time_Timetable_hours").removeAttr("disabled");
        $("#Time_Timetable_minutes").removeAttr("disabled");
    }
    $("#tab_Timetable_deleteall").removeAttr("disabled");
    $("button[id^=Tab_Timetable_range_thumb_]").removeAttr("disabled");
    $("#Tab_Timetable_new_hours").removeAttr("disabled");
    $("#Tab_Timetable_new_minutes").removeAttr("disabled");
    $("#Tab_Timetable_AddNewTimePoint").removeAttr("disabled");
    $("#GreatSuccessRate").removeAttr("disabled");
    $("#GreatSuccessRateUp").removeAttr("disabled");
    document.getElementById("GreatSuccessRateUp_text").style.cursor = "pointer";
    document.getElementById("GreatSuccessRateUp_label").style.cursor = "pointer";
    $("#ChapterLimit").removeAttr("disabled");
    $("#calcTargetValueTool_apply").removeAttr("disabled");
    $("#ContractWeight").removeAttr("disabled");
    document.getElementById("ContractWeight_thumb").style.backgroundColor = "rgb(112, 166, 236)";
    $("button[id^=setTarget_]").removeAttr("disabled");
    $("#MT").removeAttr("disabled");
    $("#AT").removeAttr("disabled");
    $("#RT").removeAttr("disabled");
    $("#PT").removeAttr("disabled");
    $("#TT").removeAttr("disabled");
    $("#ET").removeAttr("disabled");
    $("#QPT").removeAttr("disabled");
    $("#QRT").removeAttr("disabled");
    $("button[id^=Target_minus_]").removeAttr("disabled");
    $("button[id^=Target_plus_]").removeAttr("disabled");
    document.getElementById("start_ranking").style.display = "";
    document.getElementById("clear_ranking").style.display = "none";
}

function delete_rankingResults() {
    document.getElementById("start_ranking_html").style.display = "";
    document.getElementById("FineTuning").innerHTML = "";
    document.getElementById("Plan_Table").innerHTML = "";
    FineTuning.clear();
    ResultsPlan.clear();
}

var Plan_Original = function () {
    /**
     * @param {Tab|Tab_Anytime|Tab_Timetable} ShownTab
     * @param {number} list_length
     */
    function Plan_Original(ShownTab, list_length) {
        _classCallCheck(this, Plan_Original);

        /**
         * 方案列表
         * @type {Array.<Array.<number>>} 
         */
        this.List = this._setList(list_length);
        this.List_length = list_length;
        this.List_lastIndex = list_length - 1;

        this.ShownTab = ShownTab;
    }
    /**
     * @param {number} list_length 
     * @private
     */


    _createClass(Plan_Original, [{
        key: "_setList",
        value: function _setList(list_length) {
            var List = new Array(list_length);
            for (var i = 0; i < list_length; i++) {
                List[i] = new Array(13);
            }
            return List;
        }

        /**
         * 开始排序
         * @public
         */

    }, {
        key: "ranking",
        value: function ranking() {
            var Q_Valid_length = this.ShownTab.getQValidLength();
            var n1_max = Q_Valid_length - 3;
            var n2_max = Q_Valid_length - 2;
            var n3_max = Q_Valid_length - 1;
            var n4_max = Q_Valid_length;
            for (var n1 = 0; n1 < n1_max; n1++) {
                for (var n2 = n1 + 1; n2 < n2_max; n2++) {
                    for (var n3 = n2 + 1; n3 < n3_max; n3++) {
                        for (var n4 = n3 + 1; n4 < n4_max; n4++) {
                            this._calculateAndPushIntoList(n1, n2, n3, n4);
                        }
                    }
                }
            }
        }

        /**
         * 将方案插入方案列表中, 方案价值越大越好
         * @param {number} Mission_1
         * @param {number} Mission_2
         * @param {number} Mission_3
         * @param {number} Mission_4
         * @param {number} planValue - 方案价值, 越大代表方案越好
         * @param {Array.<number>} currentValue - 方案的资源契约值(/min)
         * @private
         */

    }, {
        key: "_pushIntoList",
        value: function _pushIntoList(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue) {
            if (!(0 in this.List[this.List_lastIndex])) this._pushIntoFirstEmpty(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);else this._push(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
        }
    }, {
        key: "_pushIntoFirstEmpty",
        value: function _pushIntoFirstEmpty(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue) {
            var row = this.List_lastIndex;
            while (row !== 0 && !(0 in this.List[row - 1])) {
                row--;
            }this._pushIntoThisRow(row, Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
            this._sortList(row, planValue);
        }
    }, {
        key: "_push",
        value: function _push(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue) {
            var listLastIndex = this.List_lastIndex;
            if (planValue <= this.List[listLastIndex][12]) return;
            this._pushIntoThisRow(listLastIndex, Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
            this._sortList(listLastIndex, planValue);
        }
    }, {
        key: "_pushIntoThisRow",
        value: function _pushIntoThisRow(row, Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue) {
            this.List[row] = [Mission_1, Mission_2, Mission_3, Mission_4, currentValue[0], currentValue[1], currentValue[2], currentValue[3], currentValue[4], currentValue[5], currentValue[6], currentValue[7], planValue];
        }
    }, {
        key: "_sortList",
        value: function _sortList(row, planValue) {
            for (var i = row - 1; i >= 0; i--) {
                if (planValue > this.List[i][12]) {
                    ;
                    var _ref11 = [this.List[i], this.List[i + 1]];
                    this.List[i + 1] = _ref11[0];
                    this.List[i] = _ref11[1];
                } else break;
            }
        }
        //End pushIntoList()

    }]);

    return Plan_Original;
}();

/**
 * 正式排序前为标准化归一化而进行的一次大致排序
 * @class
 */


var Plan_Stdzn = function (_Plan_Original) {
    _inherits(Plan_Stdzn, _Plan_Original);

    /**
     * QValidMaxLength限制是为正式排序做准备, 减少无用关卡以加快计算速度
     * @param {Tab|Tab_Anytime|Tab_Timetable} ShownTab - 已经setQValid的ShownTab
     * @param {number} list_length
     * @param {number} QValidMaxLength_firstCalc - 用于这次限制QValid长度加快计算
     * @param {number} QValidMaxLength_secondCalc - 用于正式计算, 若QValid.length大于, 则还需进行更详细的关卡价值计算
     */
    function Plan_Stdzn(ShownTab, list_length, QValidMaxLength_firstCalc, QValidMaxLength_secondCalc) {
        _classCallCheck(this, Plan_Stdzn);

        var _this3 = _possibleConstructorReturn(this, (Plan_Stdzn.__proto__ || Object.getPrototypeOf(Plan_Stdzn)).call(this, ShownTab, list_length));

        var QValid_length = _this3.ShownTab.getQValidLength();
        _this3.QValidMaxLength_1 = Math.min(QValidMaxLength_firstCalc, QValid_length);
        _this3.QValidMaxLength_2 = Math.min(QValidMaxLength_secondCalc, QValid_length);

        //如果Qvalid大于第二次计算最大限制长度, 将再计算关卡价值以便排除无用的关卡
        if (QValid_length > QValidMaxLength_secondCalc) {
            _this3._calculateAndPushIntoList = _this3._calculateAndPushIntoList_andCalculateMissionsValue;

            //用来记录关卡价值
            var Qvalid_missionValue = new Array(_this3.QValidMaxLength_1);
            Qvalid_missionValue.fill(0);
            _this3.Qvalid_missionValue = Qvalid_missionValue;
        } else _this3._calculateAndPushIntoList = _this3._calculateAndPushIntoList_normal;

        _this3.targetValue_html = _this3._correctTargetValueHTML();
        _this3.targetValue = _this3._correctTargetValue();
        _this3._norm_target = _this3._getNorm(_this3.targetValue);
        return _this3;
    }
    /** 
     * 取得页面上的TargetValue, 并防止资源(或契约)之间之比过大(最大5000倍)
     * @returns {Array.<number>}
     */


    _createClass(Plan_Stdzn, [{
        key: "_correctTargetValueHTML",
        value: function _correctTargetValueHTML() {
            var targetValue_html = Input_getTarget_Correct();
            var ResourceValue = targetValue_html.slice(0, 4);
            var ContractValue = targetValue_html.slice(4, 8);
            ResourceValue = this._correctTargetValueHTML_main(ResourceValue);
            ContractValue = this._correctTargetValueHTML_main(ContractValue);
            targetValue_html = ResourceValue.concat(ContractValue);
            Input_setTarget(targetValue_html);
            return targetValue_html;
        }
        /** @param {Array.<number>} Array4 - 资源或契约数组, 长度为4 */

    }, {
        key: "_correctTargetValueHTML_main",
        value: function _correctTargetValueHTML_main(Array4) {
            var MaxValue = ArrayMax(Array4);
            var MinValue = Math.round(MaxValue / 5000 * 100) / 100;
            for (var i = 0; i < 4; i++) {
                if (Array4[i] !== 0) Array4[i] = Math.max(MinValue, Array4[i]);
            }
            return Array4;
        }
    }, {
        key: "_correctTargetValue",
        value: function _correctTargetValue() {
            var ResourceValue = this._correctResourceValue();
            var ContractValue = this._correctContractValue();
            var TargetValue = ResourceValue.concat(ContractValue);
            if ("" + TargetValue === "0,0,0,0,0,0,0,0") {
                alert(language.JS.TargetValue0_alert);
                throw "Warning: TargetValue cannot all be 0!";
            }
            return TargetValue;
        }
    }, {
        key: "_correctResourceValue",
        value: function _correctResourceValue() {
            var ResourceValue = this.targetValue_html.slice(0, 4);
            var Resource_CalibrationValue = 100 - Input_getContractWeight();
            if (this._valuesNotAll0(ResourceValue)) this._correctValue(ResourceValue, Resource_CalibrationValue);
            return ResourceValue;
        }
    }, {
        key: "_correctContractValue",
        value: function _correctContractValue() {
            var ContractValue = this.targetValue_html.slice(4, 8);
            var Contract_CalibrationValue = Input_getContractWeight();
            if (this._valuesNotAll0(ContractValue)) this._correctValue(ContractValue, Contract_CalibrationValue);
            return ContractValue;
        }
    }, {
        key: "_valuesNotAll0",
        value: function _valuesNotAll0(Values) {
            for (var i = 0; i < Values.length; i++) {
                if (Values[i] !== 0) return true;
            }
            return false;
        }
        /**
         * @param {Array.<number>} Values 
         * @param {number} CalibrationValue 
         */

    }, {
        key: "_correctValue",
        value: function _correctValue(Values, CalibrationValue) {
            var CorrectionRate = CalibrationValue / ArrayMax(Values);
            for (var i = 0; i < Values.length; i++) {
                Values[i] *= CorrectionRate;
            }
        }
        //End constructor

        /**
         * 取得向量(数组)的模
         * @param {Array.<number>} vector - 8维向量
         * @returns {number} 模
         * @private
         */

    }, {
        key: "_getNorm",
        value: function _getNorm(vector) {
            var sumOfSquares = 0;
            for (var i = 0; i < 8; i++) {
                sumOfSquares += Math.pow(vector[i], 2);
            }
            return Math.pow(sumOfSquares, 0.5);
        }

        /**
         * 开始排序
         * @public
         */

    }, {
        key: "ranking",
        value: function ranking() {
            this.ShownTab.deleteUselessMissions(this.QValidMaxLength_1, this.targetValue);
            _get(Plan_Stdzn.prototype.__proto__ || Object.getPrototypeOf(Plan_Stdzn.prototype), "ranking", this).call(this);
            if (this.ShownTab.getQValidLength() > this.QValidMaxLength_2) this.ShownTab.deleteUselessMissions(this.QValidMaxLength_2, this.targetValue, this.Qvalid_missionValue);
        }

        /**
         * 由四个关卡计算出方案, 并添加进方案列表中, 并计算关卡价值
         * @param {number} Mission_1
         * @param {number} Mission_2
         * @param {number} Mission_3
         * @param {number} Mission_4
         * @private
         */

    }, {
        key: "_calculateAndPushIntoList_andCalculateMissionsValue",
        value: function _calculateAndPushIntoList_andCalculateMissionsValue(Mission_1, Mission_2, Mission_3, Mission_4) {
            var currentValue = this.ShownTab.calculateCurrentValue(Mission_1, Mission_2, Mission_3, Mission_4);

            //ShownTab的计算现值函数返回全为-1的数组, 说明由于某些原因该组合不可用
            if (currentValue[0] === -1) {
                return;
            }

            var planValue = this._calculateValue(currentValue);

            //计算关卡价值, 将该方案价值加入该方案的所有关卡价值中
            var Qvalid_missionValue = this.Qvalid_missionValue;
            Qvalid_missionValue[Mission_1] += planValue;
            Qvalid_missionValue[Mission_2] += planValue;
            Qvalid_missionValue[Mission_3] += planValue;
            Qvalid_missionValue[Mission_4] += planValue;

            this._pushIntoList(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
        }

        /**
         * 由四个关卡计算出方案, 并添加进方案列表中
         * @param {number} Mission_1
         * @param {number} Mission_2
         * @param {number} Mission_3
         * @param {number} Mission_4
         * @private
         */

    }, {
        key: "_calculateAndPushIntoList_normal",
        value: function _calculateAndPushIntoList_normal(Mission_1, Mission_2, Mission_3, Mission_4) {
            var currentValue = this.ShownTab.calculateCurrentValue(Mission_1, Mission_2, Mission_3, Mission_4);

            //ShownTab的计算现值函数返回全为-1的数组, 说明由于某些原因该组合不可用
            if (currentValue[0] === -1) {
                return;
            }

            var planValue = this._calculateValue(currentValue);
            this._pushIntoList(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
        }

        /**
         * 方案价值算法 目标向量与现值向量的点积与余弦相似度的乘积
         * @param {Array.<number>} _currentValue
         * @private
         */

    }, {
        key: "_calculateValue",
        value: function _calculateValue(_currentValue) {
            var targetValue = this.targetValue;

            //因为这种计算方案价值算法考虑了目标向量与现值向量的余弦相似度
            //当某一目标值为0, 对应现值也应计为0, 否则会由于余弦相似度减小导致方案价值变小
            var currentValue = [0, 0, 0, 0, 0, 0, 0, 0];
            if (targetValue[0] !== 0) currentValue[0] = _currentValue[0];
            if (targetValue[1] !== 0) currentValue[1] = _currentValue[1];
            if (targetValue[2] !== 0) currentValue[2] = _currentValue[2];
            if (targetValue[3] !== 0) currentValue[3] = _currentValue[3];
            if (targetValue[4] !== 0) currentValue[4] = _currentValue[4] * 500;
            if (targetValue[5] !== 0) currentValue[5] = _currentValue[5] * 500;
            if (targetValue[6] !== 0) currentValue[6] = _currentValue[6] * 500;
            if (targetValue[7] !== 0) currentValue[7] = _currentValue[7] * 500;

            var norm_current = this._getNorm(currentValue);
            if (norm_current === 0) return 0;
            var dotProduct = this._getDotProduct(currentValue, targetValue);
            var currentScalarProjection = dotProduct / this._norm_target;
            var COStheta = currentScalarProjection / norm_current;

            //acos近似算法
            var theta_ = (-0.698131700797732 * COStheta * COStheta - 0.872664625997164) * COStheta + 1.57079632679489;
            var theta = 0 < theta_ ? theta_ : 0;

            var cosineSimilarity_ = 1 - 0.5 * theta;
            var cosineSimilarity = cosineSimilarity_ * cosineSimilarity_;
            return currentScalarProjection * cosineSimilarity;
        }

        /**
         * 计算两个8维向量(数组)的点积
         * @param {Array.<number>} vector1 - 数组长度为8
         * @param {Array.<number>} vector2 - 数组长度为8
         * @private
         */

    }, {
        key: "_getDotProduct",
        value: function _getDotProduct(vector1, vector2) {
            var dotProduct = 0;
            for (var i = 0; i < 8; i++) {
                //vector1 == vector2 == 8
                dotProduct += vector1[i] * vector2[i];
            }
            return dotProduct;
        }

        /**
         * 在ranking之后可计算标准化的TargetValue
         * @returns {Array.<number>} 已标准化的targetValue
         * @public
         */

    }, {
        key: "getStdznTargetValue",
        value: function getStdznTargetValue() {
            var targetValue = this._getAvgCurrentByList();
            var target_Resource = targetValue.slice(0, 4);
            target_Resource.class = "Resource";
            var target_Contract = targetValue.slice(4, 8);
            target_Contract.class = "Contract";
            var Resource_CalibrationValue = this._getCalibration(target_Resource);
            var Contract_CalibrationValue = this._getCalibration(target_Contract);
            for (var i = 0; i < 4; i++) {
                if (Resource_CalibrationValue !== 0) targetValue[i] = this.targetValue_html[i] / Resource_CalibrationValue;else targetValue[i] = 0;
            }
            for (var _i22 = 4; _i22 < 8; _i22++) {
                if (Contract_CalibrationValue !== 0) targetValue[_i22] = this.targetValue_html[_i22] / Contract_CalibrationValue;else targetValue[_i22] = 0;
            }
            return targetValue;
        }
        /**
         * 由List的实际能获取到的资源契约来假定targetValue
         * @returns {Array.<number>} 每种资源契约在所有方案中平均(不计入0)获取到的值
         * @private
         */

    }, {
        key: "_getAvgCurrentByList",
        value: function _getAvgCurrentByList() {
            var avgCurrentValue = [0, 0, 0, 0, 0, 0, 0, 0];
            var validLength = new Array(8);
            var list = this.List;
            validLength.fill(this.List_length);
            for (var i = 0; i < 8; i++) {
                for (var ii = 0; ii < this.List_length; ii++) {
                    avgCurrentValue[i] += list[ii][i + 4];
                    if (list[ii][i + 4] === 0) validLength[i]--;
                }
            }
            for (var _i23 = 0; _i23 < 8; _i23++) {
                if (validLength[_i23] === 0) avgCurrentValue[_i23] = 0;else avgCurrentValue[_i23] /= validLength[_i23];
            }
            return avgCurrentValue;
        }
        /**
         * @param {Array.<number>} target_0 - 资源或契约目标值(4数组)
         * @private
         */

    }, {
        key: "_getCalibration",
        value: function _getCalibration(target_0) {
            var target_0_html = this._getTarget0Html(target_0.class);
            var current_0_max = this._getCurrent0Max(target_0.class);
            var calibration = 0;
            var validLength = target_0.length;
            for (var i = 0; i < target_0.length; i++) {
                if (target_0[i] !== 0) {
                    calibration += target_0_html[i] / target_0[i];
                    if (target_0_html[i] === 0) validLength--;
                } else validLength--;
            }
            if (calibration !== 0) calibration /= validLength;else {
                var Current_0_AMAX = 0;
                var _validLength = target_0.length;
                for (var _i24 = 0; _i24 < target_0.length; _i24++) {
                    if (current_0_max[_i24] !== 0) Current_0_AMAX += current_0_max[_i24];else _validLength--;
                }
                if (_validLength === 0) Current_0_AMAX = 0;else Current_0_AMAX /= _validLength;
                var Target_0_html_MAX = ArrayMax(target_0_html);
                calibration = Target_0_html_MAX / Current_0_AMAX;
            }
            return calibration;
        }
        /**
         * @param {string} target_0_class
         * @returns {Array.<number>}
         * @private
         */

    }, {
        key: "_getTarget0Html",
        value: function _getTarget0Html(target_0_class) {
            var target_0_html = new Array(4);
            if (target_0_class === "Resource") target_0_html = this.targetValue_html.slice(0, 4);else target_0_html = this.targetValue_html.slice(4, 8);
            return target_0_html;
        }
        /**
         * @param {string} target_0_class
         * @returns {Array.<number>}
         * @private
         */

    }, {
        key: "_getCurrent0Max",
        value: function _getCurrent0Max(target_0_class) {
            var current_0_max = new Array(4);
            if (target_0_class === "Resource") current_0_max = this.ShownTab.getCurrentValueMax().slice(0, 4);else current_0_max = this.ShownTab.getCurrentValueMax().slice(4, 8);
            return current_0_max;
        }
    }]);

    return Plan_Stdzn;
}(Plan_Original);

/**
 * 正式排序, 在此之前需要标准化归一化数据
 * @class
 */


var Plan = function (_Plan_Original2) {
    _inherits(Plan, _Plan_Original2);

    /**
     * @param {Tab|Tab_Anytime|Tab_Timetable} ShownTab - 已经setQValid的ShownTab
     * @param {number} list_length
     * @param {Array.<number>} targetValue_StandardizationAndNormalization - 资源契约目标值(已进行标准化归一化的值)
     */
    function Plan(ShownTab, list_length, targetValue_StandardizationAndNormalization) {
        _classCallCheck(this, Plan);

        var _this4 = _possibleConstructorReturn(this, (Plan.__proto__ || Object.getPrototypeOf(Plan)).call(this, ShownTab, list_length));

        _this4.targetValue = targetValue_StandardizationAndNormalization;

        //由于已标准化归一化, 当方案的现值小于目标值一半可以直接跳过
        _this4.targetValue_half = _this4.targetValue.slice();
        for (var i = 0; i < 8; i++) {
            _this4.targetValue_half[i] = _this4.targetValue_half[i] * 0.5;
        }
        return _this4;
    }

    /**
     * 由四个关卡计算出方案, 并添加进方案列表中
     * @param {number} Mission_1
     * @param {number} Mission_2
     * @param {number} Mission_3
     * @param {number} Mission_4
     * @private
     */


    _createClass(Plan, [{
        key: "_calculateAndPushIntoList",
        value: function _calculateAndPushIntoList(Mission_1, Mission_2, Mission_3, Mission_4) {
            var currentValue = this.ShownTab.calculateCurrentValue(Mission_1, Mission_2, Mission_3, Mission_4);

            //ShownTab的计算现值函数返回全为-1的数组, 说明由于某些原因该组合不可用
            if (currentValue[0] === -1) return;

            for (var i = 0; i < 8; i++) {
                if (currentValue[i] < this.targetValue_half[i]) return;
            }

            var planValue = this._calculateValue(currentValue);
            this._pushIntoList(Mission_1, Mission_2, Mission_3, Mission_4, planValue, currentValue);
        }

        /**
         * 计算方案价值
         * @param {Array.<number>} currentValue
         * @private
         */

    }, {
        key: "_calculateValue",
        value: function _calculateValue(currentValue) {
            var value = 0;
            var minval = 99999999999;
            var targetValue = this.targetValue;
            for (var i = 0; i < 8; i++) {
                if (targetValue[i] !== 0) minval = Math.min(minval, currentValue[i] / targetValue[i]);
            }
            for (var _i25 = 0; _i25 < 8; _i25++) {
                value += this._calculateValue_main(targetValue[_i25], currentValue[_i25], minval);
            }
            return value;
        }
        /**
         * @param {number} target
         * @param {number} current
         * @param {number} minval
         * @private
         */

    }, {
        key: "_calculateValue_main",
        value: function _calculateValue_main(target, current, minval) {
            if (target === 0) return 0;
            return 0.5 * (Math.min(current, target) + Math.min(current, 1.5 * target * minval));
        }

        /**
         * 打印方案
         * @param {string} sortBy - 排序方式, 默认为Ranking
         * @public
         */

    }, {
        key: "print",
        value: function print() {
            var sortBy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Ranking";

            var ShownTab = this.ShownTab;
            var QValid = ShownTab.getQValid(true);
            var currentValue_MAX = ShownTab.getCurrentValueMax();
            var result_plan = [];

            for (var i = 0; i < this.List_length; i++) {
                var List_i_row = this.List[i];
                if (!(0 in List_i_row)) break;

                /**
                 * 0Ranking序号-1关卡1-2关卡2-3关卡3-4关卡4-5~12 8种资源契约-自定义内容...
                 * @type {Array.<number|string>}
                 */
                var one_plan = [];

                one_plan.push(i);
                var MissionsNumber = new Array(4);
                for (var ii = 0; ii < 4; ii++) {
                    MissionsNumber[ii] = QValid[List_i_row[ii]][0];
                }
                MissionsNumber = MissionsNumber.sort(sortStringNumber);
                for (var _ii10 = 0; _ii10 < 4; _ii10++) {
                    one_plan.push(MissionsNumber[_ii10]);
                }
                for (var _ii11 = 0; _ii11 < 8; _ii11++) {
                    one_plan.push(List_i_row[_ii11 + 4] * currentValue_MAX[_ii11]);
                }
                var customPrint = this.ShownTab.printTableCustomize(List_i_row[0], List_i_row[1], List_i_row[2], List_i_row[3]);
                for (var _ii12 = 0; _ii12 < customPrint.length; _ii12++) {
                    one_plan.push(customPrint[_ii12]);
                }
                result_plan.push(one_plan);
            }

            printResultsPlan(result_plan, sortBy);
        }
    }]);

    return Plan;
}(Plan_Original);
/**
 * QValid的最大长度, 用于第一次标准化计算限制QValid, 
 * 使第一次计算的计算时间减少. 由于只是使用未标准化的目标值来
 * 排除无用关卡, 不太准确, 不建议太小的值.
 */


var QValidMaxLength_firstCalc = 44;

/**
 * Qvalid的最大长度, 用于第一次标准化归一化计算后限制Qvalid, 
 * 使第二次计算和微调时计算时间更少. 由于微调功能会改变目标值, 
 * 可能导致目标值改变太大, 因此不建议过小的值排除太多关卡
 * 要小于QValidMaxLength_firstCalc, 否则可能导致bug
 */
var QValidMaxLength_secondCalc = 34;

/**
 * 主排序函数
 */
function start_ranking() {

    var ShownTab = getShownTab();

    //plan计算需要已经设置好的Qvalid的ShownTab
    ShownTab.setQValid();

    //调整目标值, 标准化归一化----
    var plan_Stdzn = new Plan_Stdzn(ShownTab, 8, QValidMaxLength_firstCalc, QValidMaxLength_secondCalc);
    plan_Stdzn.ranking();

    var targetValue_Stdzn = plan_Stdzn.getStdznTargetValue();
    var targetValue_StdznAndNorm = new Array(8);
    var currentValueMax = ShownTab.getCurrentValueMax();
    for (var i = 0; i < 8; i++) {
        targetValue_StdznAndNorm[i] = Math.min(1, targetValue_Stdzn[i] / currentValueMax[i]);
        targetValue_StdznAndNorm[i] = Math.max(targetValue_StdznAndNorm[i], 0);
    }
    ShownTab.normalizedQValid();
    //------------------------
    FineTuning.setFineTuning(targetValue_StdznAndNorm, ShownTab);

    var plan = new Plan(ShownTab, 16, targetValue_StdznAndNorm);
    plan.ranking();
    plan.print();
    HTML_DisableRankingInput();
}

/**
 * 对目标值修改, 开始重新排序
 * @param {number} Operator - 操作(减或加), 减为-1, 否则为1
 * @param {string} ID - 修改的某一Target的名称
 * @public
 */
function fineTuning_rank(Operator, ID) {

    FineTuning.changeTargetValue(Operator, ID);
    var ShownTab = FineTuning.getShownTab();
    var TargetValue = FineTuning.getTargetValue();
    var plan = new Plan(ShownTab, 16, TargetValue);
    plan.ranking();
    plan.print(ResultsPlan.getLastSortBy());
}

var Saved = function () {
    function Saved() {
        _classCallCheck(this, Saved);
    }

    _createClass(Saved, null, [{
        key: "getSaved",

        /**
         * @public
         */
        value: function getSaved() {
            return this._saved.slice();
        }

        /**
         * 保存方案
         * @public
         */

    }, {
        key: "saveThisPlan",
        value: function saveThisPlan() {
            if (this._saved.length >= 99) {
                alert(language.JS.Saved_alert2);
                return;
            }

            var name = prompt(language.JS.plzInputPlanName, language.JS.planDefaultName);
            if (name == null) return;
            if (name == "") name = language.JS.planDefaultName;

            var newData = {};
            newData.name = name;
            newData.GSRate = Input_getGreatSuccessRate();
            newData.is_UP = IsGreatSuccessRateUp();
            newData.Chapter = Input_getSelectChapter();
            var ShownTab = getShownTab();
            newData.TabName = ShownTab.name;
            newData.TabCustom = ShownTab.getSavedCustom();
            newData.Missions = MissionsDetails.getSelectedMissions();
            newData.startTime = Input_getStartTime();

            this._saved.push(newData);
            storageSetItem("Saved", this._saved);
            this._printLastSaved();
        }

        /**
         * 打印最后一个方案(用于刚刚添加了一个方案)
         * @private
         */

    }, {
        key: "_printLastSaved",
        value: function _printLastSaved() {
            var row = this._saved.length - 1;
            if (row === 0) document.getElementById("NoSaved").style.display = "none";
            var HTML = this._getSavedRowHTML(row);
            $("#Saved_Body").append(HTML);
            if (row !== 0) $("#SavedTable_down_" + (row - 1)).removeAttr("disabled");
        }

        /**
         * 获取Saved某行的HTML
         * @param {number} row - 打印的行数
         * @param {Saved._saved} allSaved - 所有的Saved数据
         * @private
         */

    }, {
        key: "_getSavedRowHTML",
        value: function _getSavedRowHTML(row) {
            var allSaved = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._saved;

            var HTML = '<tr id="SavedTable_row_' + row + '"';
            HTML += '><td><button type="button" class="btn btn-default"id="SavedTable_apply_' + row + '" title="' + language.HTMLJS.SavedTable_apply + '" style="background-color: #88E063;">';
            HTML += '<span class="glyphicon glyphicon-ok"style="top: 2px;" /></button></td><td><div class="form-group input-group" style="margin-bottom: 0;">';
            HTML += '<input type="text" class="form-control" style="min-width: 140px;"id="SavedTable_name_' + row + '" placeholder="' + language.HTMLJS.SavedTable_name + '"';
            HTML += 'value="' + allSaved[row].name + '"readonly="readonly">';
            HTML += '<div class="input-group-btn"><button type="button" class="btn btn-default"id="SavedTable_rename_' + row + '" title="' + language.HTMLJS.SavedTable_rename + '"><span class="glyphicon glyphicon-pencil"style="top: 2px;" /></button></div>';
            HTML += '</div></td>';
            HTML += '<td><div class="btn-group" style="min-width: 80px;"><button type="button" class="btn btn-default"id="SavedTable_up_' + row + '"" title="' + language.HTMLJS.SavedTable_up + '"';
            if (row === 0) HTML += 'disabled="disabled"';
            HTML += '>';
            HTML += '<span class="glyphicon glyphicon-arrow-up"style="top: 2px;" /></button>';
            HTML += '<button type="button" class="btn btn-default"id="SavedTable_down_' + row + '" title="' + language.HTMLJS.SavedTable_down + '"';
            if (row === allSaved.length - 1) HTML += 'disabled="disabled"';
            HTML += '><span class="glyphicon glyphicon-arrow-down"style="top: 2px;" /></button></div></td>';
            HTML += '<td><button type="button" class="btn btn-default"id="SavedTable_export_' + row + '" title="' + language.HTMLJS.SavedTable_export + '"><span class="glyphicon glyphicon-export"style="top: 2px;" /></button></td>';
            HTML += '<td><button type="button" class="btn btn-default"id="SavedTable_delete_' + row + '" title="' + language.HTMLJS.SavedTable_delete + '" style="background-color: #F48380;"><span class="glyphicon glyphicon-trash"style="top: 2px;" /></button></td></tr>';
            return HTML;
        }

        /**
         * 应用某行的方案
         * @param {number} row
         * @public
         */

    }, {
        key: "apply",
        value: function apply(row) {
            var data = this._saved[row];
            var tabName = data.TabName;
            ChangeTab(tabName);
            Input_setGreatSuccessRate(data.GSRate);
            Input_setGreatSuccessUpRate(data.is_UP);
            Input_setSelectChapter(data.Chapter);
            var ShownTab = getTabByName(tabName);
            ShownTab.applySavedCustom(data.TabCustom);
            MissionsDetails.setSelectedMissions(data.Missions);
            Input_setStartTime(data.startTime);

            delete_rankingResults();
            HTML_AllowRankingInput();
            MissionsDetails.print();
            printPlanDetails();
        }

        /**
         * 重命名某行Saved
         * @param {string} newName
         * @param {number} row
         * @public
         */

    }, {
        key: "rename",
        value: function rename(newName, row) {
            this._saved[row].name = newName;
            storageSetItem("Saved", this._saved);
        }

        /**
         * 将Saved的Row行往上移动一行
         * @param {number} row 
         * @public
         */

    }, {
        key: "upThisRow",
        value: function upThisRow(row) {
            $("#SavedTable_name_" + row).val(this._saved[row - 1].name);
            $("#SavedTable_name_" + (row - 1)).val(this._saved[row].name);
            var _ref12 = [this._saved[row - 1], this._saved[row]];
            this._saved[row] = _ref12[0];
            this._saved[row - 1] = _ref12[1];

            storageSetItem("Saved", this._saved);
        }

        /**
         * 将Saved的Row行往下移动一行
         * @param {number} row
         * @public
         */

    }, {
        key: "downThisRow",
        value: function downThisRow(row) {
            $("#SavedTable_name_" + row).val(this._saved[row + 1].name);
            $("#SavedTable_name_" + (row + 1)).val(this._saved[row].name);
            var _ref13 = [this._saved[row + 1], this._saved[row]];
            this._saved[row] = _ref13[0];
            this._saved[row + 1] = _ref13[1];

            storageSetItem("Saved", this._saved);
        }

        /**
         * 将Saved的Row行数据导出
         * @param {number} row
         * @public
         */

    }, {
        key: "export",
        value: function _export(row) {
            var data = this._saved[row];
            var MD5 = md5(JSON.stringify(data));
            var exportData = { data: data, MD5: MD5 };
            var exportText = JSON.stringify(exportData);
            exportText = LZString.compressToEncodedURIComponent(exportText);
            var export_elem = document.getElementById("importSaved_input");
            export_elem.value = exportText;
            export_elem.select();
        }

        /**
         * 将Saved的Row行删除
         * @param {number} row
         * @public
         */

    }, {
        key: "deleteThisRow",
        value: function deleteThisRow(row) {
            //如果不确认删除, 跳过
            var name = this._saved[row].name;
            var warning = language.JS.deleteSavedWarning_1 + '"' + name + '"' + language.JS.deleteSavedWarning_2;
            var flag = confirm(warning);
            if (!flag) return;

            for (var i = row; i < this._saved.length - 1; i++) {
                $("#SavedTable_name_" + i).val(this._saved[i + 1].name);
            }
            var elem_remove = document.getElementById("SavedTable_row_" + (this._saved.length - 1));
            document.getElementById("Saved_Body").removeChild(elem_remove);
            this._saved.splice(row, 1);
            if (this._saved.length !== 0) {
                $("#SavedTable_up_0").attr("disabled", "true");
                $("#SavedTable_down_" + (this._saved.length - 1)).attr("disabled", "true");
            } else document.getElementById("NoSaved").style.display = "";
        }

        /**
         * 导入数据到Saved最后(会进行MD5校验), 并打印最后一行
         * @param {string} inputText - 导入的数据
         */

    }, {
        key: "import",
        value: function _import(inputText) {
            var inputData = LZString.decompressFromEncodedURIComponent(inputText);
            try {
                var saved = JSON.parse(inputData);
                var MD5 = md5(JSON.stringify(saved.data));
                var result = MD5 === saved.MD5;
            } catch (ex) {}
            if (result) {
                this._saved.push(saved.data);
                storageSetItem("Saved", this._saved);
                this._printLastSaved();
            } else alert(language.JS.Saved_alert);
        }

        /**
         * 导入数据并覆盖Saved, 并打印全部Saved
         * @param {Saved._saved} newSaved - 新的Saved数据
         * @returns {boolean} 是否导入成功
         */

    }, {
        key: "setSaved",
        value: function setSaved(newSaved) {
            this._saved = newSaved;
            if (newSaved.length === 0) {
                document.getElementById("NoSaved").style.display = "";
                document.getElementById("Saved_Body").innerHTML = "";
            } else {
                document.getElementById("NoSaved").style.display = "none";
                var HTML = "";
                for (var i = 0; i < this._saved.length; i++) {
                    HTML += this._getSavedRowHTML(i);
                }
                document.getElementById("Saved_Body").innerHTML = HTML;
            }
            storageSetItem("Saved", this._saved);
            return true;
        }
    }]);

    return Saved;
}();

/**
 * [名称-计算方式-大成功概率-是否UP-关卡解锁-计算方式的详情-选择的关卡-开始时间]
 * @type {Array.<{name: string, TabName: string, GSRate: number, is_UP: boolean, Chapter: number, TabCustom: Array, Missions: Array.<string>, startTime: number}>}
 * @private
 */


Saved._saved = [];
function calcTargetValueTool_Clear() {
    Input_setCalcTargetValueTool_Target();
    Input_setCalcTargetValueTool_Current();
    Input_setCalcTargetValueTool_InputExecutionTimes();
    var resultName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    for (var i = 0; i < 8; i++) {
        $("#calcTargetValueTool_Result_" + resultName[i] + "_value").html("");
    }
}

/**计算需求量并返回 */
function calcTargetValueTool_startCalc() {
    var resultValue = [0, 0, 0, 0, 0, 0, 0, 0];
    var TargetValue = Input_getCalcTargetValueTool_Target(true);
    var CurrentValue = Input_getCalcTargetValueTool_Current(true);
    var ExecutionTimes = Input_getCalcTargetValueTool_InputExecutionTimes(true);
    for (var i = 0; i < 8; i++) {
        resultValue[i] = Math.max(0, (TargetValue[i] - CurrentValue[i]) / ExecutionTimes);
    }
    var resultName = ["Manp", "Ammu", "Rati", "Part", "TPro", "Equi", "QPro", "QRes"];
    for (var _i26 = 0; _i26 < 8; _i26++) {
        $("#calcTargetValueTool_Result_" + resultName[_i26] + "_value").html(NumberAutoExact(resultValue[_i26]));
    }
    return resultValue;
}

function calcTargetValueTool_apply() {
    var resultValue = calcTargetValueTool_startCalc();
    if (is_CalculateByHour()) {
        var ShownTab = getShownTab();
        var TotalTime = ShownTab.getTotalTime() / 60;
        for (var i = 0; i < 8; i++) {
            resultValue[i] /= TotalTime;
        }
    }
    Input_setTarget(resultValue);
}
/**
 * 通过localstorage的存储数据来初始化HTML页面
 */
function setPageByLocalStorage() {
    LS_setDescription();
    LS_setLocalstorageWarning();
    LS_setHTMLtab();
    LS_setPerHourOrTotal();
    LS_setTabAnytimeCustom();
    LS_setTabTimetableCustom();
    LS_setGreatSuccessRate();
    LS_setGreatSuccessRateUP();
    LS_setSelectChapter();
    LS_setContractWeight();
    LS_setTarget();
    LS_setSaved();
    LS_setSavedOrMissionsShow();
    LS_setCalcTargetValueTool();
}

/**
 * @param {boolean} display
 */
function LS_setDescription() {
    var display = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("Description_Display");

    if (display === false) document.getElementById("description").style.display = "none";
}

/**
 * @param {boolean} display
 */
function LS_setLocalstorageWarning() {
    var display = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("LocalstorageWarning_Display");

    if (display === false) document.getElementById("localstorageWarning").style.display = "none";
}

/**
 * @param {string} htmlTab
 */
function LS_setHTMLtab() {
    var htmlTab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("TabName");

    if (htmlTab === "Timetable") ChangeTab("Timetable");else ChangeTab("Anytime");
}

/**
 * @param {string} PerHourOrTotal
 */
function LS_setPerHourOrTotal() {
    var PerHourOrTotal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("HourlyOrTotal");

    if (PerHourOrTotal === "PerHour") {
        storageSetItem("HourlyOrTotal", "PerHour");
        document.getElementById("Display_PerHour").checked = true;
    } else {
        storageSetItem("HourlyOrTotal", "Total");
        document.getElementById("Display_Total").checked = true;
    }
}

/**
 * @param {Array.<number>} Custom
 */
function LS_setTabAnytimeCustom() {
    var Custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("TabAnytimeCustom");

    if (Custom !== "noStorage") {
        var Tab = new Tab_Anytime();
        Tab.applySavedCustom(Custom);
    }
}

/**
 * @param {Array.<number>} Custom
 */
function LS_setTabTimetableCustom() {
    var Custom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("TabTimetableCustom");

    if (Custom !== "noStorage") {
        var Tab = new Tab_Timetable();
        Tab.applySavedCustom(Custom);
    }
}

/**
 * @param {number} Rate
 */
function LS_setGreatSuccessRate() {
    var Rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("GreatSuccessRate");

    if (Rate !== "noStorage") Input_setGreatSuccessRate(Rate);
}

/**
 * @param {boolean} is_UP
 */
function LS_setGreatSuccessRateUP() {
    var is_UP = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("Is_GreatSuccessRateUP");

    if (is_UP !== "noStorage") Input_setGreatSuccessUpRate(is_UP, false);
}

/**
 * @param {number} Chapter
 */
function LS_setSelectChapter() {
    var Chapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("ChapterLimit");

    if (Chapter !== "noStorage") Input_setSelectChapter(Chapter);
}

/**
 * @param {number} Weight
 */
function LS_setContractWeight() {
    var Weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("ContractWeight");

    if (Weight !== "noStorage") Input_setContractWeight(Weight);
}

/**
 * @param {Array.<number>} Target
 */
function LS_setTarget() {
    var Target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("TargetValue");

    if (Target !== "noStorage") Input_setTarget(Target);
}

/**
 * @param {Saved._saved} saved
 */
function LS_setSaved() {
    var saved = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("Saved");

    if (saved !== "noStorage") Saved.setSaved(saved);
}

/**
 * @param {boolean} IsSavedPanelShow
 */
function LS_setSavedOrMissionsShow() {
    var IsSavedPanelShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("IsSavedPanelShow");

    if (IsSavedPanelShow === true) {
        if (Saved.getSaved().length === 0) storageSetItem("IsSavedPanelShow", false);else {
            document.getElementById("MissionTable_panel").style.transition = "none";
            document.getElementById("Saved").style.transition = "none";
            $("#Saved").collapse('show');
            $("#MissionTable_panel").collapse('hide');
        }
    }
}

/**
 * @param {Array.<number>} TargetValue
 * @param {Array.<number>} CurrentValue
 * @param {number} ExecutionTimes
 */
function LS_setCalcTargetValueTool() {
    var TargetValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : storageGetItem("CalcTargetValueTool_Target");
    var CurrentValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : storageGetItem("CalcTargetValueTool_Current");
    var ExecutionTimes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : storageGetItem("CalcTargetValueTool_ExecutionTimes");

    if (TargetValue !== "noStorage") Input_setCalcTargetValueTool_Target(TargetValue);
    if (CurrentValue !== "noStorage") Input_setCalcTargetValueTool_Current(CurrentValue);
    if (ExecutionTimes !== "noStorage") Input_setCalcTargetValueTool_InputExecutionTimes(ExecutionTimes);
}

/**
 * @type {{version: string, TabName: string, HourlyOrTotal: string, TabAnytimeCustom: Array.<number>, 
 * TabTimetableCustom: Array.<number>, GreatSuccessRate: number, Is_GreatSuccessRateUp: boolean, 
 * ChapterLimit: number, ContractWeight: number, TargetValue: Array.<number>, Saved: Saved._saved, 
 * CalcTargetValueTool_Target: Array.<number>, CalcTargetValueTool_Current: Array.<number>, 
 * CalcTargetValueTool_Execution: number}}
 */
var config_data_type_v_1_x_x = 0;

/**
 * 导出配置
 */
function config_export() {
    /**@type {config_data_type_v_1_x_x} */
    var data = {};
    data.version = VERSION;
    var ShownTab = getShownTab();
    data.TabName = ShownTab.name;
    if (is_CalculateByHour()) data.HourlyOrTotal = "PerHour";else data.HourlyOrTotal = "Total";
    var Tab = new Tab_Anytime();
    data.TabAnytimeCustom = Tab.getSavedCustom();
    Tab = new Tab_Timetable();
    data.TabTimetableCustom = Tab.getSavedCustom();
    data.GreatSuccessRate = Input_getGreatSuccessRate();
    data.Is_GreatSuccessRateUp = IsGreatSuccessRateUp();
    data.ChapterLimit = Input_getSelectChapter();
    data.ContractWeight = Input_getContractWeight();
    data.TargetValue = Input_getTarget_Correct();
    data.Saved = Saved.getSaved();
    data.CalcTargetValueTool_Target = Input_getCalcTargetValueTool_Target();
    data.CalcTargetValueTool_Current = Input_getCalcTargetValueTool_Current();
    data.CalcTargetValueTool_Execution = Input_getCalcTargetValueTool_InputExecutionTimes();

    var SHA1 = sha1(JSON.stringify(data));
    var config = { data: data, SHA1: SHA1 };
    config = JSON.stringify(config);
    config = LZString.compressToBase64(config);

    var config_elem = document.getElementById("Config_importInput");
    config_elem.value = config;
    config_elem.select();
}

/**
 * 导入配置
 * @param {string} input - 导入的数据
 */
function setPageByImport(input) {
    //debug
    if (input === "clearCONSOLE") {
        CONSOLE = "";
        if (CAN_STORAGE_WORK) sessionStorage.removeItem("GF_Logistics_console");
        return;
    }
    if (input === "clearSTORAGE" && CAN_STORAGE_WORK) {
        sessionStorage.removeItem("GF_Logistics_console");
        sessionStorage.removeItem("GF_Logistics_windowOnload");
        localStorage.removeItem("GF_Logistics");
        localStorage.removeItem("GF_Logistics_v1.x.x");
        return;
    }
    if (input === "runERROR") {
        error();
        return;
    }

    //当有saved, 询问是否要覆盖当前config
    var flag = true;
    if (Saved.getSaved().length !== 0) flag = confirm(language.JS.config_alert);
    if (flag !== true) return;

    try {
        //尝试导入v0版本
        var config = JSON.parse(input);
        var SHA1 = sha1(JSON.stringify(config.data));
        var result = SHA1 === config.SHA1;
    } catch (ex) {}
    if (result) {
        setPageByImport_main_v_0_x_x(config.data);
        delete_rankingResults();
        HTML_AllowRankingInput();
    } else {
        try {
            //尝试导入v1版本
            input = LZString.decompressFromBase64(input);
            var config = JSON.parse(input);
            var _SHA = sha1(JSON.stringify(config.data));
            var result = _SHA === config.SHA1;
        } catch (ex) {}
        if (result) {
            setPageByImport_main(config.data);
            delete_rankingResults();
            HTML_AllowRankingInput();
        } else alert(language.JS.Saved_alert);
    }
}

/**
 * 从v1.x.x版本的config导入到page
 * @param {config_data_type_v_1_x_x} data 
 */
function setPageByImport_main(data) {
    LS_setHTMLtab(data.TabName);
    LS_setPerHourOrTotal(data.HourlyOrTotal);
    LS_setTabAnytimeCustom(data.TabAnytimeCustom);
    LS_setTabTimetableCustom(data.TabTimetableCustom);
    LS_setGreatSuccessRate(data.GreatSuccessRate);
    LS_setGreatSuccessRateUP(data.Is_GreatSuccessRateUp);
    LS_setSelectChapter(data.ChapterLimit);
    LS_setContractWeight(data.ContractWeight);
    LS_setTarget(data.TargetValue);
    LS_setSaved(data.Saved);
    LS_setCalcTargetValueTool(data.CalcTargetValueTool_Target, data.CalcTargetValueTool_Current, data.CalcTargetValueTool_Execution);

    MissionsDetails.setSelectedMissions([]);
    MissionsDetails.print();
    printPlanDetails();
}

/**
 * 从v0.x.x版本的config导入到page
 * @param {Array} data - v0.x.x版本的config.data
 */
function setPageByImport_main_v_0_x_x(data) {
    /**@type {config_data_type_v_1_x_x} */
    var data_v_1_x_x = {};
    data_v_1_x_x.version = "0.x.x";
    data_v_1_x_x.TabName = data[0];
    data_v_1_x_x.HourlyOrTotal = data[1];
    data_v_1_x_x.TabAnytimeCustom = data[2];
    data_v_1_x_x.TabTimetableCustom = data[3];
    data_v_1_x_x.GreatSuccessRate = data[4];
    data_v_1_x_x.Is_GreatSuccessRateUp = data[5];
    data_v_1_x_x.ChapterLimit = data[6];
    data_v_1_x_x.ContractWeight = data[7];
    data_v_1_x_x.TargetValue = data[8];
    data_v_1_x_x.Saved = _savedData_v_0_x_x_To_v_1_x_x(data[9]);
    data_v_1_x_x.CalcTargetValueTool_Target = data[10];
    data_v_1_x_x.CalcTargetValueTool_Current = data[11];
    data_v_1_x_x.CalcTargetValueTool_Execution = data[12];

    setPageByImport_main(data_v_1_x_x);
}
function is_KeyIsEnter(e) {
    return e.which == 13;
}

//language
$(function () {
    $("#lang-zh-CN").on("click", function () {
        changeLanguage("zh-CN");
    });
    $("#lang-zh-TW").on("click", function () {
        changeLanguage("zh-TW");
    });
    $("#lang-en").on("click", function () {
        changeLanguage("en");
    });
});

//Config
$(function () {
    $("#Config_export").on("click", function () {
        config_export();
    });
    $("#Config_importButton").on("click", function () {
        var input_JQ_selector = $("#Config_importInput");
        var input = input_JQ_selector.val();
        setPageByImport(input);
        input_JQ_selector.val("");
    });
});

//Never Show Again
$(function () {
    $("#neverShowAgain_description").on("click", function () {
        storageSetItem("Description_Display", false);
        document.getElementById("description").style.display = "none";
    });
    $("#neverShowAgain_localstorageWarning").on("click", function () {
        storageSetItem("LocalstorageWarning_Display", false);
        document.getElementById("localstorageWarning").style.display = "none";
    });
});

//Tab
$(function () {
    $("#Tab_Anytime_name").on("click", function () {
        var ShownTab = getShownTab();
        if (ShownTab.name !== "Anytime") ChangeTab_Anytime();
    });
    $("#Tab_Timetable_name").on("click", function () {
        var ShownTab = getShownTab();
        if (ShownTab.name !== "Timetable") ChangeTab_Timetable();
    });
});

//Hourly Total
$(function () {
    $("input[id^=Display_]").on("click", function () {
        if (is_CalculateByHour()) changeCalculateOutput_Hourly();else changeCalculateOutput_Total();
    });
    $("#Display_PerHour_text").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) {
            document.getElementById("Display_PerHour").checked = true;
            changeCalculateOutput_Hourly();
        }
    });
    $("#Display_Total_text").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) {
            document.getElementById("Display_Total").checked = true;
            changeCalculateOutput_Total();
        }
    });
});

//GreatSuccess
$(function () {
    var JQ_selector_GreatSuccessRate = $("#GreatSuccessRate");
    JQ_selector_GreatSuccessRate.on("input propertychange", function () {
        var Rate = Input_getGreatSuccessRate();
        var is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP, false);
        var TotalRate = Rate + Input_getGreatSuccessUpRate(Rate);
        setQContract(TotalRate);
        MissionsDetails.print();
        printPlanDetails();
    });
    JQ_selector_GreatSuccessRate.blur(function () {
        var Rate = Input_getGreatSuccessRate();
        storageSetItem("GreatSuccessRate", Rate);
    });
    $("#GreatSuccessRateUp").on("click", function () {
        var is_RateUP = IsGreatSuccessRateUp();
        Input_setGreatSuccessUpRate(is_RateUP);
        var TotalRate = Input_getTotalGreatSuccessRate(true);
        setQContract(TotalRate);
        MissionsDetails.print();
        printPlanDetails();
        storageSetItem("Is_GreatSuccessRateUP", is_RateUP);
    });
});

//ChapterLimit
$(function () {
    $("#ChapterLimit").on("change", function () {
        MissionsDetails.print();
        printPlanDetails();
        storageSetItem("ChapterLimit", Input_getSelectChapter());
    });
});

//Tab_Anytime
$(function () {
    var JQ_selector_Time_Anytime_hours = $("#Time_Anytime_hours");
    var JQ_selector_Time_Anytime_minutes = $("#Time_Anytime_minutes");
    var JQ_selector_Tab_Anytime_MinimumIntervalTime_minutes = $("#Tab_Anytime_MinimumIntervalTime_minutes");
    JQ_selector_Time_Anytime_hours.on("input propertychange", function () {
        var TotalTime = Input_getAnytimeTotalTime();
        if (TotalTime > 4320) Input_setAnytimeTotalTime(4320);
        MissionsDetails.print();
        printPlanDetails();
    });
    JQ_selector_Time_Anytime_hours.blur(function () {
        Tab_Anytime_changeStorageCustom();
    });
    JQ_selector_Time_Anytime_minutes.on("input propertychange", function () {
        var TotalTime = Input_getAnytimeTotalTime();
        if (TotalTime > 4320) Input_setAnytimeTotalTime(4320);
        MissionsDetails.print();
        printPlanDetails();
    });
    JQ_selector_Time_Anytime_minutes.blur(function () {
        Tab_Anytime_changeStorageCustom();
    });
    JQ_selector_Tab_Anytime_MinimumIntervalTime_minutes.on("input propertychange", function () {
        MissionsDetails.print();
        printPlanDetails();
    });
    JQ_selector_Tab_Anytime_MinimumIntervalTime_minutes.blur(function () {
        Tab_Anytime_changeStorageCustom();
    });
});
function Tab_Anytime_changeStorageCustom() {
    var tab = new Tab_Anytime();
    storageSetItem("TabAnytimeCustom", tab.getSavedCustom());
}
//End Tab_Anytime

//Tab_Timetable
$(function () {
    var JQ_selector_Time_Timetable_hours = $("#Time_Timetable_hours");
    var JQ_selector_Time_Timetable_minutes = $("#Time_Timetable_minutes");
    JQ_selector_Time_Timetable_hours.on("input propertychange", function () {
        Tab_Timetable_changeSliderTotalTime();
    });
    JQ_selector_Time_Timetable_hours.blur(function () {
        Tab_Timetable_changeStorageCustom();
    });
    JQ_selector_Time_Timetable_minutes.on("input propertychange", function () {
        Tab_Timetable_changeSliderTotalTime();
    });
    JQ_selector_Time_Timetable_minutes.blur(function () {
        Tab_Timetable_changeStorageCustom();
    });
    var JQ_selector_Tab_Timetable_new_hours = $("#Tab_Timetable_new_hours");
    var JQ_selector_Tab_Timetable_new_minutes = $("#Tab_Timetable_new_minutes");
    JQ_selector_Tab_Timetable_new_hours.keyup(function (e) {
        if (is_KeyIsEnter(e)) JQ_selector_Tab_Timetable_new_minutes.focus();
    });
    JQ_selector_Tab_Timetable_new_minutes.keyup(function (e) {
        if (is_KeyIsEnter(e)) {
            if (JQ_selector_Tab_Timetable_new_hours.val() !== "") JQ_selector_Tab_Timetable_new_hours.focus();
            Tab_Timetable_AddNew();
        }
    });
    $("#Tab_Timetable_AddNewTimePoint").on("click", function () {
        Tab_Timetable_AddNew();
    });
    $("#Tab_Timetable_range").on("click", "button[id^=Tab_Timetable_range_thumb_]", function () {
        var time = parseFloat(stringSliceFromLast_(this.id));
        Tab_Timetable_DeleteThisTimePoint(time);
        MissionsDetails.print();
        printPlanDetails();
        Tab_Timetable_changeStorageCustom();
    });
    $("#tab_Timetable_deleteall").on("click", function () {
        Tab_Timetable_DeleteAllTimePoint();
        MissionsDetails.print();
        printPlanDetails();
        Tab_Timetable_changeStorageCustom();
    });
});
function Tab_Timetable_changeStorageCustom() {
    var Tab = new Tab_Timetable();
    storageSetItem("TabTimetableCustom", Tab.getSavedCustom());
}
function Tab_Timetable_AddNew() {
    var newTime = Input_getTimetableNewTotalTime_Correct();
    var TotalTime = Input_getTimetableTotalTime();
    switch (true) {
        case newTime === 0:
            alert(language.JS.tab_Timetable_alert1);
            break;
        case newTime > TotalTime:
            alert(language.JS.tab_Timetable_alert2);
            break;
        case newTime === TotalTime || Tab_Timetable_TIMELIST.indexOf(newTime) !== -1:
            alert(language.JS.tab_Timetable_alert3);
            break;
        default:
            Tab_Timetable_AddNewTimePoint(newTime);
    }
    if (Tab_Timetable_TIMELIST.length === 0) Tab_Timetable_InputTotalTime_enable();else Tab_Timetable_InputTotalTime_disable();
    MissionsDetails.print();
    printPlanDetails();
    Tab_Timetable_changeStorageCustom();
}
//End Tab_Timetable

//Target
$(function () {
    var JQ_selector_target = $("#target");
    JQ_selector_target.on("click", "button[id^=setTarget_]", function () {
        setTarget(stringSliceFromLast_(this.id));
    });
    $("#ContractWeight").change(function () {
        storageSetItem("ContractWeight", Input_getContractWeight());
    });
    JQ_selector_target.on("click", "button[id^=Target_minus_]", function () {
        ChangeTarget(this.id);
    });
    JQ_selector_target.on("click", "button[id^=Target_plus_]", function () {
        ChangeTarget(this.id);
    });
    JQ_selector_target.on("blur", "#MT", function () {
        TargetChangeStorage();
    });
    JQ_selector_target.on("keyup", "#MT", function (e) {
        if (is_KeyIsEnter(e)) $("#AT").focus();
    });
    JQ_selector_target.on("blur", "#AT", function () {
        TargetChangeStorage();
    });
    JQ_selector_target.on("keyup", "#AT", function (e) {
        if (is_KeyIsEnter(e)) $("#RT").focus();
    });
    JQ_selector_target.on("blur", "#RT", function () {
        TargetChangeStorage();
    });
    JQ_selector_target.on("keyup", "#RT", function (e) {
        if (is_KeyIsEnter(e)) $("#PT").focus();
    });
    JQ_selector_target.on("blur", "#PT", function () {
        TargetChangeStorage();
    });
    JQ_selector_target.on("keyup", "#PT", function (e) {
        if (is_KeyIsEnter(e)) $("#TT").focus();
    });
    JQ_selector_target.on("blur", "#TT", function () {
        TargetChangeStorage();
    });
    JQ_selector_target.on("keyup", "#TT", function (e) {
        if (is_KeyIsEnter(e)) $("#ET").focus();
    });
    JQ_selector_target.on("blur", "#ET", function () {
        TargetChangeStorage();
    });
    JQ_selector_target.on("keyup", "#ET", function (e) {
        if (is_KeyIsEnter(e)) $("#QPT").focus();
    });
    JQ_selector_target.on("blur", "#QPT", function () {
        TargetChangeStorage();
    });
    JQ_selector_target.on("keyup", "#QPT", function (e) {
        if (is_KeyIsEnter(e)) $("#QRT").focus();
    });
    JQ_selector_target.on("blur", "#QRT", function () {
        TargetChangeStorage();
    });
});
function TargetChangeStorage() {
    storageSetItem("TargetValue", Input_getTarget_Correct());
}
//End Target

//start_ranking
$(function () {
    $("#start_ranking").on("click", function () {
        start_ranking();
    });
    $("#clear_ranking").on("click", function () {
        delete_rankingResults();
        HTML_AllowRankingInput();
    });
});

//Result Plan
$(function () {
    //排序结果点击
    var JQ_selector_Plan_Table = $("#Plan_Table");
    JQ_selector_Plan_Table.on("click", "tr[id^=print_result_plan_tr_]", function () {
        ResultsPlan_clickRow(parseInt(stringSliceFromLast_(this.id)));
    });
    JQ_selector_Plan_Table.on("keyup", "tr[id^=print_result_plan_tr_]", function (e) {
        if (is_KeyIsEnter(e)) ResultsPlan_clickRow(parseInt(stringSliceFromLast_(this.id)));
    });
    //对排序结果某一项排序
    JQ_selector_Plan_Table.on("click", "th[id^=resultPlan_]", function () {
        _PlanSort(this.id);
    });
    JQ_selector_Plan_Table.on("keyup", "th[id^=resultPlan_]", function (e) {
        if (is_KeyIsEnter(e)) _PlanSort(this.id);
    });
});
function _PlanSort(elem_id) {
    var sortBy = stringSliceFromLast_(elem_id);
    if (sortBy === "Mission") sortBy = "Ranking";
    //如果重复点击同一排序方式, 跳过
    if (sortBy !== ResultsPlan.getLastSortBy()) sortResultsPlan(sortBy);
}
//End Result Plan

//Fine Tuning Tool
$(function () {
    var JQ_selector_FineTuning = $("#FineTuning");
    JQ_selector_FineTuning.on("click", "button[id^=FineTuning_minus_]", function () {
        fineTuning_rank(-1, stringSliceFromLast_(this.id));
    });
    JQ_selector_FineTuning.on("click", "button[id^=FineTuning_plus_]", function () {
        fineTuning_rank(1, stringSliceFromLast_(this.id));
    });
});

//Saved
$(function () {
    var JQ_selector_Saved_heading = $("#Saved_heading");
    JQ_selector_Saved_heading.on("keyup", function (e) {
        if (is_KeyIsEnter(e)) {
            if ($("#Saved_heading").attr("aria-expanded") === "false") {
                $("#MissionTable_panel").collapse("hide");
                $("#Saved").collapse("show");
            } else $("#Saved").collapse("hide");
        }
    });
    JQ_selector_Saved_heading.on("click", function () {
        if ($("#Saved_heading").attr("aria-expanded") === "false") {
            $("#MissionTable_panel").collapse("hide");
            $("#Saved").collapse("show");
        } else $("#Saved").collapse("hide");
    });
    $("#importSaved_importButton").on("click", function () {
        var input_selector = $("#importSaved_input");
        var input = input_selector.val();
        Saved.import(input);
        input_selector.val("");
    });
    var JQ_selector_Saved_Body = $("#Saved_Body");
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_apply_]", function () {
        Saved.apply(parseInt(stringSliceFromLast_(this.id)));
    });
    JQ_selector_Saved_Body.on("keydown", "input[id^=SavedTable_name_]", function (e) {
        if (is_KeyIsEnter(e)) {
            $("#" + this.id).attr("readOnly", true);
            var row = stringSliceFromLast_(this.id);
            if (this.value !== Saved.getSaved()[row].name) Saved.rename(this.value, row);
        }
    });
    JQ_selector_Saved_Body.on("blur", "input[id^=SavedTable_name_]", function () {
        $("#" + this.id).attr("readOnly", true);
        var row = stringSliceFromLast_(this.id);
        if (this.value !== Saved.getSaved()[row].name) Saved.rename(this.value, row);
    });
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_rename_]", function () {
        var Row = parseInt(stringSliceFromLast_(this.id));
        var JQ_selector = $("#SavedTable_name_" + Row);
        JQ_selector.attr("readOnly", false);
        JQ_selector.focus();
        JQ_selector.select();
    });
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_up_]", function () {
        Saved.upThisRow(parseInt(stringSliceFromLast_(this.id)));
    });
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_down_]", function () {
        Saved.downThisRow(parseInt(stringSliceFromLast_(this.id)));
    });
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_export_]", function () {
        Saved.export(parseInt(stringSliceFromLast_(this.id)));
    });
    JQ_selector_Saved_Body.on("click", "button[id^=SavedTable_delete_]", function () {
        Saved.deleteThisRow(parseInt(stringSliceFromLast_(this.id)));
    });
});
//End Saved

//MissionTable
$(function () {
    var JQ_selector_MissionTable_heading = $("#MissionTable_heading");
    var JQ_selector_MissionTable_panel = $("#MissionTable_panel");
    JQ_selector_MissionTable_heading.on("keyup", function (e) {
        if (is_KeyIsEnter(e)) {
            if (JQ_selector_MissionTable_panel.attr("aria-expanded") === "false") {
                JQ_selector_MissionTable_panel.collapse("show");
                $("#Saved").collapse("hide");
            } else JQ_selector_MissionTable_panel.collapse("hide");
        }
    });
    JQ_selector_MissionTable_heading.on("click", function () {
        if (JQ_selector_MissionTable_panel.attr("aria-expanded") === "false") {
            JQ_selector_MissionTable_panel.collapse("show");
            $("#Saved").collapse("hide");
        } else JQ_selector_MissionTable_panel.collapse("hide");
    });
    $("th[id^=MissionTable_head_]").on("click", function () {
        MissionsDetails.print(stringSliceFromLast_(this.id));
    });
    $("th[id^=MissionTable_head_]").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) MissionsDetails.print(stringSliceFromLast_(this.id));
    });
    $("#MissionTable_tbody").on("click", "tr[id^=MissionTable_]", function () {
        var row = parseInt(stringSliceFromLast_(this.id));
        MissionsDetails_clickRow(row);
    });
    $("#MissionTable_tbody").on("keyup", "tr[id^=MissionTable_]", function (e) {
        if (is_KeyIsEnter(e)) {
            var row = parseInt(stringSliceFromLast_(this.id));
            MissionsDetails_clickRow(row);
        }
    });
});
//End MissionTable

//Saved MissionTable Panel
$(function () {
    var JQ_selector_MissionTable_panel = $("#MissionTable_panel");
    JQ_selector_MissionTable_panel.on("shown.bs.collapse", function () {
        storageSetItem("IsSavedPanelShow", false);
    });
    JQ_selector_MissionTable_panel.on("hidden.bs.collapse", function () {
        if (!IsMobile()) document.getElementById("MissionTable_panel").style.transition = "";
    });
    $("#Saved").on("shown.bs.collapse", function () {
        storageSetItem("IsSavedPanelShow", true);
        if (!IsMobile()) document.getElementById("Saved").style.transition = "";
    });
});
//End Saved MissionTable Panel

//Plan Details
$(function () {
    $("#savePlan").on("click", function () {
        Saved.saveThisPlan();
    });
    $("#Capture").on("click", function () {
        html2canvas(document.getElementById("PlanDetails"), { logging: false, scale: 1 }).then(function (canvas) {
            var link = document.createElement("a");
            link.href = canvas.toDataURL();
            link.download = "Capture.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
    $("#PlanDetails_InputStartTime").on("input propertychange", function () {
        if (MissionsDetails.getSelectedMissions(false).length === 0) return;
        var selectedMissions = MissionsDetails.getSelectedMissionsDetails();
        var ShownTab = getShownTab();
        var TotalMinutes = ShownTab.getTotalTime(false);
        PlanDetails.printChart(selectedMissions, TotalMinutes, Input_getStartTime());
    });
    $("#PlanDetails_InputExecutionTimes").on("input propertychange", function () {
        PlanDetails.printExecutionTimes(Input_getExecutionTimes());
        if (MissionsDetails.getSelectedMissions(false).length !== 0) {
            var selectedMissions = MissionsDetails.getSelectedMissionsDetails();
            var ShownTab = getShownTab();
            var TotalMinutes = ShownTab.getTotalTime(false);
            var ExecutionTimes = Input_getExecutionTimes();
            PlanDetails.printMissionsTotal(selectedMissions, TotalMinutes, ExecutionTimes, ShownTab.name);
        }
    });
});
//End Plan Details

//calcTargetValueTool
$(function () {
    $("#calcTargetValueTool_clear").on("click", function () {
        calcTargetValueTool_Clear();
    });
    $("#calcTargetValueTool_startCalc").on("click", function () {
        calcTargetValueTool_startCalc();
    });
    $("#calcTargetValueTool_apply").on("click", function () {
        calcTargetValueTool_apply();
    });
    $("input[id^=calcTargetValueTool_Target_]").on("blur", function () {
        storageSetItem("CalcTargetValueTool_Target", Input_getCalcTargetValueTool_Target());
    });
    $("input[id^=calcTargetValueTool_Current_]").on("blur", function () {
        storageSetItem("CalcTargetValueTool_Current", Input_getCalcTargetValueTool_Current());
    });
    $("#calcTargetValueTool_InputExecutionTimes").on("blur", function () {
        storageSetItem("CalcTargetValueTool_ExecutionTimes", Input_getCalcTargetValueTool_InputExecutionTimes());
    });
    $("#calcTargetValueTool_Target_Manp").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Target_Ammu").focus();
    });
    $("#calcTargetValueTool_Target_Ammu").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Target_Rati").focus();
    });
    $("#calcTargetValueTool_Target_Rati").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Target_Part").focus();
    });
    $("#calcTargetValueTool_Target_Part").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Target_TPro").focus();
    });
    $("#calcTargetValueTool_Target_TPro").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Target_Equi").focus();
    });
    $("#calcTargetValueTool_Target_Equi").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Target_QPro").focus();
    });
    $("#calcTargetValueTool_Target_QPro").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Target_QRes").focus();
    });
    $("#calcTargetValueTool_Target_QRes").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Current_Manp").focus();
    });
    $("#calcTargetValueTool_Current_Manp").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Current_Ammu").focus();
    });
    $("#calcTargetValueTool_Current_Ammu").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Current_Rati").focus();
    });
    $("#calcTargetValueTool_Current_Rati").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Current_Part").focus();
    });
    $("#calcTargetValueTool_Current_Part").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Current_TPro").focus();
    });
    $("#calcTargetValueTool_Current_TPro").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Current_Equi").focus();
    });
    $("#calcTargetValueTool_Current_Equi").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Current_QPro").focus();
    });
    $("#calcTargetValueTool_Current_QPro").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_Current_QRes").focus();
    });
    $("#calcTargetValueTool_Current_QRes").on("keyup", function (e) {
        if (is_KeyIsEnter(e)) $("#calcTargetValueTool_InputExecutionTimes").focus();
    });
    //End calcTargetValueTool
});

$(function () {
    $("#debug").on("click", function () {
        $('#Config_importInput').val(CONSOLE);
    });
});
