import { Container } from 'react-bootstrap';
import NavigationComponentHeader from '../../components/header';

type Props = {
  children: JSX.Element;
};

const NavigationLayoutsMain = (props: Props) => {
  return (
    <Container>
      <NavigationComponentHeader></NavigationComponentHeader>
      {props.children}
    </Container>
  );
};

export default NavigationLayoutsMain;
