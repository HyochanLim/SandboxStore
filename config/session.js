const mongoDbStore = require('connect-mongodb-session');

function createSessionStore(session) {
  const MongoDBStore = mongoDbStore(session);

  const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'online-shop',
    collection: 'sessions'
  });

  return store;
}

function createSessionConfig(session) {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(session),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    }
}

module.exports = createSessionConfig;