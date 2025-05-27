# Job Portal Backend

This is the backend API for the Job Portal application, built with Node.js, Express.js, and MongoDB.

## Directory Structure

```
backend/
├── controllers/     # Business logic and request handlers
├── middleware/      # Custom middleware functions
├── models/         # MongoDB schemas and models
├── routes/         # API route definitions
├── utils/          # Utility functions and configurations
├── index.js        # Main application file
└── package.json    # Project dependencies and scripts
```

## API Endpoints

### Authentication Routes (`/api/v1/user`)
- `POST /register` - Register a new user (Student/Recruiter)
- `POST /login` - User login
- `GET /logout` - User logout
- `PUT /update-profile` - Update user profile

### Company Routes (`/api/v1/company`)
- `POST /register` - Register a new company
- `GET /:id` - Get company details
- `PUT /:id` - Update company information

### Job Routes (`/api/v1/job`)
- `POST /post` - Create a new job posting
- `GET /` - Get all jobs
- `GET /:id` - Get job details
- `PUT /:id` - Update job posting
- `DELETE /:id` - Delete job posting

### Application Routes (`/api/v1/application`)
- `POST /apply/:id` - Apply for a job
- `GET /my-applications` - Get user's applications
- `GET /job/:id` - Get applications for a specific job

## Features

### Authentication
- JWT-based authentication
- Role-based access control (Student/Recruiter)
- Secure password hashing with bcrypt
- HTTP-only cookies for token storage

### File Upload
- Profile photo upload using Multer
- Resume upload functionality
- Cloudinary integration for file storage
- File size and type validation

### Email Notifications
- Welcome emails on registration
- Application confirmation emails
- Nodemailer integration with Gmail SMTP
- HTML email templates

### Database
- MongoDB with Mongoose ODM
- Schema validation
- Relationship management
- Indexing for better performance

## Models

### User Model
```javascript
{
    fullname: String,
    email: String,
    phoneNumber: Number,
    password: String,
    role: String,
    profile: {
        bio: String,
        skills: [String],
        resume: String,
        resumeOriginalName: String,
        company: ObjectId,
        profilePhoto: String
    },
    savedJobs: [ObjectId]
}
```

### Company Model
```javascript
{
    name: String,
    userId: ObjectId,
    // Additional company details
}
```

### Job Model
```javascript
{
    title: String,
    description: String,
    requirements: [String],
    salary: Number,
    location: String,
    jobType: String,
    experienceLevel: String,
    position: String,
    company: ObjectId,
    created_by: ObjectId,
    applications: [ObjectId]
}
```

### Application Model
```javascript
{
    job: ObjectId,
    applicant: ObjectId,
    status: String,
    // Additional application details
}
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

## Dependencies

- `express`: Web framework
- `mongoose`: MongoDB ODM
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT authentication
- `cookie-parser`: Cookie parsing
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variables
- `multer`: File upload handling
- `cloudinary`: Cloud storage
- `nodemailer`: Email functionality
- `datauri`: File handling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `.env.example` to `.env`
- Fill in your environment variables

3. Start the development server:
```bash
npm run dev
```

## API Documentation

### Authentication Headers
All protected routes require a valid JWT token in the cookies.

### Request/Response Format
- All responses follow the format:
```javascript
{
    success: boolean,
    message: string,
    data?: any,
    error?: string
}
```

### Error Handling
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security Features

1. **Password Security**
   - Bcrypt hashing
   - Salt rounds: 10

2. **JWT Security**
   - HTTP-only cookies
   - 24-hour expiration
   - Secure in production

3. **File Upload Security**
   - File size limits
   - File type validation
   - Secure cloud storage

4. **CORS Configuration**
   - Specific origin allowance
   - Credentials support
   - Method restrictions
  



# Frontend

This is the frontend part for the Job Portal, built with React, Redux Toolkit, and Tailwind CSS.

## Directory Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── auth/      # Authentication related components
│   │   ├── shared/    # Shared/common components
│   │   └── ui/        # UI components (buttons, inputs, etc.)
│   ├── redux/         # Redux store and slices
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── assets/        # Static assets (images, icons)
│   ├── lib/           # Third-party library configurations
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Public static files
└── package.json       # Project dependencies
```

## Features

