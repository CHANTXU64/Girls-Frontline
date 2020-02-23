# Girls-Frontline logistics calculators
后勤组合计算器

参考 [星光下的彩虹](https://pan.baidu.com/s/1c3iS9Ks#list/path=/Girls%20Frontline)<br>
Reference from [星光下的彩虹](https://pan.baidu.com/s/1c3iS9Ks#list/path=/Girls%20Frontline)

Contract reference from https://bbs.nga.cn/read.php?tid=13814613 <br>
Picture archive https://imgur.com/XY6kEqh

"Multi Range Slider" By [GlitchWorker](https://codepen.io/glitchworker/pen/XVdKqj)<br>
"Sliding radio buttons" By [Oguzhan Cansever](https://codepen.io/oggyindahouse/pen/Bamui)

感谢 [命运の乐章](https://github.com/hycdes/GFTool)<br>
Thanks [FatalChapter](https://github.com/hycdes/GFTool)

**该如何维护更新后勤战役?**<br>
只需要修改js/GF_logistics_data.js, 修改Q数组和setQContract()函数即可.<br>

**如何发布新版本?**<br>
1.修改js/GF_logistics_localStorage.js的VERSION<br>
2.修改release/Compress.sh的version<br>
3.修改html中的footer离线版页脚(链接)<br>
4.离线版标题以及文件名

测试代码格式: //test[\w|\W]+?//End test

![image](https://github.com/CHANTXU64/Girls-Frontline/raw/master/GF_logistics_Overview.png)
