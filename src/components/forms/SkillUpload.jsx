import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import "./skillupload.css";

function SkillUpload({loading , setLoading , skills , setSkills  }) {

   

    const fileUploadAndResize = (e) => {
  let files = e.target.files;

  if (files) {
    setLoading(true);
    const uploadedImages = []; // Create an empty array to store uploaded images

    const uploadImage = (file) => {
      return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(`/api/cloudinary/uploadimages`, { image: uri })
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                const uploadedImage = res.data;
                uploadedImages.push(uploadedImage);
                resolve();
              })
              .catch((err) => {
                console.log("CLOUDINARY UPLOAD ERR", err);
                reject();
              });
          },
          "base64"
        );
      });
    };

    const uploadAllImages = async () => {
      try {
        for (let i = 0; i < files.length; i++) {
          await uploadImage(files[i]);
        }
        setSkills((prevSkills) => [...prevSkills, ...uploadedImages]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    uploadAllImages();
  }
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
       
        let filteredImages = skills.filter((item) => {
          return item.public_id !== public_id;
        });
        setSkills([...filteredImages]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="skill-upload-container">
      <div className="skill-upload-row">
        {skills.length > 0 &&
          skills.map((image) => (
            <div className="skill-upload-item" key={image.public_id}>
              <Badge
                count="X"
                onClick={() => handleImageRemove(image.public_id)}
                className="skill-upload-badge"
              >
                <Avatar src={image.url} size={100} shape="square" className="skill-upload-avatar" />
              </Badge>
            </div>
          ))}
      </div>
      <div className="skill-upload-row">
        <label className="skill-upload-label">
          Upload skills
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

export default SkillUpload