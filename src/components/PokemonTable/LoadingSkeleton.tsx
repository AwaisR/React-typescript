import { Skeleton } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

interface LoadingSkeletonInterface {
  rowsPerPage: number;
};

export default function LoadingSkeleton({ rowsPerPage }: LoadingSkeletonInterface) {
  return (
    <>
      {
        Array(rowsPerPage).fill(null).map((item, index) => {
          return <TableRow hover role="checkbox" tabIndex={-1} key={index}>
            <TableCell>
              <Skeleton width='50%' variant="text" sx={{ fontSize: '1rem' }} />
            </TableCell>
            <TableCell>
              <Skeleton width='30%' variant="text" sx={{ float: 'right', fontSize: '1rem' }} />
            </TableCell>
          </TableRow>
        })
      }
    </>
  )
}
