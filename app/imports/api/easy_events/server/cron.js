import { SyncedCron } from 'meteor/percolate:synced-cron';
import { EasyEvents } from '../easy_events.js';
import { updateLifecycle } from '../updateLifecycle.js';
import moment from 'moment';

SyncedCron.add({
  name: 'update live status',
  schedule(parser) {
    return parser.text('every 1 minute');
  },
  job() {
    // const start = Date.now();
    // let count = 0;
    EasyEvents.find({
      deleted: false,
      published: true,
      past: false,
    }).forEach(event => {
      // count++;
      updateLifecycle(event);
    });
    // console.log({ count, ms: Date.now() - start }); // eslint-disable-line
  },
});

SyncedCron.add({
  name: 'reschedule repeating events',
  schedule(parser) {
    return parser.text('every 5 minutes');
  },
  job() {
    EasyEvents.find({
      deleted: false,
      past: true,
      endAt: { $lt: new Date() },
      repeatCount: { $gt: 0 },
    }).forEach(re => {
      const now = moment();

      let startAt = re.startAt;

      // make sure we reschedule in the future
      while (startAt < now) {
        startAt = moment(startAt).add(re.repeatCount, re.repeatInterval).toDate();
      }

      const endAt = moment(startAt).add(re.minutes, 'minutes').toDate();

      const newEventId = EasyEvents.insert({
        userId: re.userId,
        createdAt: new Date(),

        title: re.title,
        description: re.description,
        trackUrl: re.trackUrl,
        trackSeconds: re.trackSeconds,
        imageUrl: re.imageUrl,
        minutes: re.minutes,

        startAt,
        endAt,
        published: re.published,
        featured: re.featured,
        repeatCount: re.repeatCount,
        repeatInterval: re.repeatInterval,
      });

      // clear the repeat fields for the old event, the new one has it
      EasyEvents.update({ _id: re._id },
                        { $unset: { repeatCount: 1, repeatInterval: 1 } });

      const newEvent = EasyEvents.findOne({ _id: newEventId });
      updateLifecycle(newEvent);
    });
  },
});
