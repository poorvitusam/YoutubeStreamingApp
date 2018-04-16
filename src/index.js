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

		this.state = { 
			videos: [],
			selectedVideo: null
		};
		this.videoSearch('surfboards');
		
	}
	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}
	render() {
		return (
		  <div>
		  	<SearchBar onSearchChange={event => this.videoSearch(event)}/>
		  	<VideoDetail video={this.state.selectedVideo}/>
		  	<VideoList 
		  		onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
		  		videos={this.state.videos}/>
		  </div>
		);
	}
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
