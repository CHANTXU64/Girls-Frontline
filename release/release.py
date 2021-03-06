#!/usr/bin/python
# -*- coding: UTF-8 -*-

#需要使用babel-cli, babel-preset-es2015, UglifyJS 3, closure-stylesheets.jar
#该脚本适用于Linux系统

#具体使用方法见wiki
#使用方法./release.py 2.0.0 or ./release.py 2.0.0 offline

import re
import sys
from io import StringIO
import os

version = sys.argv[1]
if (len(sys.argv) > 2 and sys.argv[2] == "offline"):
    is_offline = True
else:
    is_offline = False
if (is_offline):
    version += '-offline'
version_word = re.sub('\.', '_', version)
version_word = re.sub('\-', '_', version_word)
copyrightInfo = '/** copyright info\n * [GF_logistics]{@link https://github.com/CHANTXU64/Girls-Frontline}\n *\n * @namespace GF_logistics\n * @version ' + version + '\n * @author ChantXu64 [chantxu@outlook.com]\n * @copyright ChantXu64\n * @license MIT\n */\n\n'

VENDORJS = '';

def main():
    os.mkdir('./js', 0o755)
    os.mkdir('./css', 0o755)
    os.mkdir('./dependent', 0o755)
    os.mkdir('./dependent/js', 0o755)
    os.mkdir('./dependent/css', 0o755)
    MergeCSS()
    MergeJS()
    os.system('java -jar closure-stylesheets.jar ./css.css > ./css/GFLGSTS_v'+version_word+'.css --allowed-unrecognized-property user-select')
    f = open('./css/GFLGSTS_v'+version_word+'.css', 'r+' , encoding='UTF-8')
    content = f.read()
    f.seek(0, 0)
    f.write(copyrightInfo + content)
    f.close()
    os.remove('./css.css')
    f = open('./.babelrc', 'w+', encoding='UTF-8')
    f.write('{"presets":["es2015"],"plugins":[]}')
    f.close()
    os.system('babel ./GF_logistics.js -o ./js/GF_logistics.js')
    os.remove('./GF_logistics.js')
    os.remove('.babelrc')
    os.system('uglifyjs ./js/GF_logistics.js -c -m reserved=[loadBackupJS] -o ./js/GF_logistics.min.js --toplevel --comments /@license/')
    splitJS()
    compressHTML()
    os.remove('./js/GF_logistics.js')
    os.remove('./js/GF_logistics.min.js')
    if (is_offline == False):
        os.system('zip -q -r GF_logistics_v'+version_word+'.zip ./css ./dependent ./js *.html')
    else:
        os.system('zip -q -r GF_logistics_v'+version_word+'.zip *.html')
    os.system('rm -rf ./dependent')
    os.system('rm -rf ./js')
    os.system('rm -rf ./css')
    os.system('rm -rf *.html')
    print('Done!')


def splitJS():
    f = open('./js/GF_logistics.min.js', 'r', encoding='UTF-8')
    flag = -1
    f1 = open('./js/GFLGSTS_js1_v' + version_word + '.js', 'w+', encoding='UTF-8')
    f2 = open('./js/GFLGSTS_js2_v' + version_word + '.js', 'w+', encoding='UTF-8')
    for line in f.readlines():
        if line.find('/** copyright info') != -1:
            flag += 1
        if flag == -1 or flag == 0:
            line = re.sub(',\n', '\n', line) #目前版本uglifyjs会在最后加上","
            f1.write(line)
        else:
            f2.write(line)
    f2.close()
    f1.close()
    f.close()
    if (is_offline == True):
        f2 = open('./js/GFLGSTS_js2_v' + version_word + '.js', 'a', encoding='UTF-8')
        f2.write(VENDORJS)
        f2.close()


def getFilesPathName(file, start_comments, end_comments, search_str):
    file = open(file, 'r', encoding='UTF-8')
    text = file.readlines()
    file.close()
    files = []
    flag = False
    for line in text:
        if line.find(start_comments) == -1 and flag == False:
            continue
        flag = True
        if line.find(end_comments) != -1:
            break
        if re.search(search_str, line) != None:
            files.append(re.search('(?<=").+(?=")', re.search(search_str, line).group()).group())
    return files

def getFileName(FilePath):
    return re.search('(?<=/)[\w|\-|\.]+$', FilePath).group()

