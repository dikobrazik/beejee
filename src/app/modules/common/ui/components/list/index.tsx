type Props<ListItem> = {
  data: ListItem[];
  renderItem: (item: ListItem, index: number) => JSX.Element;
};

const CommonList = <ListItem extends any>(props: Props<ListItem>) => {
  const { data, renderItem } = props;
  return <ul>{data.map(renderItem)}</ul>;
};

export default CommonList;
