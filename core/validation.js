const { isEmpty } = require("lodash");

module.exports = data => {
    const errors = {};
    if (isEmpty(data.providerName)) {
        errors.providerName = "provider name is required";
    }

    if (isEmpty(data.file)) {
        errors.file = "file is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
