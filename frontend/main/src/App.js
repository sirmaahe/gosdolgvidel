import React, {Component} from 'react';
import Debt from './Debt'
import NewsElement from './NewsElement'

class App extends Component {
    constructor(props) {
        super(props);
        const width = window.innerWidth;
        console.log(width)
        let lines;
        if (width > 1600) {
            lines = 5
        } else if (width > 1300) {
            lines = 4
        } else if (width >= 1024) {
            lines = 3
        } else if (width > 700) {
            lines = 2
        } else {
            lines = 1
        }
        this.state = {
            news: [],
            loadInProgress: false,
            page: 1,
            newsBuffer: [],
            newsWidth: (width - 110) / lines,
            height: 150,
            lines: lines
        };

        this.loadMore();

        setInterval(this.addElement, 8000);
    }

    addElement = () => {
        const i = Math.floor(Math.random() * this.state.lines);
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
                        x={ n.line * this.state.newsWidth + 30 }
                        y={ -this.state.height }
                        width={ this.state.newsWidth }
                    />
                }) }
            </div>
        );
    }
}

export default App;
