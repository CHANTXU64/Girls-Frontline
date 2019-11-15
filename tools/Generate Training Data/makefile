CXX=g++
GF_logistics: GF_logistics_Tab.o GF_logistics_data.o GF_logistics_Plan.o GF_CorrectTargetValueByPlanList.o GF_logistics.o
	$(CXX) -o $@ GF_logistics_Tab.o GF_logistics_data.o GF_logistics_Plan.o GF_CorrectTargetValueByPlanList.o GF_logistics.o

GF_logistics.o: GF_logistics.cpp GF_CorrectTargetValueByPlanList.o GF_logistics_data.o GF_logistics_Plan.o GF_logistics_Tab.o GF_logistics.h Tab.h Plan.h
	$(CXX) -o $@ -c GF_logistics.cpp

GF_logistics_Tab.o: GF_logistics_Tab.cpp GF_logistics.h
	$(CXX) -o $@ -c GF_logistics_Tab.cpp

GF_logistics_data.o: GF_logistics_data.cpp GF_logistics_Tab.o GF_logistics.h Tab.h
	$(CXX) -o $@ -c GF_logistics_data.cpp

GF_logistics_Plan.o: GF_logistics_Plan.cpp GF_logistics_Tab.o GF_logistics.h Tab.h Plan.h
	$(CXX) -o $@ -c GF_logistics_Plan.cpp

GF_CorrectTargetValueByPlanList.o: GF_CorrectTargetValueByPlanList.cpp Plan.h GF_logistics_Plan.o
	$(CXX) -o $@ -c GF_CorrectTargetValueByPlanList.cpp

clean:
	rm -f GF_logistics_Tab.o GF_logistics_data.o GF_logistics_Plan.o GF_CorrectTargetValueByPlanList.o GF_logistics.o