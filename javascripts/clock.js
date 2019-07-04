'use strick';

class Clock extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            ' ',
            this.state.currentTime,
            ' '
        );
    }
}

ReactDOM.render(React.createElement(Clock, null), document.getElementById('content'));