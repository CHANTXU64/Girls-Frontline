var language;
var languages = 
{
    "zh-cn": {
        "lang": "zh-Hans",
        "title": "少女前线-后勤组合排序器",
        "HTML": {
            "header": "后勤组合排序器",
            "description": "计算结果只和资源契约之间的比例有关。计算结果为<a href=\"https://baike.baidu.com/item/%E6%95%B0%E5%AD%A6%E6%9C%9F%E6%9C%9B/5362790?fr=aladdin\" class=\"alert-link\" style=\"color:#000000\">均值</a>。",
            "setting": "设置",
            "tab_Anytime": "随时能收后勤",
            "tab_Timetable": "时间计划表",
            "tab_Anytime_hourorday": "按一天需求量计算",
            "tab_Anytime_time": "后勤总时长",
            "tab_Anytime_hour": "小时",
            "tab_Anytime_minute": "分钟",
            "tab_Timetable_time": "后勤总时长",
            "tab_Timetable_hour": "小时",
            "tab_Timetable_minute": "分钟",
            "tab_Timetable_addtimeh5": "新添加一个收取后勤时间点:",
            "tab_Timetable_new_hour": "小时",
            "tab_Timetable_new_minute": "分钟",
            "tab_Timetable_hourorday": "按平均每小时需求量计算",
            "h4GreatSuccessRate": "后勤队伍平均大成功概率",
            "greatsuccessrateup": "后勤大成功UP",
            "h4MapLimit": "关卡解锁",
            "chapter6": "第六战役",
            "chapter7": "第七战役",
            "chapter8": "第八战役",
            "chapter9": "第九战役",
            "chapter10": "第十战役",
            "chapter11": "第十一战役",
            "start_sortint": "开始排序",
            "result": "排序结果",
            "Manp": "人力",
            "Ammu": "弹药",
            "Rati": "口粮",
            "Part": "零件",
            "TPro": "人形",
            "Equi": "装备",
            "QPro": "快建",
            "QRes": "快修",
            "setTargetHG": "手枪HG",
            "setTargetSMG": "冲锋枪SMG",
            "setTargetRF": "步枪RF",
            "setTargetAR": "突击步枪AR",
            "setTargetMG": "机枪MG",
            "setTargetSG": "霰弹枪SG",
            "setTarget2221": "均衡",
            "setTargetClear": "清零",
        },
        "HTMLJS": {
            "localstorageDoesNotWork": "因某些原因，Web存储无法工作，需要手动导出配置",
            "tab_Timetable_deleteall": "删除全部时间点",
            "plantabletip": "点击 <span style=\"color:#165399\">开始排序</span> 按钮，排序前十六的结果将在这里显示",
            "Demand_hour": "平均每小时需求量",
            "Demand_total": "总共需求量",
        },
        "JS": {
            "Manp": "人力",
            "Ammu": "弹药",
            "Rati": "口粮",
            "Part": "零件",
            "TPro": "人形",
            "Equi": "装备",
            "QPro": "快建",
            "QRes": "快修",
            "tab_Anytime_alert1": "总时长不能为0！",
            "tab_Timetable_alert1": "不需要在后勤开始点再添加收取时间点",
            "tab_Timetable_alert2": "添加的收取时间点不能超过最大时限",
            "tab_Timetable_alert3": "已经添加过这个收取时间点",
            "tab_Timetable_alert4": "总时长不能为0！",
            "Mission": "关卡",
            "MaxTime": "最长时间",
            "MinTime": "最短时间",
        }
    },
    "zh-hk": {
        "lang": "zh-Hant",
        "title": "少女前線-後勤組合排序器",
        "HTML": {
            "header": "後勤組合排序器",
            "description": "計算結果只和資源契約之間的比例有關。計算結果為<a href=\"https://https://zh.wikipedia.org/zh-hk/%E6%9C%9F%E6%9C%9B%E5%80%BC\" class=\"alert-link\" style=\"color:#000000\">期望值</a>。",
            "setting": "設置",
            "tab_Anytime": "隨時能收後勤",
            "tab_Timetable": "時間計劃表",
            "tab_Anytime_hourorday": "按一天需求量計算",
            "tab_Anytime_time": "後勤總時長",
            "tab_Anytime_hour": "小時",
            "tab_Anytime_minute": "分鐘",
            "tab_Timetable_time": "後勤總時長",
            "tab_Timetable_hour": "小時",
            "tab_Timetable_minute": "分鐘",
            "tab_Timetable_addtimeh5": "新添加一個收取後勤時間點:",
            "tab_Timetable_new_hour": "小時",
            "tab_Timetable_new_minute": "分鐘",
            "tab_Timetable_hourorday": "按平均每小時需求量計算",
            "h4GreatSuccessRate": "後勤隊伍平均大成功概率",
            "greatsuccessrateup": "後勤大成功UP",
            "h4MapLimit": "關卡解鎖",
            "chapter6": "第六戰役",
            "chapter7": "第七戰役",
            "chapter8": "第八戰役",
            "chapter9": "第九戰役",
            "chapter10": "第十戰役",
            "chapter11": "第十一戰役",
            "start_sortint": "開始排序",
            "result": "排序結果",
            "Manp": "人力",
            "Ammu": "彈藥",
            "Rati": "口糧",
            "Part": "零件",
            "TPro": "人形",
            "Equi": "裝備",
            "QPro": "快建",
            "QRes": "快修",
            "setTargetHG": "手槍HG",
            "setTargetSMG": "衝鋒槍SMG",
            "setTargetRF": "步槍RF",
            "setTargetAR": "突擊步槍AR",
            "setTargetMG": "機槍MG",
            "setTargetSG": "霰彈槍SG",
            "setTarget2221": "均衡",
            "setTargetClear": "清零",
        },
        "HTMLJS": {
            "localstorageDoesNotWork": "因某些原因，Web存儲無法工作，需要手動導出配置",
            "tab_Timetable_deleteall": "刪除全部時間點",
            "plantabletip": "點擊 <span style=\"color:#165399\">開始排序</span> 按鈕，排序前十六的結果將在這裡顯示",
            "Demand_hour": "平均每小時需求量",
            "Demand_total": "總共需求量",
        },
        "JS": {
            "Manp": "人力",
            "Ammu": "彈藥",
            "Rati": "口糧",
            "Part": "零件",
            "TPro": "人形",
            "Equi": "裝備",
            "QPro": "快建",
            "QRes": "快修",
            "tab_Anytime_alert1": "總時長不能為0！",
            "tab_Timetable_alert1": "不需要在後勤開始點再添加收取時間點",
            "tab_Timetable_alert2": "添加的收取時間點不能超過最大時限",
            "tab_Timetable_alert3": "已經添加過這個收取時間點",
            "tab_Timetable_alert4": "總時長不能為0！",
            "Mission": "關卡",
            "MaxTime": "最長時間",
            "MinTime": "最短時間",
        }
    }
}