import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import faker from 'faker';

/* adds a user and returns the userId, remember to
 clean up and remove created users after tests are finished! */
export function createUser() {
  return Meteor.users.insert({
    profile: {
      fullName: faker.name.firstName(),
      avatar: faker.image.imageUrl(),
      location: faker.address.city(),
    },
    emails: [{ address: faker.internet.email() }],
    password: faker.internet.password(),
  });
}

// adds an admin-user and returns the userId
export function createAdmin() {
  const adminId = createUser();
  Roles.addUsersToRoles(adminId, ['admin']);
  return adminId;
}
