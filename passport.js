const LocalStrategy=require('passport-local').Strategy
const bcrypt = require('bcrypt')
const  User = require("./models/user");

function initialize(passport, getUserByEmail, getUserById) 
{
    const authenticateUser = async (email, password, done) => {
        const User = getUserByEmail(email)
        if (User == null) {
          return done(null, false, { message: 'No User with that email' })
        }
    
        try {
          if (await bcrypt.compare(password, req.body.password)) {
            return done(null, User)
          } else {
            return done(null, false, { message: 'Password incorrect' })
          }
        } catch (e) {
          return done(e)
        }
      }
    
      passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
      passport.serializeUser((User, done) => done(null, User.id))
      passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
      })
    }
    
    module.exports = initialize