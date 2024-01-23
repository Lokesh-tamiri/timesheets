import React from "react";
import CreateProject from "./components/CreateProject";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
const Presentation = (props) => {
  const { columnDefs,rowData } = props;
  return (
    <div>
      <div className="flex justify-end">
        <CreateProject />
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
