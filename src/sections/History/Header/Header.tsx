import { Link } from "expo-router";
import { useTheme } from "@emotion/react";
import { Title, Row } from "./Header.styles";
import { Feather as Icon } from "@expo/vector-icons";

const Header = () => {
  const theme = useTheme();
  return (
    <Row>
      <Title>All Records</Title>
      <Link href="/settings">
        <Icon size={24} name="settings" color={theme.colors.text} />
      </Link>
    </Row>
  );
};

export default Header;
