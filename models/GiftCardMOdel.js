const mongoose = require('mongoose');

const GiftCardSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Amount :{ type : String, required : true},
  Currency: { type: String, required: true },
  Redemptioncode: { type: String, required: true,  },
  Pin: { type: String, required: true,  },
  GiftCardCvv: { type: String, required: true, },
  ExpireDate: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GiftCard', GiftCardSchema);
