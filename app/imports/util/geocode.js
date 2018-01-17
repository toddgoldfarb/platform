import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

/**
 * geocode a textual location to a lat/lng pair
 * @param {String} location
 * @param {Function} callback
 */
export function geocodeLocation(location, callback) {
  HTTP.get(
    'http://nominatim.openstreetmap.org/search',
    {
      params: {
        q: location,
        format: 'json',
      },
    },
    (error, response) => {
      if (error) {
        return callback(error);
      }

      if (!response.data || response.data.length === 0) {
        return callback(null, null);
      }

      return callback(null, [
        response.data[0].lat,
        response.data[0].lon,
      ]);
    }
  );
}

/**
 * update user's latlng field for a given location
 * @param {String} userId
 * @param {String} location
 */
export function geocodeUserLocation(userId, location) {
  check(userId, String);
  check(location, String);

  geocodeLocation(location, (err, latlng) => {
    if (err) throw err;
    if (!latlng) {
      Meteor.users.update(
        { _id: userId }, {
          $set: {
            latlng: [
              Meteor.settings.public.map.defaultLat,
              Meteor.settings.public.map.defaultLng,
            ],
          },
        }
      );
    } else {
      Meteor.users.update({ _id: userId }, { $set: { latlng } });
    }
  });
}

// function geocodeIp(ipAddr, callback) {
//   HTTP.get(`http://freegeoip.net/json/${ipAddr}`,
//            (error, response) => {
//              if (error) {
//                return callback(error);
//              }
//              return callback(null, response);
//            });
// }
