import React, { Component } from 'react'
import RightFixed from './RightFixd'

export default class Readmore extends Component {
    state={
        dynamicData: this.props.location.state.dynamicData,
        urlToImage: this.props.location.state.urlToImage,
        description: this.props.location.state.description,
        score: this.props.location.state.score,
        type: this.props.location.state.type

    };
    // componentDidMount=async()=>{
    //     this.setState({dynamicData:this.props.location.state.dynamicData});
    //     this.setState({ urlToImage: this.props.location.state.urlToImage });

    // };
    render() {
        console.log(this.state);
        // const{urlToImage,title,description}=this.state.dynamicData;
        return (
        //     <div className=" container-fluid mt-5">
        //         <div className="row">
        //         <h1>{title}</h1>
        //            <img
        //            src={urlToImage}
        //            alt="image"
        //            width="50%"
        //            height="50%"/>
        //             <h1>{description}</h1>

        //         </div> 
        //     </div>
            <div className="content-wrapper mt-4">
        <center>
            <div className="row mb-5">
                <div className="col-md-8 stretch-card grid-margin ">
                    <div className="card card-img-holder">
                        <div className="card-body">
                            <h4 className="font-weight-normal mb-3"></h4>
                                
                  {/* <i className="mdi mdi-chart-line mdi-24px float-right"></i> */}
                            
                            <div style={{borderStyle: 'solid',borderColor: 'blue'}}>
                             <h3 className="pt-2">Type of News: {this.state.type}</h3>
                             <h4> Sentiment Score:{this.state.score}</h4>
                             </div>
                            <h3 className="mb-5 pt-5">{this.state.dynamicData}</h3>
                            <img
                                src={this.state.urlToImage}
                                alt="image"
                                 width="50%"
                                 height="50%"/>
                            <h5 className="card-text mt-3">{this.state.description}</h5>
                        </div>
                    </div>
                </div>
                

               <RightFixed/>


                </div>
            </center>
            </div>

         )
    }
}

