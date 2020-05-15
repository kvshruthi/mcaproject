// import React, { Component } from "react";
// import "../CSS/farm.css";
// import Dropdown from "react-bootstrap/Dropdown";

// export default class Addnews extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             category: [],
//         };
//     }
//     componentDidMount() {
//         this.props.getaddnews();
//     }
//     render() {
//         return (
//             <div className="container itmtop">
//                 <div className="">
//                     {/* <div className="jumbotron col-md-6 col-sm-5 " id="login-first"></div> */}
//                     <div className="jumbotron" id="login-second">
//                         <div className="page-wrapper p-t-50 p-b-50">
//                             <div className="wrapper wrapper--w900 ">
//                                 <div className="card cardH card-6 ">
//                                     <div className="card-heading m-4">
//                                         <h2 className="title text-dark">Add News</h2>
//                                     </div>
//                                     <div className="card-body">
//                                         <form method="POST">
//                                             <div className="form-row frow">
//                                                 <div className="name"> Name</div>
//                                                 <div className="value">
//                                                     <input
//                                                         className="input--style-6"
//                                                         type="text"
//                                                         name="iname"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                     <div className="card-footer">
//                                         <a
//                                             className="btn btn-radius-2 btn-primary"
//                                             href="/category"
//                                             type="submit"
//                                         >
//                                             Add News
//                     </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }


import React, { Component,useState, Fragment } from 'react'
import Category from "./Category";
import Addnews from "./Addnews";
// import React, { Component, useReducer } from "react";
// import Category from "./Category";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";



export default class Dashboard extends Component {
    constructor(props) {
        super(props);
            this.state = {
                title:"",
                description:"",
                user:"",
                file:null,
                success: false,
              };
              this.onChange = this.onChange.bind(this);
           }
           onChange(e) {
            this.setState({
              [e.target.name]: e.target.value,
            });
         }
         onChangeHandler = (e) => {
          this.setState({
            file: e.target.files[0],
          });
          console.log(e.target.files[0])
        };
         onSubmit = async (e) => {
            e.preventDefault();
                  //------------------------imge----------------
            //       const data = new FormData();
            //     data.append("file", this.state.file);
                
            //     console.log(data);
            //     const token = sessionStorage.getItem("token");
            //     const config1 = {
            //       headers: {
            //         Authorization: `Bearer ${token}`,
            //         "Content-Type": "multipart/form-data",
            //       },
            //     };
            //    try{
            //       const res = await axios.post(
            //         `http://localhost:5000/api/v1/category/photo`,
            //         data,
            //         config1
            //       );
            //       console.log(res.data.data);
      //--------------------------------------------------------------------------------- 
      try{
           const add = {
                title:this.state.title,
                // file:res.data.data,
                description:this.state.description
                           
             };
            const body = JSON.stringify(add);
            const token = sessionStorage.getItem("token");
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              
           }
           console.log(token);
               const reslt = await axios.post(`http://localhost:5000/api/v1/news`,body,config);
                   this.setState({success: true,});
               }
               catch (error) 
               {alert("Sorry Something Wrong!!");}
           }
        
           render() {
          
            return (
                <Fragment>
                { this.state.success ?
                 ( <Redirect to="/Admin/mynewslist" />
                 ):
                 (
            <div className="content-wrapper ">
                <div className="row d-none" id="proBanner"></div>
              

                {/* User List */}
                <div className="row" id="vendor">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                               <h3 className="mb-4">Add News</h3>
                                <form method="post" onSubmit={this.onSubmit} >
                                               
                                    <input type="text" 
                                    placeholder="Enter News Title"
                                    name="title" 
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    required />
                                    
                                    <textarea 
                                    className="mt-5" 
                                    placeholder="Enter Description"
                                    name="description" 
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    required />
                                    {/* <label className="mt-3">Add Image</label>
                                         <input type="file" /> */}
                                    <input type="submit" value="Add" className="btn btn-info mt-5"/>
                                    
                                </form>   
                            </div>
                        </div>
                    </div>
                </div>
              </div>
                  )};
                  </Fragment>
             )
         }
     
     }
        


