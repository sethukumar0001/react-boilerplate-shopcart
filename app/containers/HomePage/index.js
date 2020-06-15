/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import { cartArraySelector } from './selectors'
import reducer from './reducer';
import saga from './saga';
import { addToCart } from "./actions";

const key = 'home';

export function HomePage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.addToCart({ itemName, itemPrice })
  }
  console.log(props.cartArray)
  return (
    <div className="homediv">
      <form className="formdiv" onSubmit={handleSubmit}>
        <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} />
        <input type="number" value={itemPrice} onChange={e => setItemPrice(e.target.value)} />
        <input type="submit" value="submit" />
      </form>
      <div>
        {props.cartArray && props.cartArray.map((item) => {
          return (
            <li>{item.itemName}</li>
          )
        })}
      </div>
    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.object,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  cartArray: cartArraySelector(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
