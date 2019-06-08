import React, { Component } from 'react';
import './Dashboad.css';       
import Header from '../../Header';
import SideBar from '../../SideBar';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.css';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';


import moment from 'moment';
import config from '../../../config.json';



const url='http://localhost:4000/';
class Dashboad extends Component {

  constructor(props){
     super(props);
     this.state = {
        discription:'',
        show: false,
        tasks:'',
        TimeOut:'',
        TimeIn:'',
        clockout:'',
        loder:false,
        taskstatus:'',
        flag:false,
        userid:'',
        userTask:'',
        Hours:'',
        project_id:'',
        discription:"",
        singleUsertask:""

         

     };
  }
   handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
 
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

   componentWillMount(){
    this.getAllTaks("");



 
  }
  getAllTaks(user_id){
    console.log(user_id)
    axios.post(config.LiveapiUrl+'getalltask')
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                  var usertask = result.data.result
                  var userTasks = [];
                  var singleUsertask = [];
                   
                   for(let i=0;i<usertask.length;i++){
                       
                      
                            userTasks.push({
                            date:usertask[i].date,
                            Hours:JSON.parse(usertask[i].Hours),
                            discription:JSON.parse(usertask[i].discription),
                            project_id:JSON.parse(usertask[i].project_id),
                            _id:usertask[i]._id,
                            user_id:usertask[i].user_id ? usertask[i].user_id._id : null,
                            employeename:usertask[i].user_id ? usertask[i].user_id.employeename : 'N/A',
                           })
                          




                          }

                    

                    this.setState({userTask:userTasks,singleUsertask:singleUsertask})
                    this.setState({loder:false});

                }
           

          });
  }



   
    componentDidUpdate() {
     const {TimeIn } = this.state;
      var timeDifference = "";
     
               if(TimeIn){
                timeDifference = this.timeDifference(moment(),moment(TimeIn));

              
               }
      

setTimeout(() => {
              this.setState({TimeOut:timeDifference ? timeDifference :''})
  }, 1000);

    
  /*   if(get_user_by_id){
         if(get_user_by_id.userPost){


            //get_user_by_id.userPost.forEach(function(element) {
                 timeDifference = this.timeDifference(moment(),moment(get_user_by_id.userPost.length >= 1 ? get_user_by_id.userPost[0].date :''));
            //});
          }*/
       
          /* setTimeout(() => {
              this.setState({time:timeDifference ? timeDifference :''})
          }, 3000);*/
        
    // }
        
  }

 timeDifference(current, previous) {
    var a = current;//now
    var b = previous;
    //var startTime="current";
    //var endTime="previous";
    
    var seconds = a.diff(b, 'seconds')% 60;
    //var minutes = a.diff(b, 'minutes')% 60;

    var time =   a.diff(b, 'hours') +":"+ a.diff(b, 'minutes')% 60+':'+ a.diff(b, 'seconds')% 60;
    




     return time;
    
}
discription(e){

  this.setState({discription:e.target.value})



}

