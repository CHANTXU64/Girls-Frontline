/**
 *   少女前线后勤组合排序
 *	 The MIT License(MIT)
 *	 Copyright(C) 2019 CHT
 *	 Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files(the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions :
 *	 The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

#include<iostream>
#include<cmath>
#include<string>
using namespace std;

//权重计算, 顺便乘上(a-b)
int Weights(int a, int b) {//a为目标值,b为当前值
	if (a < b) {
		if (100 - (b - a) / 500 > 99) return (a - b);
		else return int((100 - (b - a) / 500) * (a - b));
	}
	else {
		return int((100 + (a - b) / 400) * (a - b));
	}
}

int main() {
	int cht[3] = { 0,0,0 };//必要的后勤战役编号
	int Q[48][5] =//人力 弹药 口粮 零件 时间
	{{0,     17400, 17400, 0,     50},
	 {18333, 0,     0,     11667, 300},
	 {7500,  7500,  7500,  2083,  1200},
	 {0,     5000,  3333,  3125,  2400},
	 {4000,  12000, 6000,  0,     15},
	 {0,     8000,  12000, 0,     30},
	 {3000,  0,     3000,  0,     100},
	 {8000,  8000,  0,     0,     200},
	 {15000, 0,     0,     4500,  40},
	 {4000,  13333, 5333,  0,     130},
	 {250,   250,   250,   5750,  400},
	 {0,     4167,  10000, 1000,  600},
	 {15000, 0,     22500, 0,     20},
	 {0,     16000, 9333,  4000,  45},
	 {0,     20000, 0,     0,     130},
	 {0,     0,     6000,  6000,  500},
	 {0,     18500, 18500, 0,     100},
	 {0,     0,     0,     10500, 200},
	 {13333, 9167,  0,     0,     600},
	 {5000,  5000,  5000,  1875,  800},
	 {0,     0,     20000, 9000,  30},
	 {0,     24000, 12000, 0,     230},
	 {20000, 10000, 10000, 0,     400},
	 {1429,  0,     0,     10000, 700},
	 {15000, 15000, 0,     5000,  200},
	 {0,     6667,  18333, 3333,  300},
	 {0,     0,     4000,  10000, 500},
	 {6667,  6667,  6667,  0,     1200},
	 {26000, 0,     26000, 0,     230},
	 {0,     16250, 0,     7500,  400},
	 {16364, 10909, 10909, 0,     530},
	 {3125,  3125,  3125,  7500,  800},
	 {15000, 15000, 15000, 0,     100},
	 {0,     0,     0,     15000, 300},
	 {6667,  13333, 13333, 0,     600},
	 {16667, 4444,  4444,  1111,  900},
	 {0,     0,     20000, 10000, 30},
	 {12000, 0,     12000, 6667,  130},
	 {16667, 16667, 0,     0,     430},
	 {7143,  12857, 12857, 0,     700},
	 {21000, 30000, 0,     0,     40},
	 {0,     14400, 10800, 0,     140},
	 {0,     9000,  9000,  5625,  520},
	 {6600,  6600,  6600,  3799,  1000},
	 {8750,  26250, 0,     0,     400},
	 {9000,  13500, 13500, 0,     400},
	 {0,     9375,  18750, 3125,  800},
	 {0,     16500, 0,     9000,  1000}
	};

	int renli = 0;
	int danyao = 0;
	int kouliang = 0;
	int lingjian = 0;
	{
		float a = 0, b = 0, c = 0, d = 0;
		cout << "输入人力,弹药,口粮,零件每小时需求量:(建议不要超过两位小数)" << endl;
		cin >> a >> b >> c >> d;
		renli = round(a * 100);
		danyao = round(b * 100);
		kouliang = round(c * 100);
		lingjian = round(d * 100);
	}
	if ((renli < 0) || (danyao < 0) || (kouliang < 0) || (lingjian < 0)) {
		cout << "数量有错误" << endl;
		system("pause");
		return 0;
	}
	
	int C[4] = { 0 };
	cout << "输入人力弹药口粮零件的权重:(整数)(高级选项, 一般都是1就行了)" << endl;
	cin >> C[0] >> C[1] >> C[2] >> C[3];
	if (renli == 0) C[0] = 0;
	if (danyao == 0) C[1] = 0;
	if (kouliang == 0) C[2] = 0;
	if (lingjian == 0) C[3] = 0;

	cout << "输入必须要进行的后勤战役个数:(0或1或2或3)" << endl;
	int i = 0;
	cin >> i;
	if ((i < 0) || (i > 3)) {
		cout << "输入的个数有问题" << endl;
		system("pause");
		return 0;
	}
	if (i != 0) {
		string *a = new string[i];
		cout << "输入必须要进行的后勤战役:(格式0-1 10-4)" << endl;
		for (int n = 1; n <= i; n++) {
			cin >> a[n - 1];
			int m = 0;
			m = a[n - 1].find("-");
			if (m == 0) {
				cout << "格式有问题" << endl;
				system("pause");
				return 0;
			}
			int x = 0, y = 0;
			x = stoi(a[n - 1].substr(0, m));
			y = stoi(a[n - 1].erase(0, m + 1));
			if ((x < 0) || (x > 11) || (y < 0) || (y > 4)) {
				cout << "输入的后勤战役有问题" << endl;
				system("pause");
				return 0;
			}
			renli = renli - Q[4 * x + y - 1][0];
			danyao = danyao - Q[4 * x + y - 1][1];
			kouliang = kouliang - Q[4 * x + y - 1][2];
			lingjian = lingjian - Q[4 * x + y - 1][3];
			cht[n - 1] = 4 * x + y;
		}
		delete [] a;
	}

	re:
	int fangan[100][9] = { 0 };//共计100个方案
	int xrenli = 0, xdanyao = 0, xkouliang = 0, xlingjian = 0;
	int XX = 0;//越小越好

	//没有必须要进行的后勤战役
	if (i == 0) {
		int n1 = 0, n2 = 0, n3 = 0, n4 = 0;
		for (n1 = 1; n1 <= 48; n1++) {
			for (n2 = n1; n2 <= 48; n2++) {
				if (n2 == n1) continue;
				for (n3 = n2; n3 <= 48; n3++) {
					if ((n3 == n2) || (n3 == n1)) continue;
					for (n4 = n3; n4 <= 48; n4++) {
						if ((n4 == n3) || (n4 == n2) || (n4 == n1)) continue;
						xrenli = Q[n1 - 1][0] + Q[n2 - 1][0] + Q[n3 - 1][0] + Q[n4 - 1][0];
						xdanyao = Q[n1 - 1][1] + Q[n2 - 1][1] + Q[n3 - 1][1] + Q[n4 - 1][1];
						xkouliang = Q[n1 - 1][2] + Q[n2 - 1][2] + Q[n3 - 1][2] + Q[n4 - 1][2];
						xlingjian = Q[n1 - 1][3] + Q[n2 - 1][3] + Q[n3 - 1][3] + Q[n4 - 1][3];
						XX = C[0] * Weights(renli, xrenli) + C[1] * Weights(danyao, xdanyao) + C[2] * Weights(kouliang, xkouliang) + C[3] * Weights(lingjian, xlingjian);
						for (int ii = 1; ii <= 100; ii++) {
							if (fangan[ii - 1][0] == 0) {
								fangan[ii - 1][0] = n1;
								fangan[ii - 1][1] = n2;
								fangan[ii - 1][2] = n3;
								fangan[ii - 1][3] = n4;
								fangan[ii - 1][4] = xrenli;
								fangan[ii - 1][5] = xdanyao;
								fangan[ii - 1][6] = xkouliang;
								fangan[ii - 1][7] = xlingjian;
								fangan[ii - 1][8] = XX;
								break;
							}//方案列表未满 
							if (XX >= fangan[ii - 1][8]) continue;
							else {
								for (int iii = 100; iii > ii; iii--) {
									fangan[iii - 1][0] = fangan[iii - 2][0];
									fangan[iii - 1][1] = fangan[iii - 2][1];
									fangan[iii - 1][2] = fangan[iii - 2][2];
									fangan[iii - 1][3] = fangan[iii - 2][3];
									fangan[iii - 1][4] = fangan[iii - 2][4];
									fangan[iii - 1][5] = fangan[iii - 2][5];
									fangan[iii - 1][6] = fangan[iii - 2][6];
									fangan[iii - 1][7] = fangan[iii - 2][7];
									fangan[iii - 1][8] = fangan[iii - 2][8];
								}
								fangan[ii - 1][0] = n1;
								fangan[ii - 1][1] = n2;
								fangan[ii - 1][2] = n3;
								fangan[ii - 1][3] = n4;
								fangan[ii - 1][4] = xrenli;
								fangan[ii - 1][5] = xdanyao;
								fangan[ii - 1][6] = xkouliang;
								fangan[ii - 1][7] = xlingjian;
								fangan[ii - 1][8] = XX;
								//改变方案
								break;
							}
						}
					}
				}
			}
		}
	}
	
	//有一个需要进行的后勤战役
	if (i == 1) {
		int n1 = 0, n2 = 0, n3 = 0;
		for (n1 = 1; n1 <= 48; n1++) {
			if (n1 == cht[0]) continue;
			for (n2 = n1; n2 <= 48; n2++) {
				if ((n2 == cht[0]) || (n2 == n1)) continue;
				for (n3 = n2; n3 <= 48; n3++) {
					if ((n3 == cht[0]) || (n3 == n2) || (n3 == n1)) continue;
					xrenli = Q[n1 - 1][0] + Q[n2 - 1][0] + Q[n3 - 1][0];
					xdanyao = Q[n1 - 1][1] + Q[n2 - 1][1] + Q[n3 - 1][1];
					xkouliang = Q[n1 - 1][2] + Q[n2 - 1][2] + Q[n3 - 1][2];
					xlingjian = Q[n1 - 1][3] + Q[n2 - 1][3] + Q[n3 - 1][3];
					XX = C[0] * Weights(renli, xrenli) + C[1] * Weights(danyao, xdanyao) + C[2] * Weights(kouliang, xkouliang) + C[3] * Weights(lingjian, xlingjian);
					for (int ii = 1; ii <= 100; ii++) {
						if (fangan[ii - 1][0] == 0) {
							fangan[ii - 1][0] = cht[0];
							fangan[ii - 1][1] = n1;
							fangan[ii - 1][2] = n2;
							fangan[ii - 1][3] = n3;
							fangan[ii - 1][4] = xrenli + Q[cht[0] - 1][0];
							fangan[ii - 1][5] = xdanyao + Q[cht[0] - 1][1];
							fangan[ii - 1][6] = xkouliang + Q[cht[0] - 1][2];
							fangan[ii - 1][7] = xlingjian + Q[cht[0] - 1][3];
							fangan[ii - 1][8] = XX;
							break;
						}//方案列表未满 
						if (XX >= fangan[ii - 1][8]) continue;
						else {
							for (int iii = 100; iii > ii; iii--) {
								fangan[iii - 1][0] = fangan[iii - 2][0];
								fangan[iii - 1][1] = fangan[iii - 2][1];
								fangan[iii - 1][2] = fangan[iii - 2][2];
								fangan[iii - 1][3] = fangan[iii - 2][3];
								fangan[iii - 1][4] = fangan[iii - 2][4];
								fangan[iii - 1][5] = fangan[iii - 2][5];
								fangan[iii - 1][6] = fangan[iii - 2][6];
								fangan[iii - 1][7] = fangan[iii - 2][7];
								fangan[iii - 1][8] = fangan[iii - 2][8];
							}
							fangan[ii - 1][0] = cht[0];
							fangan[ii - 1][1] = n1;
							fangan[ii - 1][2] = n2;
							fangan[ii - 1][3] = n3;
							fangan[ii - 1][4] = xrenli + Q[cht[0] - 1][0];
							fangan[ii - 1][5] = xdanyao + Q[cht[0] - 1][1];
							fangan[ii - 1][6] = xkouliang + Q[cht[0] - 1][2];
							fangan[ii - 1][7] = xlingjian + Q[cht[0] - 1][3];
							fangan[ii - 1][8] = XX;
							//改变方案
							break;
						}
					}
				}
			}
		}
	}

	//有两个需要进行的后勤战役
	if (i == 2) {
		int n1 = 0, n2 = 0;
		for (n1 = 1; n1 <= 48; n1++) {
			if ((n1 == cht[0]) || (n1 == cht[1])) continue;
			for (n2 = n1; n2 <= 48; n2++) {
				if ((n2 == cht[0]) || (n2 == cht[1]) || (n2 == n1)) continue;
				xrenli = Q[n1 - 1][0] + Q[n2 - 1][0];
				xdanyao = Q[n1 - 1][1] + Q[n2 - 1][1];
				xkouliang = Q[n1 - 1][2] + Q[n2 - 1][2];
				xlingjian = Q[n1 - 1][3] + Q[n2 - 1][3];
				XX = C[0] * Weights(renli, xrenli) + C[1] * Weights(danyao, xdanyao) + C[2] * Weights(kouliang, xkouliang) + C[3] * Weights(lingjian, xlingjian);
				for (int ii = 1; ii <= 100; ii++) {
					if (fangan[ii - 1][0] == 0) {
						fangan[ii - 1][0] = cht[0];
						fangan[ii - 1][1] = cht[1];
						fangan[ii - 1][2] = n1;
						fangan[ii - 1][3] = n2;
						fangan[ii - 1][4] = xrenli + Q[cht[0] - 1][0] + Q[cht[1] - 1][0];
						fangan[ii - 1][5] = xdanyao + Q[cht[0] - 1][1] + Q[cht[1] - 1][1];
						fangan[ii - 1][6] = xkouliang + Q[cht[0] - 1][2] + Q[cht[1] - 1][2];
						fangan[ii - 1][7] = xlingjian + Q[cht[0] - 1][3] + Q[cht[1] - 1][3];
						fangan[ii - 1][8] = XX;
						break;
					}//方案列表未满 
					if (XX >= fangan[ii - 1][8]) continue;
					else {
						for (int iii = 100; iii > ii; iii--) {
							fangan[iii - 1][0] = fangan[iii - 2][0];
							fangan[iii - 1][1] = fangan[iii - 2][1];
							fangan[iii - 1][2] = fangan[iii - 2][2];
							fangan[iii - 1][3] = fangan[iii - 2][3];
							fangan[iii - 1][4] = fangan[iii - 2][4];
							fangan[iii - 1][5] = fangan[iii - 2][5];
							fangan[iii - 1][6] = fangan[iii - 2][6];
							fangan[iii - 1][7] = fangan[iii - 2][7];
							fangan[iii - 1][8] = fangan[iii - 2][8];
						}
						fangan[ii - 1][0] = cht[0];
						fangan[ii - 1][1] = cht[1];
						fangan[ii - 1][2] = n1;
						fangan[ii - 1][3] = n2;
						fangan[ii - 1][4] = xrenli + Q[cht[0] - 1][0] + Q[cht[1] - 1][0];
						fangan[ii - 1][5] = xdanyao + Q[cht[0] - 1][1] + Q[cht[1] - 1][1];
						fangan[ii - 1][6] = xkouliang + Q[cht[0] - 1][2] + Q[cht[1] - 1][2];
						fangan[ii - 1][7] = xlingjian + Q[cht[0] - 1][3] + Q[cht[1] - 1][3];
						fangan[ii - 1][8] = XX;
						//改变方案
						break;
					}
				}
			}
		}
	}

	//有三个需要进行的后勤战役
	if (i == 3) {
		int n1 = 0;
		for (n1 = 1; n1 <= 48; n1++) {
			if ((n1 == cht[0]) || (n1 == cht[1]) || (n1 == cht[2])) continue;
			xrenli = Q[n1 - 1][0];
			xdanyao = Q[n1 - 1][1];
			xkouliang = Q[n1 - 1][2];
			xlingjian = Q[n1 - 1][3];
			XX = C[0] * Weights(renli, xrenli) + C[1] * Weights(danyao, xdanyao) + C[2] * Weights(kouliang, xkouliang) + C[3] * Weights(lingjian, xlingjian);
			for (int ii = 1; ii <= 100; ii++) {
				if (fangan[ii - 1][0] == 0) {
					fangan[ii - 1][0] = cht[0];
					fangan[ii - 1][1] = cht[1];
					fangan[ii - 1][2] = cht[2];
					fangan[ii - 1][3] = n1;
					fangan[ii - 1][4] = xrenli + Q[cht[0] - 1][0] + Q[cht[1] - 1][0] + Q[cht[2] - 1][0];
					fangan[ii - 1][5] = xdanyao + Q[cht[0] - 1][1] + Q[cht[1] - 1][1] + Q[cht[2] - 1][1];
					fangan[ii - 1][6] = xkouliang + Q[cht[0] - 1][2] + Q[cht[1] - 1][2] + Q[cht[2] - 1][2];
					fangan[ii - 1][7] = xlingjian + Q[cht[0] - 1][3] + Q[cht[1] - 1][3] + Q[cht[2] - 1][3];
					fangan[ii - 1][8] = XX;
					break;
				}//方案列表未满 
				if (XX >= fangan[ii - 1][8]) continue;
				else {
					for (int iii = 100; iii > ii; iii--) {
						fangan[iii - 1][0] = fangan[iii - 2][0];
						fangan[iii - 1][1] = fangan[iii - 2][1];
						fangan[iii - 1][2] = fangan[iii - 2][2];
						fangan[iii - 1][3] = fangan[iii - 2][3];
						fangan[iii - 1][4] = fangan[iii - 2][4];
						fangan[iii - 1][5] = fangan[iii - 2][5];
						fangan[iii - 1][6] = fangan[iii - 2][6];
						fangan[iii - 1][7] = fangan[iii - 2][7];
						fangan[iii - 1][8] = fangan[iii - 2][8];
					}
					fangan[ii - 1][0] = cht[0];
					fangan[ii - 1][1] = cht[1];
					fangan[ii - 1][2] = cht[2];
					fangan[ii - 1][3] = n1;
					fangan[ii - 1][4] = xrenli + Q[cht[0] - 1][0] + Q[cht[1] - 1][0] + Q[cht[2] - 1][0];
					fangan[ii - 1][5] = xdanyao + Q[cht[0] - 1][1] + Q[cht[1] - 1][1] + Q[cht[2] - 1][1];
					fangan[ii - 1][6] = xkouliang + Q[cht[0] - 1][2] + Q[cht[1] - 1][2] + Q[cht[2] - 1][2];
					fangan[ii - 1][7] = xlingjian + Q[cht[0] - 1][3] + Q[cht[1] - 1][3] + Q[cht[2] - 1][3];
					fangan[ii - 1][8] = XX;
					//改变方案
					break;
				}
			}
		}
	}

	cout << "\t后勤组合\t\t\t人力\t弹药\t口粮\t零件" << endl;
	for (int n = 1; n <= 100; n++) {
		if (fangan[n - 1][0] == 0) break;
		for (int nn = 0; nn <= 3; nn++) {
			if (fangan[n - 1][nn] % 4 == 0) cout << int(fangan[n - 1][nn] / 4) - 1 << "-4\t";
			else cout << int(fangan[n - 1][nn] / 4) << "-" << fangan[n - 1][nn] % 4 << "\t";
		}
		cout << "\t";
		cout << fangan[n - 1][4] / 100 << "\t";
		cout << fangan[n - 1][5] / 100 << "\t";
		cout << fangan[n - 1][6] / 100 << "\t";
		cout << fangan[n - 1][7] / 100 << endl;
	}

	cout << "是否要改变权重?(Y/N)" << endl;
	string b;
	cin >> b;
	if ((b == "Y") || (b == "y")) {
		cout << "输入人力弹药口粮零件的权重:(整数)" << endl << "(任一资源为零会默认该资源权重为0)" << endl << "(建议两两权重之差不超过100%,如设定权重14 10 12 16)" << endl;
		cin >> C[0] >> C[1] >> C[2] >> C[3];
		if (renli == 0) C[0] = 0;
		if (danyao == 0) C[1] = 0;
		if (kouliang == 0) C[2] = 0;
		if (lingjian == 0) C[3] = 0;
		goto re;
	}

	system("pause");
	return 0;
 }
