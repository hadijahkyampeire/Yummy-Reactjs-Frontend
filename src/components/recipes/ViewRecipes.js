import React, {Component} from 'react';
import {notify} from 'react-notify-toast';
import CreateRecipe from './CreateRecipes';
import EditRecipe from './editRecipe'
import Pagination from '../pagination';
import Search from '../searchQuery';
import axiosInstance from '../Apicalls';


export const Recipe = (props) => (
 
  // <div className="col-md-5 col-sm-6 recipe-card">
  <div className="card ">
  {/* <img class="card-img-top recipeimg" /> */}
    <div  className="card-header recipe" role="tab" id={`recipe-${props.id}`} data-toggle="collapse"
          href={`#recipeDetails${props.id}`}
          aria-expanded="true"
          aria-controls="collapseOne">
      <h3 className="mb-0">
        <button className="btn btn-link">
          {props.title}
        </button>
      </h3>
    </div>

    <div
      id={`recipeDetails${props.id}`}
      className="collapse"
      role="tabpanel"
      aria-labelledby={`recipe-${props.id}`}>
      <div className="card-block">
        {props.description}
      </div>
      <button className="btn btn-sm btn-primary" data-toggle="modal" data-target={`#edit_recipe${props.id}`} to="#" ><i className="fa fa-edit"/></button>
    <button className="btn btn-sm btn-danger " onClick={props.deleteRecipe} to={`#`}><i className="fa fa-trash" to="#"/></button>
    <EditRecipe title={props.title} description={props.description} id={props.id} editRecipe={props.editRecipe}/>
    </div>
  </div>
  // </div>
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
          alert("Request not made")
        }
      });

  }

  componentDidMount() {
    this.getRecipes();
  }
  // call for deleting recipes
  deleteRecipe(value){
    let category_id = this.props.match.params.id
    axiosInstance.delete(`categories/${category_id}/recipes/${value}`)
    .then(response=>{
      notify.show(response.data.message, 'success', 4000);
      this.getRecipes();
  })
  }
  // call for editing recipes
  editRecipe =(id,title,description)=>{
      let category_id = this.props.match.params.id
      axiosInstance.put(`categories/${category_id}/recipes/${id}`,{title,description})
      .then(response =>{
        document.getElementById(`close${id}`).click();
        this.getRecipes();
      })

  }
  changePage = (selectedPage)=>{
    this.setState(previousState=>({
        current_page: selectedPage
    }),()=>{
        console.log(this.state.searching)
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
      editRecipe={this.editRecipe} viewDetails={this.viewDetails}/>));

    return (
      <div >
        <CreateRecipe getRecipes={this.getRecipes} {...this.props}/>
        <div className="viewrecipes">
        <Search handleSearch={this.searchRecipes} placeholder="recipes"/>
        <div className="col-md-6 offset-md-3">
          <div id="accordion" role="tablist" aria-multiselectable="true">
            {recipeitems}
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
