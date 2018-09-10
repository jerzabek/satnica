import React, { Component } from 'react';

class Employee extends Component {

  constructor(props){
    super(props)
    this.state = {
      chckd: false
    }

    this.props.app.setupIndex(this.props.index)
    
    this.handleCheck = this.handleCheck.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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
          <button type="button" id={"editbtn-"+this.props.index} className="btn mt-2 btn-primary" data-toggle="modal" data-name={this.props.name} data-placa={this.props.cijena} data-radnidani={this.props.tjedno} data-dnvsatnica={this.props.satnica} data-odradjeno={this.props.odstupanja} data-target={"#editModal-" + this.props.index}>Uredi</button>
          <button type="button" id={"deletebtn-"+this.props.index} className="btn mt-2 btn-danger ml-2" onClick={this.handleDelete}>Ukloni</button>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item cijena">{this.props.cijena}</li>
          <li className="list-group-item satnica">{this.props.satnica}</li>
          <li className="list-group-item tjedno">{this.props.tjedno}</li>
          <li className="list-group-item odstupanja">{this.props.odstupanja}</li>
        </ul>

        <div className="modal fade" id={"editModal-" + this.props.index} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.props.name + " - uređivanje"}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor={"uredivanje-name-" + this.props.index} className="col-form-label">Ime:</label>
                    <input type="text" defaultValue={this.props.name} className="form-control" id={"uredivanje-name-" + this.props.index}></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor={"uredivanje-placa-" + this.props.index} className="col-form-label">Plaća:</label>
                    <input type="number" defaultValue={this.props.cijena} className="form-control" id={"uredivanje-placa-" + this.props.index}></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor={"uredivanje-dnvsatnica-" + this.props.index} className="col-form-label">Dnevna satnica:</label>
                    <input type="number" defaultValue={this.props.satnica} className="form-control" id={"uredivanje-dnvsatnica-" + this.props.index}></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor={"uredivanje-radnidani-" + this.props.index} className="col-form-label">Broj tjednih radnih dana:</label>
                    <input type="number" defaultValue={this.props.tjedno} className="form-control" id={"uredivanje-radnidani-" + this.props.index}></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor={"uredivanje-odradjeno-" + this.props.index} className="col-form-label">Odstupanja:</label>
                    <input type="number" defaultValue={this.props.odstupanja} className="form-control" id={"uredivanje-odradjeno-" + this.props.index}></input>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Odustani</button>
                <button type="button" className="btn btn-primary" onClick={this.handleSave} data-dismiss="modal">Spremi</button>
              </div>
            </div>
          </div>
        </div>
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

  handleSave(e){
    var im = document.getElementById("uredivanje-name-" + this.props.index).value
    var plac = document.getElementById("uredivanje-placa-" + this.props.index).value
    var dnvsatnic = document.getElementById("uredivanje-dnvsatnica-" + this.props.index).value
    var tjedn = document.getElementById("uredivanje-radnidani-" + this.props.index).value
    var odstupanj = document.getElementById("uredivanje-odradjeno-" + this.props.index).value

    this.props.app.changeName(this.props.index, im)
    this.props.app.changeCijena(this.props.index, plac)
    this.props.app.changeSatnica(this.props.index, dnvsatnic)
    this.props.app.changeTjedno(this.props.index, tjedn)
    this.props.app.changeOdstupanja(this.props.index, odstupanj)

    this.props.app.forceUpdate()
  }

  handleDelete(e){
    this.props.app.removeEmployee(this.props.index)
    this.props.app.forceUpdate()
  }
}

export default Employee
