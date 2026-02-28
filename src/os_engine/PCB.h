#ifndef SRC_OS_ENGINE_PCB_H
#define SRC_OS_ENGINE_PCB_H

#include <string>
using namespace std;

class PCB {
public:
    // Process state
    enum class State { NEW, READY, RUNNING, WAITING, TERMINATED };

    // Constructors
    PCB();
    PCB(const string& pid, int arrival, int burst, int priority, State state, double carbon = 0.0);

    // Getters
    string getPID() const;
    int getArrivalTime() const;
    int getBurstTime() const;
    int getPriority() const;
    State getState() const;
    double getCarbonFootprint() const;

    // Setters
    void setPID(const string& pid);
    void setArrivalTime(int t);
    void setBurstTime(int t);
    void setPriority(int p);
    void setState(State s);
    void setCarbonFootprint(double c);

    // Display
    void display() const;

private:
    string PID_;
    int Arrival_Time_;
    int Burst_Time_;
    int Priority_;
    State State_;
    double Carbon_Footprint_ = 0.0;
};

#endif // SRC_OS_ENGINE_PCB_H
