import React, { Component } from 'react';
import './manageleave.css';
import Header from '../../Header';
import SideBar from '../../SideBar';
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    axios.post(url+'getleaves')
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                    this.setState({Leaves:result.data.result})
                    this.setState({loder:false});

                }
           

          });
}

ApprovedDisapprovedCancel(emp_id,status){
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
                 axios.post(url+'ApprovedDisapprovedCancelLeave',{emp_id:emp_id,status:status})
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
    console.log(loder,'')

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
        <button type="button"className="btn btn-primary"><Link to ='/addleave'>Add Leaves</Link></button>
        </div>
       </div>
      </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Type of Day</th>
                <th>Type of Leave</th>
                <th>Date</th>
                <th>Description</th>           
                <th>Action</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {Leaves && Leaves.length > 0 && 
                  Leaves.map((item,index)=>(
              <tr>                
                <td>{item.EmployeeName}</td>
                <td>{item.typeofDay}</td>
                <td>{item.typeofleave}</td>
                <td>{item.date}</td>
                <td>{item.Description}</td>
                <td> <button type="button" className="btn btn-primary" onClick={()=>this.ApprovedDisapprovedCancel(item._id,'Approved')}>Approved <i className="fa fa-thumbs-up"></i></button></td>
                <td> <button type="button" className="btn btn-primary" onClick={()=>this.ApprovedDisapprovedCancel(item._id,'Disapproved')}>Disapproved <i className="fa fa-thumbs-down"></i></button></td>
                <td> <button type="button" className="btn btn-danger " onClick={()=>this.ApprovedDisapprovedCancel(item._id,'Cancel')}>Cancel <i className="fa fa-remove"></i></button></td>
              </tr>             
                ))}
            </tbody>            
          </table>
        </div>
    </div>
</div>
</div>
    );
  }
}

export default manageleave;