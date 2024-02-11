import { PropsWithChildren, CSSProperties } from "react";
import { Container } from "./Header.styles";
import { Title } from '../Text'

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
