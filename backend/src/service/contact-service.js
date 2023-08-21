import { prismaClient } from "../config/database.js";
import ThrowError from "../error/response-error.js";
import {
  scemaCreateContacts,
  scemaGetContact,
  scemaUpdateContacts,
  scemaSearch
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const createContact = async (user, request) => {
  const contact = validate(scemaCreateContacts, request);
  contact.username = user.username;

  return await prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });
};

const getContact = async (user, contactId) => {
  contactId = validate(scemaGetContact, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });

  if (!contact) {
    throw new ThrowError(404, "Contact Not Found");
  }

  return contact;
};

const updateContact = async (user, request) => {
  const contact = validate(scemaUpdateContacts, request);

  const totalContact = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id
    }
  });

  if (totalContact !== 1) {
    throw new ThrowError(404, "Contact Is Not Found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });
};

const deleteContact = async (user, contactId) => {
  contactId = validate(scemaGetContact, contactId);

  const totalContact = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if (totalContact !== 1) {
    throw new ThrowError(404, "Contact Is Not Found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId
    }
  });
};

const searchContact = async (user, request) => {
  request = validate(scemaSearch, request);

  const skip = (request.page - 1) * request.sizeTake;

  const filters = [];
  if (request.name) {
    filters.push({
      OR: [
        {
          first_name: {
            contains: request.name
          }
        },
        {
          last_name: {
            contains: request.name
          }
        }
      ]
    });
  }
  if (request.email) {
    filters.push({
      email: {
        contains: request.email
      }
    });
  }
  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone
      }
    });
  }
  const searchContact = await prismaClient.contact.findMany({
    where: {
      username: user.username,
      AND: filters
    },
    take: request.sizeTake,
    skip: skip,
    orderBy: {
      id: "desc"
    },
    select: {
      first_name: true,
      last_name: true,
      email: true,
      phone: true
    }
  });

  const totalContact = await prismaClient.contact.count({
    where: {
      AND: filters
    }
  });

  return {
    data: searchContact,
    paging: {
      page: request.page,
      total_item: totalContact,
      total_page: Math.ceil(totalContact / request.sizeTake)
    }
  };
};

export default {
  createContact,
  getContact,
  updateContact,
  deleteContact,
  searchContact
};
