import { connect } from 'react-redux';

import ChatInputView from './ChatInputView';
import {
  messageSent,
  stopUserTyping,
  setUserTyping,
} from '../../store/actions/actionCreators';

const mapStateToProps = (state) => ({
  state,
});

const ChatInput = connect(mapStateToProps, {
  messageSent,
  stopUserTyping,
  setUserTyping,
})(ChatInputView);

export default ChatInput;
