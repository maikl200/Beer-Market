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

const styledTableCellProps = [
  {title: 'Item'},
  {title: 'Title'},
  {title: 'Category'},
  {title: 'Volume'},
]

export default function CustomizedTablesMarket({dragStartHandler, dragLeaveHandler, data}: any) {
  const {market} = useTypedSelector(state => state.products)
  const {productMarket} = useAction()

  console.log('data',data?.length)
  console.log('===>market', market?.length)

  // useEffect(() => {
  //   const localProductMarker = JSON.parse(localStorage.getItem('product')!)
  //   if (!localProductMarker?.length) {
  //     localStorage.setItem('product', JSON.stringify(data))
  //   }
  //   productMarket(localProductMarker)
  // }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {styledTableCellProps?.map((style) => (
              <StyledTableCell>{style.title}</StyledTableCell>
            ))}
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
              <StyledTableCell component="th" scope="row" draggable={false}>
                {product.title}
              </StyledTableCell>
              <StyledTableCell draggable={false}>{product.category}</StyledTableCell>
              <StyledTableCell draggable={false}>{product.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}