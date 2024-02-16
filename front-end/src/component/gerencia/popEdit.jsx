import React, { useState, useEffect } from 'react';

const PopUpEdit = ({
  showPopEdit,
  onClose,
  headerText,
  sectionOneContent,
  sectionTwoContent,
  nav,
  onSubmit,
  errorMessage,
  oneSection,
  onChangeSection,
}) => {
  const [showSectionOne, setShowSectionOne] = useState(true);

  useEffect(() => {
    if (onChangeSection) {
      onChangeSection(showSectionOne);
    }
  }, [showSectionOne, onChangeSection]);

  const changeFormSectionOne = () => {
    setShowSectionOne(true);
  };

  const changeFormSectionTwo = () => {
    setShowSectionOne(false);
  };
  return (
    showPopEdit && (
      <div className="popUpContainer">
        <div className="popUpCard">
          <div className="popUpHead">
            <div className="popupHeadHeader">
              <h1 className="heading-4">
                {headerText}
                <br />
                <span className="body-normal text-color-5">
                  Todos os campos requerem preenchimento.
                </span>
              </h1>
              <div className="popUpCloseIcon" onClick={() => {
                onClose();
                setShowSectionOne(true);
              }}></div>
            </div>
            <div className="popUpNav">
              {nav}
            </div>
          </div>
          <div className="popUpBody">
            {showSectionOne ? (
              <div className="popUpSectionOne">{sectionOneContent}</div>
            ) : (
              <div className="popUpSectionTwo">{sectionTwoContent}</div>
            )}
            < div className="errorContainer border-error" style={{ position: 'relative', zIndex: 1 }}>
              {errorMessage && (
                <p className="error-message" style={{ position: 'absolute', top: 0, left: 0 }}>
                  {errorMessage}
                </p>
              )}
              {!oneSection && showSectionOne && (
                <div className="popUpButtonsSectionOne">
                  <button className="button-9" onClick={changeFormSectionTwo}>
                    Continuar
                  </button>
                </div>
              )}
              {!showSectionOne && (
                <div className="popUpButtons">
                  {!showSectionOne && (
                    <button className="button-8" onClick={changeFormSectionOne}>
                      Voltar
                    </button>
                  )}
                  {onSubmit && (
                    <button className="button-9" variant="outlined" onClick={onSubmit}>
                      Alterar
                    </button>
                  )}
                </div>
              )}
              {oneSection && (
                <div className="popUpButtonsSectionOne">
                <button className="button-9" onClick={onSubmit}>
                  Alterar
                </button>
              </div>
              )}
            </div>
          </div>
        </div>
      </div >
    )
  );
};

export default PopUpEdit;
