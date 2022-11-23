import React from "react";
import "./Container.style.less";

/**
 * @component Container
 * @param {React.ReactNode | React.ReactNode[]} children - Accepts HTMl tags or components
 * @returns Child component wrapped in Container. Limiting content to the width of the parent
 * @example
 * return (
 * <Container>
 *  <Component1 />
 *  <Component2 />
 * </Container>
 * )
 */
const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
