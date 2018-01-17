# Setting up reamp on your development machine

1. Clone the repository
   ```
   git clone git@github.com:TheAmplifield/reamp.git
   ```

2. Install dependencies
   ```
   cd reamp
   npm install
   ```

3. Start server
   ```
   meteor
   ```

4. View in browser at http://localhost:3000 and register an account and
   sign in.

5. Load fixtures into database from javascript console in browser
   ```
   Meteor.call('resetDatabase')
   ```

# Running linter and tests

`make lint`

# More information

See documentation on https://github.com/TheAmplifield/reamp/wiki
