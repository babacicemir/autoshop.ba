const { pool } = require('../../config/database')
const { supabase } = require("../../config/supabase");

const uploadPicture = async(file) => {
    const fileName = `ads/${Date.now()}_${file.originalname}`;
    const { data, error: uploadError } = await supabase.storage
      .from('ads')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      console.error("Upload Error:", uploadError);
      return res.status(500).json({ error: 'Error uploading the image' });
    }

    const data_picture  = supabase.storage.from('ads').getPublicUrl(fileName);
    const publicUrl = data_picture.data.publicUrl
    return publicUrl
}

const createAdd = async(ad) => {
    const query = "INSERT INTO ads(user_id, title, description, price, image_url, location, year) VALUES($1, $2, $3, $4, $5, $6, $7)"
    const values = [ ad.ownerID, ad.title, ad.description, ad.price, ad.imageURL, ad.location, ad.year ]
    const result =  await pool.query(query, values)
    return result.rows[0]
}



module.exports = {
    uploadPicture,
    createAdd,
}