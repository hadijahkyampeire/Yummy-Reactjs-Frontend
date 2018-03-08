import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable Component for handling search queries.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class Search extends Component {
    state = {
        q: ''
    }

    static propTypes = {
        handleSearch: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
    }
    
    static defaultProps = {
        placeholder: 'categories '
    }
    
    handleSearchInput = (event) => {
        event.preventDefault();
        this.props.handleSearch(this.state.q);
    }
    // implement search
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value},()=>{
            // search items after state has been updated
         this.props.handleSearch(this.state.q);
        });
    }

    render() {
        return (
            <div className="col-md-3">
                <form onSubmit={this.handleSearchInput}>
                    <div className="input-group">
                        <input
                            type="search"
                            value
                            ={this.state.q}
                            name="q"
                            className="form-control"
                            onChange={this.handleInputChange}
                            placeholder={`Search for ${this.props.placeholder}`}/>
                        <span className="input-group-btn">
                            <button className="btn btn-secondary pr-4" type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}
export default Search;
