import React, { Component } from 'react';
import './manageovertime.css';
import Header from '../../Header';
import SideBar from '../../SideBar';
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import config from '../../../config.json';
import swal from 'sweetalert';

const url='http://localhost:4000/';

class manageovertime extends Component {
   constructor(props){
    super(props);
     this.state = {
      overtime:'',
     };
   }

  componentWillMount(){

    this.getover();

  }
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}
  getover(){
  

   var user_id = localStorage.getItem('user_id'); 
    axios.post(config.LiveapiUrl+'getovertime')
          .then((result) => {
            //access the results here....
                if(result.data.status==true){
                    this.setState({overtime:result.data.result})


                }
           

          });
}



Delete(Timeid){
  
   const  {Delete} = this.state;
   var user_id = localStorage.getItem('user_id');   

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

               axios.post(config.LiveapiUrl+'deleteovertime', {Timeid:Timeid})
                  .then((result) => {
                   console.log(result.data.message);


                    if(result.data.status==true){
                        swal(result.data.message);
                         this.getover();
                      
                    }else{
                            swal(result.data.message);


                    }

                  });

            }

          });




}


  render() {
         const {overtime}=this.state;

    return (
      <div>
       <Header />
        <SideBar />

 <div id="app" className="loader"></div>}
 <div className="content-wrapper">

 <div className="box">
        <div className="box-header">     
        <div className="row">
        <div className="col-xs-10">                       
          <h3 className="box-title"><b>Manage Overtime</b></h3>                         
        </div>
        <div className="col-xs-2">
        <button type="button"className="btn btn-primary"><Link to ='/addovertime'>Add Overtime</Link></button>
        </div>
       </div>
      </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className="col-sm-5">Date</th>
                <th className="col-sm-5">Time</th>
                <th colspan="2" style={{ textAlign: "center"}}>Action</th>
               
              </tr>
            </thead>
            <tbody>
            {overtime && overtime.length > 0 && 
                  overtime.map((item,index)=>(
               
                        <tr>                
                          <td>{moment(item.overtimeDate).format('LL')}</td>
                          <td>{item.Time}</td>
                          <td> <Link to={'editovertime/'+item._id  }><button type="button" className="btn btn-primary">Edit <i className="fa fa-pencil-square-o"></i></button></Link></td>
                         <td><button type="button" className="btn btn-primary"onClick={()=>this.Delete(item._id)}>Delete <i className="fa fa-trash"></i></button></td>

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

export default manageovertime;