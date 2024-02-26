import { FieldTypes } from "@components/UI/Field";

const isValidEmail = (email: string) => {
    // Simple email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email) || !email.length;
  }
  
const isValidPhoneNumber = (phoneNumber: string) => {
  // Simple phone number validation regex (for demonstration)
  const phoneRegex = /^\d{10}$/; // Assumes 10-digit phone number
  return phoneRegex.test(phoneNumber) || !phoneNumber.length;
}

export const useFieldValidation = (
  value: any, 
  type: FieldTypes, 
  isRequired: boolean,
  password?: string | undefined
) : [boolean, string] => {
    if (isRequired && (value === '' || value === undefined || value === null)) {
      return [false, "fields.errors.empty"];
    }
  
    if (type === 'email' && !isValidEmail(value)) {
      return [false, "fields.errors.invalid_email"];
    }
  
    if (type === 'tel' && !isValidPhoneNumber(value)) {
      return [false, "fields.errors.invalid_phone"];
    }

    if (type === 'password' && value.length < 8) {
      return [false, "fields.errors.short_password"];
    }

    if (type === 'confirm-password' && value !== password) {
      return [false, "fields.errors.confirm_password"];
    }
  
    // Additional validations for other field types can be added here
  
    return [true, '']; // No validation errors
}
  
  