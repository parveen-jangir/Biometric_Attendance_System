import crypto from "crypto";

export const otpDigitGenerate = () => crypto.randomInt(100000, 999999).toString();

// const validateOtp = (inputOtp, storedOtp) => inputOtp === storedOtp;

// module.exports = { generateOtp, validateOtp };
