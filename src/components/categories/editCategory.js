import React ,{Component}from 'react';

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
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id={`close${this.props.id}`}>Cancel</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditCategory;