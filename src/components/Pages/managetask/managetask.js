import React, { Component } from 'react';
import './managetask.css';
import Header from '../../Header';
import SideBar from '../../SideBar';
import axios from 'axios';
import $ from "jquery";
import { Link } from 'react-router-dom'
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from 'sweetalert';
import config from '../../../config.json';

const url='http://localhost:4000/';

class managetask extends Component {
  constructor(props){
     super(props);
     this.state = {
      userTask :[] ,
      loder:false,
      TimeIN:'',
      timeout:'',
      hours:''


     };
 }

  componentWillMount(){
  this.setState({loder:true});

    var user_id = localStorage.getItem('user_id'); 
    axios.post(config.LiveapiUrl+'getalltask', {user_id})
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                  var usertask = result.data.result
                  var userTasks = [];
                   for(let i=0;i<usertask.length;i++){
                  
                       userTasks.push({
                        date:usertask[i].date,
                        discription:usertask[i].discription,
                        status:usertask[i].status,
                        timeout:usertask[i].timeout,
                        user_id:usertask[i].user_id ? usertask[i].user_id._id : null,
                        employeename:usertask[i].user_id ? usertask[i].user_id.employeename : 'N/A',
                       })

                   } 

                    this.setState({userTask:userTasks})
                    this.setState({loder:false});

                }
           

          });
  }

  TaskApproved(emp_id){
    this.setState({loder:true});
    axios.post(config.LiveapiUrl+'TaskApprove', {emp_id:emp_id})
          .then((result) => {
              //access the results here....
                if(result.data.status==true){
                    swal(result.data.message);
                    this.setState({loder:false});
                }
          });
  }





  viewtask(TimeIN,timeout,date,hours){
    console.log(hours);
    this.setState({TimeIN:TimeIN,timeout:timeout,hours:hours});


  
  }




timeDifference(current, previous) {

  if(previous && current ){
  var date1 = new Date(current);
  var date2 = new Date(previous);

  var diff = date2.getTime() - date1.getTime();

  var msec = diff;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  //alert(hh + ":" + mm + ":" + ss);
    return hh;
    
}else{
   return 'N/A';
}
}



  /*viewtask(e){
    this.setState({ show: false });
     $("#myModal").removeClass("modal-backdrop fade in");
       this.setState({loder:true});
    var user_id = localStorage.getItem('user_id');   
  const  {Timein,timeout,hours,totaltimeing} = this.state;
      axios.post(url+'viewtask', {Timein,timeout,hours,totaltimeing,user_id})
          .then((result) => {
            //access the results here....
            console.log(result.data);
            if(result.data.status==true){
                console.log(result.data.message);
               // this.featchTasks();
                
              
            }else{
                    console.log(result.data.message);
                     // this.setState({loder:false});
                    
            }
          });
}*/




  render() {
   const {userTask,loder,TimeIN,timeout,hours}=this.state;
  
    return (


               <div><Header />
        <SideBar />
        
      <div className="content-wrapper">
       {loder &&
            <div id="app" className="loader"></div>}
        <section className="content-header">
          <div className="row">
            
           <div className="box">
            <div className="box-header">
              <h3 className="box-title">Data Table With Full Features</h3>
            </div>
  
            <div className="box-body">
              <table id="example1" className="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>Date</th>
                  <th>Employee Name</th>
                  <th>Clock In</th>
                  <th>Clock Out</th>
                  <th>Hours</th>
                  <th colSpan="3" styles={{textAlign:'center'}}>Action</th>
             

                </tr>
                </thead>

        


                <tbody>
                {userTask && userTask.length > 0 && 
                  userTask.map((item,index)=>(
                    <tr key={index}>
                      <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                      <td>{item.employeename}</td>
                      
                      <td>{moment(item.date).format('hh:mm:ss')}</td>
                      <td>{item.timeout ? moment(item.timeout).format('hh:mm:ss') : 'N/A'}</td>
                     <td>{this.timeDifference(item.date,item.timeout)}</td>
                       <td colSpan="1.5"> <button type="button" className="btn btn-primary" onClick={()=>this.TaskApproved(item.user_id)}>Approved <i className="fa fa-thumbs-up"></i></button></td>
                       <td colSpan="1.5"> <button type="button" className="btn btn-primary"data-toggle="modal" data-target="#myModal" onClick={()=>this.viewtask(item.date,item.timeout)}>View Task <i className="fa fa-eye"></i></button></td>
                       <td colSpan="1.5"> <button type="button" className="btn btn-primary"><Link to ='/edittask'>Edit Task <i className="fa fa-edit"></i></Link></button></td>
               
                    </tr>


                   
                ))}
          </tbody>
          </table>

        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              
              <div className="modal-header">
                <h4 className="modal-title">Modal Heading</h4>
                <button type="button" className="close" data-dismiss="modal">×</button>
              </div>
              
              <div className="modal-body">
               TimeIN:{moment(TimeIN).format('hh:mm:ss')}
              </div>
             <div className="modal-body">
                TimeOut:{moment(timeout).format('hh:mm:ss')}
              </div>
              <div className="modal-body">
                Hours Worked : {timeout ? this.timeDifference(TimeIN,timeout):'N/A'}
              </div> 
              <div className="modal-body">
                Total Timeing:
              </div> 
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
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

export default managetask;