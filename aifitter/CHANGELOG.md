# Changelog

All notable changes to the AIFitter project will be documented in this file.

## [1.0.0] - 2025-01-13

### Added
- Initial project structure reorganization
- Production-ready Django settings with environment variable support
- Proper static and media files configuration
- Security settings for production deployment
- Comprehensive documentation (README, DEPLOYMENT, PROJECT_STRUCTURE)
- .gitignore file for Django projects
- Requirements.txt with production dependencies (gunicorn, whitenoise)
- Procfile for Heroku deployment
- Runtime.txt for Python version specification
- Logging configuration
- App configuration with verbose name

### Changed
- Moved templates from root to app directory (`fitter/templates/fitter/`)
- Updated template references in views
- Removed duplicate settings.py from fitter app
- Updated INSTALLED_APPS to use app config
- Renamed req.txt to requirements.txt
- Enhanced URL configuration for static/media file serving

### Fixed
- Template path configuration
- Static files directory structure
- Settings for production deployment

### Security
- Added environment variable support for sensitive settings
- Implemented security headers for production
- Added HSTS configuration
- Secure cookie settings for production

