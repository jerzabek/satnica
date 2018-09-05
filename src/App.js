import React, { Component } from 'react';
import Employee from './Employee'

class App extends Component {

  constructor() {
    super()
    this.state = {
      name: '',
      satnica: '',
      tjedno: '',
      odstupanja: '',
      cijena: '',
      employees: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSatnicaChange = this.handleSatnicaChange.bind(this)
    this.handleTjednoChange = this.handleTjednoChange.bind(this)
    this.handleOdstupanjaChange = this.handleOdstupanjaChange.bind(this)
    this.handleCijenaChange = this.handleCijenaChange.bind(this)
    this.wowzers = this.wowzers.bind(this)
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleSatnicaChange(e) {
    this.setState({
      satnica: e.target.value
    })
  }

  handleOdstupanjaChange(e) {
    this.setState({
      odstupanja: e.target.value
    })
  }

  handleTjednoChange(e) {
    this.setState({
      tjedno: e.target.value
    })
  }

  handleCijenaChange(e) {
    this.setState({
      cijena: e.target.value
    })
  }

  render() {
    return (
      <div className="">
        <div className="d-flex justify-content-center">
          <form className="inputForm w-75 text-center" onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Ime</span>
              </div>
              <input type="text" className="form-control" name="name" aria-label="name" aria-describedby="basic-addon1" onChange={this.handleNameChange} value={this.state.name} required></input>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">Dnevna satnica</span>
              </div>
              <input type="number" className="form-control" name="satnica" aria-label="satnica" aria-describedby="basic-addon2" onChange={this.handleSatnicaChange} value={this.state.satnica} required></input>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon3">Odstupanja</span>
              </div>
              <input type="number" className="form-control" name="odstupanja" aria-label="odstupanja" aria-describedby="basic-addon3" onChange={this.handleOdstupanjaChange} value={this.state.odstupanja} required></input>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon4">Broj radnih dana u tjednu</span>
              </div>
              <input type="number" className="form-control" name="tjedno" aria-label="tjedno" aria-describedby="basic-addon4" onChange={this.handleTjednoChange} value={this.state.tjedno} required></input>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon4">Cijena satnice u HRK</span>
              </div>
              <input type="number" className="form-control" name="cijena" aria-label="cijena" aria-describedby="basic-addon4" onChange={this.handleCijenaChange} value={this.state.cijena} required></input>
            </div>

            <input type="submit" className="btn btn-success"></input>
          </form>
        </div>
        <hr className="w-100 "></hr>
        <div className="employees text-center">
          {
             this.wowzers()
          }
        </div>
        <hr className="w-100 "></hr>
      </div>
    );
  }

  wowzers(){
    if(this.state.employees.length === 0){
      return (
        <h2>nema zaposlenika</h2>
      )
    }else{
      return(
        this.state.employees.map((employee, index) =>{
          return (<Employee
            name={employee.name}
            cijena={employee.cijena}
            tjedno={employee.tjedno}
            odstupanja={employee.odstupanja}
            satnica={employee.satnica}
            key={index} 
            index={index}
            app={this}/>)
        })
      )
    }
  }

  printTest(thing){
    // TODO: somehow add them to the graph
    console.log(thing.props.name + " - index: " + thing.props.index)
  }

  handleSubmit(e){
    e.preventDefault()
    var empobj = {
      name: this.state.name,
      cijena:this.state.cijena,
      tjedno: this.state.tjedno,
      odstupanja: this.state.odstupanja,
      satnica: this.state.satnica
    }

    // Makes sure no empty fields can be added
    if(empobj.name === '' ||
     empobj.cijena === '' ||
     empobj.tjedno === '' ||
     empobj.odstupanja === '' ||
     empobj.satnica === ''){
       return;
     }


    this.setState({
      employees: [...this.state.employees, empobj],
      // name: '',
      // tjedno: '',
      // cijena: '',
      // odstupanja: '',
      // satnica: ''
    })
  }
}

export default App;
