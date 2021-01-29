/* eslint-disable import/prefer-default-export */
import { ROW_LAYOUT_OH, COL_LAYOUT_OH, MODAL_INSET_PX, MODAL_DIV_MARG_REM, remToPx } from './constants';

export const calcModalSize = (optimalImgDim = { w: 0, h: 0 }, rowLayoutOptimal = true) => {
  let w = 0;
  let h = 0;
  if (rowLayoutOptimal) {
    w += optimalImgDim.w + ROW_LAYOUT_OH.w - (MODAL_INSET_PX);
    h += optimalImgDim.h + ROW_LAYOUT_OH.h - remToPx(MODAL_DIV_MARG_REM);
  }
  else {
    w += optimalImgDim.w + COL_LAYOUT_OH.w - (MODAL_INSET_PX);
    h += optimalImgDim.h + COL_LAYOUT_OH.h - (MODAL_INSET_PX);
  }
  // console.log('🚀 CALCULATED MODAL SIZE { w, h }', { w, h });
  return { w, h };
};
