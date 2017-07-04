// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

export default function Tab(props) {
  return props.title;
}

Tab.propTypes = {
  title: PropTypes.node.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  render: PropTypes.func.isRequired,
};
