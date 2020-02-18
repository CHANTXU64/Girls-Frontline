#先通过MergeJS.sh合并js，然后手动删除测试代码//test[\w|\W]+?//End test, 再运行该脚本

version="v1_0_0"

date=$(date "+%m%d")_$version
jsfile="GFLGSTS_"$date".js"
jsfile_min="GFLGSTS_"$date".min.js"
jsfile_map=$jsfile_min".map"
cssdependentfile="GFLGSTS_dependent_"$date".min.css"
jsdependentfile="GFLGSTS_dependent_"$date".min.js"
cssfile="GFLGSTS_"$date".min.css"

rm *.html
rm ./js/*
rm ./css/*
rm ./dependent/css/*
rm ./dependent/js/*

#dependent
cat ../vendor/bootstrap/css/bootstrap.min.css > ./dependent/css/$cssdependentfile
awk '{print $0}' ../vendor/jquery-v2.1.1/jquery.min.js ../vendor/bootstrap/js/bootstrap.min.js ../vendor/echarts/echarts.min.js ../vendor/html2canvas/html2canvas.min.js ../vendor/js-sha1/sha1.min.js ../vendor/js-md5/md5.min.js ../vendor/lz-string/lz-string.min.js > ./dependent/js/$jsdependentfile

#css
java -jar closure-stylesheets.jar ../css/GF_logistics.css > ./css/$cssfile

#js
echo "{\"presets\":[\"es2015\"],\"plugins\":[]}" > .babelrc
# 需要先删去测试代码
babel ./GF_logistics_.js -o ./js/GF_logistics0.js
rm ./GF_logistics_.js
cd ./js
echo "/**
 * [GF_logistics]{@link https://github.com/CHANTXU64/Girls-Frontline}
 *
 * @namespace GF_logistics
 * @version $version
 * @author ChantXu64 [chantxu@outlook.com]
 * @copyright ChantXu64
 * @license MIT
 */
 " > $jsfile
 cat GF_logistics0.js >> $jsfile
 rm GF_logistics0.js
rm ../.babelrc
uglifyjs $jsfile -c -m \
    -o $jsfile_min \
    --toplevel --source-map url=$jsfile_map\
    --comments /@license/

#html
cd ../
cp ../pages/GF_logistics.html ./
cssdependent="<!---->\n\t<link\thref=\"./dependent/css/"$cssdependentfile"\"rel=\"stylesheet\">"
css="<!---->\n\t<link\thref=\"./css/"$cssfile"\"rel=\"stylesheet\">"
jsdependent="<!---->\n\t<script\tsrc=\"./dependent/js/"$jsdependentfile"\"></script>"
js="<!---->\n\t<script\tsrc=\"./js/"$jsfile_min"\"></script>"
sed -i '12,44d' GF_logistics.html
sed -i 11a$js GF_logistics.html
sed -i 12c$jsdependent GF_logistics.html
sed -i 12c$css GF_logistics.html
sed -i 12c$cssdependent GF_logistics.html
sed -i '12c\' GF_logistics.html