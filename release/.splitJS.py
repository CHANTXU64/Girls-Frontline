#!/usr/bin/python
# -*- coding: UTF-8 -*-

# 该脚本由release.sh调用

import os
import sys
import re

version = sys.argv[1]
version_word = re.sub('\.', '_', version)

f = open('./js/GF_logistics.min.js', 'r', encoding='UTF-8')
flag = -1
f1 = open('./js/GFLGSTS_js1_v' + version_word + '.js', 'w+', encoding='UTF-8')
f2 = open('./js/GFLGSTS_js2_v' + version_word + '.js', 'w+', encoding='UTF-8')
for line in f.readlines():
    if line.find('/** copyright info') != -1:
        flag += 1
    if flag == -1 or flag == 0:
        line = re.sub(',\n', '\n', line) #目前版本uglifyjs会在最后加上,
        f1.write(line)
    else:
        f2.write(line)

f2.close()
f1.close()
f.close()

os.remove('./js/GF_logistics.js')
os.remove('./js/GF_logistics.min.js')