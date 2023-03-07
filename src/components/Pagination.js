import React from 'react';
import ReactPaginate from 'react-paginate';


function Pagination(props) {

    return (
        <ReactPaginate
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item previous"
            previousLinkClassName="page-link previous-link"
            nextClassName="page-item next"
            nextLinkClassName="page-link next-link"
            marginPagesDisplayed={2}
            containerClassName="pagination"
            activeClassName="active"
            activeLinkClassName="active-link"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={props.pageChangeHandler}
            pageRangeDisplayed={5}
            pageCount={props.totalPages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;