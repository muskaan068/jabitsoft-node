const express = require("express");
const fileupload = require("express-fileupload");
var fs = require('fs');
const { savePortfolioImages } = require("../services/portfolio.service");
const router = express();

router.post("/admin/portfolio/upload-images", async (req, res) => {
  const { body } = req;
  console.log("gggggggg",body)
  if (req.files === null || req.files === undefined || req.files === "") {
    return res.status(500).send({ ErrorMsg: "File No Found!" });
  } else {
    console.log("Request image.............", req.files.imageFiles);
    const file = req.files.imageFiles;
    const intpId = req.body.interpreterId;
    const randomName = Date.now();
    let filename='';
     if (req.files.imageFiles.mimetype == "image/png"){
       filename = "portfolio_img" + randomName + ".png";
     }
     if (req.files.imageFiles.mimetype == "image/jpg"){
      filename = "portfolio_img" + randomName + ".jpg";
    }
    if (req.files.imageFiles.mimetype == "image/jpeg"){
      filename = "portfolio_img" + randomName + ".jpeg";
    }
   

      await file.mv(`${__dirname}/../public/uploads/portfolio/${filename}`),
        (err) => {
          if (err) {
            console.error(err);
            return res.status(400).send(err);
          }
        };
        const baseUrl= "http://localhost:9000/"
        let pathDir=`uploads/portfolio`;
        const data={portfolioId:body && body.portfolioId,fileName:filename,pathName:pathDir,fullUrl:`${baseUrl}${pathDir}/${filename}`}
       await savePortfolioImages(data);
    return res.status(200).send("Success");
  }
});

module.exports = router;
