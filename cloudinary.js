import { v2 as cloudinary } from "cloudinary";
import fs from "fs";



cloudinary.config({ 
  cloud_name: 'dhtkpfgii', 
        api_key: '227867162376832', 
        api_secret: 'FDgefgowPX_af8rgb3lhT-mfuDs',
        timeout: 60000
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("Local file path not provided!");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // cleanup local file
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);  // 👈 actual error print
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw error; // 👈 return null mat karo, actual error throw karo
  }
};

export { uploadOnCloudinary }; 