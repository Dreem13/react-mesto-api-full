import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import auth from '../utils/auth.js';

function Register(props) {

    const [userRegistration, setUserRegistration] = useState({ email: "", password: "" });

    function handleChange(e) {
        const { name, value } = e.target
        setUserRegistration({ ...userRegistration, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { email, password } = userRegistration
        props.onRegister(email, password)
    }

    return (
        <div className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input type="email"
                    name="email"
                    className="login__input login__input_email"
                    placeholder="Email" onChange={handleChange}
                    value={userRegistration.email}
                    required></input>
                <input type="password"
                    name="password"
                    className="login__input login__input_password"
                    placeholder="Пароль" onChange={handleChange}
                    value={userRegistration.password}
                    required></input>
                <button className="login__button">Зарегистрироваться</button>
            </form>
            <div className="login__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/sign-in">Войти</Link>
            </div>
        </div>
    )
}

export default Register;