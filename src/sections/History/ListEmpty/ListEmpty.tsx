import Lottie from "lottie-react-native";
import { Container, Label } from "./ListEmpty.styles";

const ListEmpty = () => (
  <Container>
    <Lottie
      loop
      autoPlay
      source={require("assets/ghosting.json")}
      style={{
        height: "100%",
        width: "100%",
      }}
    />
    <Label>No records found...</Label>
  </Container>
);

export default ListEmpty;
