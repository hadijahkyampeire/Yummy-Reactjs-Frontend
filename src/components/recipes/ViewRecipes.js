
import React, { Component } from 'react';
import {notify} from 'react-notify-toast';
import CreateRecipe from './CreateRecipes';
import EditRecipe from './EditRecipe';
import DeleteRecipe from './DeleteRecipe';
import Pagination from '../Pagination';
import Search from '../SearchQuery';
import axiosInstance from '../Apicalls';


export const Recipe = (props) => (
  <div className="card ">
    <div  className="card-header recipe" role="tab" id={`recipe-${props.id}`} data-toggle="collapse"
          href={`#recipeDetails${props.id}`}
          aria-expanded="true"
          aria-controls="collapseOne">
      <h3 className="mb-0">
        <span className="word-font">
          {props.title}
        </span>
      </h3>
    </div>

    <div
      id={`recipeDetails${props.id}`}
      className="collapse"
      role="tabpanel"
      aria-labelledby={`recipe-${props.id}`}>
      <div className="card-block">
      <h4>Description:</h4>
        {props.description}
      </div>
      <hr style={{backgroundColor:'#26A69A', height:2}}/>
      <div className="text-center" style={{marginBottom:4}}>
      <button className="btn btn-sm btn-primary" data-toggle="modal" 
      data-target={`#edit_recipe${props.id}`} to="#" ><i className="fa fa-edit"/> Edit</button>
    <button className="btn btn-sm btn-danger " data-toggle="modal" 
    data-target={`#delete_recipe${props.id}`} to="#"><i className="fa fa-trash"/> Delete</button>
    </div>
    <EditRecipe title={props.title} description={props.description} id={props.id} editRecipe={props.editRecipe} error={props.error}/>
    <DeleteRecipe title={props.title} description={props.description} id={props.id} deleteRecipe={props.deleteRecipe}/>
    </div>
  </div>
)

/**
 * Component for rendering/viewing recipes.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class ViewRecipes extends Component {
  state = {
    recipes: [],
    Next_page: null,
    Previous_page: null,
    current_page: null,
    total_pages: null,
    total_Items: null,
    searching: false,
    error:null,
  }

  getRecipes = () => {
    // if a search is being made, don't make this call
    if(this.state.searching){
      return;
    }
    const page = this.state.current_page || 1;
    let category_id = this.props.match.params.id
    axiosInstance.get(`categories/${category_id}/recipes`,{params:{page}})
      .then((response) => {
        this.setState({...response.data, searching:false});

      })
      .catch((error) => {
        if (error.response) {
          const {status}= error.response;
          if(status === 404){
            this.setState({
              recipes:[]
            });
          }
        } else if (error.request) {
          notify.show("Request not made", 'error', 3000)
        }
      });

  }

  componentDidMount() {
    this.getRecipes();
  }
  // call for deleting recipes
  deleteRecipe(id){
    let category_id = this.props.match.params.id
    axiosInstance.delete(`categories/${category_id}/recipes/${id}`)
    .then(response=>{
      notify.show(response.data.message, 'success', 4000);
      document.getElementById(`closeModal${id}`).click()
      this.getRecipes();
  })
  }
  // call for editing recipes
  editRecipe =(id,title,description)=>{
      let category_id = this.props.match.params.id
      axiosInstance.put(`categories/${category_id}/recipes/${id}`,{title,description})
      .then(response =>{
        document.getElementById(`close${id}`).click();
        notify.show(response.data.message, 'success', 4000);
        this.getRecipes();
      }).catch(error => {
        if (error.response) {
            // notify users incase of an error from response
            this.setState({error: error.response.data.message});
        } else if (error.request) {
            notify.show("Request not made", 'error', 3000)
        }

    })

  }
  changePage = (selectedPage)=>{
    this.setState(previousState=>({
        current_page: selectedPage
    }),()=>{
        if(this.state.searching){
            this.searchRecipes(this.state.q);
        }else{
            this.getRecipes()
        }
    })

}
  // call to handle search query
  searchRecipes =(q) =>{
    const page = !this.state.searching ? 1 :(this.state.current_page || 1);
    this.setState({q})
    let category_id = this.props.match.params.id
    axiosInstance.get(`categories/${category_id}/recipes`,{params:{q,page}})
    .then(response=>{
      this.setState({...response.data, searching: true});
    }).catch(error=>{
      notify.show(error.response.data.message, 'error' , 3000)

    })

  }
  
  render() {
    const {current_page, total_pages, Next_page, Previous_page} = this.state;
    // create recipe list to be rendered
    const recipeitems = this
      .state
      .recipes
      .map(recipe => (<Recipe {...recipe.recipe} key={recipe.recipe.id} 
        deleteRecipe={() => this.deleteRecipe(recipe.recipe.id)} 
      editRecipe={this.editRecipe} viewDetails={this.viewDetails}
      error={this.state.error}
      categoryName={this.props.location.state.categoryName}/>));

    return (
      <div >
        <div className="viewrecipes">
        <h4 className="text-center">
        <span className="label label-primary">Category {this.props.location.state.categoryName}</span></h4>
        <br/>
        <div className="row justify-content-md-center">
        <CreateRecipe getRecipes={this.getRecipes} {...this.props} categoryName={this.props.location.state.categoryName}/>
        <Search handleSearch={this.searchRecipes} placeholder="recipes"/>
        </div>
        <div className="col-md-6 offset-md-3">
          <div id="accordion" role="tablist" aria-multiselectable="true">
          {this.state.recipes.length
          ?recipeitems
          :
         < div className="col-md-5 offset-sm-4">
          <div className="alert alert-info" role="alert">
        <strong>Ooops!</strong> No recipes ,add some
        </div></div>}
          </div>
        </div>
        <Pagination 
        activePage={current_page}
        previousPage={Previous_page}
        nextPage={Next_page}
        totalPages={total_pages}
        changePage={this.changePage} />
      </div>
      </div>

    );
  }
}

export default ViewRecipes;
