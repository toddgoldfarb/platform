import { SyncedCron } from 'meteor/percolate:synced-cron';
import { snapshotOnlineCounts } from '../../api/counts/server/online-counts.js';

SyncedCron.add({
  name: 'snapshot online count',
  schedule(parser) {
    return parser.text('every 1 minute');
  },
  job() {
    snapshotOnlineCounts();
  },
});
