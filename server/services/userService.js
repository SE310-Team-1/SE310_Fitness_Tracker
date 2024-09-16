import knex from './../db.js';
import { hashPassword, comparePasswords } from './securePassword.js';

async function isUsernameAvailable(username) {
    console.log('Checking username:', username); //log for checking username 
    try {
        const user = await knex('users')
            .select('id')
            .where({ username })
            .first();
        return !user;
    } catch (error) {
        console.error('Database query failed:', error);
        throw error;
    }
}

async function createUser(username, password) {
    try {
        const hashedPassword = await hashPassword(password);
        // Insert user into the database
        const [userId] = await knex('users').insert({ username, password: hashedPassword }).returning('id');
        return { id: userId, message: 'User created successfully' };
    } catch (error) {
        console.error('Problem when adding user to database:', error);
        throw error;
    }
}

async function validateCredentials(username, password) {
    try {
        // Retrieve the user from the database
        const user = await knex('users')
            .select('password')
            .where({ username })
            .first();

        if (!user) {
            // User not found
            return false;
        }

        // Compare the provided password with the hashed password
        const isMatch = await comparePasswords(password, user.password);
        return isMatch;
    } catch (error) {
        console.error('Error validating user credentials in USERSERVICE:', error);
        throw error;
    }
}

async function getUserId(username) {
    try {
        const user = await knex('users')
            .select('id')
            .where({ username })
            .first();
        return user ? user.id : null;
    } catch (error) {
        console.error('Error retrieving user id from database:', error);
        throw error;
    }
}

export default {
    isUsernameAvailable,
    createUser,
    validateCredentials,
    getUserId,
};
