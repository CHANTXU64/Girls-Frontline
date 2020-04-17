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
只需要修改js/data.js, 修改Q数组和setQContract()函数即可.<br>

**如何发布新版本?**<br>
1.修改js/local_storage.js的VERSION<br>
2.运行release.py + version (如./release.py 2.0.0)<br>

测试代码格式: //test[\w|\W]+?//End test

注释中有"!python"表示该注释用于python脚本来进行压缩, 不要更改

![image](https://github.com/CHANTXU64/Girls-Frontline/raw/master/GF_logistics_Overview.png)
