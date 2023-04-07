import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY
  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

  state = {
    progress: 0
  }
  setProgress = (progress) => {

    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <>
        <Router>
          <LoadingBar color="#2998ff" progress={this.state.progress} />
          <Navbar title="NewsDose" categories={this.categories} />
          <Routes>
            <Route path={"/"} element={<News key="general" category={'general'} country="in" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={12} />} />
            {
              this.categories.map((category) => {
                return (
                  <Route key={category} path={"/" + category} element={<News key={category} category={category} setProgress={this.setProgress} country="in" apiKey={this.apiKey} pageSize={12} />} />
                );
              })
            }
          </Routes>
        </Router>

      </>
    )
  }
}

export default App