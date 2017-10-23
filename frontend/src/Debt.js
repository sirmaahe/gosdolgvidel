import React, {Component} from 'react';

export default class Debt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 'очень много'
        };

        setInterval(() => {
            const that = this;

            fetch('/api/number/').then(data => {
                return data.json()
            }).then(data => {
                that.setState({ number: data.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })
            })
        }, 200);
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    zIndex: '2',
                    left: '20%',
                    top: '25%'
                }}
            >
                <p
                    style={{
                        fontSize: '100px',
                        color: '#FEFEFE',
                        position: 'relative',
                        left: '-15%'
                    }}
                >$&nbsp;<span id='gosdolg'>{ this.state.number }</span></p>
            </div>
        );
    }
}
