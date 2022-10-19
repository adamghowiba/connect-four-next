import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

export interface ButtonProps {
  children: any;
  href?: string;
  color?: "red" | "white" | "yellow" | "purple";
  size?: "large" | "xs";
  borderRadius?: "rounded" | "base" | "circle";
  onClick?: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const router = useRouter();
  const BUTTON_CLASSES = `color--${props.color} size--${props.size} radius--${props.borderRadius}`;
  return (
    <>
      <div className={`button-wrap`} onClick={() => {
        if (props.href) return router.push(props.href);
        props.onClick && props.onClick()
      }}>
        <button
          className={`button ${BUTTON_CLASSES} ${
            Array.isArray(props.children) && props.children.length ? "multiple" : ""
          }`}
        >
          {props.children}
        </button>
      </div>

      <style jsx>
        {`
          button {
            appearance: none;
            background-color: transparent;
            border: none;
            outline: none;
          }

          .link-container {

            span {
              position: absolute;
              border-radius: 20px;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
          }

          .button {
            text-transform: uppercase;
            font-weight: bold;

            &:hover {
              cursor: pointer;
            }
          }

          .size--large {
            display: flex;
            align-items: center;
            font-size: var(--text-md);
            padding: 13px;
            border-radius: 20px;
            border: 3px solid var(--color-black);
            border-bottom: 0px;
            box-shadow: 0px 10px 0px #000000;
            min-width: 400px;
            transition: border-color 0.25s ease-out, box-shadow 0.25s ease-out;
            margin-bottom: 11px;
            height: 72px;
            justify-content: center;

            &.multiple {
              justify-content: space-between;
            }

            &:hover {
              border-color: var(--color-dark-purple);
              box-shadow: 0px 8px 0px var(--color-dark-purple);
            }
          }

          .size--xs {
            display: flex;
            align-items: center;
            border-radius: 20px;
            padding: 7px 20px;
            font-size: var(--text-body);
            transition: background-color 0.15s linear;

            &.color--purple:hover {
              background-color: var(--color-red);
            }

            &.color--red:hover {
              background-color: var(--color-dark-purple);
            }
          }

          .color--red {
            background-color: var(--color-red);
            color: var(--color-white);
          }
          .color--white {
            background-color: var(--color-white);
          }
          .color--yellow {
            background-color: var(--color-yellow);
          }
          .color--purple {
            background-color: var(--color-dark-purple);
            color: var(--color-white);
          }

          .button-wrap {
            position: relative;
            width: max-content;
          }
        `}
      </style>
    </>
  );
};

Button.defaultProps = {
  color: "red",
  size: "large",
};

export default Button;
