import React, { Component } from 'react';
import axios from 'axios';

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
        axios.post(`http://127.0.0.1:5000/api/v1/categories/${category_id}/recipes`,{title,description},{headers})
        .then(response =>{
            this
                .props
                .getRecipes();
                console.log(response)
        }).catch(error => {
            if (error.response) {
                alert(error.response.data.message)
            } else if (error.request) {
                alert("Request not made")
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
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="recipe title"
                                        onChange={this.handleInputChange}
                                        value={this.state.title}
                                        />
                                  </div>
                                <div className="form-group">
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
                                <input type="submit" className="btn btn-primary" value="Add Recipe" />
                              </form>
                          </div>
                      </div>
                  </div>
                <br />

                <form className="form-group" role="search">
                    <div className="input-group add-on col-sm-3 pull-right">
                        <input type="text" className="form-control" placeholder="Search for a recipe..." name="srch-term" />
                        <div className="input-group-btn">
                            <button className="btn btn-default" type="submit">
                                <i className="glyphicon glyphicon-search" />
                              </button>
                          </div>
                      </div>
                  </form>

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
