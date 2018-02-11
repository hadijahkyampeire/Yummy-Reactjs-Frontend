import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {notify} from 'react-notify-toast';
import axiosInstance from '../Apicalls';
import CreateCategory from './CreateCategory';
class EditCategory extends Component {
    state = {
        name:''
    }
    handleEditCategory =(event) =>{
        event.preventDefault();
        this.props.editCategory(this.props.id, this.state.name)
    }
    handleInput =(event) =>{
        const {name, value} = event.target;
        this.setState({[name]:value});
    }
    componentDidMount(){
        this.setState({name:this.props.name})
    }
    render() {
        return (
            <div
                className="modal fade"
                id={`edit_category${this.props.id}`}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit category name</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handleEditCategory}>
                        <div className="modal-body">
                            <div className="form-group">
                                <input type="text" name="name" onChange={this.handleInput} className='form-control' value={this.state.name}/>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" >Update</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const Category = (props) => (
    <div className="col-md-3 col-sm-6 category-card">
        <div className="card ">
            <div className="card-block">
                <h5 className="card-title">{props.name}</h5>
                <Link
                    className="btn btn-sm btn-success card-link"
                    data-toggle="modal"
                    data-target={`#edit_category${props.id}`}
                    to="#"><i className="fa fa-edit"/></Link>
                <Link
                    className="btn btn-sm btn-danger card-link"
                    onClick={props.deleteCategory}
                    to={`#`}><i className="fa fa-trash"/></Link>
                <Link to={`/category/${props.id}/recipes`}>
                    <h5 className="card-footer">View Recipes</h5>
                </Link>
                <EditCategory name={props.name} id={props.id} editCategory={props.editCategory}/>
            </div> 
        </div>
    </div>

)

class Categories extends Component {
    state = {
        categories: []
    }
    getCategories = () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
        axiosInstance
            .get('categories/', {headers})
            .then(response => {
                this.setState({categories: response.data.categories});
                console.log(this.state.categories)

            })
            .catch(error => {
                if (error.response) {
                    const {status} = error.response;
                    if(status === 404){
                        this.setState({
                            categories: []
                        });
                    }
                } else if (error.request) {
                    alert("Request not made")
                }
                console.log(error)
            });
    }

    componentWillMount() {
        this.getCategories();
    }
    deleteCategory(value) {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
        axiosInstance
            .delete(`categories/${value}`, {headers})
            .then(response => {
                notify.show(response.data.message, 'success', 4000);
                this.getCategories();
            })
    }
    editCategory=  (id, name)=>{
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
        axiosInstance
            .put(`categories/${id}`,{name} ,{headers})
            .then(response => {
                notify.show(response.data.message, 'success', 4000);
                this.getCategories();
            })
    }
    render() {
        const categoryitems = this
            .state
            .categories
            .map(category => (<Category
                name={category.cat.name}
                id={category.cat.id}
                deleteCategory={() => this.deleteCategory(category.cat.id)}
                editCategory={this.editCategory}
                key={category.cat.id}/>))
        console.log(categoryitems)
        return (
            <div >
                <CreateCategory getCategories={this.getCategories}/>
                <div className="viewcategories">
                    <div className="row categories">
                        {this.state.categories.length
                            ? categoryitems
                            : <div className="col-sm-2 offset-sm-5">No categories </div>}

                    </div>
                    <div id="pagination">
                        <ul className="pagination">
                            <li className="active">
                                <a href="#">1</a>
                            </li>
                            <li >
                                <a href="#">2</a>
                            </li>
                            <li>
                                <a href="#">3</a>
                            </li>
                            <li>
                                <a href="#">4</a>
                            </li>
                            <li>
                                <a href="#">5</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default Categories;
