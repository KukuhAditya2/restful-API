import { prismaClient } from "../config/database.js"
import ThrowError from "../error/response-error.js";
import { scemaAddress, scemaAddressUpdate, scemaGetAddress } from "../validation/address-validation.js";
import { scemaGetContact } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const checkContactMustBeExists = async (user, contactId) => {
    contactId = validate(scemaGetContact, contactId);

    const totalContact = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    });

    if (totalContact !== 1) {
        throw new ThrowError(404, "Contact And Address Is Not Found");
    }

    return contactId;
};

const address = async (user, contactId, request) => {
    contactId = await checkContactMustBeExists(user, contactId);

    const address = validate(scemaAddress, request);
    address.contact_id = contactId

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    });

};

const updateAddress = async (user, contactId, request) => {
    contactId = await checkContactMustBeExists(user, contactId);
    const address = validate(scemaAddressUpdate, request);

    const totalAddresDatabase = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: address.id
        }
    });

    if (totalAddresDatabase !== 1) {
        throw new ThrowError(404, "Address Is Not Found");
    }

    return prismaClient.address.update({
        where: {
            id: address.id
        },
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });


};

const getAddress = async (user, contactId, addressId) => {
    contactId = await checkContactMustBeExists(user, contactId);
    addressId = validate(scemaGetAddress, addressId);
    const address = await prismaClient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });

    if (!address) {
        throw new ThrowError(404, "Address Is Not Found");
    }

    return address;

};

const deleteAddres = async (user, contactId, addressId) => {
    contactId = await checkContactMustBeExists(user, contactId);
    addressId = validate(scemaGetAddress, addressId);

    const totalAddresDatabase = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: addressId
        }
    });

    if (totalAddresDatabase !== 1) {
        throw new ThrowError(404, "Address Is Not Found");
    }

    return prismaClient.address.delete({
        where: {
            id: addressId
        }
    });

};

const list = async (user, contactId) => {
    contactId = await checkContactMustBeExists(user, contactId);

    return prismaClient.address.findMany({
        where: {
            contact_id: contactId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });
};


export default {
    address,
    updateAddress,
    getAddress,
    deleteAddres,
    list
}