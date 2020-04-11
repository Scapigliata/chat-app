import { connect } from 'react-redux';

import LandingPageView from './LandingPageView';

import {
  getSocket,
  getUser,
  getServerState,
} from '../../store/selectors/selectors';
import {
  initSocket,
  userConnected,
  userDisconnected,
  clearMessages,
  serverConnected,
  serverDisconnected,
} from '../../store/actions/actionCreators';

const mapStateToProps = (state) => ({
  socket: getSocket(state),
  user: getUser(state),
  serverState: getServerState(state),
});

export default connect(mapStateToProps, {
  initSocket,
  userConnected,
  userDisconnected,
  clearMessages,
  serverConnected,
  serverDisconnected,
})(LandingPageView);
