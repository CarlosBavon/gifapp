const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Validate environment variables
const validateEnvVars = () => {
  const required = ['EMAIL_USER', 'EMAIL_PASSWORD', 'RECIPIENT_EMAIL'];
  const missing = required.filter(key => !process.env[key] || process.env[key].includes('your-'));
  
  if (missing.length > 0) {
    console.warn(`⚠️  Missing or placeholder environment variables: ${missing.join(', ')}`);
    console.warn('📧 Email service will not work until these are configured properly.');
    return false;
  }
  return true;
};

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD // Use app password for Gmail
    }
  });
};

// Format application data for email
const formatApplicationData = (data) => {
  const zodiacEmojis = {
    aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
    leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
    sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
  };

  return `
    🎉 NEW GIRLFRIEND APPLICATION RECEIVED! 🎉
    
    📝 PERSONAL DETAILS:
    • Name: ${data.name}
    • Age: ${data.age}
    • Instagram: ${data.instagram || 'Not provided'}
    • Zodiac Sign: ${zodiacEmojis[data.zodiac] || ''} ${data.zodiac ? data.zodiac.charAt(0).toUpperCase() + data.zodiac.slice(1) : 'Not selected'}
    
    ⭐ SKILLS & QUALIFICATIONS:
    • Cuddling Strength: ${data.cuddleRating}/5 ⭐
    • Pun Tolerance: ${data.punTolerance}/5 😂
    • Willing to Share Food: ${data.sharesFood ? '✅ Yes (keeper!)' : '❌ No (red flag?)'}
    • Can Handle Weirdness: ${data.handlesWeirdness ? '✅ Yes (perfect!)' : '❌ No (might be a problem)'}
    
    💑 SCENARIO RESPONSES:
    • Shower Singing Reaction: ${
      data.showerSingingReaction === 'join' ? '🎵 Join in harmoniously' :
      data.showerSingingReaction === 'record' ? '📱 Record and blackmail later' :
      '🤐 Pretend to hear nothing'
    }
    • Ideal Date: ${
      data.idealDate === 'netflix' ? '🍕 Netflix + takeout' :
      data.idealDate === 'roadtrip' ? '🚗 Spontaneous road trip' :
      '🍽️ Fancy dinner (with pajamas underneath)'
    }
    
    🐾 REFERENCES:
    • Pet Approval: ${data.petApproval ? '✅ Yes (dogs votes count double!)' : '❌ No pets approval'}
    
    📜 TERMS & CONDITIONS:
    • Agreed to Terms: ${data.terms ? '✅ Accepted all conditions' : '❌ Not accepted'}
    
    ---
    
    📧 This application was submitted on ${new Date().toLocaleString()}
    
    Time to review this potential match! 💕
  `;
};

// API endpoint to receive application and send email
app.post('/api/apply', async (req, res) => {
  try {
    const applicationData = req.body;
    console.log('Received application:', applicationData);

    // Validate required fields
    if (!applicationData.name || !applicationData.age || !applicationData.terms) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, age, or terms not accepted' 
      });
    }

<<<<<<< HEAD
=======
    // Check if email is configured
    if (!validateEnvVars()) {
      return res.status(500).json({
        error: 'Email service not configured',
        details: 'Please configure your email credentials in the environment variables'
      });
    }

>>>>>>> cursor/email-application-details-backend-c26a
    // Create email content
    const emailContent = formatApplicationData(applicationData);
    
    // Create transporter
    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `💕 New Girlfriend Application from ${applicationData.name}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
<<<<<<< HEAD
    console.log('Application email sent successfully');
=======
    console.log('Application email sent successfully to:', process.env.RECIPIENT_EMAIL);
>>>>>>> cursor/email-application-details-backend-c26a
    res.status(200).json({ 
      success: true, 
      message: 'Application submitted and email sent successfully!' 
    });

  } catch (error) {
    console.error('Error processing application:', error);
<<<<<<< HEAD
    res.status(500).json({ 
      error: 'Failed to process application',
=======
    
    // Provide more helpful error messages
    let errorMessage = 'Failed to process application';
    if (error.message.includes('Invalid login')) {
      errorMessage = 'Email authentication failed. Please check your Gmail credentials and use an App Password.';
    } else if (error.message.includes('ENOTFOUND')) {
      errorMessage = 'Network error. Please check your internet connection.';
    }
    
    res.status(500).json({ 
      error: errorMessage,
>>>>>>> cursor/email-application-details-backend-c26a
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.RECIPIENT_EMAIL || 'Not configured'}`);
=======
// Validate environment on startup
const envValid = validateEnvVars();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.RECIPIENT_EMAIL || 'Not configured'}`);
  
  if (!envValid) {
    console.log('\n🔧 To fix this:');
    console.log('1. Copy .env.example to .env');
    console.log('2. Replace placeholder values with your Gmail credentials');
    console.log('3. Restart the server\n');
  } else {
    console.log('✅ Email service ready!');
  }
>>>>>>> cursor/email-application-details-backend-c26a
});