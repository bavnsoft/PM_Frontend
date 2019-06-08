import React, { Component } from 'react';
import './manageleave.css';
import Header from '../../Header';
import SideBar from '../../SideBar';
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../../../config.json';

const url='http://localhost:4000/';
class manageleave extends Component {
   constructor(props){
     super(props);
     this.state = {
      Leaves:'',
      loder:false,
     };
   }

   componentWillMount(){
       this.getleave();

   }
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

getleave(){
  this.setState({loder:true});
   var user_id = localStorage.getItem('user_id'); 
   var role = localStorage.getItem('role');

    axios.post(config.LocalapiUrl+'getleaves',{user_id:user_id,role:role})
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                    this.setState({Leaves:result.data.result})
                    this.setState({loder:false});

                }
           

          });
}

ApproveDispproveCancel(emp_id,status,role){
   this.setState({loder:true});
   swal({
            title: "Are you sure you want to "+status+" this",
            //text: "You Have Worked On Today is ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          
          .then((willDelete) => {
            if (willDelete) {
                 axios.post(config.LocalapiUrl+'ApproveDispproveCancelLeave',{emp_id:emp_id,status:status,role:role})
                      .then((result) => {
                        //access the results here....
                            if(result.data.status==true){
                               swal(result.data.message);
                               this.setState({loder:false});

                            }
                       

                      });
            }
          })
}

  render() {

      const {Leaves,loder}=this.state;
     var role = localStorage.getItem('role');
   

    return (
        <div>
        <Header />
        <SideBar />
        {loder &&
            <div id="app" className="loader"></div>}
 <div className="content-wrapper">

 <div className="box">
        <div className="box-header">     
        <div className="row">
        <div className="col-xs-10">                       
          <h3 className="box-title">Manage Leaves</h3>                         
        </div>
        <div className="col-xs-2">
        <button type="button"className="btn btn-primary-leave"><Link to ='/addleave'>Add Leaves</Link></button>
        </div>
       </div>
      </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Type of Day</th>
                <th>Category</th>
                <th>Date</th>
                <th>Description</th>           
                <th>Status</th>           
                <th colspan="4"style={{ textAlign: "center"}}>Action</th>
               
              </tr>
            </thead>
            <tbody>
                {Leaves && Leaves.length > 0 && 
                    Leaves.map((item,index)=>(
                     role=="user" ?
                        <tr>                
                          <td>{item.EmployeeName}</td>
                          <td>{item.typeofDay}</td>
                          <td>{item.typeofleave}</td>
                          <td>{moment(item.startDate).format('LL')}</td>
                          <td>{item.Description}</td>
                          <td>{item.status}</td>
                         
                          <td> <button type="button" className="btn btn-danger " onClick={()=>this.ApproveDispproveCancel(item.user_id ,'Cancel',role)}>Cancel <i className="fa fa-remove"></i></button></td>
                        </tr>    

                        : <tr>                
                          <td>{item.EmployeeName}</td>
                          <td>{item.typeofDay}</td>
                          <td>{item.typeofleave}</td>
                          <td>{moment(item.startDate).format('LL')}</td>
                          <td>{item.Description}</td>
                          <td>{item.status}</td>
                         
                          <td> <button type="button" className="btn btn-primary" onClick={()=>this.ApproveDispproveCancel(item.user_id,'Approve',role)}>Approve It</button></td>
                          <td> <button type="button" className="btn btn-primary" onClick={()=>this.ApproveDispproveCancel(item.user_id,'Dispprove',role)}>Disprove It</button></td>
                          <td> <button type="button" className="btn btn-danger " onClick={()=>this.ApproveDispproveCancel(item.user_id,'Cancelled',role)}>Cancel <i className="fa fa-remove"></i></button></td>
                        </tr>         
                ))}

            </tbody>            
          </table>
          {Leaves && Leaves.length == 0 && 
            <p style={{textAlign:"center",color:"red"}}>No leaves found</p>
          }
        </div>
    </div>
</div>
</div>
    );
  }
}

export default manageleave;