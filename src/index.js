import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBNBsABd3oSuDkW__bIOGwUGWd9fvkRBzY';
const createStoreWithMiddleware = applyMiddleware()(createStore);

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { videos: [] };

		YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
			this.setState({videos});
		});
	}
	render() {
		return (
		  <div>
		  	<SearchBar/>
		  	<VideoDetail video={this.state.videos[0]}/>
		  	<VideoList videos={this.state.videos}/>
		  </div>
		);
	}
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
