import React, { Component } from 'react';
import './department.css';
import Header from '../../Header';
import SideBar from '../../SideBar';
import { Link } from 'react-router-dom'
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
const url='http://localhost:4000/';

class department extends Component {
   constructor(props){
   super(props);
   this.state = {
      departmentname:'',
      editdepartmentname:'',
      departmentId:'',
        department:'',
       loder:false,

   };
   }

   componentWillMount(){

   this.getdep();
   }


   getdep(){
    this.setState({loder:true});

   var user_id = localStorage.getItem('user_id'); 
    axios.post(url+'getdepartment')
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                    this.setState({department:result.data.result})
                    this.setState({loder:false});


                }
           

          });
}



Delete(id){
  
   var departmentname = localStorage.getItem('departmentname');   
    this.setState({loder:false});

        //swal("You Have Worked On Today is",""+this.state.TimeOut+"")
        swal({
            title: "Are you sure you want to Delete This",
            //text: "You Have Worked On Today is ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          
          .then((willDelete) => {
            if (willDelete) {

               axios.post(url+'deletedepartment', {id:id})
                  .then((result) => {
                   console.log(result.data.message);


                    if(result.data.status==true){
                        swal(result.data.message);
                         this.getdep();
                      
                    }else{
                            swal(result.data.message);
                           this.setState({loder:false});


                    }

                  });

            }

          });




}

  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

departmentname(e){
    this.setState({departmentname:e.target.value})
  }

 department(e){
  console.log(this.state);
  if(!this.state.departmentname.trim()){
      $(".errorrr").show();
      $(".errorrr h5").html("Please enter Your Department Name")
      setTimeout(function(){ $(".errorrr").hide();},3000);
      return false;
}




    const  {departmentname} = this.state;

      axios.post(url+'department', {departmentname})
          .then((result) => {
            //access the results here....

            console.log(result.data.user_id);
            if(result.data.status==true){
                swal(result.data.message);
                this.getdep();
              
            }else{
                    swal(result.data.message);

            }

          });

  }

  editDepartments(name,id){
    this.setState({editdepartmentname:name,departmentId:id})

  }

  updatedepartmentname(e){

    const  {editdepartmentname,departmentId} = this.state;
     axios.post(url+'editDepartment', {id:departmentId,departmentname:editdepartmentname})
          .then((result) => {
            //access the results here....

            console.log(result.data.user_id);
            if(result.data.status==true){
                swal(result.data.message);
                this.getdep();
              
            }else{
                    swal(result.data.message);

            }

          });
  }

  editdepartmentname(e){
        this.setState({editdepartmentname:e.target.value})
  }



  render() {
     const {department,loder,editdepartmentname}=this.state;
         console.log(loder,'')

    return (
      <div><Header />
      <SideBar/>
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
                <input type="text" className="form-control"placeholder="Department Name" value={editdepartmentname} onChange={(e)=>this.editdepartmentname(e)}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary"data-dismiss="modal"onClick={(e)=>this.updatedepartmentname(e)}>Update</button>
              </div>
            </div>         
             
        </div>
      </div>
        <section className="content">
          <div className="row">
          <div className="col-sm-12">
           <div className="box box-primary">
              <div className="box-header with-border">
             <div className="col-sm-6">           
            <h3>Department</h3>
           </div>
          <div className="col-sm-3">
          <input type="text" className="form-control" id=" department"  placeholder="Department Name" onChange={(e)=>this.departmentname(e)}/>
          <div className="errorrr"><h5></h5></div>
           </div>
          <div className="col-sm-3">
             <button type="button"className="btn btn-primary" onClick={(e)=>this.department(e)}>Add Dpeartment</button>
           </div>
        </div>
          
        
                 <div className="box-body">
                  <div className="row">
                    <div className="col-md-12">
                      <p className="text-center">
                      
                      </p>
                           <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                
                <th className="col-sm-10">Department</th>
                <th className="col-sm-1"></th>
                <th className="col-sm-1">Action</th>
              </tr>
            </thead>
            <tbody>
                 {department && department.length > 0 && 
                  department.map((item,index)=>(
              <tr>
                
                <td>{item.departmentname}</td>
                <td> <button type="button" className="btn btn-primary"data-toggle="modal" data-target="#modal-default" onClick={()=>this.editDepartments(item.departmentname,item._id)}>Edit <i className="fa fa-pencil-square-o"></i>


                </button></td>
                <td> <button type="button" className="btn btn-primary" onClick={()=>this.Delete(item._id)}>Delete <i className="fa fa-trash"></i></button></td>
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

export default department;