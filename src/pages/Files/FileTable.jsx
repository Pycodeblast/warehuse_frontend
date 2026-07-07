import { useState } from "react";

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";

function FileTable({ products }) {

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Product Name
              </TableCell>

              <TableCell>
                SKU
              </TableCell>

              <TableCell align="center">
                Quantity
              </TableCell>

              <TableCell align="right">
                Price
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {products
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((product) => (

                <TableRow key={product.id} hover>

                  <TableCell>
                    {product.name}
                  </TableCell>

                  <TableCell>
                    {product.sku}
                  </TableCell>

                  <TableCell align="center">
                    {product.quantity}
                  </TableCell>

                  <TableCell align="right">
                    ₹{product.price}
                  </TableCell>

                </TableRow>

              ))}

            {products.length === 0 && (

              <TableRow>

                <TableCell
                  colSpan={4}
                  align="center"
                >
                  No Products Found
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </TableContainer>

      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

    </Paper>
  );
}

export default FileTable;