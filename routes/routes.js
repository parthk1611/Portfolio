import express from 'express';
import { 
    registerUser, getUsers, getUserById, updateUser, deleteUser, deleteAllUsers
} from '../controllers/userController.js'; // Corrected path
import { 
    submitContactForm, getContacts, getContactById, updateContact, deleteContact, 
    deleteAllContacts
} from '../controllers/contactController.js'; // Corrected path

const router = express.Router();

// User Routes
router.post('/users', registerUser);  // Create User
router.get('/users', getUsers);       // Get All Users
router.get('/users/:id', getUserById); // Get Single User
router.put('/users/:id', updateUser); // Update User
router.delete('/users/:id', deleteUser); // Delete User
router.delete('/users', deleteAllUsers);


// Contact Routes
router.post('/contacts', submitContactForm); // Create Contact
router.get('/contacts', getContacts); // Get All Contacts
router.get('/contacts/:id', getContactById); // Get Single Contact
router.put('/contacts/:id', updateContact); // Update Contact
router.delete('/contacts/:id', deleteContact); // Delete Contact
router.delete('/contacts', deleteAllContacts); // Delete All Contacts

export default router;