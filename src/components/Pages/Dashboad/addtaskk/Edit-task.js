import React, { Component } from 'react';
import './addtaskk.css';
import axios from 'axios';
import $ from "jquery";
import Header from '../../../Header';
import SideBar from '../../../SideBar';
import swal from 'sweetalert';
import config from '../../../../config.json';


const url='http://localhost:4000/';
class Eddtask extends Component {
  constructor(props){
    super(props);
    this.state = {
      Name:'',
      description:[{ description: "" }],
      Hours:[{ Hours: "" }], 
      name: "",
      getproject:'',
      project_id:'',
      projectName: [{ name: "" }],
      flag:false,
      count:1,

    };
   }



componentDidMount(){
    this.featchTasks();
    this.getproject();
    }

   getproject(){

     axios.post(config.LocalapiUrl+'getproject')
          .then((result) => {
            //access the results here.....
              if(result.data.status==true){
                   
                   this.setState({getproject:result.data.result})
                  
              }

          });
  }

  submit(e){
  



      const  {projectName,description,Hours,count} = this.state;
      var user_id = localStorage.getItem('user_id');   

       axios.post(config.LocalapiUrl+'editMyTaks ', {projectName:projectName, description:description,Hours:Hours,user_id:user_id})
          .then((result) => {
            //access the results here....

            if(result.data.status==true){
                swal(result.data.message);
                 this.props.history.replace('/Dashboard');
              
            }else{
                    swal(result.data.message);

            }

          });

  }



   featchTasks(){

     var user_id = localStorage.getItem('user_id'); 
     axios.post(config.LocalapiUrl+'featchTask', {user_id})
          .then((result) => {
            //access the results here....

            if (result.data.length !=0 ){
                if(result.data.status==true){
                  result.data.result.map((task,index)=>{
                    
                    this.setState({
                      userid:task.user_id,
                      Hours:JSON.parse(task.Hours),
                      projectName:JSON.parse(task.project_id),
                      description:JSON.parse(task.discription),
                      count : JSON.parse(task.Hours).length 
                    })

                  })
                   // this.setState({TimeIn :result.data.result[0].date })
                  
                }
          }

          });

  }

 

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleShareholderNameChange = idx => evt => {
    const newprojectName = this.state.projectName.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ projectName: newprojectName });
  };





handleShareholderDescription = idx => evt => {
    const newprojectName = this.state.description.map((description, sidx) => {
      if (idx !== sidx) return description;
      return { ...description, description: evt.target.value };
    });



    this.setState({ description: newprojectName });
  };




  handleShareholderHours = idx => evt => {
    const newprojectName = this.state.Hours.map((Hours, sidx) => {
  
      if (idx !== sidx) return Hours;
        return { ...Hours, Hours: evt.target.value };
    });
    this.setState({ Hours: newprojectName });
  };






  handleSubmit = evt => {
    const { name, projectName } = this.state;
    alert(`Incorporated: ${name} with ${projectName.length} projectName`);
  };

  handleAddShareholder = () => {
    this.setState({
      projectName: this.state.projectName.concat([{ name: "" }]),
      description: this.state.description.concat([{ description: "" }]),
      Hours: this.state.Hours.concat([{ Hours: "" }]),
      count:this.state.count + 1
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      projectName: this.state.projectName.filter((s, sidx) => idx !== sidx),
      description: this.state.description.filter((s, sidx) => idx !== sidx),
      Hours: this.state.Hours.filter((s, sidx) => idx !== sidx),
      count:this.state.count - 1
    });
  };




 
 

  updateproject(id){

    this.setState({project_id:id})

  }
 getpro(id,project){
    if(project){    
       this.setState({project_id:id,projectName:JSON.parse(project)});
    }else{
     this.setState({project_id:id,projectName: [{ name: "" }]});
    }
  }




  render() {
       const {getproject}=this.state;

   

        const  {projectName,description,Hours,count} = this.state;
       
        var filteredproject = projectName.filter(function (item) {return item.name });
        var filtereddescription = description.filter(function (item) {return item.description});
        var filteredHours = Hours.filter(function (item) {return item.Hours });
        const HoursCalculate =Hours.map((item, sidx) => {
             return item.Hours 
        });

        var arrayOfNumbers = HoursCalculate.map(Number);
        const sum = arrayOfNumbers.reduce((partial_sum, a) => partial_sum + a,0); 
        var disabled = [];
        if(count!=filteredproject.length){
         disabled.push({flag:'false'});
        }else if(count!=filtereddescription.length){
          disabled.push({flag:'false'});
        }else if(count!=filteredHours.length){
         disabled.push({flag:'false'});
        }else if(sum <= 8){
          disabled.push({flag:'false'});
        }else{
          disabled.push({flag:'true'});
        }


       


    return (
      <div>
        <Header />
        <SideBar />
      <div className="content-wrapper">
             <section className="content">
        <div className="row">
          {/* left column */}
          <div className="col-md-8">
            {/* general form elements */}
            <div className="box box-primary">
              <div className="box-header with-border">
                <div className="row">
                <div className="col-md-8">

               <h3 className="box-title"><b>Edit TASK DETAIL</b></h3>
               </div>
              <div className="col-md-4">
        
         <button
          type="button" className="btn btn-primary-add"
          onClick={this.handleAddShareholder}disabled={disabled[0].flag!="false"}
          >
          ADD TASK
        </button>
             </div>

              </div></div>
              {/* /.box-header */}
              {/* form start */}
               <form onSubmit={this.handleSubmit}>
       {/* <input
          type="text"
          placeholder="Bavn Soft"
          value={this.state.name}
          onChange={this.handleNameChange}
        />*/}

        <h4>Today Task Detail</h4>

        
          <div className="shareholder">
            <div className="row">
               <div className="col-sm-3">
               {this.state.projectName.map((shareholder, idx) => (
                  <select className="form-control-select" value={shareholder.name} onChange={this.handleShareholderNameChange(idx)}>
                      <option value=''> Select Project</option>
                      {getproject && getproject.length > 0 && 
                            getproject.map((item,index)=>(
                              <option value={item._id}> {item.projectname}</option>                
                          ))}
                     </select>  
                ))} 
            </div>
 
            
            <div className="col-sm-3">
            {this.state.description.map((description, idx) => (
                <input
                  type="text"
                  placeholder={`Description`}
                  value={description.description}
                  onChange={this.handleShareholderDescription(idx)}/>
               
               ))}   
             </div>
            <div className="col-sm-3">
            {this.state.Hours.map((Hours, idx) => (
                <input
                  type="text"
                  placeholder={`Hours`}
                  value={Hours.Hours}
                  onChange={this.handleShareholderHours(idx)}/>
              
                 ))}
              </div>

            <div className="col-sm-2">
            {this.state.Hours.map((Hours, idx) => (
                <button
                type="button" className="btn btn-danger"
                onClick={this.handleRemoveShareholder(idx)}
                className="small">        
                <i className="fa fa-times"></i>
                </button>
                ))}
                </div>


          </div>
       </div>
       
        <h3> Total Hours: {sum} </h3>
     <button type="button" className="btn btn-primary" disabled={disabled[0].flag!="true"} onClick={(e)=>this.submit(e)}
             

     >submit</button>

      </form>
            
            </div>
          </div></div></section>
  </div>
  </div>
    );
  }
}

export default Eddtask;