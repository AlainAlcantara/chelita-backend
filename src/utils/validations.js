// src/utils/validations.js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requiredFields(obj, fields = []) {
  for (const f of fields) {
    if (obj[f] === undefined || obj[f] === null || String(obj[f]).trim() === '') {
      return `El campo "${f}" es obligatorio`;
    }
  }
  return null;
}

function isValidEmail(email) {
  return emailRegex.test(String(email || '').trim());
}

function isPositiveNumber(x) {
  return typeof x === 'number' ? x > 0 : Number(x) > 0;
}

function isOneOf(val, list) {
  return list.includes(val);
}

module.exports = { requiredFields, isValidEmail, isPositiveNumber, isOneOf };
