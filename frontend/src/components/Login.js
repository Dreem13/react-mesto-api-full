import React, { useState, useEffect } from 'react';

function Login(props) {

  const [userAuthorisation, setUserAuthorisation] = useState({ email: '', password: ''});  
  
  function handleChange(e) {
    const { name, value } = e.target;
    setUserAuthorisation({ ...userAuthorisation, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userAuthorisation
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password)
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input type="email" className="login__input login__input_email" placeholder="Email" name="email" type="email" value={userAuthorisation.email} onChange={handleChange} required></input>
        <input type="password" className="login__input login__input_password" name="password" type="password" placeholder="Пароль" value={userAuthorisation.password} onChange={handleChange} required></input>
        <button type="submit" className="login__button">Войти</button>
      </form>
    </div>
  )
}

export default Login;