def changeTextFilePath(file, start_comments, end_comments, search_str, new_path):
    f = open(file, 'r', encoding='UTF-8')
    lines = f.readlines()
    f.close()
    flag = False
    newStr = ''
    for line in lines:
        if line.find(start_comments) == -1 and flag == False:
            newStr += line
            continue
        flag = True
        if line.find(end_comments) != -1:
            flag = False
            newStr += line
            continue
        if re.search(search_str, line) != None:
            fileName = getFileName(re.search(search_str, line).group())
            line = re.sub(search_str, new_path + fileName, line)
            newStr += line
        else:
            newStr += line
    return newStr

def backupVendorJS():
    js_files = getFilesPathName('./js.js', '//Backup vendor js !python', '//End Backup vendor js !python', 'src[\s|=]{1,3}"\.\./vendor/.+?"')
    for file in js_files:
        f = open(file, 'r', encoding='UTF-8')
        text = f.read()
        f.close()
        fileName = getFileName(file)
        f = open('./dependent/js/' + fileName, "w", encoding="UTF-8")
        f.write(text)
        f.close()

def getVendorJS():
    js_files = getFilesPathName('./js.js', '//Backup vendor js !python', '//End Backup vendor js !python', 'src[\s|=]{1,3}"\.\./vendor/.+?"')
    vendorJS = ""
    for file in js_files:
        f = open(file, 'r', encoding='UTF-8')
        vendorJS += f.read()
        f.close()
    return vendorJS

def MergeFiles(Files):
    data = StringIO()
    for file in Files:
        f = open(file, 'r', encoding='UTF-8')
        data.write(f.read() + '\n\n')
        f.close()
    return data.getvalue()

def MergeCSS():
    css_files = getFilesPathName('../pages/GF_logistics.html', '<!-- GF css !python -->', '<!-- end GF css !python -->', 'href=".+?"')
    f = open('./css.css', 'w+', encoding='UTF-8')
    f.write(MergeFiles(css_files))
    f.close()

def MergeJS():
    js1_files = getFilesPathName('../pages/GF_logistics.html', '<!-- GF js_1', '<!-- end GF js_1', 'src=".+?"')
    js2_files = getFilesPathName('../pages/GF_logistics.html', '<!-- GF js_2', '<!-- end GF js_2', 'src=".+?"')

    f = open('./js.js', 'w+', encoding='UTF-8')
    f.write(copyrightInfo)
    f.write(MergeFiles(js1_files))
    f.write(copyrightInfo)
    f.write(MergeFiles(js2_files))
    f.close()

    if (is_offline == False):
        backupVendorJS()
        js_str = changeTextFilePath('./js.js', '//Backup vendor js !python', '//End Backup vendor js !python', '(?<=src = ")\.\./vendor/.+?(?=")', './dependent/js/')
    else:
        global VENDORJS
        VENDORJS = getVendorJS()
        f = open('./js.js', 'r+', encoding='UTF-8')
        js_str = f.read()
        f.close()
        js_str = re.sub('//Backup vendor js !python[\w|\W]+?//End Backup vendor js !python', 'function loadBackupJS() {}', js_str)
    os.remove('./js.js')

    js_str = re.sub('//test[\w|\W]+?//End test', '', js_str)
    js_str = re.sub('//VERSION !python[\w|\W]+?//End VERSION !python', 'const VERSION = "' + version  + '";', js_str)

    f = open('./GF_logistics.js', 'w', encoding="UTF-8")
    f.write(js_str)
    f.close()

