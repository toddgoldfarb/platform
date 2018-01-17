import { check } from 'meteor/check';
import moment from 'moment-precise-range';
import { TimerModel } from './client/timer-model';

function forcePositive(number) {
  return Math.max(0, parseInt(number || '0', 10));
}

class Duration {
  constructor(value, parentDoc, prop) {
    check(value, Number);
    check(parentDoc, TimerModel); // XXX generalize this to use any object with an _id
    check(prop, String);
    this.value = value;
    this._parent = parentDoc;
    this._prop = prop;
  }

  get hours() {
    return moment.duration(this.value).hours();
  }

  get minutes() {
    return moment.duration(this.value).minutes();
  }

  get seconds() {
    return moment.duration(this.value).seconds();
  }

  get human() {
    return moment.preciseDiff(new Date(0), new Date(this.value));
  }

  get digital() {
    return moment.duration(this.value).format('h:mm:ss');
  }


  // time accessors
  set hours(hours) {
    this.value = moment.duration({
      hours: forcePositive(hours),
      minutes: this.minutes,
      seconds: this.seconds,
    }).asMilliseconds();

    this.sync();
  }
  set minutes(minutes) {
    this.value = moment.duration({
      hours: this.hours,
      minutes: forcePositive(minutes),
      seconds: this.seconds,
    }).asMilliseconds();

    this.sync();
  }
  set seconds(seconds) {
    this.value = moment.duration({
      hours: this.hours,
      minutes: this.minutes,
      seconds: forcePositive(seconds),
    }).asMilliseconds();

    this.sync();
  }

  set totalSeconds(seconds) {
    this.value = seconds * 1000;
    this.sync();
  }
  set totalMinutes(minutes) {
    this.value = 60 * minutes * 1000;
    this.sync();
  }
  set totalHours(hours) {
    this.value = 60 * 60 * hours * 1000;
    this.sync();
  }

  // add(1, 'hour')
  // add(1, 'minute')
  // add(30, 'seconds')
  add(val, period) {
    check(val, Number);
    check(period, String);
    this.value = moment.duration(this.value).add(val, period).asMilliseconds();

    this.sync();
  }

  subtract(val, period) {
    this.add(-val, period);
  }

  sync() {
    this._parent.updateProp(this._prop, forcePositive(this.value));
  }
}

export { Duration };
