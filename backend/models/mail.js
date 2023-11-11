const mongoose = require('mongoose');

const MailerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    emailTo: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    filePassword: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, collection: 'mails' }
);

module.exports = mongoose.model('Mail', MailerSchema);
