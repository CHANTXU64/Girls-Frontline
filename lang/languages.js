/**
 * @type {language_zh_CN|language_zh_TW|language_en}
 */
let language;
const language_zh_CN = {
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
        calcTargetValueTool_apply_text: "应用",
        OfflineVersion: "下载离线版本"
    },
    HTMLJS: {
        placeholder: {
            Config_importInput: "需要导入的配置",
            Config_exportInput: "导出的配置",
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
            importSaved_input: "需要导入的数据",
            PlanDetails_InputExecutionTimes: "执行次数",
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
            importSaved_importButton: "导入数据",
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
        exportSaved_input: "导出的数据",
        SavedTable_delete: "删除方案",
        FineTuning_minus: "减小需求量",
        FineTuning_plus: "增大需求量",
    },
    JS: {
        chapter_start: "第",
        chapter_end: "战役",
        number(num) {
            //author: zdluffy
            //CC 4.0 BY-SA
            //https://blog.csdn.net/zdluffy/article/details/98970516
            let AA = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
            let BB = ["", "十", "百", "千", "万", "十万", "百万", "千万", "亿"];
            let res = "";
            let numstr = "" + num;
            let k = numstr.length;
            for (let i = 0; i < numstr.length; i++) {
                let tmp = numstr[i] - '0';
                let bIndex = k - i - 1;
                if (0 === tmp) {
                    if ("0" === numstr[i - 1] || i === numstr.length - 1)//处理2003、230出现多余的零
                        continue;
                    else if (bIndex >= 4 && 0 === bIndex % 4)//处理2103243在万位出现多余的零
                        res = res + BB[bIndex];
                    else
                        res = res + AA[tmp];//正常零
                }
                else {
                    res = res + AA[tmp];
                    if (numstr.length === 2 && numstr[0] === '1' && i === 0)
                        res = "";//12读作十二，把1删掉
                    if (0 === bIndex % 4)//万、亿位的要输出
                        res = res + BB[bIndex];
                    else//"十万","百万","千万"其实就是一摆设，万不输出
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
        Total : "总计",
        ExecutionTimes: "执行次数",
        plzInputPlanName: "请输入方案名称",
        planDefaultName: "自定义",
        deleteSavedWarning_1: "是否要删除这个名为",
        deleteSavedWarning_2: "的配置？",
        Saved_alert: "导入的数据有问题！",
        Saved_alert2: "保存的数量过多，不能再添加",
        config_alert: "这将会覆盖现有所有的数据，是否要继续？",
        FailedWindowLoadWarn: "可能由于Web存储数据不正确, 导致网页崩溃. 您可以将下面的数据报告到GitHub或发送邮件到chantxu@outlook.com",
    },
    CSS: {
        TargetValueSpan_Width: "55px",
        FineTuningButton_Width: "60%",
    }
};
const language_zh_TW = {
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
        calcTargetValueTool_apply_text: "應用",
        OfflineVersion: "下載離線版本"
    },
    HTMLJS: {
        placeholder: {
            Config_importInput: "需要導入的配置",
            Config_exportInput: "導出的配置",
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
            importSaved_input: "需要導入的數據",
            PlanDetails_InputExecutionTimes: "後勤執行次數",
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
            importSaved_importButton: "導入數據",
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
        exportSaved_input: "導出的數據",
        SavedTable_delete: "刪除方案",
        FineTuning_minus: "減小需求量",
        FineTuning_plus: "增大需求量",
    },
    JS: {
        chapter_start: "第",
        chapter_end: "戰役",
        number(num) {
            //author: zdluffy
            //CC 4.0 BY-SA
            //https://blog.csdn.net/zdluffy/article/details/98970516
            let AA = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
            let BB = ["", "十", "百", "千", "萬", "十萬", "百萬", "千萬", "億"];
            let res = "";
            let numstr = "" + num;
            let k = numstr.length;
            for (let i = 0; i < numstr.length; i++) {
                let tmp = numstr[i] - '0';
                let bIndex = k - i - 1;
                if (0 === tmp) {
                    if ("0" === numstr[i - 1] || i === numstr.length - 1)//处理2003、230出现多余的零
                        continue;
                    else if (bIndex >= 4 && 0 === bIndex % 4)//处理2103243在万位出现多余的零
                        res = res + BB[bIndex];
                    else
                        res = res + AA[tmp];//正常零
                }
                else {
                    res = res + AA[tmp];
                    if (numstr.length === 2 && numstr[0] === '1' && i === 0)
                        res = "";//12读作十二，把1删掉
                    if (0 === bIndex % 4)//万、亿位的要输出
                        res = res + BB[bIndex];
                    else//"十万","百万","千万"其实就是一摆设，万不输出
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
        Total : "總計",
        ExecutionTimes: "執行次數",
        plzInputPlanName: "請輸入方案名稱",
        planDefaultName: "自定義",
        deleteSavedWarning_1: "是否要刪除這個名為",
        deleteSavedWarning_2: "的配置？",
        Saved_alert: "導入的數據有問題！",
        Saved_alert2: "保存的數量過多，不能再添加",
        config_alert: "這將會覆蓋現有所有的數據，是否要繼續？",
        FailedWindowLoadWarn: "可能由於Web存儲數據不正確, 導致網頁崩潰. 您可以將下面的數據報告到GitHub或發​​送郵件到chantxu@outlook.com",
    },
    CSS: {
        TargetValueSpan_Width: "55px",
        FineTuningButton_Width: "60%",
    }
};
const language_en = {
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
        calcTargetValueTool_apply_text: "Apply",
        OfflineVersion: "Download offline version"
    },
    HTMLJS: {
        placeholder: {
            Config_importInput: "Imported configurations",
            Config_exportInput: "Exported configurations",
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
            importSaved_input: "Imported data",
            PlanDetails_InputExecutionTimes: "Number of executions",
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
            importSaved_importButton: "Import Plan",
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
        exportSaved_input: "Exported data",
        SavedTable_delete: "Delete Plan",
        FineTuning_minus: "Reduce demand",
        FineTuning_plus: "Increase demand",
    },
    JS: {
        chapter_start: "Chapter ",
        chapter_end: "",
        number(num) {return num;},
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
        Total : "Total",
        ExecutionTimes: "Executions",
        plzInputPlanName: "Please enter the plan name",
        planDefaultName: "Custom",
        deleteSavedWarning_1: "Do you want to delete this configuration named ",
        deleteSavedWarning_2: "?",
        Saved_alert: "There is a problem with the imported data!",
        Saved_alert2: "Too many saved plan, cannot add anymore",
        config_alert: "This operation will overwrite all configurations. Do you want to continue?",
        FailedWindowLoadWarn: "The webpage may crash due to incorrect web storage. You can report the following data to GitHub or send to chantxu@outlook.com",
    },
    CSS: {
        TargetValueSpan_Width: "66px",
        FineTuningButton_Width: "40%",
    }
};