import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CreateCategory extends Component {
    state = {
        title: ''
    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }
    handleAddCategories = (event)=>{
        const {title:name} = this.state;
        const headers={Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
    
        event.preventDefault();
        axios.post('http://127.0.0.1:5000/api/v1/categories/',{name},{headers})
        .then(response=>{
            this.props.getCategories()
            console.log(response);

        }).catch(error=>{
            if(error.response){
                alert(error.response.data.message)
            }else if (error.request){
                alert("Request not made")
            }
        });
    }
    
    render() {
        return (
            <div >
                <div id="recipebar">
                    <div className="container">
                        <h2>Create Your Yummy Recipes</h2>
                        <Link to="/"><input type="button" id="logout" className="btn btn-warning" value="Logout " /> </Link>
                        <form onSubmit={this.handleAddCategories} >
                        <h3><label >Recipe category</label></h3>
                        <input type="text" name="title" placeholder="recipe category" onChange={this.handleInputChange} value={this.state.title}/>

                        <input type="submit" className="btnrecipeadd" value="Add Category" />
</form>
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateCategory;