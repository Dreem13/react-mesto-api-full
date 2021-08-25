import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }  

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const hanldeChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" placeholder="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input className="popup__input popup__input_field_name" type="text" name="username" value={name || ''} onChange={handleChangeName} required id="name-input" placeholder="Имя пользователя" minLength={2} maxLength={40} />
        <span className="error" id="name-input--error" />
      </div>
      <div className="popup__input-container">
        <input className="popup__input popup__input_field_caption" type="text" placeholder="Профессия" name="userjob" value={description || ''} onChange={hanldeChangeDescription} required id="work-input" minLength={2} maxLength={200} />
        <span className="error" id="work-input--error" />
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;