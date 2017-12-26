var Strategy = require('passport-local').Strategy,
    bCrypt = require('bcrypt-nodejs'),
    users = {},
    createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(), null);
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
            
        }));
    };