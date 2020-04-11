import { connect } from 'react-redux';

import MessagesView from './Messages';

import { getMessages, getUsersTyping } from '../../store/selectors/selectors';

const mapStateToProps = (state) => ({
  messages: getMessages(state),
  usersTyping: getUsersTyping(state),
});

export default connect(mapStateToProps, {
  undefined,
})(MessagesView);
