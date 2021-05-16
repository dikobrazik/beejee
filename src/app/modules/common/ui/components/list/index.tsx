type Props<ListItem> = {
  data: ListItem[];
  renderItem: (item: ListItem, index: number) => JSX.Element;
};

const CommonList = <ListItem extends any>(props: Props<ListItem>) => {
  const { data, renderItem } = props;
  return (
    <ul className="p-0" style={{ listStyleType: 'none' }}>
      {data.map(renderItem)}
    </ul>
  );
};

export default CommonList;
