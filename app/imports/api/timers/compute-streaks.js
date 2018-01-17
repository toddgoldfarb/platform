import moment from 'moment';

export function computeStreaks(completedTimers) {
  let longest = 1;
  let current = 1;
  let lastDay = 0;

  completedTimers.forEach((doc) => {
    const day = moment(doc.startedAt).format('YYYY MM DD');

    if (lastDay !== day) {
      const yesterday = moment(new Date(lastDay));
      const today = moment(new Date(day));

      // if the difference is exactly 1 day, it increases streak
      if (moment.duration(today.diff(yesterday)).asDays() === 1) {
        current++;
        if (current > longest) {
          longest = current;
        }
      } else {
        // otherwise, it resets the streak
        current = 1;
      }

      lastDay = day;
    }
  });
  return { longest, current };
}
