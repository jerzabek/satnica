import React, { Component } from 'react';

class Employee extends Component {

  render() {
    return (
      <div class="card employee">
        <div class="card-body">
          <h3 class="card-title">{this.props.name}</h3>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item cijena">{this.props.cijena}</li>
          <li class="list-group-item satnica">{this.props.satnica}</li>
          <li class="list-group-item tjedno">{this.props.tjedno}</li>
          <li class="list-group-item odstupanja">{this.props.odstupanja}</li>
        </ul>
      </div>
    )
  }

}

export default Employee
