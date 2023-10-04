import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

function FileUpload({  profile, setProfile, setLoading  }) {

  

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
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles(res.data);
                
                
                setProfile(allUploadedFiles);
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
        const { images } = values;
        let filteredImages = profile.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues(filteredImages);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
    <div className="row">
        {profile &&
         
            <Badge
              count="X"
              key={profile.public_id}
              onClick={() => handleImageRemove(profile.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={profile.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
         }
      </div>
    <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  )
}

export default FileUpload