# Job Portal

A full-stack job portal application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication (Student/Recruiter)
- Company registration and management
- Job posting and application
- Profile management
- Email notifications
- File uploads (Resume, Profile Photo)
- Responsive design

## Tech Stack

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Nodemailer
- Cloudinary
- Multer

## Prerequisites

- Node.js (>= 18.0.0)
- MongoDB
- npm or yarn

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api/v1
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/job-portal.git
cd job-portal
```

2. Install dependencies:
```bash
npm run install-all
```

3. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Add the required environment variables

4. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run install-all`: Install dependencies for all packages
- `npm run dev`: Start development servers
- `npm run build`: Build for production
- `npm start`: Start production servers

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 