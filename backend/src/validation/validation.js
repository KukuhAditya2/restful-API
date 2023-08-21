import ThrowError from "../error/response-error.js"

const validate = (scema, request) => {
    const { error, value } = scema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    });

    if (error) {
        throw new ThrowError(400, error.message);
    } else {
        return value
    }
}

export {
    validate
}