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

## Project Structure

```
AUTOSHOP.BA/
│
├── backend/                             # Backend Node.js application
│   ├── node_modules/                    # Backend dependencies
│   ├── src/                             # Main backend source code
│   │
│   │   ├── config/                      # Configuration files for services and database
│   │   │   ├── database.js              # PostgreSQL database connection
│   │   │   └── supabase.js              # Supabase storage configuration
│   │   │
│   │   ├── controllers/                 # Business logic and request handlers
│   │   │   ├── admin/
│   │   │   │   └── index.js             # Admin features (user management, reports, ads control)
│   │   │   ├── buyer/
│   │   │   │   └── index.js             # Buyer features (offers, saved ads, inquiries)
│   │   │   ├── seller/
│   │   │   │   └── index.js             # Seller features (ads management, offers handling)
│   │   │   └── index.js                 # Authentication logic (login & signup)
│   │   │
│   │   ├── middlewares/                 # Authentication, authorization and validation middlewares
│   │   │   └── index.js
│   │   │
│   │   ├── repositories/                # Database query layer
│   │   │   ├── admin/                   # Admin database queries
│   │   │   ├── buyer/                   # Buyer database queries
│   │   │   ├── seller/                  # Seller database queries
│   │   │   └── index.js                 # Authentication related queries
│   │   │
│   │   ├── routes/                      # API route definitions
│   │   │   ├── admin/                   # Admin endpoints
│   │   │   ├── buyer/                   # Buyer endpoints
│   │   │   ├── seller/                  # Seller endpoints
│   │   │   ├── users/                   # Authentication endpoints
│   │   │   └── index.js                 # Main router entry point
│   │   │
│   │   ├── utils/                       # Shared helper functions
│   │   │   └── index.js
│   │   │
│   │   └── app.js                       # Express app initialization and configuration
│   │
│   ├── .env                             # Environment variables
│   ├── .gitignore                       # Git ignore rules
│   ├── eslint.config.mjs                # ESLint configuration
│   ├── package.json                     # Backend dependencies and scripts
│   └── package-lock.json
│
├── frontend/                            # EJS frontend templates
│   ├── admin_ads.ejs                    # Admin advertisements overview page
│   ├── admin_homepage.ejs               # Admin dashboard
│   ├── admin_reports.ejs                # Admin reports management page
│   ├── admin_users.ejs                  # Admin user management page
│   │
│   ├── buyer_all_ads_without_loging.ejs # Public ads browsing page
│   ├── buyer_homepage.ejs               # Buyer dashboard
│   ├── buyer_saved.ejs                  # Buyer saved advertisements
│   ├── buyer_view_ad.ejs                # Buyer advertisement details page
│   ├── buyer_welcome_page.ejs           # Buyer welcome page
│   │
│   ├── seller_create_ad.ejs             # Seller advertisement creation page
│   ├── seller_homepage.ejs              # Seller dashboard
│   ├── seller_my_adds.ejs               # Seller advertisements management page
│   ├── seller_offers.ejs                # Seller offers management page
│   │
│   ├── homepage.ejs                     # Landing page
│   ├── login.ejs                        # Login page
│   ├── signup.ejs                       # Registration page
│   │
│   ├── node_modules/                    # Frontend dependencies
│   ├── package.json                     # Frontend dependencies configuration
│   └── package-lock.json
│
└── README.md
```


## API Endpoints



###  Users (Authentication & Public Routes)

| Method | Endpoint | Description |
|----------|-------------|----------------|
| POST | /users/signup | Registers a new user account |
| POST | /users/login | Authenticates user and returns JWT token |
| GET | / | Loads application landing page |
| GET | /login | Loads login page |
| GET | /signup | Loads registration page |
| GET | /logout | Logs out current user session |

---

###  Administrator Endpoints

| Method | Endpoint | Description |
|----------|-------------|----------------|
| PUT | /admin/block/:id | Blocks user account |
| PUT | /admin/unblock/:id | Unblocks user account |
| POST | /admin/create | Creates new user account |
| DELETE | /admin/delete/:id | Deletes user account |
| GET | /admin/reports | Retrieves all user reports |
| GET | /admin/ads | Retrieves all advertisements |
| DELETE | /admin/ads/delete/:id | Deletes specific advertisement |
| PUT | /admin/report/block/:userId/:reportId | Resolves report and optionally blocks user |
| GET | /admin/homepage | Loads admin dashboard page |
| GET | /admin/users | Retrieves all system users |

---

###  Buyer Endpoints

| Method | Endpoint | Description |
|----------|-------------|----------------|
| GET | /buyer/welcome | Loads buyer welcome page |
| GET | /buyer/homepage | Displays advertisements homepage |
| GET | /buyer/ad/:id | Retrieves advertisement details |
| GET | /buyer/ads | Retrieves all advertisements (public access) |
| POST | /buyer/user/report/:id | Reports seller user |
| POST | /buyer/ad/save/:id | Saves advertisement to favorites |
| DELETE | /buyer/ad/saved/delete/:id | Removes saved advertisement |
| GET | /buyer/ads/saved | Retrieves saved advertisements |
| POST | /buyer/ad/bid/:id | Sends offer/bid for advertisement |

---

### Seller Endpoints

| Method | Endpoint | Description |
|----------|-------------|----------------|
| POST | /seller/ad/create | Creates new advertisement with image upload |
| POST | /seller/user/report/:id | Reports buyer user |
| GET | /seller/myads | Retrieves seller advertisements |
| DELETE | /seller/ad/delete/:id | Deletes seller advertisement |
| GET | /seller/bids | Retrieves all bids for seller advertisements |
| PUT | /seller/bid/accept/:id/:adId | Accepts buyer bid |
| PUT | /seller/bid/reject/:id | Rejects buyer bid |
| GET | /seller/homepage | Loads seller dashboard page |
| GET | /seller/create/ad | Loads advertisement creation page |


## Installation

1. Clone the repository:
   git clone <repo-url>
2. Install dependencies:
   npm install
3. Create a .env file and add:
   - PORT=3001
   - DATABASE_URL=postgres://<username>:<password>@localhost:5432/autoshop
   - TOKEN_CODE=<jwt-secret>
   - SUPABASE_URL=<your-supabase-url>
   - SUPABASE_KEY=<your-supabase-key>
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

## Licence

This project was developed as part of a final thesis and can be used and modified according to the user's needs.


