import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup popup__image ${props.isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container  popup__container_type_result-image">
                <button className="popup__close" type="button" aria-label="закрыть" onClick={props.onClose} ></button>
                <div className="popup__result">
                    <img src={props.isSuccess ? success : error} alt={props.isSuccess ? 'Успешно' : 'Неудачно'} className="popup__image" />
                    <div className="popup__text">
                        <p>{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip