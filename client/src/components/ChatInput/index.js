import { connect } from 'react-redux';

import ChatInputView from './ChatInputView';
import { messageSent } from '../../store/actions/actionCreators';

const mapStateToProps = state => ({
  state,
});

const ChatInput = connect(mapStateToProps, { messageSent })(ChatInputView);

export default ChatInput;
