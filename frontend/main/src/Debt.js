import React, {Component} from 'react';

export default class Debt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 'очень много',
            actualNumber: 0
        };
        fetch('/api/number/').then(data => {
            return data.json()
        }).then(data => {
            this.setState({ number: data.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), actualNumber: data.number })
        })

        setInterval(() => {
            const that = this;
            if (!that.state.actualNumber) {
                return
            }
            const newNumber = that.state.actualNumber + 44572
            that.setState({ number: newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), actualNumber: newNumber })
        }, 1000);
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    zIndex: '2',
                    left: '20%',
                    top: '25%',
                    textShadow: '0px 0px 3px #CECECE'
                }}
            >
                <p
                    style={{
                        fontSize: '100%',
                        color: '#FEFEFE',
                        position: 'relative',
                        left: '-15%',
                        marginBottom: '-100px'
                    }}
                >госдолг сша:</p>
                <p
                    style={{
                        fontSize: '500%',
                        color: '#FEFEFE',
                        position: 'relative',
                        left: '-15%'
                    }}
                >$&nbsp;<span id='gosdolg'>{ this.state.number }</span></p>
            </div>
        );
    }
}
