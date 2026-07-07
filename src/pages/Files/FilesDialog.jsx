import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { uploadFile } from "./Files_service";


function UploadFileDialog({

  open,

  onClose,

  fetchProducts,

  showSuccess,

  showError,

  setUploadedFile,

}) {


  const [selectedFile, setSelectedFile] = useState(null);


  const [uploading, setUploading] = useState(false);




  const handleFileChange = (e) => {


    if(e.target.files.length > 0){

      setSelectedFile(
        e.target.files[0]
      );

    }


  };





  const handleUpload = async () => {


    if(!selectedFile){

      showError(
        "Please select a file."
      );

      return;

    }



    try{


      setUploading(true);



      // Upload file
      const response = await uploadFile(
        selectedFile
      );



      // Save uploaded filename
      setUploadedFile(
        response.filename
      );



      showSuccess(
        "Products imported successfully."
      );



      setSelectedFile(null);



      // Refresh inventory table
      fetchProducts();



      onClose();



    }catch(error){


      console.error(error);


      showError(
        "Upload failed."
      );



    }finally{


      setUploading(false);


    }


  };





  return (

    <Dialog

      open={open}

      onClose={onClose}

      fullWidth

      maxWidth="sm"

    >



      <DialogTitle>

        Upload Product Excel

      </DialogTitle>





      <DialogContent>


        <Typography sx={{mb:2}}>


          Supported formats:

          <br/>

          • .xlsx

          <br/>

          • .xls

          <br/>

          • .csv


        </Typography>





        <Button


          component="label"


          variant="outlined"


          startIcon={
            <CloudUploadIcon/>
          }


        >


          Choose File




          <input


            hidden


            type="file"


            accept=".xlsx,.xls,.csv"


            onChange={
              handleFileChange
            }


          />



        </Button>






        {
          selectedFile && (


            <Typography sx={{mt:2}}>


              Selected:

              {" "}

              {selectedFile.name}


            </Typography>


          )
        }



      </DialogContent>







      <DialogActions>



        <Button

          onClick={onClose}

        >

          Cancel

        </Button>






        <Button


          variant="contained"


          onClick={handleUpload}


          disabled={uploading}


        >


          {
            uploading
            ?
            "Uploading..."
            :
            "Upload"
          }



        </Button>





      </DialogActions>





    </Dialog>


  );

}


export default UploadFileDialog;