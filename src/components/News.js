import React, { Component } from 'react'
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'
import { captialize } from '../utils';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
    }

    static propTypes = {
        category: PropTypes.string.isRequired,
        pageSize: PropTypes.number.isRequired
    }
    getInitialNews = async () => {
        this.props.setProgress(20);
        const data = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`);
        const parsedData = await data.json();
        this.props.setProgress(60);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            page: this.state.page,
            loading: false
        });
        this.props.setProgress(100);
    }
    getMoreNews = async () => {

        const data = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`);
        const parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            page: this.state.page + 1
        });
    }
    render() {
        const { category } = this.props;
        return (
            <>
                <h1 className="display-2 mb-4 text-center">Top Headlines from {captialize(category)} </h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.getMoreNews}
                    hasMore={this.state.articles?.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="row row-cols-1 row-cols-md-4 m-2 g-4">

                        {this.state.articles.map((article) => {
                            return <NewsItem key={article.url} title={article.title} description={article.description || "Click link to read more"} imgUrl={article.urlToImage || "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg"} url={article.url} publishedAt={new Date(article.publishedAt).toUTCString()} author={article.author || "Unknown"} source={article.source.name} />
                        })}

                    </div>
                </InfiniteScroll>
            </>


        )
    }
    componentDidMount() {

        this.getInitialNews();

    }
}

export default News