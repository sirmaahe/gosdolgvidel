import React, {Component} from 'react';
import Debt from './Debt'
import NewsElement from './NewsElement'

class App extends Component {
    constructor(props) {
        super(props);
        const width = window.innerWidth;
        this.state = {
            news: [],
            loadInProgress: false,
            page: 1,
            newsBuffer: [],
            width: width / 4,
            height: 150,
        };

        this.loadMore();

        setInterval(this.addElement, 8000);
    }

    addElement = () => {
        const i = Math.floor(Math.random() * 4);
        let news = this.state.news.slice(),
            element = this.state.newsBuffer.shift();

        if (!element) {
            return
        }
        news.push({ content: element, line: i });
        this.setState({ news: news });

        if (this.state.newsBuffer.length < 10) {
            this.loadMore();
        }
    }

    loadMore = () => {
        if (this.state.loadInProgress) {
            return
        }
        this.setState({ loadInProgress: true });
        fetch('/api/news/?page=' + this.state.page).then((data) => {
            return data.json()
        }).then((data) => {
            let news = this.state.newsBuffer;
            this.setState({
                newsBuffer: news.concat(data.news),
                page: this.state.page + 1,
                loadInProgress: false
            });
        })
    }

    render() {
        return (
            <div>
                <Debt/>
                { this.state.news.map((n, i) => {
                    return <NewsElement
                        key={ i } newsElement={ n.content }
                        x={ n.line * this.state.width }
                        y={ -this.state.height }
                        width={ this.state.width }
                    />
                }) }
            </div>
        );
    }
}

export default App;
