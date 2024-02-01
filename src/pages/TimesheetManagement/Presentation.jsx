import React from "react";
import CreateTimesheet from "./components/CreateTimesheet";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
const Presentation = (props) => {
  const { INITIAL_VALUES, VALIDATION_SCHEMA, rowData, columnDefs, fetchData } =
    props;
  return (
    <div>
      <div className="flex justify-end">
        <CreateTimesheet
          INITIAL_VALUES={INITIAL_VALUES}
          VALIDATION_SCHEMA={VALIDATION_SCHEMA}
          fetchData={fetchData}
        />
      </div>
      <div
        className="ag-theme-material"
        style={{
          height: "70vh",
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          animateRows={true}
          // autoSizePadding={true}
          // rowSelection="single"
          // onRowClicked={handleClick}
          // defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default Presentation;
