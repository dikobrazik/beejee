import * as Components from './styles';

type Props = {
  visible: boolean;
};

const Loader = (props: Props) => {
  if (props.visible) {
    return (
      <Components.Overflow>
        <Components.Indicator></Components.Indicator>
      </Components.Overflow>
    );
  }
  return null;
};

export default Loader;