### Authentication
- User registration (Student/Recruiter)
- User login/logout
- Protected routes
- Persistent authentication state
- Form validation

### User Interface
- Responsive design with Tailwind CSS
- Modern UI components using Radix UI
- Toast notifications
- Loading states
- Error handling
- Form validation

### State Management
- Redux Toolkit for global state
- Redux Persist for state persistence
- Custom hooks for reusable logic
- Optimized re-renders

### API Integration
- Axios for HTTP requests
- Interceptors for authentication
- Error handling
- Request/response logging

## Components

### Authentication Components
- `Signup.jsx`: User registration form
- `Login.jsx`: User login form
- `ProtectedRoute.jsx`: Route protection wrapper

### Shared Components
- `Navbar.jsx`: Navigation header
- `Footer.jsx`: Application footer
- `Loading.jsx`: Loading spinner
- `ErrorBoundary.jsx`: Error handling wrapper

### UI Components
- `Button.jsx`: Custom button component
- `Input.jsx`: Form input component
- `Label.jsx`: Form label component
- `RadioGroup.jsx`: Radio button group
- `Select.jsx`: Dropdown select component

## Redux Store Structure

### Auth Slice
```javascript
{
    user: {
        _id: string,
        fullname: string,
        email: string,
        role: string,
        profile: {
            bio: string,
            skills: string[],
            resume: string,
            profilePhoto: string
        }
    },
    loading: boolean,
    error: string
}
```

### Job Slice
```javascript
{
    jobs: Job[],
    savedJobs: Job[],
    applications: Application[],
    loading: boolean,
    error: string
}
```

## API Integration

### API Endpoints
```javascript
const API_ENDPOINTS = {
    // Auth
    REGISTER: '/api/v1/user/register',
    LOGIN: '/api/v1/user/login',
    LOGOUT: '/api/v1/user/logout',
    
    // Jobs
    GET_JOBS: '/api/v1/job',
    POST_JOB: '/api/v1/job/post',
    APPLY_JOB: '/api/v1/application/apply',
    
    // Profile
    UPDATE_PROFILE: '/api/v1/user/update-profile',
    
    // Company
    REGISTER_COMPANY: '/api/v1/company/register'
}
```

### Axios Configuration
```javascript
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## Dependencies

### Core Dependencies
- `react`: UI library
- `react-dom`: DOM rendering
- `react-router-dom`: Routing
- `@reduxjs/toolkit`: State management
- `react-redux`: Redux React bindings
- `axios`: HTTP client
- `tailwindcss`: CSS framework

### UI Dependencies
- `@radix-ui/*`: UI component primitives
- `lucide-react`: Icons
- `framer-motion`: Animations
- `sonner`: Toast notifications
- `embla-carousel-react`: Carousel component

### Development Dependencies
- `vite`: Build tool
- `@vitejs/plugin-react`: React plugin for Vite
- `eslint`: Code linting
- `@types/react`: TypeScript definitions

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the API URL

3. Start the development server:
```bash
npm run dev
```

## Development

### Code Style
- ESLint configuration
- Prettier formatting
- Component organization
- File naming conventions

### Component Structure
```jsx
// Example component structure
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Component = () => {
    // Hooks
    const dispatch = useDispatch();
    const state = useSelector(state => state.someSlice);
    
    // Handlers
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // API call
            toast.success('Success message');
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    return (
        <div>
            {/* Component JSX */}
        </div>
    );
};

export default Component;
```

### Best Practices

1. **Component Organization**
   - Single responsibility
   - Reusable components
   - Proper prop typing
   - Error boundaries

2. **State Management**
   - Redux for global state
   - Local state for UI
   - Custom hooks for logic
   - Memoization when needed

3. **Performance**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Bundle size optimization

4. **Security**
   - Input sanitization
   - XSS prevention
   - Secure authentication
   - Environment variables

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Deployment

The frontend can be deployed to various platforms:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## Testing

### Unit Testing
```bash
npm test
```

### Component Testing
- React Testing Library
- Jest
- Mock Service Worker

## Performance Optimization

1. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

2. **Asset Optimization**
   - Image compression
   - Font optimization
   - CSS minification

3. **Caching**
   - Service workers
   - Browser caching
   - API response caching

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
