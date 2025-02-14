const { pool } = require('../../config/database')
const { supabase } = require('../../config/supabase')

const uploadPicture = async(file) => {
  const fileName = `ads/${Date.now()}_${file.originalname}`
  const { data, error: uploadError } = await supabase.storage
    .from('ads')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    })

  if (uploadError) {
    console.error('Upload Error:', uploadError)
    return res.status(500).json({ error: 'Error uploading the image' })
  }

  const data_picture  = supabase.storage.from('ads').getPublicUrl(fileName)
  const publicUrl = data_picture.data.publicUrl
  return publicUrl
}

const createAdd = async(ad) => {
  const query = 'INSERT INTO ads(user_id, title, description, price, image_url, location, year) VALUES($1, $2, $3, $4, $5, $6, $7)'
  const values = [ ad.ownerID, ad.title, ad.description, ad.price, ad.imageURL, ad.location, ad.year ]
  const result =  await pool.query(query, values)
  return result.rows[0]
}

const reportedUser = async(reportInformations) => {
  const query = 'INSERT INTO reports(userid, reported_user_id, reason, details) VALUES($1, $2, $3, $4) RETURNING*'
  const values = [reportInformations.userId, reportInformations.reportedUserId, reportInformations.reason, reportInformations.details]
  const result = await pool.query(query, values)
  return result.rows[0]
}


const getAdsById = async(id) => {
  const query = 'SELECT * FROM ads WHERE user_id=$1'
  const values = [id]
  const result = await pool.query(query,values)
  return result.rows
}

const deleteAdById = async(id) => {
  const query = 'DELETE FROM ads WHERE id=$1 RETURNING*'
  const values = [id]
  const result = await pool.query(query,values)
  return result.rows[0]
}

const getAllBidsByUserId = async(id) => {
  const query = 'SELECT * FROM ads a JOIN bids b ON a.id = b.ad_id WHERE a.user_id=$1'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows
}

const acceptBid = async(adId) => {
  const query = 'UPDATE bids SET status = $1 WHERE ad_id= $2 RETURNING*'
  const values = ['accepted',  adId]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const rejectBid = async(adId) => {
  const query = 'UPDATE bids SET status = $1 WHERE ad_id= $2 RETURNING*'
  const values = ['rejected',  adId]
  const result = await pool.query(query, values)
  return result.rows[0]
}
 


module.exports = {
  uploadPicture,
  createAdd,
  reportedUser,
  getAdsById,
  deleteAdById,
  getAllBidsByUserId,
  acceptBid,
  rejectBid
}