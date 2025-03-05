import Contact from '../models/Contact.js';

// Submit a contact form
export const submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message });
        await contact.save();

        res.status(201).json({ message: "Message sent successfully", contact });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all contact messages
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get a single contact by ID
export const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update a contact by ID
export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact updated successfully", updatedContact });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
export const deleteAllContacts = async (req, res) => {
    try {
        const result = await Contact.deleteMany({});
        res.status(200).json({ message: "All contacts deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete a contact by ID
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }

    
};