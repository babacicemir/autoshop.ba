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
  const query = 'SELECT bids.id AS offer_id, users.id AS offer_user_id, users.email AS offer_email, ads.id AS ad_id, ads.title AS ad_title, ads.user_id AS owner_ad_id, ads.price AS ad_price, ads.location AS ad_location, ads.status AS ad_status, ads.created_at AS ad_created, ads.year AS ad_year, bids.id AS bid_id, bids.bid_price AS bid_price, bids.message AS bid_message, bids.created_at AS bid_created, bids.status AS bid_status FROM bids JOIN ads ON bids.ad_id = ads.id JOIN users ON bids.user_id = users.id WHERE ads.user_id=$1'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows
}

const acceptBid = async(adId) => {
  const query = 'UPDATE bids SET status = $1 WHERE id= $2 RETURNING*'
  const values = ['accepted',  adId]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const rejectBid = async(adId) => {
  const query = 'UPDATE bids SET status = $1 WHERE id= $2 RETURNING*'
  const values = ['rejected',  adId]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const changeAdStatus = async(id) => {
  const query = 'UPDATE ads SET status = $1 WHERE id=$2 RETURNING*'
  const values = ['sold', id]
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
  rejectBid,
  changeAdStatus
}