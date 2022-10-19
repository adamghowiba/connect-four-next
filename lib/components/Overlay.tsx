import React, { FC } from "react";

export interface OverlayProps {
  zIndex?: number;
}

const Overlay: FC<OverlayProps> = (props) => {
  return (
    <>
      <div className="overlay"></div>

      <style jsx>{`
        .overlay {
          width: 100%;
          height: 100%;
          position: fixed;
          background-color: rgba(23, 5, 33, 0.42);
          top: 0;
          left: 0;
          z-index: ${props.zIndex || 10};
        }
      `}</style>
    </>
  );
};

export default Overlay;
