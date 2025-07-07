import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, keyword = '', isAdmin = false }) => {
  if (pages <= 1) return null;


  return (
    <Pagination>
      {[...Array(pages).keys()].map(x => {
        const pageNumber = x + 1;
        const link = !isAdmin
          ? keyword
            ? `/?keyword=${keyword}&page=${pageNumber}`
            : `/?page=${pageNumber}`
          : keyword
            ? `/admin/productlist/?keyword=${keyword}&page=${pageNumber}`
            : `/admin/productlist/?page=${pageNumber}`;
        return (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === page}
            as={Link}
            to={link}
          >
            {pageNumber}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
};

export default Paginate;