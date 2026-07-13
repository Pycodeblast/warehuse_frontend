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
  Button,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

function FileTable({ files, onDownload }) {
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
              <TableCell>File Name</TableCell>

              <TableCell>Uploaded By</TableCell>

              <TableCell>Storage</TableCell>

              <TableCell>Uploaded At</TableCell>

              <TableCell align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {files
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((file) => (
                <TableRow key={file.id} hover>
                  <TableCell>
                    {file.original_name}
                  </TableCell>

                  <TableCell>
                    {file.uploaded_by}
                  </TableCell>

                  <TableCell>
                    {file.storage_type}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      file.uploaded_at
                    ).toLocaleString()}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<DownloadIcon />}
                      onClick={() => onDownload(file.id)}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

            {files.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No Uploaded Files Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={files.length}
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