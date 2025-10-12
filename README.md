# Rehab360 Compliance System

A comprehensive user profile management system for rehabilitation compliance tracking.

## Features

### User Profile Form
The system includes a comprehensive user profile form with the following sections:

#### 1. Personal Information
- First Name (required)
- Last Name (required)
- Email Address (required)
- Phone Number (required, format: 555-555-5555)
- Date of Birth (required, must be 18+)

#### 2. Professional Information
- Employee ID (required)
- Department (required)
  - Physical Therapy
  - Occupational Therapy
  - Speech Therapy
  - Nursing
  - Administration
  - Compliance
- Position/Title (required)
- License Number (optional)
- License Expiration Date (optional)

#### 3. Compliance & Training
- HIPAA Certification Status (required)
- HIPAA Certification Date (optional)
- Background Check Status (required)
- Policy Agreement (required)

#### 4. Emergency Contact
- Emergency Contact Name (required)
- Emergency Contact Phone (required, format: 555-555-5555)
- Relationship (required)

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rehab360-compliance/Rehab360-compliance.git
cd Rehab360-compliance
```

2. Open the application:
Simply open `index.html` in a web browser. No build process or server required.

### Usage

1. Open `index.html` in your web browser
2. Fill out all required fields (marked with *)
3. Click "Save Profile" to submit the form
4. The profile data is saved to browser localStorage
5. Click "Reset Form" to clear all fields

## Form Validation

The form includes comprehensive client-side validation:

- **Real-time validation**: Fields are validated as you type or when you leave a field
- **Format checking**: Phone numbers, emails, and employee IDs are validated for proper format
- **Age verification**: Date of birth is checked to ensure users are at least 18 years old
- **Date validation**: License expiration dates cannot be in the past
- **Required fields**: All required fields must be filled before submission
- **Auto-formatting**: Phone numbers are automatically formatted as you type

## Technical Details

### Files

- **index.html**: Main HTML structure of the user profile form
- **styles.css**: Complete styling with responsive design
- **script.js**: Form validation, data handling, and user interactions

### Browser Compatibility

The application is compatible with modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Responsive Design

The form is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

### Data Storage

- Profile data is stored in the browser's localStorage
- Data persists between sessions
- Reloading the page will populate the form with saved data

## Accessibility

- Semantic HTML for screen readers
- Keyboard navigation support
- Clear error messages
- Proper ARIA labels
- High contrast ratios for readability

## Security & Compliance

- HIPAA compliance tracking
- Background check status monitoring
- License expiration tracking
- Policy agreement requirement

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
