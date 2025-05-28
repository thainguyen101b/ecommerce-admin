import {
  maxLength,
  maxValue,
  minLength,
  minValue,
  regex,
  required,
} from "react-admin";

export const validateSkuCode = [
  required("SKU code is required"),
  minLength(12, "SKU code must be exactly 12 characters"),
  maxLength(12, "SKU code must be exactly 12 characters"),
  regex(
    /^[A-Z]{3}-[A-Z]{3}-[0-9]{4}$/,
    "Invalid SKU format. Expected: ABC-DEF-1234",
  ),
];

export const validatePrice = [
  required("Price is required"),
  minValue(0, "Price must be positive"),
  maxValue(999999, "Price must be less than 1,000,000"),
];

export const validateQuantity = [
  required("Quantity is required"),
  minValue(1, "Quantity must be positive"),
  maxValue(9999, "Quantity must be less than 9,999"),
];

export const validateStr = ({
  fieldName,
  maxLen = 255,
  minLen = 2,
  isRequired = true,
}: {
  fieldName: string;
  maxLen?: number;
  minLen?: number;
  isRequired?: boolean;
}) => {
  const rules = [];

  if (isRequired) {
    rules.push(required(`${fieldName} is required`));
  }

  rules.push(
    minLength(minLen, `${fieldName} must be at least ${minLen} characters`),
    maxLength(maxLen, `${fieldName} must be at most ${maxLen} characters`),
  );

  return rules;
};

export const validateRequired = ({
  fieldName,
  isRequired = true,
}: {
  fieldName: string;
  isRequired?: boolean;
}) => {
  const validators = [];

  if (isRequired) {
    validators.push(required(`${fieldName} is required`));
  }

  return validators;
};
