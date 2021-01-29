/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';
import { ROW_LAYOUT_OH, COL_LAYOUT_OH } from '../other/constants';

/*
  useOptimizeLayout
  Works with a viewport size and two items (one w fixed dimensions and one with adjustable dimensions but a fixed ratio). Calculates optimal orientation of the two items (ie row or column layout), plus the optimal dimensions for the adjustable item

  Return Values
  optimalVars - js object containing two properties
    imgDims: {x: number, y: number} – optimal dimensions for adjustable item
    isRowLayout: bool – optimal orientation for adjustable and fixed item
      (true if row layout optimal, false if column layout is optimal)

  fixedLayoutParams – js object containing two properties
    id: number - any # associated with this layout (can be used to trigger behaviors elsewhere)
    adjAR: number – aspect ratio (width / height) for adjustable item

  setFixedLayoutParams - setter for above params
*/

function calcOptimalVars(winSize, adjAR) {
  const colViewAvail = { w: winSize.w - COL_LAYOUT_OH.w, h: winSize.h - COL_LAYOUT_OH.h };
  const rowViewAvail = { w: winSize.w - ROW_LAYOUT_OH.w, h: winSize.h - ROW_LAYOUT_OH.h };

  const options = {
    colOption1: { w: colViewAvail.w, h: colViewAvail.w / adjAR },
    colOption2: { w: colViewAvail.h * adjAR, h: colViewAvail.h },
    rowOption1: { w: rowViewAvail.w, h: rowViewAvail.w / adjAR },
    rowOption2: { w: rowViewAvail.h * adjAR, h: rowViewAvail.h },
  };

  let bestOption = 'rowOption1';
  let bestArea = -Infinity;
  let isRowBest = false;

  if (options.colOption1.w <= colViewAvail.w && options.colOption1.h <= colViewAvail.h) {
    const curArea = options.colOption1.w * options.colOption1.h;
    if (curArea >= bestArea) {
      bestOption = 'colOption1';
      bestArea = curArea;
    }
  }
  if (options.colOption2.w <= colViewAvail.w && options.colOption2.h <= colViewAvail.h) {
    const curArea = options.colOption2.w * options.colOption2.h;
    if (curArea >= bestArea) {
      bestOption = 'colOption2';
      bestArea = curArea;
    }
  }
  if (options.rowOption1.w <= rowViewAvail.w && options.rowOption1.h <= rowViewAvail.h) {
    const curArea = options.rowOption1.w * options.rowOption1.h;
    if (curArea >= bestArea) {
      bestOption = 'rowOption1';
      bestArea = curArea;
      isRowBest = true;
    }
  }
  if (options.rowOption2.w <= rowViewAvail.w && options.rowOption2.h <= rowViewAvail.h) {
    const curArea = options.rowOption2.w * options.rowOption2.h;
    if (curArea >= bestArea) {
      bestOption = 'rowOption2';
      bestArea = curArea;
      isRowBest = true;
    }
  }

  const result = {
    imgDims: { w: options[bestOption].w, h: options[bestOption].h },
    isRowLayout: isRowBest,
  };
  return result;
}

function useOptimizeLayout() {
  const winSize = useWindowSize();
  const [fixedLayoutParams, setFixedLayoutParams] = useState({
    id: -1,
    adjAR: 1,
  });
  const [optimalVars, setOptimalVars] = useState({
    imgDims: { w: 100, h: 100 },
    isRowLayout: true,
  });

  useEffect(() => {
    // console.log('UPDATING OPTIMAL VARS:', winSize, fixedLayoutParams);
    setOptimalVars(calcOptimalVars(winSize, fixedLayoutParams.adjAR));
  }, [winSize, fixedLayoutParams]);

  return [optimalVars, fixedLayoutParams, setFixedLayoutParams];
}

export default useOptimizeLayout;
