import React, { FC } from "react";

interface NavbarProps {}

const Bar: FC<NavbarProps> = (props) => {
  return (
    <>
      Bar
      <style jsx>{``}</style>
    </>
  );
};

const Link: FC<NavbarProps> = (props) => {
  return (
    <>
      Link
      <style jsx>{``}</style>
    </>
  );
};

export default { Bar, Link };
