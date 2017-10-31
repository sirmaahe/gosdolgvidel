import React, {Component} from 'react';
import NewsElement from './NewsElement'

class App extends Component {
    constructor(props) {
        super(props);
        const width = window.innerWidth;
        this.state = {
            news: []
        };

        this.loadMore();
    }

    loadMore = () => {
        fetch('/api/').then((data) => {
            return data.json()
        }).then((data) => {
            this.setState({
                news: data.news
            });
        })
    }

    render() {
        return (
            <div>
                { this.state.news.map((n, i) => {
                    return <NewsElement
                        key={ i } newsElement={ n }
                    />
                }) }
            </div>
        );
    }
}

export default App;
