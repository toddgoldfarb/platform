import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';
// import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
