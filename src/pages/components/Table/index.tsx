import React, {CSSProperties} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface IProps {
    data: any[];
    columns: GridColDef[];
    pageSize?: number;
    checkboxSelection?: boolean;
    style?: CSSProperties;
    isLoading?: boolean
}

export default function Table(props: IProps) {
    const { data, columns, checkboxSelection, isLoading} = props;
    const pageSize = props.pageSize || 20
    const style = props.style || { height: 'calc(100vh - 220px)', width: '100%' }
  return (
    <div style={style}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        checkboxSelection={checkboxSelection}
        loading={isLoading}
      />
    </div>
  );
}
