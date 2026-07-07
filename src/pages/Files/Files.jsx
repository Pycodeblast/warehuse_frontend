import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";

import MainLayout from "../../layouts/MainLayout";
import { usePermissions } from "../../hooks/usePermissions";

import FileTable from "./FileTable";
import UploadFileDialog from "./FilesDialog";

import "./Files.css";

import {
  getProducts,
  downloadFile,
} from "./Files_service";


function Files() {

  const permission = usePermissions();


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [openUploadDialog, setOpenUploadDialog] = useState(false);


  // Store uploaded filename
  const [uploadedFile, setUploadedFile] = useState(null);


  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });



  const showSuccess = (message) => {

    setSnackbar({
      open: true,
      severity: "success",
      message,
    });

  };



  const showError = (message) => {

    setSnackbar({
      open: true,
      severity: "error",
      message,
    });

  };



  //---------------------------------------
  // Fetch Products
  //---------------------------------------

  const fetchProducts = async () => {

    try {

      setLoading(true);


      const data = await getProducts();


      setProducts(data);


    } catch(error){

      console.error(error);

      showError(
        "Failed to load products."
      );


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchProducts();

  }, []);




  //---------------------------------------
  // Search Filter
  //---------------------------------------

  const filteredProducts = useMemo(()=>{


    const keyword = search.toLowerCase();


    return products.filter((product)=>{


      return (

        product.name
        ?.toLowerCase()
        .includes(keyword)

        ||

        product.sku
        ?.toLowerCase()
        .includes(keyword)

      );


    });


  },[products,search]);





  //---------------------------------------
  // Download Uploaded Excel File
  //---------------------------------------

  const handleDownload = async () => {


    if(!uploadedFile){

      showError(
        "Please upload a file first."
      );

      return;

    }



    try {


      await downloadFile(
        uploadedFile
      );


      showSuccess(
        "File downloaded successfully."
      );


    } catch(error){


      console.error(error);


      showError(
        "Download failed."
      );


    }


  };





  return (

    <MainLayout>


      <Box className="files-page">


        {/* Header */}

        <Box className="files-header">


          <Box>


            <Typography variant="h4">

              Files

            </Typography>



            <Typography className="files-subtitle">

              Product Import / Export

            </Typography>


          </Box>




          <Box
            sx={{
              display:"flex",
              gap:2
            }}
          >



            {
              permission?.uploadFile && (

                <Button

                  variant="contained"

                  startIcon={
                    <UploadFileIcon/>
                  }

                  onClick={()=>
                    setOpenUploadDialog(true)
                  }

                >

                  Upload

                </Button>


              )
            }





            {
              permission?.uploadFile && (

                <Button

                  variant="contained"

                  color="success"

                  startIcon={
                    <DownloadIcon/>
                  }

                  onClick={handleDownload}

                >

                  Download

                </Button>


              )
            }



          </Box>


        </Box>





        {/* Search */}

        <Paper className="search-section">


          <TextField

            fullWidth

            placeholder="Search Product..."

            value={search}

            onChange={
              (e)=>
                setSearch(e.target.value)
            }


            InputProps={{

              startAdornment:
                <SearchIcon color="action"/>

            }}


          />


        </Paper>






        {/* Product Table */}


        <Paper className="table-section">


          <Typography sx={{mb:2}}>

            Total Products :
            {" "}
            {filteredProducts.length}


          </Typography>





          {
            loading ? (

              <Box

                sx={{
                  display:"flex",
                  justifyContent:"center",
                  py:5
                }}

              >

                <CircularProgress/>


              </Box>


            )

            :

            (

              <FileTable

                products={
                  filteredProducts
                }

              />

            )

          }



        </Paper>






        <UploadFileDialog


          open={
            openUploadDialog
          }


          onClose={()=>
            setOpenUploadDialog(false)
          }


          fetchProducts={
            fetchProducts
          }


          showSuccess={
            showSuccess
          }


          showError={
            showError
          }


          setUploadedFile={
            setUploadedFile
          }


        />





      </Box>






      <Snackbar

        open={
          snackbar.open
        }


        autoHideDuration={3000}


        onClose={()=>

          setSnackbar(prev=>({

            ...prev,

            open:false

          }))

        }


        anchorOrigin={{

          vertical:"top",

          horizontal:"right"

        }}

      >


        <Alert

          severity={
            snackbar.severity
          }


          variant="filled"

        >

          {
            snackbar.message
          }


        </Alert>


      </Snackbar>



    </MainLayout>

  );

}


export default Files;