
#include "filter.h"
#include "Arduino.h"

Filter::Filter() {
  setDepthFilter(10);
}

int Filter::filterSamples(int _sample) {
  int sum = 0;
  for(int i = 0; i < depth ;i++) {
    samples[i] = samples[i+1];
  }

  samples[depth-1] = _sample;

  for(int i = 0; i < depth ;i++) {
   sum += samples[i];
  }

  return sum/depth;
}

bool Filter::setDepthFilter(int _depth) {
  depth =_depth;
  free(samples);
  samples = (int*)calloc(depth,sizeof(int));  
  
  if(samples == NULL){
    return false;
  } 
  
  return true;
}
