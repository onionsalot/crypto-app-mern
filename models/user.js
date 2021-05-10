const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6; // 6 is a typical and reasonable value

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			minLength: 3,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: function (doc, ret) {
			delete ret.password;
			return ret;
		},
	}
);

userSchema.pre('save', function (next) {
	// Save the reference to the user doc
	const user = this;
	if (!user.isModified('password')) return next();
	// if password has been changed - salt and hash it
	bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
		if (err) return next(err);
		// Update the password property with the hash
		user.password = hash;
		return next();
	});
});

module.exports = mongoose.model('User', userSchema);
