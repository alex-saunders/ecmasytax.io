import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { pushToast, setAutoDownload } from '../../actions/utils';

import OfflineSwitch from '../../components/main/offline-switch/offline-switch';

import s from './waterfall-header.scss';

const WaterfallHeader = ({ activeRoute, pushToast, autoDownload, visible, setAutoDownload }) => {
  const style = {
    maxHeight: visible ? '57px' : '0px',
  };
  return (
    <div className={s.header} style={style}>
      <div className={s['header-contentWrapper']}>
        <OfflineSwitch
          activeRoute={activeRoute}
          pushToast={pushToast}
          autoDownload={autoDownload}
          setAutoDownload={setAutoDownload}
        />
      </div>
    </div>
  );
};

WaterfallHeader.propTypes = {
  visible: PropTypes.bool.isRequired,
  pushToast: PropTypes.func.isRequired,
  setAutoDownload: PropTypes.func.isRequired,
  autoDownload: PropTypes.bool,
  activeRoute: PropTypes.string,
};

WaterfallHeader.defaultProps = {
  autoDownload: false,
  activeRoute: null,
};

function mapStateToProps(state) {
  return {
    activeRoute: state.activePage.route,
    autoDownload: state.utils.autoDownload,
    visible: state.utils.waterfallHeaderOpen,
  };
}

function matchDispatchToProps(dispatch) {
  return {
    pushToast: (message, action, timeout, callback) => { dispatch(pushToast(message, action, timeout, callback)); },
    setAutoDownload: (bool) => { dispatch(setAutoDownload(bool)); },
  };
}

export default withStyles(s)(connect(mapStateToProps, matchDispatchToProps)(WaterfallHeader));
