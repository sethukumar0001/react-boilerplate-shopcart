/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const cartArraySelector = () =>
  createSelector(
    selectHome,
    state => state.cartArray,
  );


export {
  selectHome,
  cartArraySelector
 };
