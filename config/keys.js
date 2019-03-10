module.exports = {
  google: {
    clientID: process.env.GoogleClientID,
    clientSecret: process.env.GoogleClientSecret 
  },
  mongodb: {
    dbURI: process.env.MongoDBURI
  },
  session: {
    cookieKey: process.env.CookieKey
  }
}
