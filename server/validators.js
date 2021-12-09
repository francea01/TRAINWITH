const patternDictionary = {
  email: /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]{2,}.[a-zA-Z]{2,4}$/,
};

const validators = {
  pattern: (fieldName, fieldValue, option, errors) => {
    !patternDictionary[option].test(fieldValue) &&
      pushError(errors, fieldName, "invalid format");
  },
  minLength: (fieldName, fieldValue, option, errors) => {
    fieldValue.length < option &&
      pushError(
        errors,
        fieldName,
        `Number of characters must be greater than ${option}.`
      );
  },
  maxLength: (fieldName, fieldValue, option, errors) => {
    fieldValue.length > option &&
      pushError(
        errors,
        fieldName,
        `Number of characters must be less than ${option}.`
      );
  },
};

function pushError(errors, fieldName, error) {
  const errorRef = errors.find((error) => error.fieldName === fieldName);
  errorRef
    ? errorRef.errors.push(error)
    : errors.push({ fieldName, errors: [error] });
}

const isBodyValid = (body, fields) => {
  const errors = [];

  fields.forEach((field) => {
    const fieldValue = body[field.name];
    typeof fieldValue === "string" && fieldValue.trim();

    if (!fieldValue) {
      pushError(errors, field.name, "this field is required");
      return;
    }

    field.options &&
      Object.entries(field.options).forEach(([optionKey, optionValue]) =>
        validators[optionKey](field.name, fieldValue, optionValue, errors)
      );
  });

  return errors;
};

module.exports = {
  isBodyValid,
};
