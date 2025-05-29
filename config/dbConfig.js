const mongoose = require('mongoose');
const GiftCardMOdel = require('../models/GiftCardMOdel')
require('dotenv').config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URL, {
})
.then(async () => {
  console.log("Connected to DB");

  // Drop index
  await GiftCardMOdel.collection.dropIndexes();
  console.log("Dropped all indexes");

  process.exit();
})
.catch((err) => console.error(err));
