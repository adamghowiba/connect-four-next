import React, { FC } from "react";
import Overlay from "./Overlay";
import classNames from "classnames";

export interface ModalProps {
  children: any;
  overlay?: boolean;
  center?: boolean;
}

const Modal: FC<ModalProps> = (props) => {
  const modalClasses = classNames({
    center: props.center,
  });

  return (
    <>
      {props.overlay && <Overlay />}

      <div className={`${modalClasses} modal`}>{props.children}</div>

      <style jsx>{`
        .modal {
          background-color: var(--color-purple);
          position: fixed;
          z-index: 10;
          padding: 50px 40px;
          border-radius: 40px;
          border: 3px solid var(--color-black);
          box-shadow: 0px 10px 0px #000000;

          &.center {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
};

Modal.defaultProps = {
  overlay: true,
  center: true,
};

export default Modal;
