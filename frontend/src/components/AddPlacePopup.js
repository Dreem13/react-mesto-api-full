import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {    
    const [name, setName] = React.useState();
    const [link, setLink] = React.useState();

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({name, link})
    }

    function editName(e) {
        setName(e.target.value);
    }

    function editLink(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name="cards" title="Новое место" placeholder="Создать" isOpen={props.isOpen} onClose={props.onClose}>
            <div className="popup__input-container">
                <input className="popup__input popup__input_card_name" value={name} onChange={editName} type="text" placeholder="Название" name="name" required id="card-input" minLength={2} maxLength={30} />
                <span className="error" id="card-input--error" />
            </div>
            <div className="popup__input-container">
                <input className="popup__input popup__input_card_caption" value={link} onChange={editLink} type="url" placeholder="Ссылка на картинку" name="link" required id="url-input" />
                <span className="error" id="url-input--error" />
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;