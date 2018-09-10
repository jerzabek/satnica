import React, { Component } from 'react';
import Employee from './Employee'

class App extends Component {

  constructor() {
    super()
    this.employeeData = {

    }
    
    this.state = {
      name: '',
      satnica: '',
      tjedno: '',
      odstupanja: '',
      cijena: '',
      employees: []
    }

    this.counter = 0

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSatnicaChange = this.handleSatnicaChange.bind(this)
    this.handleTjednoChange = this.handleTjednoChange.bind(this)
    this.handleOdstupanjaChange = this.handleOdstupanjaChange.bind(this)
    this.handleCijenaChange = this.handleCijenaChange.bind(this)
    this.wowzers = this.wowzers.bind(this)
    this.removeEmployee = this.removeEmployee.bind(this)
    this.setupIndex = this.setupIndex.bind(this)
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
      <div className="pb-3">
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

            <button type="submit" className="btn btn-success">Dodaj</button>
            <br></br>
            <span className="badge badge-light">{"Broj zaposlenika: " + Object.keys(this.employeeData).length}</span>
          </form>
        </div>
        <hr className="w-100"></hr>
        <div className="employees text-center" id="employees">
          {
             this.wowzers()  
          }
        </div>
        <hr className="w-100"></hr>
      </div>
    );
  }

  wowzers(){
    if(Object.keys(this.employeeData).length === 0){
      return (
        <h2>nema zaposlenika</h2>
      )
    }else{
      return(
        Object.values(this.employeeData).map(employee =>{  
          this.changeName(employee.index, employee.name)
          this.changeCijena(employee.index, employee.cijena)
          this.changeSatnica(employee.index, employee.satnica)
          this.changeTjedno(employee.index, employee.tjedno)
          this.changeOdstupanja(employee.index, employee.odstupanja)

          return (<Employee
            name={this.employeeData[employee.index].name}
            cijena={employee.cijena}
            tjedno={employee.tjedno}
            odstupanja={employee.odstupanja}
            satnica={employee.satnica}
            key={employee.index} 
            index={employee.index}
            app={this}/>)
        })
      )
    }
  }

  removeEmployee(employeeIndex){
    var filtered = Object.keys(this.employeeData)
                      .filter(indx => parseInt(employeeIndex, 10) !== parseInt(indx, 10))
                      .reduce((obj, key) => {
                        obj[key] = this.employeeData[key];
                        return obj;
                      }, {})

    this.employeeData = filtered
  }

  setupIndex(index){
    if(this.employeeData.hasOwnProperty(index)){
      return
    }else{
      this.employeeData[index] = {}
    }
  }

  changeName(index, name){
    this.setupIndex(index)

    this.employeeData[index].name = name
  }

  changeSatnica(index, sat){
    this.setupIndex(index)
    
    this.employeeData[index].satnica = sat
  }

  changeCijena(index, cijena){
    this.setupIndex(index)
    
    this.employeeData[index].cijena = cijena
  }

  changeTjedno(index, tjedno){
    this.setupIndex(index)
    
    this.employeeData[index].tjedno = tjedno
  }

  changeOdstupanja(index, odstupanja){
    this.setupIndex(index)
    
    this.employeeData[index].odstupanja = odstupanja
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
      satnica: this.state.satnica,
      index: this.counter++
    }

    // Makes sure no empty fields can be added
    if(empobj.name === '' ||
     empobj.cijena === '' ||
     empobj.tjedno === '' ||
     empobj.odstupanja === '' ||
     empobj.satnica === ''){
       return;
     }

    this.employeeData[empobj.index] = empobj
    
    // clears the input fields
    this.state.name = ''
    this.state.cijena = ''
    this.state.tjedno = ''
    this.state.odstupanja = ''
    this.state.satnica = ''

    this.forceUpdate()
  }
}

export default App;
