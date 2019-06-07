import React, { Component } from 'react';
import './manageemployee.css';
import $ from "jquery";
import Header from '../Header';
import SideBar from '../SideBar';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../../config.json';

const url='http://localhost:4000/';

class manageemployee extends Component {
   constructor(props){
     super(props);
    this.state = {
      employee:'',
      loder:false,

    };
   }

// CircularUnderLoad() {
  //return <CircularProgress disableShrink />;
//}

  componentWillMount(){

   this.getEmp();
    

  }
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}
getEmp(){
    this.setState({loder:true});

   var user_id = localStorage.getItem('user_id'); 
    axios.post(config.LocalapiUrl+'getempolyes')
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                    this.setState({employee:result.data.result})
                    this.setState({loder:false});


                }
           

          });
}
Delete(employeeid){
  
   const  {Delete} = this.state;
   var user_id = localStorage.getItem('user_id');   
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

               axios.post(config.LocalapiUrl+'deleteempolyes', {employeeid:employeeid})
                  .then((result) => {
                   console.log(result.data.message);


                    if(result.data.status==true){
                        swal(result.data.message);
                         this.getEmp();
                      
                    }else{
                            swal(result.data.message);
                           this.setState({loder:false});


                    }

                  });

            }

          });




}





  render() {
     const {employee,loder}=this.state;
         console.log(loder,'')

    //console.log(employee,'')

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
          <h3 className="box-title">Manage Employee</h3>                         
        </div>
        <div className="col-xs-2">
        <button type="button"className="btn btn-primary-emp"><Link to ='/addemployee'>Add Employee</Link></button>
        </div>
</div>
</div>

        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Employee Image</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Phone No</th>
                <th>Employee Department</th>
                <th colspan="4"style={{ textAlign: "center"}}>Action</th>
                
              </tr>
            </thead>
            <tbody>
                {employee && employee.length > 0 && 
                  employee.map((item,index)=>(
              <tr>
                <td><img src={item.employeeprofile } style={{height:"50px",width:"50px"}}/></td>
                <td>{item.employeeid}</td>
                <td>{item.employeename}</td>
                <td>{item.employeeemail}</td>
                <td>{item.PhoneNo}</td>
                <td>{item.employeedepartment}</td>
                <td> <Link to={'editemploye/'+item._id  }><button type="button" className="btn btn-primary">Edit <i className="fa fa-pencil-square-o"></i></button></Link></td>
                <td> <button type="button" className="btn btn-primary" onClick={()=>this.Delete(item._id)}>Delete <i className="fa fa-trash"></i></button></td>
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

export default manageemployee;