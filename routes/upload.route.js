
// upload blog image
const blogUploadImg=(files)=>{
    let fileData=null;
    if (files === null || files === undefined || files === "") {
        return 0;
      } else {
        console.log("Request image.............", files.coverImge);
        const file = files.coverImge;
        const randomName = Date.now();
        let filename='';
         if (files.coverImge.mimetype == "image/png"){
           filename = "blog_img" + randomName + ".png";
         }
         if (files.coverImge.mimetype == "image/jpg"){
          filename = "blog_img" + randomName + ".jpg";
        }
        if (files.coverImge.mimetype == "image/jpeg"){
          filename = "blog_img" + randomName + ".jpeg";
        }
      
    
          file.mv(`${__dirname}/../public/uploads/blogs/${filename}`),
            (err) => {
              if (err) {
                console.error(err);
                return err;
              }
            };
            let pathDir=`uploads/blogs`;
            fileData={fileName:filename,pathName:pathDir}
       
      }
      return fileData;
}


module.exports={blogUploadImg}
