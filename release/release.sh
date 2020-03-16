#需要使用babel-cli, babel-preset-es2015, UglifyJS 3, closure-stylesheets.jar
#该脚本适用于Linux系统

version=$1

mkdir js
mkdir css
mkdir dependent
mkdir dependent/js
mkdir dependent/css

./.release.py $version

java -jar closure-stylesheets.jar ./css.css > ./css/GFLGSTS_v${version//./_}.css \
    --allowed-unrecognized-property user-select --copyright-notice '/** copyright info * [GF_logistics]{@link https://github.com/CHANTXU64/Girls-Frontline} * @namespace GF_logistics * @version 3.0.0 * @author ChantXu64 [chantxu@outlook.com] * @copyright ChantXu64 * @license MIT\n */'
rm ./css.css

#js
echo "{\"presets\":[\"es2015\"],\"plugins\":[]}" > .babelrc
babel ./GF_logistics.js -o ./js/GF_logistics.js
rm ./GF_logistics.js
rm .babelrc
uglifyjs ./js/GF_logistics.js -c -m \
    -o ./js/GF_logistics.min.js \
    --toplevel \
    --comments /@license/

./.splitJS.py $version

zip -r GF_logistics_v${version//./_}.zip ./css ./dependent ./js *.html

rm -rf ./dependent
rm -rf ./js
rm -rf ./css
rm *.html