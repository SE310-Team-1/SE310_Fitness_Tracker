import userService from '../services/userService.js';

const logUserIn = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        if (await userService.validateCredentials(username, password)) {
            const user_id = await userService.getUserId(username);
            console.log("id returned from function was " + user_id);
            req.session.user = { user_id: user_id }; // Store user info in session
            res.status(200).json({ message: 'Login successful' }); 
        } else {
            res.status(401).json({ error: 'Invalid email or password' }); 
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error when logging user in' }); 
}
};

const signUserUp = async (req, res) => {
    const { username, password } = req.body; // Ensure these values exist
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    
    try {
        if (await userService.isUsernameAvailable(username)) {
            const { id: user_id } = await userService.createUser(username, password); 
            req.session.user = { user_id: user_id.id }; // Store user info in session
            res.status(201).json({ message: 'User created successfully', user_id }); 
        } else {
            res.status(409).json({ error: 'User already exists' }); 
        }
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error when signing user up' });
    }
};

const logUserOut = (req, res) => {
    req.session.destroy((err)=> {
        if(err){
            return res.status(500).json({ error: 'An error occurred while logging out.' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful.' });
    })
    
}

export default { logUserIn, signUserUp ,logUserOut}
