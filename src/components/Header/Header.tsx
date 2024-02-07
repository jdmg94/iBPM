import { PropsWithChildren, CSSProperties } from "react";
import { Container, Title } from "./Header.styles";

type HeaderProps = {
  left?: JSX.Element;
  right?: JSX.Element;
  title?: string;
  style?: CSSProperties;
};

const Header = ({
  left,
  right,
  title,
  style,
  children,
}: PropsWithChildren<HeaderProps>) => {
  return (
    <Container justifyContent="space-between" style={style}>
      <Container>
        {left}
        <Title> {title || children} </Title>
      </Container>
      {right}
    </Container>
  );
};

export default Header;
