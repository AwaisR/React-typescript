import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Column } from '../../types/table';
import { Checkbox } from '@mui/material';

interface THeadPropsInterface {
  columns: Column[];
  isComparing: boolean;
}

export default function THead({ columns, isComparing }: THeadPropsInterface) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column: any) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{
              minWidth: column.minWidth,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {
              isComparing &&
              <Checkbox
                color="primary"
                disabled
              />
            }
            {column.label}
          </TableCell>
        ))}
        {/* Actions */}
        <TableCell
          key='actions'
          align='right'
        >
        </TableCell>

      </TableRow>
    </TableHead>
  )
}
