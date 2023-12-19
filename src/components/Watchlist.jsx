import axios from 'axios'
import React from 'react'

const Watchlist = () => {
    const handleDownload = async ()=>{
        console.log("download called")
        await axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/pdf/generateWatchListPdf`,{},
        {
            headers : {Authorization: sessionStorage.getItem('token')}
        })
        .then(response => {
            // Check if the response is successful (status code 200)
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the response as a blob (binary data)
            return response.blob();
          })
          .then(blob => {
            // Create a download link for the blob
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'example.pdf';
            document.body.appendChild(a);
            a.click();
            // Remove the temporary link
            document.body.removeChild(a);
          })
        .catch((error)=>{
            console.log('error downloading watchlist',error)
        })
    }
  return (
    <div className='d-flex align-items-center justify-content-center min-vh-100'>watchlist
        <h1 className=''>download</h1>
        <div className="mb-3 d-grid gap-2">
              <button type="button" onClick={()=>handleDownload()} className="btn btn-outline-light">
                download
              </button>
            </div>
    </div>
  )
}

export default Watchlist