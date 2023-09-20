// src/controllers/userController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Update user profile
const updateUserProfile = async (req, res) => {
	try {
		const { userId } = req.user; // Assuming you use Passport for authentication
		const { fullName, email } = req.body;
		const updatedUser = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				fullName,
				email,
			},
		});
		res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
	} catch (error) {
		res.status(500).json({ error: 'User profile update failed' });
	}
};

// Change password
const changePassword = async (req, res) => {
	try {
		const { userId } = req.user; // Assuming you use Passport for authentication
		const { currentPassword, newPassword } = req.body;

		// Verify the current password
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		const passwordMatch = await bcrypt.compare(currentPassword, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ error: 'Incorrect current password' });
		}

		// Update the password
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				password: hashedPassword,
			},
		});
		res.status(200).json({ message: 'Password changed successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Password change failed' });
	}
};

// Retrieve user profile by username
const getUserProfileByUsername = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});
		if (!user) {
			res.status(404).json({ error: 'User not found' });
		} else {
			res.status(200).json({ user });
		}
	} catch (error) {
		res.status(500).json({ error: 'Unable to fetch user profile' });
	}
};

// Retrieve user profile by user ID
const getUserProfileById = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(userId),
			},
		});
		if (!user) {
			res.status(404).json({ error: 'User not found' });
		} else {
			res.status(200).json({ user });
		}
	} catch (error) {
		res.status(500).json({ error: 'Unable to fetch user profile' });
	}
};

module.exports = {
	updateUserProfile,
	changePassword,
	getUserProfileByUsername,
	getUserProfileById,
};