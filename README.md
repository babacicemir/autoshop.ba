# Autoshop.ba

**Autoshop.ba** is a web application for buying and selling cars that allows users to create advertisements, send offers, track listings, and communicate with sellers. The application supports three types of users: administrator, seller, and buyer, each with specific functionalities and access permissions.

## Features

### Administrator
Administrators can:
- Create, delete, and manage users (sellers and buyers)
- Block and unblock users
- Delete advertisements
- Review and resolve user reports

### Seller
Sellers can:
- Register and manage their profile
- Create and manage multiple advertisements with full car details
- Review all offers for their advertisements and accept or reject them
- Report users and respond to buyer inquiries
- Delete their advertisements

### Buyer
Buyers can:
- Register a profile or browse advertisements as guest users
- Track and save advertisements of interest
- Send offers and inquiries to sellers
- Report sellers

## Technologies

- **Backend:** Node.js, Express  
- **Frontend:** EJS templating  
- **Database:** PostgreSQL  
- **Image Upload:** Supabase  
- **Security:** bcrypt for password hashing

## Installation

1. Clone the repository:
   git clone <repo-url>
2. Install dependencies:
   npm install
3. Create a .env file and add:
   PORT=3001
   DATABASE_URL=postgres://<username>:<password>@localhost:5432/autoshop
   TOKEN_CODE=<jwt-secret>
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_KEY=<your-supabase-key>
4. Start the server:
   npm start
5. Open the application:
   http://localhost:3001/autoshop.ba

## Application Usage:
  
  - Register as a buyer or seller to access all features.
  - Administrators are added directly through the database.
  - Sellers can create advertisements, manage offers, and handle reports.
  - Buyers can browse, save advertisements, and send offers.
  - Administrators can block users, delete or manage advertisements, and resolve reports.

## Author

Emir Babačić
Faculty of Science - University of Sarajevo

## Licence

Ovaj projekat je razvijen u svrhu završnog rada i može se koristiti i modificirati prema potrebama korisnika.
