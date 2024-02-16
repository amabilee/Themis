import React from 'react';
import { IMaskInput } from 'react-imask';

const PopUpSearch = ({
  showPopSearch,
  headerText,
  sectionOneContent,
  onSubmit,
  errorMessage,
  onClose
}) => {
  return (
    showPopSearch && (
      <div className="popUpContainer">
        <div className="popUpCard">
          <div className="popUpHead">
            <div className="popupHeadHeader">
              <h1 className="heading-4">
                {headerText}
                <br />
                <span className="body-normal text-color-5">
                  Nem todos os campos requerem preenchimento.
                </span>
              </h1>
              <div className="popUpCloseIcon" onClick={onClose}></div>
            </div>
          </div>
          <div className="popUpBody">
            <div className="popUpSectionOne">{sectionOneContent}</div>
            <div className="errorContainer border-error" style={{ position: 'relative', zIndex: 1 }}>
              {errorMessage && (
                <p className="error-message" style={{ position: 'absolute', top: 0, left: 0 }}>
                  {errorMessage}
                </p>
              )}
              <div className="popUpButtonsSectionOne">
                {onSubmit && (
                  <button
                    className="button-10"
                    variant="outlined"
                    onClick={onSubmit}
                  >
                    Pesquisar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PopUpSearch;
