import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useTypedSelector} from "../../hooks/useTypedSelector";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  'img': {
    width: '10%'
  },
}));

const tableTitle = [
  {id: 1, title: 'Item'},
  {id: 2, title: 'Title'},
  {id: 3, title: 'Category'},
  {id: 4, title: 'Volume'},
]


export default function CustomizedTablesSalesHistory() {
  const {saleProduct} = useTypedSelector(state => state.products)
  console.log('aaa', saleProduct)
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableTitle?.map((title) => (
              <React.Fragment key={title.id}>
                <StyledTableCell>{title.title}</StyledTableCell>
              </React.Fragment>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {saleProduct?.map((product) => (
            <StyledTableRow key={product.id}>
              <img draggable={false} src={product.image} alt='itemImg'/>
              <StyledTableCell>
                {product.title}
              </StyledTableCell>
              <StyledTableCell>{product.category}</StyledTableCell>
              <StyledTableCell>{product.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}