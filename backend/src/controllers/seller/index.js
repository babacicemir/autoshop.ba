const sellerRepository = require("../../repositories/seller");


const createAdd = async (req, res) => {
  const { title, description, price, year, location, ownerID } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "Image is required" });
  }


  try {
    const publicUrl = await sellerRepository.uploadPicture(file)

    const ad = {
      ownerID,
      title,
      description,
      price,
      year,
      location,
      imageURL: publicUrl,
    };

    const createdAd = await sellerRepository.createAdd(ad);

    return res.status(200).json({ message: 'Ad created successfully!', ad: createdAd });
  } catch (error) {
    console.error("Error details:", error);
    return res.status(400).json({ error: error.message || "An error occurred" });
  }
};

module.exports = { createAdd };

