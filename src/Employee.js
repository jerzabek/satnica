import React, { Component } from 'react';

class Employee extends Component {

  constructor(){
    super()
    this.state = {
      chckd: false
    }
    this.handleCheck = this.handleCheck.bind(this)
  }

  render() {
    return (
      <div className="card employee">
        <div className="card-body">
          <h3 className="card-title">{this.props.name}</h3>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id={"inc" + this.props.index} onChange={this.handleCheck} value={this.state.chckd}></input>
            <label className="form-check-label" htmlFor={"inc" + this.props.index} >
              Uključi u graf
            </label>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item cijena">{this.props.cijena}</li>
          <li className="list-group-item satnica">{this.props.satnica}</li>
          <li className="list-group-item tjedno">{this.props.tjedno}</li>
          <li className="list-group-item odstupanja">{this.props.odstupanja}</li>
        </ul>
      </div>
    )
  }

  handleCheck(e){
    if(this.state.chckd){
      this.setState({
        chckd: false
      })
      this.props.app.printTest(this)
    }else {
      this.setState({
        chckd: true
      })
    }
  }
}

export default Employee
