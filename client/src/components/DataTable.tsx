import DataTable, { TableColumn } from "react-data-table-component";

function CustomDataTable({
  columns,
  data,
  isLoading,
  progressComponent,
  onRowClicked,
}: {
  columns: TableColumn<object>[];
  data: object[];
  isLoading: boolean;
  progressComponent: JSX.Element;
  onRowClicked?: (row: any) => void;
}) {
  return (
    <div className="table-row-clickable">
      <DataTable
        columns={columns}
        data={data}
        progressPending={isLoading}
        progressComponent={progressComponent}
        highlightOnHover
        striped
        responsive
        pagination
        onRowClicked={onRowClicked}
      />
    </div>
  );
}

export default CustomDataTable;
