import moment from 'moment';
import { slugifyUniqueEventTitle } from './slugify';

/*
 * return a new event structure from a root event with extended fields
 */
export function makeRebroadcast(rootEvent, ext) {
  const now = new Date();

  const startAt = ext.startAt || now;
  const endAt = moment(startAt).add(rootEvent.minutes, 'minutes').toDate();

  const event = Object.assign({}, rootEvent, {
    // user fields given by rebroadcaster:
    userId: ext.userId,
    username: ext.username,
    startAt,
    endAt,

    // force the value of these fields:
    slug: slugifyUniqueEventTitle({ title: rootEvent.title, userId: ext.userId }),
    createdAt: now,
    featured: false,   // not in temple
    archivable: false, // not in past events
    rebroadcast: true, // mark as rebroadcast
    baseline: false,
    past: false,
    library: false,    // rebroadcasts appear as Events
    isPublic: false,
    onlineCount: 0,
    rebroadcastCount: 0,
    shareCount: 0,
    rsvpCount: 0,

    // rebroadcasts cannot repeat:
    repeatCount: undefined,
    repeatInterval: undefined,

    rootEvent,              // copy in original event
    _id: undefined,
  });

  // the calling code is responsible for ensuring the remaining
  // lifecycle fields are set... or they will be set by cron

  return event;
}
