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
import {useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";


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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return {name, calories, fat, carbs, protein};
}

export default function CustomizedTablesMarket({dragStartHandler, dragLeaveHandler}: any) {
  const {data} = useGetBeersQuery('products')
  const {market} = useTypedSelector(state => state.products)
  const [product, setProduct] = useState<ProductType[]>()

  useEffect(() => {
    if (data) {
      const products = JSON.parse(localStorage.getItem('product')!)
      setProduct(products)
      if (products?.length > 1) return
      localStorage.setItem('product', JSON.stringify(data))
    }
  }, [])

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
          {product?.map((product: ProductType) => (
            <StyledTableRow
              onDragStart={(e) => dragStartHandler(e, product)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              className={'beers'}
              draggable={true}
              key={product.id}>
              <StyledTableCell>
                <img src={product.image} alt='itemImg'/>
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