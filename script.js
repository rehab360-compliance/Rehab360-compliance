document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userProfileForm');
    const successMessage = document.getElementById('successMessage');

    // Form validation patterns
    const validationRules = {
        firstName: {
            required: true,
            pattern: /^[A-Za-z\s'-]{2,50}$/,
            message: 'First name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes'
        },
        lastName: {
            required: true,
            pattern: /^[A-Za-z\s'-]{2,50}$/,
            message: 'Last name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            pattern: /^\d{3}-\d{3}-\d{4}$/,
            message: 'Phone number must be in format: 555-555-5555'
        },
        dateOfBirth: {
            required: true,
            custom: validateDateOfBirth,
            message: 'You must be at least 18 years old'
        },
        employeeId: {
            required: true,
            pattern: /^[A-Z0-9]{3,20}$/,
            message: 'Employee ID must be 3-20 characters (letters and numbers only)'
        },
        department: {
            required: true,
            message: 'Please select a department'
        },
        position: {
            required: true,
            pattern: /^.{2,100}$/,
            message: 'Position must be 2-100 characters'
        },
        licenseExpiration: {
            custom: validateLicenseExpiration,
            message: 'License expiration date cannot be in the past'
        },
        hipaaCertification: {
            required: true,
            message: 'Please select HIPAA certification status'
        },
        hipaaCertDate: {
            custom: validateHipaaCertDate,
            message: 'HIPAA certification date cannot be in the future'
        },
        backgroundCheck: {
            required: true,
            message: 'Please select background check status'
        },
        agreedToPolicy: {
            required: true,
            message: 'You must agree to the policies'
        },
        emergencyName: {
            required: true,
            pattern: /^[A-Za-z\s'-]{2,100}$/,
            message: 'Emergency contact name must be 2-100 characters'
        },
        emergencyPhone: {
            required: true,
            pattern: /^\d{3}-\d{3}-\d{4}$/,
            message: 'Emergency phone must be in format: 555-555-5555'
        },
        emergencyRelationship: {
            required: true,
            pattern: /^[A-Za-z\s'-]{2,50}$/,
            message: 'Relationship must be 2-50 characters'
        }
    };

    // Custom validation functions
    function validateDateOfBirth(value) {
        if (!value) return false;
        const dob = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
        
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            return age - 1 >= 18;
        }
        return age >= 18;
    }

    function validateLicenseExpiration(value) {
        if (!value) return true; // Optional field
        const expDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return expDate >= today;
    }

    function validateHipaaCertDate(value) {
        if (!value) return true; // Optional field
        const certDate = new Date(value);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return certDate <= today;
    }

    // Validate individual field
    function validateField(fieldName, value) {
        const rule = validationRules[fieldName];
        if (!rule) return true;

        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);

        // Check required
        if (rule.required && !value) {
            showError(field, errorElement, rule.message || 'This field is required');
            return false;
        }

        // Check pattern
        if (value && rule.pattern && !rule.pattern.test(value)) {
            showError(field, errorElement, rule.message);
            return false;
        }

        // Check custom validation
        if (value && rule.custom && !rule.custom(value)) {
            showError(field, errorElement, rule.message);
            return false;
        }

        // Field is valid
        clearError(field, errorElement);
        return true;
    }

    function showError(field, errorElement, message) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearError(field, errorElement) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    // Real-time validation on blur
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                if (field.type === 'checkbox') {
                    validateField(fieldName, field.checked);
                } else {
                    validateField(fieldName, field.value);
                }
            });

            // Clear error on input
            field.addEventListener('input', function() {
                const errorElement = document.getElementById(`${fieldName}-error`);
                if (field.classList.contains('error')) {
                    clearError(field, errorElement);
                }
            });
        }
    });

    // Phone number auto-formatting
    ['phone', 'emergencyPhone'].forEach(fieldId => {
        const phoneField = document.getElementById(fieldId);
        if (phoneField) {
            phoneField.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 3) {
                    value = value.substring(0, 3) + '-' + value.substring(3);
                }
                if (value.length >= 7) {
                    value = value.substring(0, 7) + '-' + value.substring(7, 11);
                }
                e.target.value = value;
            });
        }
    });

    // Employee ID auto-uppercase
    const employeeIdField = document.getElementById('employeeId');
    if (employeeIdField) {
        employeeIdField.addEventListener('input', function(e) {
            e.target.value = e.target.value.toUpperCase();
        });
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Hide previous success message
        successMessage.classList.add('hidden');

        // Validate all fields
        let isValid = true;
        const formData = new FormData(form);

        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            let value;
            
            if (field.type === 'checkbox') {
                value = field.checked;
            } else {
                value = formData.get(fieldName);
            }

            if (!validateField(fieldName, value)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Create profile data object
            const profileData = {
                personalInfo: {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    dateOfBirth: formData.get('dateOfBirth')
                },
                professionalInfo: {
                    employeeId: formData.get('employeeId'),
                    department: formData.get('department'),
                    position: formData.get('position'),
                    licenseNumber: formData.get('licenseNumber'),
                    licenseExpiration: formData.get('licenseExpiration')
                },
                compliance: {
                    hipaaCertification: formData.get('hipaaCertification'),
                    hipaaCertDate: formData.get('hipaaCertDate'),
                    backgroundCheck: formData.get('backgroundCheck'),
                    agreedToPolicy: formData.get('agreedToPolicy') === 'on'
                },
                emergencyContact: {
                    name: formData.get('emergencyName'),
                    phone: formData.get('emergencyPhone'),
                    relationship: formData.get('emergencyRelationship')
                },
                timestamp: new Date().toISOString()
            };

            // Save to localStorage (in a real app, this would be sent to a server)
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            console.log('Profile saved:', profileData);

            // Show success message
            successMessage.classList.remove('hidden');

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Load saved profile if exists
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        try {
            const profileData = JSON.parse(savedProfile);
            
            // Populate form with saved data
            if (profileData.personalInfo) {
                document.getElementById('firstName').value = profileData.personalInfo.firstName || '';
                document.getElementById('lastName').value = profileData.personalInfo.lastName || '';
                document.getElementById('email').value = profileData.personalInfo.email || '';
                document.getElementById('phone').value = profileData.personalInfo.phone || '';
                document.getElementById('dateOfBirth').value = profileData.personalInfo.dateOfBirth || '';
            }
            
            if (profileData.professionalInfo) {
                document.getElementById('employeeId').value = profileData.professionalInfo.employeeId || '';
                document.getElementById('department').value = profileData.professionalInfo.department || '';
                document.getElementById('position').value = profileData.professionalInfo.position || '';
                document.getElementById('licenseNumber').value = profileData.professionalInfo.licenseNumber || '';
                document.getElementById('licenseExpiration').value = profileData.professionalInfo.licenseExpiration || '';
            }
            
            if (profileData.compliance) {
                document.getElementById('hipaaCertification').value = profileData.compliance.hipaaCertification || '';
                document.getElementById('hipaaCertDate').value = profileData.compliance.hipaaCertDate || '';
                document.getElementById('backgroundCheck').value = profileData.compliance.backgroundCheck || '';
                document.getElementById('agreedToPolicy').checked = profileData.compliance.agreedToPolicy || false;
            }
            
            if (profileData.emergencyContact) {
                document.getElementById('emergencyName').value = profileData.emergencyContact.name || '';
                document.getElementById('emergencyPhone').value = profileData.emergencyContact.phone || '';
                document.getElementById('emergencyRelationship').value = profileData.emergencyContact.relationship || '';
            }
        } catch (error) {
            console.error('Error loading saved profile:', error);
        }
    }
});
