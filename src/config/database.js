require('dotenv').config();

module.exports = {
  uri: `mongodb+srv://${process.env.DB_USERNAME}:${
    process.env.DB_PASSWORD
  }@cluster0-afdwt.mongodb.net/marketplace?retryWrites=true`,
};
