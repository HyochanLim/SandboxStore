function userDetailsAreValid(email, password, fullName, street, postal, city) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 5 &&
    fullName &&
    fullName.trim().length > 0 &&
    street &&
    street.trim().length > 0 &&
    postal &&
    postal.trim().length > 0 &&
    city &&
    city.trim().length > 0
  );
}

function emailIsComfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsComfirmed: emailIsComfirmed
};