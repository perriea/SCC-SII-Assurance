var LocalStrategy    = require('passport-local').Strategy;
var validator        = require('validator');

// We load the MySQL model (Sequelize)
var MUsers           = require('../app/models/users');

module.exports = function(passport) {

    // =========================================================================
    // PASSPORT SESSION ========================================================
    // =========================================================================

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        MUsers.TUsers.find({ where: { id: id }})
            .then(function(user){
                done(null, user);
            }).error(function(err) {
            done(err, null);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({
            // on determine par defaut les champs
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done)
        {
            process.nextTick(function() {

                // It is checked whether a user is already registered with the sent mail address
                MUsers.TUsers.find({ where: { email: email }}).then(function(user)
                {
                    // If a user exists with this email it says it is already taken
                    // Otherwise we create the user
                    if (user)
                        return done(null, false, { message: 'E-mail address already used!' });
                    else
                    {
                        if (validator.isLength(password, { min: 6, max: 30 }))
                        {
                            MUsers.TUsers.create({ email: email, password: MUsers.methods.generateHash(password), authenticate_id: 1, role_id: 1 }).then(function(result) {
                                return done(null, result, { message: 'Registration successfully completed!' });
                            }).catch(function(e) {
                                console.log("Local registration: Error in user creation.");
                                return done(e, false, { message: "An error occurred while registering!" });
                            });
                        }
                        else
                        {
                            console.log("Local registration: Error length of password insufficient!");
                            return done(null, false, { message: "The length of the password is insufficient!" });
                        }
                    }

                }).catch(function(e) {
                    console.log("Local registration: Error in user search.");
                    return done(e, false, { message: "An error occurred while registering!" });
                });

            });

        })
    );


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done)
        {
            // If a user exists it looks if the password is correct
            MUsers.TUsers.find({ where: { email: email }}).then(function(user) {

                // if the user does not exist, return this message
                if (!user)
                    return done(null, false, { message: 'This user does not exist' });

                // verify the password
                if (!MUsers.methods.validPassword(password, user))
                    return done(null, false, { message: 'Invalid password' });

                // If everything is ok, we create the session
                return done(null, user, { message: 'Successful Authentication' });
            }).catch(function(e) {
                console.log("Local Authentication: Error in user search");
                return done(e, null);
            });

        })
    );

};