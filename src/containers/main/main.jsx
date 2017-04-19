import React from 'react';
import {connect} from 'react-redux';
import ArticleView from '../../components/main/article-view/article-view';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

	render() {

		return (
      <main className={s['main']} ref={(main) => { this.main = main; }}>
        <div className={s['mobileHeader']}></div>
        <div className={s['progressBar']}></div>
        <div className={s['content-wrapper']}>
          <ArticleView 
            activePage={this.props.activePage}
            hasErrored={this.props.hasErrored}
            isLoading={this.props.isLoading}/>
          <footer className={s['footer']}>
            <iframe src="https://ghbtns.com/github-btn.html?user=alex-saunders&repo=ecmasyntax.io&type=star&count=true" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
          </footer>
        </div>
      </main>
    )
	}

}

function mapStateToProps(state) {
	return {
    activePage: state.activePage.page,
    hasErrored: state.activePage.hasErrored,
    isLoading: state.activePage.isLoading
	};
}

export default withStyles(s)(connect(mapStateToProps)(Main));