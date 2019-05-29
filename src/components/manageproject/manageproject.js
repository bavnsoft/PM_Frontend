import React, { Component } from 'react';
import './manageproject.css';
import $ from "jquery";
import Header from '../Header';
import SideBar from '../SideBar';
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import StarRatingComponent from 'react-star-rating-component';
import config from '../../config.json';

const url='http://localhost:4000/';
class manageproject extends Component {
   constructor(props){
     super(props);
     this.state = {

      Progress:'',
      Complete:'',
      Cancel:'',
      project_id:'',
            rating: 1

    };
   }

onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  componentWillMount(){

this.getproj();

  }
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

getproj(){
    this.setState({loder:true});

   var user_id = localStorage.getItem('user_id'); 
    axios.post(config.LiveapiUrl+'getproject')
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                    this.setState({project:result.data.result})
                    this.setState({loder:false});


                }
           

          });
}



/*
addst(){
    

   var user_id = localStorage.getItem('user_id'); 
    axios.post(url+'addstatus')
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                    this.setState({project:result.data.result})


                }
           

          });
}
*/

  addstatus(status){

     axios.post(config.LiveapiUrl+'addstatus', {status:status,id:this.state.project_id})
          .then((result) => {
            //access the results here....

            console.log(result.data.user_id);
            if(result.data.status==true){
                swal(result.data.message);
               
                
            }else{
                    swal(result.data.message);

            }

          });
  }
 


  updateStatus(id){

    this.setState({project_id:id})

  }


  render() {
     const {project,rating}=this.state;
       
    return (

       <div>
        <Header />
        <SideBar />
        
      
  <div className="content-wrapper">
 

  <div className="modal fade" id="modal-default">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Department Changes</h4>
              </div>
              <div className="modal-body">
                <button type="button" value="Progress" className="btn btn-primary"    onClick={(e)=>this.addstatus('Progress')} >Progress</button>&nbsp;


                <button type="button" className="btn btn-primary"  onClick={(e)=>this.addstatus('Complete')} >Complete

 <StarRatingComponent 
                    name="rate1" 
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)} />

                </button>&nbsp;

                <button type="button" className="btn btn-primary"   onClick={(e)=>this.addstatus('Cancel')} >Cancel</button>&nbsp;
              </div>

              <div className="modal-footer">
                {/*<button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>*/}
                <button type="button" className="btn btn-primary"data-dismiss="modal">Close</button>
              </div>
            </div>         
             
        </div>
      </div>





  <div className="modal fade" id="modal-defaults">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Department Changes</h4>
              </div>
              <div className="modal-body">
                <button type="button" className="btn btn-primary"data-dismiss="modal">Add Milestone</button>&nbsp;
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary"data-dismiss="modal">Update</button>
              </div>
            </div>         
             
        </div>
      </div>
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                 

                                  <div className="row">
                                  <div className="col-xs-10">
                                    <h3 className="box-title">Manage Project</h3>
                                </div>
                                          <div className="col-xs-2">
                <button type="button"className="btn btn-primary"><Link to ='/addproject'>Add Project</Link></button>
                 </div>               
                                </div>
                       </div>
             

                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                           

        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Project Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Attachment</th>              
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                  {project && project.length > 0 && 
                  project.map((item,index)=>(
              <tr>              
                <td>{item.serialno}</td>
                  <td>{item.projectname}</td>
                    <td>{item.startdate}</td>
                      <td>{item.enddate}</td>
                        <td><img src={item.upload } style={{height:"50px",width:"50px"}}/></td>
                <td> <button type="button" className="btn btn-primary"data-toggle="modal" data-target="#modal-defaults">View <i className="fa fa-eye"></i></button></td>
                <td> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-default" onClick={(e)=>this.updateStatus(item._id)}>Status </button></td>
              </tr>
              
                ))}
             
            </tbody>
            
          </table>
        </div>


                                        </div>
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

export default manageproject;