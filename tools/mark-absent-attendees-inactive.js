// load this script with mongo client

print('Marking absent attendees inactive...');

var result = db.attendees.update({
  active: true,
  lastSeenAt: {$lte: new Date(new Date() - 60000)}
}, {
  $set: {active: false}
}, {
  multi:true
});

print(result);
print('Marking absent attendees inactive...done');
