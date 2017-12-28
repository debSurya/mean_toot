var Strategy = require('passport-local').Strategy,
    bCrypt = require('bcrypt-nodejs'),
    users = {},
    createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(), null);
    },
    isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    },
    init = function (passport) {
        passport.use('signup', new Strategy({
            passReqToCallback: true
        },
            function (req, username, password, done) {
                if (users[username]) {
                    done('username taken', false);
                }
                users[username] = {
                    username: username,
                    password: createHash(password)
                };
                return (null, users[username]);
            }));

        passport.use('login', new Strategy({
            passReqToCallback: true
        }, function (req, username, password, done) {
            if (!users[username]) {
                done('User not found', false);
            }

            if (!isValidPassword(users[username], password)) {
                done('Incorrect password', false);
            }

            done(null, users[username]);
        }));

        passport.serializeUser(function (user, done) {
            console.log('Serializing:' + users[username]);
            done(null, users[username])
        });

        passport.deserializingUser(function (user, done) {
            console.log('deregistering user');
            done(null, users[username]);
        });
    };

module.exports = init;