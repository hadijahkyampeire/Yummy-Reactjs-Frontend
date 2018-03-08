import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import axiosInstance from '../Apicalls';

class CreateRecipe extends Component {

    state = {
        title: '',
        description: ''

    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleAddRecipes = (event) => {
        const { title, description } = this.state;
        event.preventDefault()
        let category_id = this.props.match.params.id
        axiosInstance.post(`categories/${category_id}/recipes`, { title, description })
            .then(response => {
                document.getElementById('closeRecipeModal').click();
                this
                    .props
                    .getRecipes();
                this.setState({ title: '', description: '' })

            }).catch(error => {
                if (error.response) {
                    notify.show(error.response.data.message, 'error', 3000)
                } else if (error.request) {
                    notify.show("Request not made", 4000)
                }
            });
    }
    render() {
        return (
            <div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addRecipeModal">
                <i className="fa fa-plus" />{' '}
                Add Recipe
                </button>
                <div id="recipesbar">
                    <div class="modal fade" id="addRecipeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Add recipes to <strong>{this.props.categoryName}</strong></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={this.handleAddRecipes}>
                                <div class="modal-body">
                                
                                    <div className="input-group">
                                        <span className="input-group-addon pr-4"><i className="fa fa-pencil"></i></span>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            placeholder="recipe title"
                                            onChange={this.handleInputChange}
                                            value={this.state.title}
                                        />
                                    </div>
                                    <br />
                                    <div className="input-group">
                                        <span className="input-group-addon pr-4"><i className="fa fa-list-alt"></i></span>
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
                                 </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeRecipeModal">Close</button>
                                    <input type="submit" className="btn btn-primary" value="Add Recipe" />
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default CreateRecipe;
