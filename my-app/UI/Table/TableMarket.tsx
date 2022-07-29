import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useGetBeersQuery} from "../../redux/beer/beersApi";
import {ProductType} from "../../redux/beer/ProductType";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import {useEffect} from "react";


const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  maxWidth: 70,
  'img': {
    width: '30%'
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTablesMarket({dragStartHandler, dragLeaveHandler, data}: any) {
  const {productMarket} = useAction()
  const {market} = useTypedSelector(state => state.products)

  useEffect(() => {
    try {
      if (!market) {
        localStorage.setItem('product', JSON.stringify(data))
      }
      const products = JSON.parse(localStorage.getItem('product')!)
      productMarket(products)
    } catch (e) {
      console.error(e)
    }
  }, [data])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Item</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="right">Volume</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((product: ProductType) => (
            <StyledTableRow
              onDragStart={(e) => dragStartHandler(e, product)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              className={'beers'}
              draggable={true}
              key={product.id}>
              <StyledTableCell>
                <img draggable={false} src={product.image} alt='itemImg'/>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {product.title}
              </StyledTableCell>
              <StyledTableCell align="right">{product.category}</StyledTableCell>
              <StyledTableCell align="right">{product.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}