timeout(e){
    this.setState({loder:true});

   const  {TimeOut,TimeIn} = this.state;
   var user_id = localStorage.getItem('user_id');   
        //swal("You Have Worked On Today is",""+this.state.TimeOut+"")
        swal({
            title: "Are you sure you want to clockout?",
            text: "You Have Worked On Today is "+TimeOut+"",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          
          .then((willDelete) => {
            if (willDelete) {
            swal( {
      icon: "success",
  });

                axios.post(config.LiveapiUrl+'timeout', {TimeOut:moment(),user_id:user_id,timeIn:moment(TimeIn)})
                    .then((result) => {
                      //access the results here....


                      if(result.data.status==true){
                          swal(result.data.message);
                          this.featchTasks();
                          //swal("Deleted!", "Your imaginary file has been deleted.", "success");
                           this.setState({loder:false});
                          
                        
                      }else{
                              swal(result.data.message);
                               

                      }

                    });
                
            } else {
           //swal("Your imaginary file is safe!");    
                   }
          });
 
 }/*this.setState({ show: false });
     
    var clockout = localStorage.getItem('clockout');   

  const  {clockout} = this.state;


      axios.post(url+'timeout', {clockout})
          .then((result) => {
            //access the results here....

            console.log(result.data);

            if(result.data.status==true){
                swal(result.data.message);
                this.clockout();
                
              
            }else{
                    swal(result.data.message);
                    
            }

          });*/



  addtaskk(e){
    this.setState({ show: false });
     $("#modal-primary").removeClass("modal-backdrop fade in");
       this.setState({loder:true});

    var user_id = localStorage.getItem('user_id');   

     const  {discription} = this.state;


      axios.post(config.LiveapiUrl+'addtask', {discription,user_id})
          .then((result) => {
            //access the results here....


            if(result.data.status==true){
                swal(result.data.message);
                this.featchTasks();
                
              
            }else{
                    swal(result.data.message);
                      this.setState({loder:false});

                    
            }

          });

}




 featchTasks(){
   // this.setState({loder:true});

     var user_id = localStorage.getItem('user_id'); 
     axios.post(config.LiveapiUrl+'featchTask', {user_id})
          .then((result) => {
            //access the results here....

            if (result.data.length !=0 ){
                if(result.data.status==true){
                  result.data.result.map((time,index)=>{
                    this.setState({userid:time.user_id,flag:true,TimeIn :time.date, taskstatus:time.status,loder:false})

                  })
                   // this.setState({TimeIn :result.data.result[0].date })
                  
                }
          }

          });

  }




  render() {

     const {timeout,loder,taskstatus,TimeOut,flag,userid,userTask,singleUsertask}=this.state;
       var role = localStorage.getItem('role');

     console.log(singleUsertask);
    
    return (
           <div>
        <Header/>
        <SideBar/>
         {loder &&
            <div id="app" className="loader"></div>}

        <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
           {  role=="admin" ?<h3 className="box-title"> &nbsp;&nbsp;Today Employee Presents</h3> :""}                      

                                <div className="box-header with-border">

                                  <div className="row">

                                  {role=="admin"?

 <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                 <th>Date</th>
                <th>Employee Name</th>
                <th>Action</th>
                              
              </tr>
            </thead>
            <tbody>
                {userTask && userTask.length > 0 && 
                  userTask.map((item,index)=>(
                    <tr key={index}>
                      <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                     
                                  
                          <td>{item.employeename}</td>
                          
                          <td><button type="button" className="btn btn-primary "data-toggle="modal" data-target="#myModal" onClick={()=>this.getAllTaks(item._id)}>View <i className="fa fa-eye"></i></button></td>
                        
                        </tr>       
            
               ))}
            </tbody>            
          </table>
           <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              
              <div className="modal-header">
                <h4 className="modal-title">View Task</h4>
                <button type="button" className="close" data-dismiss="modal">×</button>
              </div>
             
              <div className="row">
             <div className="col-sm-12">
             <div className="box">
              <div className="modal-body col-sm-4">
               <tr>
                 <th>Project</th>    
            
              </tr>
             

              </div>
             <div className="modal-body col-sm-4">
               <tr>
                 <th>Description</th>  
              </tr>
              </div>
              <div className="modal-body col-sm-4">
              <tr>
                 <th>Hours</th>                    
              </tr>
              </div> 
              
              </div>
              </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
       
        </div>

                                  :""}
                                  <div className="col-xs-10">
                          {  role=="user" ? <h3 className="box-title">Dashboard</h3>:""}
                                </div>  

            {flag == true ? <button type="button" className="btn btn-primary-das"><Link to={"/edit-task"}>Edit Task</Link></button>:
            role =="user" ?<button type="button" className="btn btn-primary-das"><Link to="/addtaskk">Add Task</Link></button>:""
             }                    

             

              <div className="col-xs-2">               
             


          {this.state.show ? 
 
            <div className="modal modal-primary " id="modal-primary">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span></button>
                    <h4 className="modal-title">ADD TASK</h4>
                  </div>
                  <div className="modal-body">

              <textarea className="form-control" rows="5" id="comment" onChange={(e)=>this.discription(e)}></textarea>

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline pull-left" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-outline"onClick={(e)=>this.addtask(e)}>Save</button>
                  </div>
                </div>
                {/* /.modal-content */}
              </div>
              {/* /.modal-dialog */}
            </div>
             :""}  

        </div>
                         
       </div>   

      </div>


                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-10">
                                        <h2>{TimeOut}</h2>
                                  { role =="user" ?  <button type="button" className="btn btn-primary" disabled={TimeOut}>Time IN</button>:""}
                                        </div>
                                        <div className="col-md-2">
                                   { role =="user" ? <button type="button" className="btn btn-primary-tim"onClick={(e)=>this.timeout(e)} disabled={taskstatus!="Approved" } style={{marginTop: '63px'}}>Time Out</button>:""}
                                        </div><br/><br/><br/><br/><br/>   
                                  </div>
                                </div>
                                <div className="box-footer">
                                    <div className="row">
                                        <div className="col-sm-3 col-xs-6">
                                            



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


export default Dashboad;