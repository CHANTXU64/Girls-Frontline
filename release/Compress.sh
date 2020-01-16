rm ./js/GF_logistics.min.js
echo "{\"presets\":[\"es2015\"],\"plugins\":[]}" > .babelrc
cp -r ../js/* ./
cp -r ../lang/* ./
babel ./GF_logistics_function.js -o ./1.js
rm ./GF_logistics_function.js
babel ./GF_logistics_input.js -o ./2.js
rm ./GF_logistics_input.js
babel ./Quick_Sort.js -o ./3.js
rm ./Quick_Sort.js
babel ./languages.js -o ./4.js
rm ./languages.js
babel ./GF_logistics_localStorage.js -o ./5.js
rm ./GF_logistics_localStorage.js
babel ./GF_logistics_loadHTML.js -o ./6.js
rm ./GF_logistics_loadHTML.js
babel ./GF_logistics_html.js -o ./7.js
rm ./GF_logistics_html.js
babel ./GF_logistics_htmlEvent.js -o ./8.js
rm ./GF_logistics_htmlEvent.js
babel ./GF_logistics_data.js -o ./9.js
rm ./GF_logistics_data.js
babel ./GF_logistics_Tab.js -o ./10.js
rm ./GF_logistics_Tab.js
babel ./GF_logistics_Plan.js -o ./11.js
rm ./GF_logistics_Plan.js
babel ./GF_logistics_main.js -o ./12.js
rm ./GF_logistics_main.js
babel ./GF_logistics_FineTuning.js -o ./13.js
rm ./GF_logistics_FineTuning.js
babel ./GF_logistics_MissionTable.js -o ./14.js
rm ./GF_logistics_MissionTable.js
babel ./GF_logistics_PlanDetails.js -o ./15.js
rm ./GF_logistics_PlanDetails.js
babel ./GF_logistics_Saved.js -o ./16.js
rm ./GF_logistics_Saved.js
rm ./.babelrc
uglifyjs ./1.js ./2.js ./3.js ./4.js ./5.js ./6.js ./7.js ./8.js ./9.js ./10.js ./11.js ./12.js ./13.js ./14.js ./15.js ./16.js -c -m -o ./js/GF_logistics0.min.js --toplevel
rm ./1.js ./2.js ./3.js ./4.js ./5.js ./6.js ./7.js ./8.js ./9.js ./10.js ./11.js ./12.js ./13.js ./14.js ./15.js ./16.js
echo "/**
 * [GF_logistics]{@link https://github.com/CHANTXU64/Girls-Frontline}
 *
 * @namespace GF_logistics
 * @author ChantXu64 [chantxu@outlook.com]
 * @copyright ChantXu64
 * @license MIT
 */
 " > ./js/GF_logistics.min.js
cat ./js/GF_logistics0.min.js >> ./js/GF_logistics.min.js
rm ./js/GF_logistics0.min.js

rm ./GF_logistics.html
cp ../pages/GF_logistics.html ./
sed -i '12c\    <link href="./dependent/css/GF_logistics_dependent.css" rel="stylesheet">' GF_logistics.html
sed -i '13c\    <link href="./css/GF_logistics.min.css" rel="stylesheet">' GF_logistics.html
sed -i '14c\    <script src="./dependent/js/GF_logistics_dependent.min.js"></script>' GF_logistics.html
sed -i '15c\    <script src="./js/GF_logistics.min.js"></script>' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html
sed -i '16c\' GF_logistics.html