function Validation(values) {
    let error = {};
    
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.email === "") {
        error.email = "Forneça um email válido";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email incorreto";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "O campo SENHA não pode estar em branco";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Senha não confere";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation;
