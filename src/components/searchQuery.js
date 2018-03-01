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
        this.props.handleSearch(this.state.q);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSearchInput} className ="form-group" role="search">
                    <div className="input-group add-on col-sm-3 pull-right">
                        <input
                            type="search"
                            value
                            ={this.state.q}
                            name="q"
                            className="form-control"
                            onChange={this.handleInputChange}
                            placeholder={`Search for ${this.props.placeholder}`}/>
                        <div className="input-group-btn">
                            <button className="btn btn-default" type="submit">
                                <i className="glyphicon glyphicon-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Search;
