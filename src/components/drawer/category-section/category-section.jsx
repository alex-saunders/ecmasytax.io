import React from 'react';
import RouteLink from './route-link/route-link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './category-section.scss';

class CategorySection extends React.Component {
  constructor(props) {
    super(props);
  }

  mapLinks() {
// active={(this.props.activeRoute ? this.props.activeRoute : null) === page.route}
    return this.props.category.entries.map((entry, index) => {
      return (
        <RouteLink
          key={index}
          selectRoute={ this.props.selectRoute }>
          {entry.name}
        </RouteLink>
      )
    })
  }

  handleClick = (e) => {
    e.preventDefault();

    this.container.classList.toggle(s['hidden']);
  }

  render() {
    return (
      <div className={s['categorySection']} ref={(div) => { this.container = div; }}>
        <a className={s['categorySection-header']} href="#" onClick={this.handleClick}>
          {this.props.category.fields.name}
          <i className={`material-icons ${s['chevron']}`} ref={(i) => { this.icon = i; }}>keyboard_arrow_down</i>
        </a>
        <div className={s['categorySection-body']} ref={(div) => { this.linksContainer = div; }}>
          { this.mapLinks() }
        </div>
      </div>
    )
  }
}

export default withStyles(s)(CategorySection);
