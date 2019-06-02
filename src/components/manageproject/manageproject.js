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
      shareholders: [{ name: "" }],

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
    axios.post(config.LocalapiUrl+'getproject')
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

     axios.post(config.LocalapiUrl+'addstatus', {status:status,id:this.state.project_id})
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
 


  get_project_id(id){

       this.setState({project_id:id})

  }


  addmilestone(milestone){

     axios.post(config.LocalapiUrl+'addmilestone', {milestone:this.state.shareholders,id:this.state.project_id})
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
 

  updatemilestone(id){

    this.setState({project_id:id})

  }
 getMilestone(id,milestone){
    if(milestone){    
       this.setState({project_id:id,shareholders:JSON.parse(milestone)});
    }else{
     this.setState({project_id:id,shareholders: [{ name: "" }]});
    }
  }





  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };




handleShareholderDetail = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, detail: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };




  handleShareholderHours = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, hours: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };



  handleSubmit = evt => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };


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
                <h3 className="modal-title">Add Stauts</h3>
              </div>
              <div className="modal-body">
                
             
<div>
        <label>Select Stauts</label>
        <select className="form-control select2" style={{width: '100%'}}>
          <option selected="selected">select</option>
          <option>Progress</option>
          >
          <option>Complete</option>
          <option>Canceled</option>
        </select>
      </div>


              </div>

              <div className="modal-footer">
                {/*<button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>*/}
                <button type="button" className="btn btn-primary"data-dismiss="modal" onClick={(e)=>this.addstatus('Progress')}>Apply</button>
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
                <h4 className="modal-title">Add Milestone</h4>
              </div>
              <div className="modal-body">
                       


                       <div className="row">

               <div className="col-md-12">

            {/* general form elements */}
            <div className="box box-primary">
              <div className="box-header with-border">
                <div className="row">
                <div className="col-md-8">

               
               </div>
              <div className="col-md-4">
        
         <button
          type="button" className="btn btn-primary"
          onClick={this.handleAddShareholder}
          >
          ADD
        </button>
             </div>

              </div></div>
              {/* /.box-header */}
              {/* form start */}
               <form onSubmit={this.handleSubmit}>
      {/*  <input
          type="text"
          placeholder="Bavn Soft"
          value={this.state.name}
          onChange={this.handleNameChange}
        />*/}

        <h4>Milestone Task</h4>

        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
            <div className="row">
                <div className="col-md-4">
            <input
              type="text"
              placeholder={`Milestone ${idx + 1} Name`}
              value={shareholder.name}
              


              onChange={this.handleShareholderNameChange(idx)}
            />
            </div>

            
            <div className="col-md-3">
                <input
                  type="text"
                  placeholder={`Milestone Detail`}
                  value={shareholder.detail}
                  onChange={this.handleShareholderDetail(idx)}
                />
            </div>

            <div className="col-md-3">
                <input
                  type="text"
                  placeholder={`Hours`}
                  value={shareholder.hours}
                  onChange={this.handleShareholderHours(idx)}
                />
            </div>

            <div className="col-md-2">
                <button
                  type="button" className="btn btn-danger"
                  onClick={this.handleRemoveShareholder(idx)}
                  className="small">
                
              <i className="fa fa-times"></i>

               </button>
              </div>


          </div>              
       </div>
        ))}
     <center>
     <button type="button" className="btn btn-primary submit" onClick={(e)=>this.addmilestone(e)}>Submit</button>
</center>
      </form>
           </div>

            </div>
          </div>



              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary"data-dismiss="modal">Close</button>
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
                <button type="button"className="btn btn-primary-Project"><Link to ='/addproject'>Add Project</Link></button>
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
                <td> <button type="button" className="btn btn-primary"data-toggle="modal" data-target="#modal-defaults" onClick={(e)=>this.getMilestone(item._id,item.milestone)}>Add Milestone</button></td>
                <td> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-default" onClick={(e)=>this.get_project_id(item._id)}>Status </button></td>
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