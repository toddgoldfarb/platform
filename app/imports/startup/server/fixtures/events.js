/* eslint-disable max-len */

import moment from 'moment';

const events = [
  {
    _id: 'Qdmzha8yBpffJQKgA',
    title: 'Future Marx Coherence',
    description: 'Climate expert for the French government Nicolas Beriot kicks off the twe-week global ecology conference in Paris with a beautiful invocation drawing us in to add energetic support for all the delegates. Barbara Marx Hubbard concludes the event with a guided meditation that had over 2,000 people dropping into a state of coherence.',
    trackId: 'M9ZaaZ58tTt5X9xvp',
    visualizerId: 'map1',
    startAt: moment().add(1, 'day').toDate(),
    duration: 28,
    userId: 'bpnMHBf73LB4pq2gK',
    status: 'future',
  },
  {
    _id: 'dgCaBDeQAbujyHkNZ',
    title: 'Pre-event Climate',
    description: 'Climate expert for the French government Nicolas Beriot kicks off the twe-week global ecology conference in Paris with a beautiful invocation drawing us in to add energetic support for all the delegates. Barbara Marx Hubbard concludes the event with a guided meditation that had over 2,000 people dropping into a state of coherence.',
    trackId: 'M9ZaaZ58tTt5X9xvp',
    visualizerId: 'candle',
    startAt: moment().add(1, 'week').toDate(),
    duration: 28,
    userId: 'bpnMHBf73LB4pq2gK',
    status: 'preevent',
  },
  {
    _id: '5L2Fn4AkzGT92fG3v',
    title: 'Running Gaia Resonant',
    description: 'Gaia Field Project founder David Nicol creates a beautiful "resonant field" with thousands of participants around the globe meditating together to support the COP21 summit in Paris. This event was attended by dozens of leaders from various indigenous nations from all over the world.',
    trackId: 'nBZpJWzfpEBitPvPw',
    visualizerId: 'monks',
    startAt: moment().add(2, 'weeks').toDate(),
    duration: 39,
    userId: 'bpnMHBf73LB4pq2gK',
    status: 'running',
  },
  {
    _id: 'vFCQBvYQPD9XnJfq6',
    title: 'Postevent Firefighter Lawyer',
    description: 'Firefighter Erik Lawyer guides into a prayer of remembrance for all the victims, heroes, and continued wars happening in our world today. Join us in remembering 9/11, and pray for collective healing.',
    trackId: 'ARFtTJjLwfb8byAW9',
    visualizerId: '000048685784',
    startAt: moment().subtract(3, 'weeks').toDate(),
    duration: 26,
    userId: 'bpnMHBf73LB4pq2gK',
    status: 'postevent',
  },
  {
    _id: 'yDxHQh2PD89eHMDoM',
    title: 'Archived Firefighter Lawyer',
    description: 'Firefighter Erik Lawyer guides into a prayer of remembrance for all the victims, heroes, and continued wars happening in our world today. Join us in remembering 9/11, and pray for collective healing.',
    trackId: 'ARFtTJjLwfb8byAW9',
    visualizerId: 'monks',
    startAt: moment().subtract(3, 'weeks').toDate(),
    duration: 26,
    userId: 'bpnMHBf73LB4pq2gK',
    status: 'archived',
  },
];

export { events };
