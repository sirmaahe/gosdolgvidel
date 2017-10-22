import React, {Component} from 'react';

export default class NewsElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y
        };

        setInterval(() => {
            const y = this.state.y;
            this.setState({ y: y + 1 });
        }, 100);
    }

    render() {
        return (
            <div style={{
                position: 'absolute',
                top: `${ this.state.y }px`,
                left:  `${ this.state.x }px` }}
            >
                <p>{ this.props.newsElement.caption }</p>
                <a href={ this.props.newsElement.link }>moar</a>
                <p>{ this.props.newsElement.date }</p>
            </div>
        );
    }
}
