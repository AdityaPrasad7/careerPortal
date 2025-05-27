import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    debug: true, // Enable debug logging
    logger: true // Enable logger
});

// Verify transporter configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error('SMTP Configuration Error:', error);
        console.error('Email credentials:', {
            user: process.env.EMAIL_USER ? 'Set' : 'Not set',
            pass: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set'
        });
    } else {
        console.log('SMTP Server is ready to take our messages');
    }
});

// Function to send welcome email on registration
export const sendWelcomeEmail = async (userEmail, fullName, role) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            console.error('Email configuration missing:', {
                EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
                EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set'
            });
            throw new Error('Email credentials not configured');
        }

        const mailOptions = {
            from: `"Job Portal" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Welcome to Job Portal!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Welcome to Job Portal!</h2>
                    <p>Dear ${fullName},</p>
                    <p>Thank you for registering with Job Portal as a ${role}!</p>
                    <p>We're excited to have you on board. Here's what you can do next:</p>
                    <ul>
                        ${role === 'student' ? `
                            <li>Complete your profile</li>
                            <li>Browse available jobs</li>
                            <li>Apply for positions that match your skills</li>
                            <li>Save interesting jobs for later</li>
                        ` : `
                            <li>Complete your company profile</li>
                            <li>Post new job openings</li>
                            <li>Review applications</li>
                            <li>Connect with potential candidates</li>
                        `}
                    </ul>
                    <p>If you have any questions, feel free to contact our support team.</p>
                    <br>
                    <p>Best regards,</p>
                    <p>The Job Portal Team</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        console.error('Error details:', {
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode,
            stack: error.stack
        });
        throw error;
    }
};

// Function to send job application confirmation email
export const sendApplicationConfirmation = async (userEmail, jobTitle, companyName) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            console.error('Email configuration missing:', {
                EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
                EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set'
            });
            throw new Error('Email credentials not configured');
        }

        const mailOptions = {
            from: `"Job Portal" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Job Application Confirmation',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Application Confirmation</h2>
                    <p>Dear Applicant,</p>
                    <p>Thank you for applying to the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
                    <p>We have received your application and our team will review it shortly.</p>
                    <p>We will contact you if your profile matches our requirements.</p>
                    <br>
                    <p>Best regards,</p>
                    <p>The ${companyName} Team</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Application confirmation email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending application confirmation email:', error);
        console.error('Error details:', {
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode,
            stack: error.stack
        });
        throw error;
    }
}; 