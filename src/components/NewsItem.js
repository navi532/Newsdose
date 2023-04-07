import React, { Component } from 'react'
import PropTypes from 'prop-types'
export class NewsItem extends Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }

    render() {
        const { title, description, imgUrl, url, publishedAt, source, author } = this.props

        return (
            <div className="col" >
                <div className="card h-100">
                    <div style={{ direction: "rtl" }}>
                        <span className="badge rounded-pill bg-danger" style={{ zIndex: 1, position: 'absolute', top: 0 }}>
                            {source}
                        </span>
                    </div>

                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author} on {publishedAt}</small></p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div >
        )
    }


}

export default NewsItem