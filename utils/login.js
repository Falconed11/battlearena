const bcrypt = require('bcrypt')

const storedHash = '...'; // Retrieve the stored hash from your database
const loginPassword = 'userPassword123'; // The password provided during login

bcrypt.compare(loginPassword, storedHash, (err, result) => {
  if (err) {
    // Handle error
  } else if (result === true) {
    // Passwords match, proceed with login
    console.log('Password matched!');
  } else {
    // Passwords do not match, deny login
    console.log('Incorrect password!');
  }
});