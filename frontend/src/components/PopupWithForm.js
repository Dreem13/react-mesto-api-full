function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_open' : ''}`}>
      <div className="popup__overlay" onClick={props.onClose} />
      <div className="popup__container">
        <button className="popup__close" type="button" title="Закрыть окно" aria-label="Закрыть форму" onClick={props.onClose} />
        <form action="action" className="popup__form" onSubmit={props.onSubmit} name={props.name} id={`${props.name}-form`} autoComplete="off" >
          <fieldset className="popup__field">
            <legend className="popup__header">{props.title}</legend>
            {props.children}
            <button className="popup__btn popup__btn_save" type="submit" aria-label="Кнопка сохранить">{props.placeholder}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;