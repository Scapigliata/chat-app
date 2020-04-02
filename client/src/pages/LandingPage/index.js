import { connect } from 'react-redux';

import LandingPageView from './LandingPageView';

import { getSocket, getUser } from '../../store/selectors/selectors';
import {
  initSocket,
  userConnected,
  clearMessages,
} from '../../store/actions/actionCreators';

const mapStateToProps = state => ({
  socket: getSocket(state),
  user: getUser(state),
});

export default connect(mapStateToProps, {
  initSocket,
  userConnected,
  clearMessages,
})(LandingPageView);
