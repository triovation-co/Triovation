/**
 * Shared form validation utilities for Triovation
 * Each validator returns { valid: boolean, error: string }
 */

export const validateEmail = (value) => {
    if (!value || !value.trim()) {
        return { valid: false, error: "Email is required" };
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value.trim())) {
        return { valid: false, error: "Enter a valid email address" };
    }
    return { valid: true, error: "" };
};

export const validateEmailOptional = (value) => {
    if (!value || !value.trim()) {
        return { valid: true, error: "" }; // optional — empty is fine
    }
    return validateEmail(value);
};

export const validatePhone = (value) => {
    if (!value || !value.trim()) {
        return { valid: false, error: "Phone number is required" };
    }
    // Strip spaces, dashes, and optional +91 / 0 prefix
    const cleaned = value.trim().replace(/[\s-]/g, "");
    const phoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleaned)) {
        return { valid: false, error: "Enter a valid 10-digit phone number" };
    }
    return { valid: true, error: "" };
};

export const validatePinCode = (value) => {
    if (!value || !value.trim()) {
        return { valid: false, error: "PIN code is required" };
    }
    const pinRegex = /^[1-9]\d{5}$/;
    if (!pinRegex.test(value.trim())) {
        return { valid: false, error: "Enter a valid 6-digit PIN code" };
    }
    return { valid: true, error: "" };
};

export const validateName = (value) => {
    if (!value || !value.trim()) {
        return { valid: false, error: "Name is required" };
    }
    if (value.trim().length < 2) {
        return { valid: false, error: "Name must be at least 2 characters" };
    }
    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!nameRegex.test(value.trim())) {
        return { valid: false, error: "Name can only contain letters and spaces" };
    }
    return { valid: true, error: "" };
};

export const validateRequired = (value, label = "This field") => {
    if (!value || !value.toString().trim()) {
        return { valid: false, error: `${label} is required` };
    }
    return { valid: true, error: "" };
};
