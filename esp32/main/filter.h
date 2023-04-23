#include "Arduino.h"

class Filter {
  public:  
    Filter();
    int filterSamples(int _sample);
    bool setDepthFilter(int _depth);
    int *samples;
                       
  private:
    int depth;
};