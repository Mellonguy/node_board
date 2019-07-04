'use strick';
class Clock extends React.Component{
    render(){
        return(
        <div> {this.state.currentTime} </div>
        )
    }
}

ReactDOM.render(
    <Clock/>,
    document.getElementById('content')
)

