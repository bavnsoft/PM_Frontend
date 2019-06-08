import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import config from '../config.json';
import axios from 'axios';



export default class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      EmpName:'',
      EmpImg:'',
      

    };
   }



componentDidMount(){
    this.Getemp();
}

     Getemp(){

     var user_id = localStorage.getItem('user_id'); 
     axios.post(config.LiveapiUrl+'GetEmpById', {id:user_id})
          .then((result) => {
            //access the results here....

            if (result.data.length !=0 ){
                if(result.data.status==true){
                  result.data.result.map((emp,index)=>{
                    
                    this.setState({
                      EmpName:emp.employeename,
                      EmpImg:emp.employeeprofile,
                    
                    })

                  })
                 
                  
                }
          }

          });

  }

    render(){
        

      var user_id = localStorage.getItem('user_id'); 
     var role = localStorage.getItem('role');
     console.log(role);
     if(role=='admin'){
         return (

            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src={this.state.EmpImg == "" ? "img/images.png"  : this.state.EmpImg} className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>{this.state.EmpName}</p>
                            <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>
                    <ul className="sidebar-menu" data-widget="tree">
                     
                         <li>
  
                        <NavLink to="/Dashboard"exact activeStyle={{color:'white'}}>
                            <i className="fa fa-th"></i> <span> Dashboard</span>
                            <span className="pull-right-container"data-dismiss="modal">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>
                        
                        <li>
                         <NavLink to="/manageemployee"exact activeStyle={{color:'white'}}>
                        
                            <i className="fa fa-th"></i> <span>Manage Employee</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>



                         <li>
                          <NavLink to="/manageleave"exact activeStyle={{color:'white'}}>
                    
                            <i className="fa fa-th"></i> <span>Manage Leaves</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>
                         <li>

                    <NavLink to="/department"exact activeStyle={{color:'white'}}>

                            <i className="fa fa-th"></i> <span>Manage Department</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>

                         <li>
                        
                          <NavLink to="/manageproject"exact activeStyle={{color:'white'}}>
                            <i className="fa fa-th"></i> <span>Manage Project</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>
                       
                           <li>
            
                         <NavLink to="/managetask"exact activeStyle={{color:'white'}}>

                            <i className="fa fa-th"></i> <span>Manage Task</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>

                    </ul>
                </section>
            </aside> 
        )

     }else{
         return (

            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src={this.state.EmpImg == "" ? "img/images.png" : this.state.EmpImg} className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>{this.state.EmpName}</p>
                            <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>
                    <ul className="sidebar-menu" data-widget="tree">
                        
                        <li>
  
                        <NavLink to="/Dashboard"exact activeStyle={{color:'white'}}>
                            <i className="fa fa-th"></i> <span> Dashboard</span>
                            <span className="pull-right-container"data-dismiss="modal">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>
                        
                       



                         <li>
                          <NavLink to="/manageleave"exact activeStyle={{color:'white'}}>
                    
                            <i className="fa fa-th"></i> <span>Manage Leaves</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>
                         
                       
                           <li>
            
                         <NavLink to="/managetask"exact activeStyle={{color:'white'}}>

                            <i className="fa fa-th"></i> <span>Manage Task</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green"></small>
                            </span>
                        </NavLink>
                        </li>

                    </ul>
                </section>
            </aside> 
        )

     }  

       
    }
}
