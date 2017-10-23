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
            width: width / 5,
            height: 100,
        };

        this.loadMore();

        setInterval(this.addElement, 10000);
        setInterval(this.removeElement, 10000);
    }

    removeElement = () => {
        const news = this.state.news.slice();
        for (let i = 0; i < news.length; i++) {
            if (news[i].y > window.innerHeight) {
                news.splice(i, 1);
            }
        }
        this.setState({ news: news });
    };

    addElement = () => {
        const i = Math.floor(Math.random() * 5);
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
                page: this.state.page++,
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
                        x={ n.line * this.state.width }  y={ -this.state.height }
                    />
                }) }
            </div>
        );
    }
}

export default App;