def compressHTML():
    htmlPath = "../pages/GF_logistics.html"
    file = open(htmlPath, "r+", encoding="UTF-8")
    html = file.read()
    file.close()

    if (is_offline == True):
        html = re.sub('<!-- GF_OFFLINE_VERSION !python -->', '<script>window.GF_OFFLINE_VERSION=true;</script>', html)

    # JQ
    JQpath = getFilesPathName(htmlPath, '//backup vendor_js JQ !python', '//end backup vendor_js JQ !python', 'src=".+?"')
    JQfile = open(JQpath[0], 'r', encoding='UTF-8')
    if (is_offline == False):
        f = open('./dependent/js/jQuery.slim.min.js', 'w+', encoding='UTF-8')
        f.write(JQfile.read())
        f.close()
        html = re.sub('//backup vendor_js JQ !python[\w|\W]*//end backup vendor_js JQ !python', 'window.jQuery || document.write(\'<script src="./dependent/js/jQuery.slim.min.js"><\/script>\');', html)
    else:
        html = re.sub('<!-- vendor_js JQ !python -->[\w|\W]*<!-- end vendor_js JQ !python -->', '<!-- vendor_js JQ !python -->', html)
        html = html.replace('<!-- vendor_js JQ !python -->', '<script>' + JQfile.read() + '</script>', 1)
    JQfile.close()

    # bootstrap
    BootstrapJS = open('../vendor/bootstrap/js/bootstrap.bundle.min.js', 'r', encoding='UTF-8')
    if (is_offline == False):
        f = open('./dependent/js/bootstrap.bundle.min.js', 'w+', encoding='UTF-8')
        f.write(BootstrapJS.read())
        f.close()
    else:
        html = re.sub('<!-- vendor_js bootstrap !python -->[\w|\W]*<!-- end vendor_js bootstrap !python -->', '<!-- vendor_js bootstrap !python -->', html)
        html = html.replace('<!-- vendor_js bootstrap !python -->', '<script>' + BootstrapJS.read() + '</script>', 1)
    BootstrapJS.close()
    BootstrapCSS = open('../vendor/bootstrap/css/bootstrap.min.css', 'r', encoding='UTF-8')
    if (is_offline == False):
        f = open('./dependent/css/bootstrap.min.css', 'w+', encoding='UTF-8')
        f.write(BootstrapCSS.read())
        f.close()
    else:
        html = re.sub('<!-- vendor css bootstrap !python-->[\w|\W]*<!-- end vendor css bootstrap !python -->', '<!-- vendor css bootstrap !python-->', html)
        html = html.replace('<!-- vendor css bootstrap !python-->', '<style>' + BootstrapCSS.read() + '</style>', 1)
    BootstrapCSS.close()
    if (is_offline == False):
        html = re.sub('//backup vendor bootstrap !python[\w|\W]*//end backup vendor bootstrap !python', 'window.bootstrap || document.write(\'<link href="./dependent/css/bootstrap.min.css" rel="stylesheet"><link href="./css/GFLGSTS_v' + version_word + '.css" rel="stylesheet"><script src="./dependent/js/bootstrap.bundle.min.js"><\/script>\');', html)

    if (is_offline == False):
        html = re.sub('<!-- GF css[\w|\W]*<!-- end GF css !python -->', '<link href="./css/GFLGSTS_v' + version_word + '.css"rel="stylesheet">', html)
        html = re.sub('<!-- GF js_1[\w|\W]*<!-- end GF js_1 !python -->', '<script src="./js/GFLGSTS_js1_v' + version_word + '.js"></script>', html) # crossorigin="anonymous"
        html = re.sub('<!-- GF js_2[\w|\W]*<!-- end GF js_2 !python -->', '<script src="./js/GFLGSTS_js2_v' + version_word + '.js"></script>', html)
    else:
        f = open('./css/GFLGSTS_v' + version_word + '.css', 'r', encoding='UTF-8')
        html = re.sub('<!-- GF css[\w|\W]*<!-- end GF css !python -->', '<!-- GF css -->', html)
        html = html.replace('<!-- GF css -->', '<style>' + f.read() + '</style>', 1)
        f.close()
        f = open('./js/GFLGSTS_js1_v' + version_word + '.js', 'r', encoding='UTF-8')
        html = re.sub('<!-- GF js_1[\w|\W]*<!-- end GF js_1 !python -->', '<!-- GF js_1 -->', html)
        html = html.replace('<!-- GF js_1 -->', '<script>' + f.read() + '</script>', 1)
        f.close()
        f = open('./js/GFLGSTS_js2_v' + version_word + '.js', 'r', encoding='UTF-8')
        html = re.sub('<!-- GF js_2[\w|\W]*<!-- end GF js_2 !python -->', '<!-- GF js_2 -->', html)
        html = html.replace('<!-- GF js_2 -->', '<script>' + f.read() + '</script>', 1)
        f.close()

    file2 = open("./GF_logistics.html", "w+", encoding="UTF-8")
    file2.write(html)
    file2.close()
    if (is_offline == False):
        file2 = open("./GF_logistics.html", "r", encoding="UTF-8")
        html = file2.readlines()
        file2.close()
        new_html = []
        for line in html:
            line = re.sub('^\s*//.*', '', line) # 不安全地删除js注释
            line = re.sub('^\s+', '', line) # 删除每行前面的空
            line = CompressHTML_style(line) # 删除'style=""'中的最后一个';'
            # line = re.sub('(?<=[:|;"=\(\)\{\}])\s', '', line) # 删除一些符号后面的空
            # line = re.sub('\s(?=[:|;"=\{\}\(\)])', '', line) # 删除一些符号前面的空
            line = re.sub('(?<=")\s', '', line) # 删除"后面的空
            line = re.sub('(?<!\w)\n', '', line) # 删除不是字母后的换行符
            line = re.sub('space-->', '--> ', line) # 在'space-->'后加上空格
            line = re.sub('<!--[\w|\W]*?-->', '', line) # 删除html注释
            line = re.sub('</td>', '', line) # 删除</td>
            line = re.sub('</tr>', '', line) # 删除</tr>
            line = re.sub('</th>', '', line) # 删除</th>
            line = re.sub('</thead>', '', line) # 删除</thead>
            line = re.sub('</tbody>', '', line) # 删除</tbody>
            line = re.sub('\n', ' ', line)
            if (line != '' and line != '\n'):
                new_html.append(line)
        new_file = open("GF_logistics.html", "w+", encoding="UTF-8")
        for line in new_html:
            new_file.write(line)
        new_file.close()

