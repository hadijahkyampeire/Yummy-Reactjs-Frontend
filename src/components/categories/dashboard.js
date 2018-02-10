import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {notify} from 'react-notify-toast';
import axios from 'axios';
import CreateCategory from './CreateCategory';

const Category =(props)=>(
    <div className="col-md-3 col-sm-6 category-card">
    <div className="card " >
  <div className="card-block">
    <h5 className="card-title">{props.name}</h5>
    <Link className="btn btn-sm btn-success card-link" data-toggle="modal" data-target="#edit_category" to="#"><i className="fa fa-edit"/></Link>
    <Link className="btn btn-sm btn-danger card-link" onClick = {props.deleteCategory} to={`#`}><i className="fa fa-trash"/></Link>
    <Link to={`/category/${props.id}/recipes`}><h5 className="card-footer">View Recipes</h5></Link>
    <div className="modal fade" id="edit_category" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit category name</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <div className="form-group">
                             <input
                                type="text"
                                name="name"
                                className='form-control'
                                placeholder={props.name}/>
                                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick = {props.editCategory} to={`#`}>Update</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>
  </div>
</div>
</div>

)

class Categories extends Component {
    state = {
        categories: [],
    }
    getCategories = ()=>{
        const headers={Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
        axios.get('http://127.0.0.1:5000/api/v1/categories/',{headers})
        .then(response=>{
            this.setState({
                categories:response.data.categories
            });
            console.log(this.state.categories)
        
        }).catch(error=>{
            if (error.response) {
                alert(error.response.data.message)
            } else if (error.request) {
                alert("Request not made")
            }
            console.log(error)
        });
    }
    
    componentWillMount(){
       this.getCategories();
    }
    deleteCategory(value){
        const headers={Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
        axios.delete(`http://127.0.0.1:5000/api/v1/categories/${value}`,{headers})
        .then(response=>{
            notify.show(response.data.message, 'success', 4000);
            this.getCategories();
        })
    }
    editCategory(value){
        const headers={Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
        axios.put(`http://127.0.0.1:5000/api/v1/categories/${value}`,{headers})
        .then(response=>{
            notify.show(response.data.message, 'success', 4000);
            this.getCategories();
        })
    }
  render() {
      const categoryitems = this.state.categories.map(category=>(
          <Category name={category.cat.name} id={category.cat.id} 
          deleteCategory={() => this.deleteCategory(category.cat.id)} 
          editCategory={() => this.editCategory(category.cat.id)} 
          key={category.cat.id} />

      ))
      console.log(categoryitems)
    return (
      <div >
        <CreateCategory getCategories={this.getCategories}/>
        <div className="viewcategories">
        <div className="row categories">
            {this.state.categories.length
            ?categoryitems:null}

        </div>
        <div id="pagination">
  <ul className="pagination">
    <li className="active"><a href="#">1</a></li>
    <li ><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#">5</a></li>
  </ul>
  </div>
      </div>
      </div>
    );
  }
}
export default Categories;
