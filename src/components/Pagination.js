import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Pagination component to be reused in other components where pagination is needed.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class Pagination extends Component {
    static propTypes = {
        totalPages: PropTypes.number,
        activePage: PropTypes.number,
        nextPage: PropTypes.number,
        previousPage: PropTypes.number,
        changePage: PropTypes.func.isRequired,
      };
    
    static defaultProps = {
    nextPage: null,
    previousPage: null,
    totalPages: null,
    activePage: null,
    };

    changePage = (event)=>{
        // preventing default link behaviour
        event.preventDefault();
        // do nothing if the selected page doesnot exist and is not a number
        if(Number.isNaN(Number(event.target.dataset.page))){
            return;
        }
        // call the change page function if selected page exists
        this.props.changePage((Number(event.target.dataset.page)));
    }

    render() {
        const {
        totalPages, activePage, nextPage, previousPage,
        } = this.props;

        //   generating the pages
        const pages = Array.from({ length: totalPages })
        .map((item, index) => (
            <li className={`page-item${(index + 1 === activePage) ? ' active' : ''}`} key={index} >
            <a className="page-link" href="!#" data-page={index+1} onClick={this.changePage}>
                {index + 1}
            </a>
            </li>
        ));

        return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
            <li className={`page-item${previousPage?"":' disabled'}`}>
            <a className="page-link" data-page={previousPage} onClick={this.changePage} href="!#">Previous</a>
            </li>
            {pages}
            <li className={`page-item${nextPage?"":' disabled'}`}>
            <a className="page-link" href="!#" data-page={nextPage} onClick={this.changePage}>Next</a>
            </li>
            </ul>
        </nav>);
    }
}


export default Pagination;
