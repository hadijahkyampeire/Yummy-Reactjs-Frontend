import React, { Component } from 'react';
import axios from 'axios';
import CreateCategory from './CreateCategory';

const Category =(props)=>(
    <div className="col-md-3 col-sm-6 category-card">
    <div className="card " >
  <div className="card-block">
    <h5 className="card-title">{props.name}</h5>
    <button className="btn btn-sm btn-success card-link" value="Edit Category" ><i className="fa fa-edit"/></button>
    <button className="btn btn-sm btn-danger card-link" value="Delete Category"><i className="fa fa-trash"/></button>
    <a href="/recipes"><h5 className="card-footer">View Recipes</h5></a>
  </div>
</div>
</div>
)

class Categories extends Component {
    state={
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
            console.log(error)
        });
    }
    
    componentWillMount(){
       this.getCategories();
    }
  render() {
      const categoryitems = this.state.categories.map(category=>(
          <Category name={category.cat.name} key={category.cat.id}/>

      ))
      console.log(categoryitems)
    return (
      <div >
        <CreateCategory getCategories={this.getCategories}/>
        <div className="row categories">
            {this.state.categories.length
            ?categoryitems:null}

        </div>
        <div id="pagination">
  <ul class="pagination">
    <li class="active"><a href="#">1</a></li>
    <li ><a href="#">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#">5</a></li>
  </ul>
  </div>
      </div>
    );
  }
}
export default Categories;
