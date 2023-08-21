import addressService from "../service/address-service.js";

export const createAddress = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const contactId = req.params.contactId;
        const result = await addressService.address(user, contactId, request);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error)
    }

};

export const updateAddress = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId
        const request = req.body;
        request.id = addressId;
        const result = await addressService.updateAddress(user, contactId, request);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error)
    }
};

export const getAddress = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;
        const result = await addressService.getAddress(user, contactId, addressId);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error)
    }

};

export const deleteAddres = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const addressId = req.params.addressId;
        await addressService.deleteAddres(user, contactId, addressId);
        res.status(200).json({
            data: "Successfully Deleted Address"
        });
    } catch (error) {
        next(error)
    }
};

export const list = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const result = await addressService.list(user, contactId);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error)
    }
};