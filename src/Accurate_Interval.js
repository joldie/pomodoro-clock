// Accurate_Interval.js
// Source: https://codepen.io/no_stack_dub_sack/pen/VKJGKd
//
// Thanks Squeege! For the elegant answer provided to this question: 
// http://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
//
// Github: https://gist.github.com/Squeegy/1d99b3cd81d610ac7351
// Slightly modified to accept 'normal' interval/timeout format (func, time). 

module.exports = function accurateInterval(fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel
  };
};