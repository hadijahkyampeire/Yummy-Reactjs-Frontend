import React, { Component } from 'react';
import {notify} from 'react-notify-toast';
import axiosInstance from '../Apicalls';

class CreateRecipe extends Component {
    state = {
        title:'',
        description:''

    }
    handleInputChange = (event) =>{
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    handleAddRecipes = (event) => {
        const {title,description} = this.state;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
        event.preventDefault()
        let category_id =this.props.match.params.id
        axiosInstance.post(`categories/${category_id}/recipes`,{title,description},{headers})
        .then(response =>{
            this
                .props
                .getRecipes();
                this.setState({title: '', description: ''})
               
        }).catch(error => {
            if (error.response) {
                notify.show(error.response.data.message,'error', 3000)
            } else if (error.request) {
                notify.show("Request not made", 4000)
            }
        });
    }
  render() {
    return (
      <div>
            <div id="recipesbar">
                <div className="container text-center">
                    <div className="row">
                        <div
                            className="col-xs-8  col-sm-6 offset-xs-2 offset-sm-3 col-md-4 offset-md-4"
                          >
                            <h2>Create Your Recipes</h2>

                            <form onSubmit={this.handleAddRecipes}>
                                <div className="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="recipe title"
                                        onChange={this.handleInputChange}
                                        value={this.state.title}
                                        />
                                  </div>
                                  <br/>
                                <div className="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-list-alt"></i></span>
                                    <textarea
                                        rows="4"
                                        cols="50"
                                        name="description"
                                        className="form-control description"
                                        placeholder="description or instructions"
                                        onChange={this.handleInputChange}
                                        value={this.state.description}
                                      >
                                      </textarea>

                                  </div>
                                  <br/>
                                <input type="submit" className="btn btn-primary" value="Add Recipe" />
                              </form>
                          </div>
                      </div>
                  </div>
                <br />

              </div>
              <div>
                <div>
                </div>
          </div>
          </div>
          
    );
  }
}
export default CreateRecipe;
