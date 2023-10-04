import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import "./fileupload.css"

function FileUpload({  profile, setProfile, setLoading , loading }) {

  
const { portfolioData } = useSelector((state) => state.root);
const intialAvatar = portfolioData.about.avatar
  const fileUploadAndResize = (e) => {
    
    let files = e.target.files[0]; 
    let allUploadedFiles = profile;

    if (files) {
      setLoading(true);
      
        Resizer.imageFileResizer(
          files,
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            
            axios
              .post(
                `/api/cloudinary/uploadimages`,
                { image: uri },
                
              )
              .then((res) => {
                
                
                
                
                
                setProfile(res.data);
                setLoading(false);
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
     
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };
  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    axios
      .post(
        `/api/cloudinary/removeimage`,
        { public_id },
       
      )
      .then((res) => {
        setLoading(false);
       
        
        setProfile(intialAvatar);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
      <div className="file-upload-container">
      <div className="file-upload-row">
        {loading && <h1>Loading</h1>}
        {profile?.url && !loading ? (
          <div className="image-preview">
            <div
              className="remove-button bg-red-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={() => handleImageRemove(profile.public_id)}
            >
              X
            </div>
            <img src={profile.url} alt="Profile" className="image" />
          </div>
        ) : (<div className="image-preview">
            {/* <div
              className="remove-button bg-red-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={() => handleImageRemove(profile.public_id)}
            >
              X
            </div> */}
            <img src={profile} alt="Profile" className="image" />
          </div>)}
        
      </div>
      <div className="file-upload-row">
        <label className="file-upload-label bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Upload Avatar
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </div>
  )
}

export default FileUpload