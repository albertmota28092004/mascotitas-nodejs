const mongoose = require('mongoose');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@clusteradso2557466.htke3tm.mongodb.net/${process.env.NAME_DB}`

mongoose.connect(URI);

module.exports = mongoose;