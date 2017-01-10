import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import Projects from '../../api/projects/projects';

if (Meteor.isDevelopment) {
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

  const projectsCount = 100;
  let i = 0;

  if (Projects.find().count() < projectsCount) {
    while (i < projectsCount) {
      Projects.insert({
        owner: Meteor.users.findOne()._id,
        title: `Project #${i}`,
        url: 'https://google.com',
        image: 'http://fillmurray.com/500/300',
        description: `Project #${i}'s description. Wheeeeee.`,
        createdBy: i % 5 ? 'Bart Simpson' : 'Homer Simpson',
      });
      i += 1;
    }
  }
}
