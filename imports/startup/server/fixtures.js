import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import Projects from '../../api/projects/projects';

if (Meteor.isDevelopment || process.env.NODE_ENV === 'staging') {
  const users = [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: { first: 'Carl', last: 'Winslow' },
    },
    roles: ['admin'],
  }];

  users.forEach(({ email, password, profile, roles }) => {
    const userExists = Meteor.users.findOne({ 'emails.address': email });

    if (!userExists) {
      const userId = Accounts.createUser({ email, password, profile });
      Roles.addUsersToRoles(userId, roles);
    }
  });
}
