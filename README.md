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

## Development

### Running Tests
```bash
npm test
```

### Code Style
- ESLint configuration
- Prettier formatting

### Debugging
- Nodemon for development
- Console logging
- Error tracking

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Best Practices

1. **Error Handling**
   - Try-catch blocks
   - Global error middleware
   - Proper error messages

2. **Code Organization**
   - MVC pattern
   - Modular structure
   - Clear separation of concerns

3. **Security**
   - Input validation
   - Sanitization
   - Rate limiting

4. **Performance**
   - Database indexing
   - Query optimization
   - Caching strategies

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
