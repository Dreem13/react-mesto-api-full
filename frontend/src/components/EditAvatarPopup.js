import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

    const refAvatar = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(
            refAvatar.current.value
        );
    }

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" placeholder="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="popup__input popup__input_title_avatar" id="avatar-input" type="url" name="avatar" ref={refAvatar} placeholder="Ссылка на аватар" autoComplete="on" required />
            <span className="error span-avatar" id="avatar-input--error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;