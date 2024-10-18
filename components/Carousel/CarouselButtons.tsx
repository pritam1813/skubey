import React from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  enabled: boolean;
  onClick: () => void;
}

export const PrevButton: React.FC<ButtonProps> = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
  >
    <FontAwesomeIcon icon={faAngleLeft} />
  </button>
);

export const NextButton: React.FC<ButtonProps> = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <FontAwesomeIcon icon={faAngleRight} />
  </button>
);
