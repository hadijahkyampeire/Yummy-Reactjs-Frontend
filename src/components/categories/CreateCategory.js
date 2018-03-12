import React, { Component } from "react";
import { notify } from "react-notify-toast";
import axiosInstance from "../Apicalls";

/**
 * Component for allowing users to add categories.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class CreateCategory extends Component {
  state = {
    title: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  /**
   * handles addition of categories
   * @param {object} event - Reference to the submit form component
   * used to prevent default form behaviours on submission
   */
  handleAddCategories = (event, id) => {
    const { title: name } = this.state;
    event.preventDefault();
    axiosInstance
      .post("categories/", { name })
      .then(response => {
        notify.show(response.data.message, 'success', 4000);
        document.getElementById("closeAddModal").click();

        this.props.getCategories();
        this.setState({ title: "" });
      })
      .catch(error => {
        if (error.response) {
          this.setState({ error: error.response.data.message, mess: "" });
        } else if (error.request) {
          notify.show("Request not made");
        }
      });
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#createCategoryModal"
          aria-hidden="true"
        >
          <i className="fa fa-plus" /> Add category
        </button>
        <div className="modal fade" id="createCategoryModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add category</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.handleAddCategories}>
                <div className="modal-body">
                  {this.state.error ? (
                    <div className="alert alert-danger">{this.state.error}
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

                  <div className="input-group ">
                    <span className="input-group-addon pr-4">
                      <i className="glyphicon glyphicon-pencil" />
                    </span>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="category name"
                      onChange={this.handleInputChange}
                      value={this.state.title}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Add"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    id="closeAddModal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateCategory;
