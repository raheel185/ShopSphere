# 🛍️ ShopSphere - Ecommerce Platform

ShopSphere is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) eCommerce platform with user authentication, product management, and a secure checkout system.

## 🚀 Features

- 🏪 Product catalog with categories & filters  
- 🛒 Shopping cart and checkout (Stripe integration)  
- 🔐 User authentication (JWT-based)  
- 📦 Order management & tracking  
- 🛠️ Admin dashboard for product & order management  
- ☁️ Image uploads with Cloudinary  

## 🏗️ Tech Stack

**Frontend:** React.js, Tailwind CSS, React Router  
**Backend:** Node.js, Express.js, MongoDB (Mongoose)  
**Authentication:** JWT, bcrypt.js  
**Payments:** Stripe API  
**Other Libraries:** Axios, Cloudinary, Nodemailer  

## 📦 Installation

1. **Clone the repo**  
   ```sh
   git clone https://github.com/your-username/shopsphere.git
   cd shopsphere
2. npm install
cd client
npm install


3. MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


4. # Run backend
npm run server  

# Run frontend
cd client  
npm start  

