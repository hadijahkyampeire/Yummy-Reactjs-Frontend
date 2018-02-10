import React, {Component} from 'react';
import {Link} from 'react-notify-toast';
import {notify} from 'react-notify-toast';
import CreateRecipe from './CreateRecipes';
import axiosInstance from '../Apicalls';

const Recipe = (props) => (
  <div class="card">
    <div class="card-header" role="tab" id={`recipe-${props.id}`}>
      <h5 class="mb-0">
        <a
          data-toggle="collapse"
          data-parent="#accordion"
          href={`#recipeDetails${props.id}`}
          aria-expanded="true"
          aria-controls="collapseOne">
          {props.title}
        </a>
      </h5>
    </div>

    <div
      id={`recipeDetails${props.id}`}
      class="collapse show"
      role="tabpanel"
      aria-labelledby={`recipe-${props.id}`}>
      <div class="card-block">
        {props.description}
      </div>
      <button className="btn btn-lg " data-toggle="modal" data-target="#edit_category" to="#"><i className="fa fa-edit"/></button>
    <button className="btn btn-lg " onClick={props.deleteRecipe} to={`#`}><i className="fa fa-trash" to="#"/></button>
    </div>
  </div>
)

class ViewRecipes extends Component {
  state = {
    recipes: []
  }

  getRecipes = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
    let category_id = this.props.match.params.id
    axiosInstance
      .get(`categories/${category_id}/recipes`, {headers})
      .then((response) => {
        console.log(response.data.recipes)
        this.setState({recipes: response.data.recipes});
        console.log(this.state.recipes)

      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message)
        } else if (error.request) {
          alert("Request not made")
        }
        console.log(error)
      });

  }

  componentDidMount() {
    this.getRecipes();
  }
  deleteRecipe(value){
    const headers={Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
    let category_id = this.props.match.params.id
    axiosInstance.delete(`categories/${category_id}/recipes/${value}`,{headers})
    .then(response=>{
      notify.show(response.data.message, 'success', 4000);
      this.getRecipes();
  })
  }

  render() {
    const recipeitems = this
      .state
      .recipes
      .map(recipe => (<Recipe {...recipe.recipe} key={recipe.recipe.id} deleteRecipe={() => this.deleteRecipe(recipe.recipe.id)}/>));

    return (
      <div >
        <CreateRecipe getRecipes={this.getRecipes} {...this.props}/>
        <div className="viewrecipes">
        <div className="col-md-6 offset-md-3">
          <div id="accordion" role="tablist" aria-multiselectable="true">
            {recipeitems}
          </div>
        </div>
      </div>
      </div>

    );
  }
}

export default ViewRecipes;
