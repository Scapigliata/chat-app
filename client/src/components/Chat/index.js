import { connect } from 'react-redux';

import ChatView from './ChatView';

import {
  getMessages,
  getSocket,
  getUser,
  getUsersTyping,
} from '../../store/selectors/selectors';
import {
  messageRecieved,
  userConnected,
  setUserTyping,
  stopUserTyping,
  clearMessages,
} from '../../store/actions/actionCreators';

const mapStateToProps = (state) => ({
  messages: getMessages(state),
  socket: getSocket(state),
  user: getUser(state),
  usersTyping: getUsersTyping(state),
});

export default connect(mapStateToProps, {
  messageRecieved,
  userConnected,
  setUserTyping,
  getUsersTyping,
  stopUserTyping,
  clearMessages,
})(ChatView);
