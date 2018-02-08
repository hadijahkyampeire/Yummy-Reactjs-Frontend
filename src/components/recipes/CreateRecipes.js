import React, { Component } from 'react';

class CreateRecipe extends Component {
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
                                        />
                                  </div>
                                <div className="form-group">
                                    <textarea
                                        rows="4"
                                        cols="50"
                                        className="form-control description"
                                        placeholder="description or instructions"
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
          </div>
    );
  }
}
export default CreateRecipe;
