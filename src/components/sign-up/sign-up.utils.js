export const validatePassword = (password) => {
    let count = 0;

    if (password.length < 6 ) {
        return count = 0;
    };

    const lowerCaseLetters = /[a-z]/;
    const upperCaseLetters = /[A-Z]/;
    const numbers = /[0-9]/;
    const specialCharacters = /[_!@#$%^&*(),.?:{}|<>]/;


    if (lowerCaseLetters.test(password)) {
        count += 1
    };
    
    if (upperCaseLetters.test(password)) {
        count += 1
    };
    
    if (numbers.test(password)) {
        count += 1
    };
    
    if (specialCharacters.test(password)) {
        count += 1
    };

    return count
}