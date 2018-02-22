import React, {Component} from 'react';
import {notify} from 'react-notify-toast';
import axiosInstance from '../Apicalls';

class CreateCategory extends Component {
    state = {
        title: ''
    }
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    handleAddCategories = (event) => {
        const {title: name} = this.state;
        event.preventDefault();
        axiosInstance.post('categories/', {name})
        .then(response => {
            this
                .props
                .getCategories()
            this.setState({title: ''})

        }).catch(error => {
            if (error.response) {
                notify.show(error.response.data.message, 'error', 4000)
            } else if (error.request) {
                notify.show("Request not made")
            }
        });
    }

    render() {
        return (
            <div >
                <div id="recipebar">
                    <div className="container text-center">
                        <div className='row'>
                            <div
                                className='col-xs-8  col-sm-6 offset-xs-2 offset-sm-3 col-md-4 offset-md-4'>
                                <h2>Create Your Recipe Category</h2>

                                <form onSubmit={this.handleAddCategories}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="title"
                                            className='form-control'
                                            placeholder="category name"
                                            onChange={this.handleInputChange}
                                            value={this.state.title}/>
                                    </div>

                                    <input type="submit" className='btn btn-primary' value="Add Category"/>
                                </form>
                            </div>
                        </div>
                    </div>
                    <br/>
                    
                </div>
            </div>
        );
    }
}
export default CreateCategory;