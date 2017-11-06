import React, {Component} from 'react';

export default class NewsElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            color: '#FEFEFE'
        };

        setInterval(() => {
            const y = this.state.y;
            this.setState({ y: y + 0.25 });
        }, 12);
    }

    render() {
        return (
            <div style={{
                position: 'absolute',
                top: `${ this.state.y }px`,
                left:  `${ this.state.x }px`,
                backgroundColor: `${ this.state.color }`,
                padding: '0 25px 0 25px',
                width: this.props.width,
                fontSize: this.props.fontSize
            }}>
                <p style={{fontWeight: 'bold'}}>{ this.props.newsElement.caption }</p>
                <p>{ this.props.newsElement.date } <a href={ this.props.newsElement.link } target='blank'>ссылка</a></p>
            </div>
        );
    }
}
