import api from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';

function App() {

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getCards()
      .then((res) => { setCards(res) })
      .catch((error) => {
        console.log(error);
      }
    )}, []
  );

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.like(card._id, isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((i) => i !== card));
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => { setCurrentUser(res) })
      .catch((error) => {
        console.log(error);
      })
  }, []
  );

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setIsEditAvatarPopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        setIsAddPlacePopupOpen(false)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = React.useState(false);
  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsTooltipOpen(false);
  }

  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(true);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const history = useHistory();

  function onRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsRegistrationSuccessful(true);
        history.push('/sign-in');
      })
      .catch(() => setIsRegistrationSuccessful(false))
      .then(() => setIsTooltipOpen(true));
  }
  
  const [userEmail, setUserEmail] = React.useState('');
  
  React.useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token === null) { return }
    onTokenCheck(token)
  }, []
  );

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function onTokenCheck(token) { 
    auth.checkToken(token)
      .then(res => {
        setIsLoggedIn(res.data != null)
        setUserEmail(res.data.email)
        history.push('/')
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function onLogin(email, password) {
    auth.login(email, password)
      .then(() => {
        setIsLoggedIn(true);
        history.push('/');
        onTokenCheck();
      })
      .catch((error) => {
        console.log(error);
      })    
  }  

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false)
  } 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App body-background">
        <div className="page-container">
          <Header userEmail={userEmail} onSignOut={handleSignOut} />
          <Switch>

            <Route path='/sign-up'>
              <Register onRegister={onRegister} />
            </Route>

            <Route path='/sign-in'>
              <Login onLogin={onLogin} onTokenCheck={onTokenCheck} />
            </Route>

            <ProtectedRoute exact path="/"
              isLoggedIn={isLoggedIn}
              component={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            >            

            </ProtectedRoute>
          </Switch>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <PopupWithForm name="delete" title="Вы уверены?" placeholder="Да" />

          <InfoTooltip isOpen={isTooltipOpen} isSuccess={isRegistrationSuccessful} onClose={closeAllPopups} />
        </div>
      </div>
    </ CurrentUserContext.Provider>
  );
}

export default App;
