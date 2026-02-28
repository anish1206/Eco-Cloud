#include "PCB.h"
#include <iostream>

using namespace std;

namespace {

// Helper to convert state to string for display
string stateToString(PCB::State s) {
    switch (s) {
        case PCB::State::NEW:         return "NEW";
        case PCB::State::READY:       return "READY";
        case PCB::State::RUNNING:     return "RUNNING";
        case PCB::State::WAITING:     return "WAITING";
        case PCB::State::TERMINATED:  return "TERMINATED";
        default:                       return "UNKNOWN";
    }
}
} // unnamed namespace

// Constructors
PCB::PCB()
    : PID_(""), Arrival_Time_(0), Burst_Time_(0), Priority_(0),
      State_(State::NEW), Carbon_Footprint_(0.0) {}

PCB::PCB(const string& pid, int arrival, int burst, int priority,
         State state, double carbon)
    : PID_(pid), Arrival_Time_(arrival), Burst_Time_(burst),
      Priority_(priority), State_(state), Carbon_Footprint_(carbon) {}

// Getters
string PCB::getPID() const { return PID_; }
int PCB::getArrivalTime() const { return Arrival_Time_; }
int PCB::getBurstTime() const { return Burst_Time_; }
int PCB::getPriority() const { return Priority_; }
PCB::State PCB::getState() const { return State_; }
double PCB::getCarbonFootprint() const { return Carbon_Footprint_; }

// Setters
void PCB::setPID(const string& pid) { PID_ = pid; }
void PCB::setArrivalTime(int t) { Arrival_Time_ = t; }
void PCB::setBurstTime(int t) { Burst_Time_ = t; }
void PCB::setPriority(int p) { Priority_ = p; }
void PCB::setState(State s) { State_ = s; }
void PCB::setCarbonFootprint(double c) { Carbon_Footprint_ = c; }

// Display
void PCB::display() const {
    cout << "PCB { "
         << "PID: " << PID_
         << ", Arrival_Time: " << Arrival_Time_
         << ", Burst_Time: " << Burst_Time_
         << ", Priority: " << Priority_
         << ", State: " << stateToString(State_)
         << ", Carbon_Footprint: " << Carbon_Footprint_
         << " }" << endl;
}
