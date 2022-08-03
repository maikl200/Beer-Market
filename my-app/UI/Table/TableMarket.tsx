import * as React from 'react';
import Image from 'next/image'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {useTypedSelector} from "../../hooks/useTypedSelector";

import {ProductType} from "../../redux/product/ProductType";

import {styled} from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  maxWidth: 70,
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const tableTitle = [
  {id: 1, title: 'Item'},
  {id: 2, title: 'Title'},
  {id: 3, title: 'Category'},
  {id: 4, title: 'Volume'},
]

interface TableMarketProps {
  dragStartHandler: (product: ProductType) => void
}

export default function CustomizedTablesMarket({dragStartHandler}: TableMarketProps) {
  const {market} = useTypedSelector(state => state.products)

  return (
    <div
      style={{height: 660, border: "1px solid black", borderRadius: '6px'}}>
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
            {market?.map((product: ProductType) => (
              <StyledTableRow
                onDragStart={() => dragStartHandler(product)}
                draggable={true}
                key={product.id}>
                <StyledTableCell>
                  <Image
                    draggable={false}
                    width={30}
                    height={40}
                    src={product.image}
                    alt='itemImg'
                  />
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
    </div>
  );
}