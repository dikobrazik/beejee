type Props = {
  visible: boolean;
};

const Loader = (props: Props) => {
  if (props.visible) {
    return <div>loading...</div>;
  }
  return null;
};

export default Loader;
