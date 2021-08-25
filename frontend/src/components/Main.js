import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar} />
        <div className="profile__info">
          <img className="profile__info-img" src={currentUser.avatar} alt="Фотография пользователя" />
          <div className="profile__info-text">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
            <button className="profile__info-text-button" type="button" onClick={props.onEditProfile} aria-label="Изменение данных пользователя" />
          </div>
        </div>
        <button className="profile__button" type="button" onClick={props.onAddPlace} aria-label="Добавление новой карточки" />
      </section>
      <div className="elements">
        {props.cards.map((card) => (<Card key={card._id} card={card} onClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />))}
      </div>
    </main>
  );
}

export default Main;