import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPosts } from "../../actions/posts";

import Pagination from "@material-tailwind/react/Pagination";
import PaginationItem from "@material-tailwind/react/PaginationItem";
import Icon from "@material-tailwind/react/Icon";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      count={numberOfPages}
      page={Number(page) || 1}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
          color="lightBlue"
          href="#1"
          ripple="light"
        />
      )}
    />
  );
};

export default Paginate;

{
  /* <PaginationItem href="#last" ripple="dark">
<Icon name="keyboard_arrow_left" />
</PaginationItem>
<PaginationItem color="lightBlue" href="#1" ripple="light">
1
</PaginationItem>
<PaginationItem href="#2" ripple="dark">
2
</PaginationItem>
<PaginationItem href="#3" ripple="dark">
3
</PaginationItem>
<PaginationItem href="#4" ripple="dark">
4
</PaginationItem>
<PaginationItem href="#5" ripple="dark">
5
</PaginationItem>
<PaginationItem href="#last" ripple="dark">
<Icon name="keyboard_arrow_right" />
</PaginationItem>
</Pagination> */
}