# 辣鸡python, 还报错look-behind requires fixed-width pattern
def CompressHTML_style(line):
    line = re.sub('(?<=style="[^"\n]{0});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{1});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{2});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{3});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{4});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{5});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{6});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{7});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{8});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{9});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{10});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{11});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{12});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{13});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{14});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{15});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{16});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{17});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{18});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{19});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{20});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{21});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{22});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{23});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{24});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{25});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{26});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{27});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{28});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{29});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{30});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{31});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{32});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{33});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{34});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{35});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{36});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{37});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{38});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{39});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{40});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{41});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{42});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{43});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{44});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{45});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{46});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{47});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{48});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{49});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{50});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{51});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{52});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{53});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{54});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{55});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{56});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{57});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{58});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{59});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{60});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{61});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{62});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{63});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{64});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{65});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{66});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{67});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{68});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{69});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{70});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{71});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{72});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{73});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{74});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{75});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{76});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{77});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{78});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{79});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{80});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{81});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{82});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{83});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{84});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{85});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{86});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{87});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{88});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{89});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{90});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{91});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{92});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{93});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{94});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{95});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{96});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{97});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{98});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{99});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{100});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{101});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{102});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{103});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{104});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{105});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{106});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{107});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{108});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{109});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{110});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{111});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{112});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{113});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{114});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{115});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{116});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{117});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{118});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{119});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{120});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{121});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{122});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{123});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{124});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{125});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{126});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{127});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{128});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{129});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{130});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{131});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{132});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{133});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{134});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{135});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{136});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{137});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{138});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{139});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{140});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{141});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{142});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{143});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{144});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{145});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{146});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{147});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{148});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{149});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{150});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{151});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{152});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{153});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{154});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{155});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{156});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{157});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{158});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{159});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{160});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{161});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{162});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{163});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{164});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{165});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{166});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{167});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{168});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{169});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{170});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{171});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{172});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{173});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{174});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{175});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{176});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{177});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{178});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{179});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{180});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{181});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{182});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{183});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{184});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{185});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{186});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{187});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{188});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{189});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{190});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{191});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{192});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{193});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{194});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{195});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{196});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{197});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{198});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{199});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{200});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{201});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{202});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{203});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{204});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{205});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{206});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{207});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{208});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{209});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{210});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{211});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{212});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{213});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{214});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{215});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{216});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{217});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{218});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{219});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{220});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{221});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{222});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{223});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{224});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{225});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{226});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{227});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{228});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{229});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{230});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{231});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{232});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{233});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{234});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{235});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{236});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{237});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{238});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{239});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{240});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{241});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{242});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{243});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{244});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{245});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{246});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{247});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{248});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{249});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{250});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{251});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{252});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{253});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{254});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{255});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{256});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{257});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{258});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{259});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{260});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{261});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{262});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{263});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{264});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{265});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{266});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{267});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{268});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{269});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{270});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{271});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{272});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{273});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{274});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{275});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{276});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{277});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{278});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{279});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{280});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{281});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{282});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{283});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{284});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{285});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{286});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{287});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{288});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{289});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{290});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{291});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{292});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{293});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{294});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{295});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{296});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{297});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{298});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{299});"', '"', line)
    line = re.sub('(?<=style="[^"\n]{300});"', '"', line)
    return line

main()
