import React from 'react';
import Ripple from '../../../../generic/ripple/ripple';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './route-link.scss';

class RouteLink extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  clickHandler = (e) => {
    e.preventDefault();
    this.props.selectRoute(this.props.page);
  }

	render() {
		return (
      <Ripple>
        <a
          className={((this.props.activePage) && (this.props.activePage.sys.id === this.props.page.sys.id)) ? (`${s['pageList-item']} ${s['active']}`) : s['pageList-item']}
          href={this.props.route}
          onClick={ this.clickHandler }>
          {this.props.children}
        </a>
      </Ripple>
    )
	}

}


export default withStyles(s)(RouteLink);