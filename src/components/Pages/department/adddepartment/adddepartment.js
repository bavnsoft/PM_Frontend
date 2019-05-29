import React, { Component } from 'react';
import './adddepartment.css';
import $ from "jquery";
import Header from '../../../Header';
import SideBar from '../../../SideBar';
import config from '../../../../config.json';


class adddepartment extends Component {
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (


      
     <div>
        <Header />
        <SideBar />
      <div className="content-wrapper">
             <section className="content">
        <div className="row">
          {/* left column */}
          <div className="col-md-6">
            {/* general form elements */}
            <div className="box box-primary">
              <div className="box-header with-border">
               <h3 className="box-title"><b>ADD DEPARTMENT</b></h3>
              </div>
              {/* /.box-header */}
              {/* form start */}
              <form >
                <div className="box-body">
                  <div className="form-group">
                    <label htmlFor="departmentname">Department Name</label>
                    <input type="employeeid" className="form-control" id="employeeid" placeholder="Department Name"  onChange={(e)=>this.employeeid(e)}/>
                 <div className="errorr"><h5></h5></div>
                  </div>
                 
                  

                </div>               
              {/* /.box-body */}
                <div className="box-footer">
                  <button type="button" className="btn btn-primary" onClick={(e)=>this.save(e)}>Save</button>
                </div>
              </form>
            </div>
          </div></div></section>
  </div>
  </div>


    );
  }
}

export default adddepartment;