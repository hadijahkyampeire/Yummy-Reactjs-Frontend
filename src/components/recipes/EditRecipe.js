import React, { Component } from 'react';

/**
 * Component for editing recipes.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
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
    componentWillMount(){
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
                    {this.props.error ? (
                    <div className="alert alert-danger">{this.props.error}
                     <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button></div>
                  ) : (
                    ""
                  )}
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
  export default EditRecipe;