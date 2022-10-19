import React, { FC } from "react";

interface BoardPieceProps {
  color: "red" | "yellow";
  size?: "large" | "small";
}

const BoardPiece: FC<BoardPieceProps> = (props) => {
  if (props.size === "small")
    return (
      <svg
        width="41px"
        height="46px"
        viewBox="0 0 41 46"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>counter-red-small</title>
        <defs>
          <circle id="path-1" cx="19.9756098" cy="19.9756098" r="16.9756098"></circle>
          <filter
            x="-7.4%"
            y="-7.4%"
            width="114.7%"
            height="114.7%"
            filterUnits="objectBoundingBox"
            id="filter-2"
          >
            <feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
              result="shadowInnerInner1"
            ></feComposite>
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
              type="matrix"
              in="shadowInnerInner1"
            ></feColorMatrix>
          </filter>
        </defs>
        <g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="assets" transform="translate(-231.000000, -744.000000)">
            <g id="Group-24" transform="translate(211.000000, 160.000000)">
              <g id="counter-red-small" transform="translate(20.975610, 584.975610)">
                <circle id="Oval-Copy-49" fill="#000000" cx="20" cy="20" r="20"></circle>
                <circle id="Oval-Copy-50" fill="#000000" cx="20" cy="25" r="20"></circle>
                <g id="Oval-Copy-48">
                  <use
                    fill={`var(--color-${props.color})`}
                    fillRule="evenodd"
                    xlinkHref="#path-1"
                  ></use>
                  <use
                    fill="black"
                    fillOpacity="1"
                    filter="url(#filter-2)"
                    xlinkHref="#path-1"
                  ></use>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );

  return (
    <>
      <svg
        width="70px"
        height="75px"
        viewBox="0 0 70 75"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>counter-yellow-large</title>
        <defs>
          <circle id="path-1" cx="35" cy="35" r="32"></circle>
          <filter
            x="-3.9%"
            y="-3.9%"
            width="107.8%"
            height="107.8%"
            filterUnits="objectBoundingBox"
            id="filter-2"
          >
            <feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
              result="shadowInnerInner1"
            ></feComposite>
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
              type="matrix"
              in="shadowInnerInner1"
            ></feColorMatrix>
          </filter>
        </defs>
        <g id="Designs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="counter-yellow-large">
            <circle id="Oval-Copy-35" fill="#000000" cx="35" cy="35" r="35"></circle>
            <circle id="Oval-Copy-36" fill="#000000" cx="35" cy="40" r="35"></circle>
            <g id="Oval-Copy-35">
              <use
                fill={`var(--color-${props.color})`}
                fillRule="evenodd"
                xlinkHref="#path-1"
              ></use>
              <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
            </g>
          </g>
        </g>
      </svg>

      <style jsx>{``}</style>
    </>
  );
};

BoardPiece.defaultProps = {
  size: "large",
};

export default BoardPiece;
