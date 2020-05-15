import React, { Component } from 'react'
import axios from "axios";

export default class Readmore extends Component {
    state = {
        publics: []
    }
    componentDidMount = async () => {

        const token = sessionStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        try {
            const res1 = await axios.get(
                `http://localhost:5000/api/v1/news`,
                config
            );
            this.setState({
                publics: res1.data.data,
            });
            console.log(this.state.publics);
        } catch (err) {
            console.log("Can't load the items");

        };

    }
    render() {
      
        return (
      
       
                <div className="col-md-4 stretch-card mt-4">
                    <div className="card bg-gradient-danger card-img-holder text-white">
                        <div className="card-body">
                         <h4 className="font-weight-normal mb-4 pt-3 pb-3 pl-2" style={{borderStyle: 'solid',borderColor: 'white'}}>Admin Blog</h4>
                            {this.state.publics.map((news) => (
                           <div>
                           <h4 >{news.title}</h4>
                            <h6>{news.description}</h6><hr/>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                

         )
    }
}

