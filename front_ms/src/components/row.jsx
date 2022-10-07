import Cell from "./cell";
import React from "react";

const Row = ({ updateTextAtRow, rowData }) => {
  return (
    <div id="row" className="flex justify-between mb-1">
      {rowData.values.map((val, i) => (
        <Cell
          updateText={(newText) => updateTextAtRow(newText, i)}
          isCorrect={rowData.rightValuesIndexes.includes(i)}
          isLocked={rowData.isLocked}
          isMisplaced={rowData.misplacedValuesIndexes.includes(i)}
        ></Cell>
      ))}
    </div>
  );
};

export default Row;
