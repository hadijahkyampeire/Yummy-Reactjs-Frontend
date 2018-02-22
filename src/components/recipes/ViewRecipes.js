import React, {Component} from 'react';
import {Link} from 'react-notify-toast';
import {notify} from 'react-notify-toast';
import CreateRecipe from './CreateRecipes';
import Pagination from '../pagination';
import Search from '../searchQuery';
import axiosInstance from '../Apicalls';

class EditRecipe extends Component{
  state ={
    title:'',
    description:''
  }
  handleInput =(event) =>{
    const {name, value} = event.target;
    this.setState({[name]:value})
  }
  handleEditRecipe =(event) =>{
    event.preventDefault();
    this.props.editRecipe(this.props.id,this.state.title,this.state.description)
  }
  componentDidMount(){
    this.setState({title:this.props.title, description:this.props.description})
}
  render(){
    return(
      <div
          className="modal fade"
          id={`edit_recipe${this.props.id}`}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title">Edit a recipe</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <form onSubmit={this.handleEditRecipe}>
                  <div className="modal-body">
                      <div className="form-group">
                          <input type="text" name="title" onChange={this.handleInput} className='form-control' value={this.state.title}/>
                      </div>
                      <div className="form-group">
                              <textarea
                                  rows="4"
                                  cols="50"
                                  name="description"
                                  className="form-control description"
                                  placeholder="description or instructions"
                                  onChange={this.handleInput}
                                  value={this.state.description}
                                >
                                </textarea>
                            </div>
                  </div>
                  <div className="modal-footer">
                      <button type="submit" className="btn btn-primary" >Update</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" id ={`close${this.props.id}`}>Cancel</button>
                  </div>
                  </form>
              </div>
          </div>
      </div>
    );
  }
}
const Recipe = (props) => (
  <div className="card">
    <div className="card-header" role="tab" id={`recipe-${props.id}`}>
      <h3 className="mb-0">
        <button className="btn btn-link"
          data-toggle="collapse"
          href={`#recipeDetails${props.id}`}
          aria-expanded="true"
          aria-controls="collapseOne">
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
      <button className="btn btn-lg " data-toggle="modal" data-target={`#edit_recipe${props.id}`} to="#" ><i className="fa fa-edit"/></button>
    <button className="btn btn-lg " onClick={props.deleteRecipe} to={`#`}><i className="fa fa-trash" to="#"/></button>
    <EditRecipe title={props.title} description={props.description} id={props.id} editRecipe={props.editRecipe}/>
    </div>
  </div>
)

class ViewRecipes extends Component {
  state = {
    recipes: [],
    Next_page: null,
    Previous_page: null,
    current_page: null,
    total_pages: null,
    total_Items: null,
  }

  getRecipes = () => {
    let category_id = this.props.match.params.id
    axiosInstance
      .get(`categories/${category_id}/recipes`)
      .then((response) => {
        this.setState(response.data);
        console.log(response.data)

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
        console.log(error)
      });

  }

  componentDidMount() {
    this.getRecipes();
  }
  deleteRecipe(value){
    let category_id = this.props.match.params.id
    axiosInstance.delete(`categories/${category_id}/recipes/${value}`)
    .then(response=>{
      notify.show(response.data.message, 'success', 4000);
      this.getRecipes();
  })
  }
  editRecipe =(id,title,description)=>{
      let category_id = this.props.match.params.id
      axiosInstance.put(`categories/${category_id}/recipes/${id}`,{title,description})
      .then(response =>{
        document.getElementById(`close${id}`).click();
        this.getRecipes();
      })

  }
  
  render() {
    const {current_page, total_Items, total_pages, Next_page, Previous_page} = this.state;
    const recipeitems = this
      .state
      .recipes
      .map(recipe => (<Recipe {...recipe.recipe} key={recipe.recipe.id} 
        deleteRecipe={() => this.deleteRecipe(recipe.recipe.id)} 
      editRecipe={this.editRecipe}/>));

    return (
      <div >
        <CreateRecipe getRecipes={this.getRecipes} {...this.props}/>
        <div className="viewrecipes">
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
