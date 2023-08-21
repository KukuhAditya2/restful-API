import { prismaClient } from "./config/database.js";

export const createManyContact = async () => {
    for (let i = 0; i <= 15; i++) {
        await prismaClient.contact.create({
            data: {
                username: `kukuh1`,
                first_name: `kukuh${i}`,
                last_name: `aditya${i}`,
                email: `kukuhAditya${i}@gmail.com`,
                phone: `09867868798989${i}`,
            }
        });

    }
};