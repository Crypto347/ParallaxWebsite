import { createSelector } from 'reselect';

const getPaperclips = (state) => state.business.paperClips;

export const getPaperclipsState = createSelector(
    [getPaperclips],
    (paperClips) => paperClips
);

const getClipsPerSec = (state) => state.business.clipsPerSec;

export const getClipsPerSecState = createSelector(
    [getClipsPerSec],
    (x) => x
);

const getFunds = (state) => state.business.funds;

export const getFundsState = createSelector(
    [getFunds],
    (x) => x
);

const getPaperclipPrice = (state) => state.business.paperclipPrice;

export const getPaperclipPriceState = createSelector(
    [getPaperclipPrice],
    (x) => x
);

const getUnsoldInventory = (state) => state.business.unsoldInventory;

export const getUnsoldInventoryState = createSelector(
    [getUnsoldInventory],
    (x) => x
);

// state.business.unsoldInventory

/**
* Selectors
*/

// import * as Selectors from '../../../../reducers/selectors';