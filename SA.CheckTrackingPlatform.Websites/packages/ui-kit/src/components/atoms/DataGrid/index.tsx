import { memo, FC } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface Props {
  rows: GridRowsProp;
  columns: GridColDef[];
}

const BasicTableComponent: FC<Props> = ({ rows, columns }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default memo(BasicTableComponent);
