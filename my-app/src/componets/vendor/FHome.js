import React, { Component, Fragment } from "react";
import logo from "../../assets/logo.png";
import user from "../../assets/instants.jpg";
import "../CSS/farm.css";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Sentiment from 'sentiment';
import RightFixed from './RightFixd'
const sentiment=new Sentiment();

class FHome extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      title:"",
      readmore:false,
      urlToImage:"",
      description:"",
      sentimentScore: null,
      generalSentiment: null,
    };
    this.findSentiment = this.findSentiment.bind(this);
  }
  findSentiment=(event,image,description,e)=> {
    this.setState({
      title:event,
      urlToImage:image,
      description:description,
      readmore:true
    
      
    })
     
    const result = sentiment.analyze(event);
    console.log(result);
    this.setState({
      sentimentScore: result.score,
    });
    if (result.score < 0) {
      this.setState({
        generalSentiment: "negative",
      });
    } else if (result.score > 0) {
      this.setState({
        generalSentiment: "positive",
      });
    } else {
      this.setState({
        generalSentiment: "neutral",
      });
    }
   console.log(this.state.generalSentiment);
  }
  //{this.state.input >= 18 && this.submit ?  buttonTwo : buttonThree }   ternary operator
  componentDidMount() {
    
    fetch(
      "http://newsapi.org/v2/top-headlines?country=us&apiKey=0976e1460f954e439dc6f1938e0a096f" //top live headlines
    )
      .then((Response) => Response.json())
      .then((findresponse) => {
        console.log(findresponse.articles);
        this.setState({
          data: findresponse.articles
          
        });
      });
  }

  
  render() {
    return (

      <Fragment>
        {this.state.readmore?
          ((<Redirect to={{ pathname: "/vendor/Readmore",
            state: {
              dynamicData: this.state.title,
              urlToImage: this.state.urlToImage,
              description: this.state.description,
              score:this.state.sentimentScore,
              type: this.state.generalSentiment
            }      
        }}/>)):(
         

        <form>
          
        <div className=" container-fluid mt-5" id="product">
          $nbps;
      
         <div className="row">
           <div className="col-md-8">
           <h2> Latest</h2>
          <div className="row">
              {this.state.data.map((dynamicData, key) => (
              <div className="col-lg-3 col-md-3 col-sm-3   animated fadeInUp wow animated">
                <div className="product-top">
                  <img src={dynamicData.urlToImage} className="img1" alt="" />
                  <input
                    type="text"
                    value={dynamicData.title}
                  ></input>
                
                  <input
                    type="submit"
                    className="btn btn-info btn-sm"
                    value="Read More"
                    onClick={(e) => this.findSentiment(dynamicData.title, dynamicData.urlToImage, dynamicData.description, e)}
                  ></input>
                
                </div>
               
              </div>
            ))}
          </div>
          </div>
          <RightFixed/>
          </div>
        </div>
        </form>
        )}
      </Fragment>
    );
  }
}

export default FHome;
