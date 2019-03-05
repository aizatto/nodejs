// eslint-disable-next-line import/no-extraneous-dependencies

interface Props {
  className: string,
  title: string,
  render(): void,
}

export default function Tab(props: Props) {
  return props.title;
}

Tab.defaultProps = {
  className: '',
};
