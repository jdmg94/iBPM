import Lottie from 'lottie-react-native'
import { Subtext } from '@/components/Text'
import { Container } from './ListEmpty.styles'

const ListEmpty = () => (
  <Container>
    <Lottie
      loop
      autoPlay
      source={require('assets/ghosting.json')}
      style={{
        height: '100%',
        width: '100%',
      }}
    />
    <Subtext textAlign="center" fontSize={21}>
      No records found...
    </Subtext>
  </Container>
)

export default ListEmpty
