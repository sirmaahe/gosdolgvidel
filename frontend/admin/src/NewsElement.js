import React, {Component} from 'react';

export default class NewsElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg_color: 'white'
        };
    }

    render() {
        return (
            <div style={{ backgroundColor: this.state.color }}>
                <p>{ this.props.newsElement.caption }</p>
                <a href={ this.props.newsElement.link } target='blank'>Подробнее</a>
                <p>{ this.props.newsElement.date }</p>
                <button onClick={ () => { fetch(`api/${this.props.newsElement.id}/`, {method: 'delete'}).then(() => {this.setState({color: 'grey'})}) } }>УДАЛИТЬ</button>
            </div>
        );
    }
}
