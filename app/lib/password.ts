// Mirrors Adhara's portal password policy (app/core/security.py:validate_password_strength)
// so the signup form and the API route agree before either one talks to Adhara.
export const PASSWORD_REQUIREMENTS_MESSAGE =
  'Password must be at least 12 characters and include an uppercase letter, a lowercase letter, a number, and a special character.';

export function isStrongPassword(password: string): boolean {
  return (
    password.length >= 12 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}
