import contactService from "../service/contact-service.js";

export const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await contactService.createContact(user, request);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const getContact = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId
        const result = await contactService.getContact(user, contactId);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error)
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const request = req.body;
        request.id = contactId;
        const result = await contactService.updateContact(user, request);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        await contactService.deleteContact(user, contactId);
        res.status(200).json({
            data: "Successfully Deleted Contact"
        });
    } catch (error) {
        next(error)
    }
};

export const search = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            sizeTake: req.query.size
        }
        const result = await contactService.searchContact(user, request);
        res.status(200).json({
            data: result.data,
            pagging: result.paging
        });
    } catch (error) {
        next(error);
    }
};
