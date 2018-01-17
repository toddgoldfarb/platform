import moment from 'moment';

export const isFuture = date => {
  return moment().isBefore(date);
};

export const isPast = date => {
  return moment().isAfter(date);
};

export const isBetween = (date1, date2) => {
  return moment().isBetween(date1, date2);
};

export const isLive = event => {
  return isBetween(event.startAt, event.endAt);
};

/* returns 'past', 'live', or 'future' */
export const eventStatus = event => {
  if (isLive(event)) {
    return 'live';
  }
  if (isFuture(event.startAt)) {
    return 'future';
  }
  if (isPast(event.endAt)) {
    return 'past';
  }
  throw new Error('event is not live, future, nor past!?');
};

export const runAt = (when, fn) => {
  const milliseconds = moment(when).diff();
  return setTimeout(fn, milliseconds);
};

export const getSynchronizedPosition = ({ startAt, duration, loop = false }) => {
  let spos = ((new Date() - new Date(startAt)) / 1000);

  if (spos >= duration) {
    if (loop) {
      spos %= duration;
    }
  }

  if (spos <= 0) {
    spos = 0;
  }

  return spos;
};

export const durationString = ({ startAt, endAt }) => {
  const startMoment = moment(startAt);
  const endMoment = moment(endAt);

  const startFormat = 'dddd, MMMM D, YYYY h:mm A';

  const endFormat = 'h:mm A';

  const start = startMoment.format(startFormat);
  const end = endMoment.format(endFormat);

  return `${start} - ${end}`;
};
