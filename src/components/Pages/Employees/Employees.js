import React, { Component } from 'react';
import './Employees.css';
import Header from '../../Header';
import SideBar from '../../SideBar';
class Employees extends Component {
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
            <div><Header />
         <SideBar/> 
      <div className="content-wrapper">
        <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">Manage Employees</h3>
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-8">
                      <p className="text-center">
                        <strong>This is text</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="box-footer">
                  <div className="row">
                    <div className="col-sm-3 col-xs-6">
                      <div className="description-block border-right">
                        <span className="description-percentage text-green"><i className="fa fa-caret-up" /> 17%</span>
                        <h5 className="description-header">$35,210.43</h5>
                        <span className="description-text">TOTAL REVENUE</span>
                      </div>
                    </div>    
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

      </div>
      </div>
    );
  }
}

export default Employees;