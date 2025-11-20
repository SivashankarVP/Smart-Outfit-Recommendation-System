# Project Structure

This document describes the proper Django project structure for AIFitter.

## Directory Structure

```
aifitter/                          # Project root
│
├── aifitter/                      # Project package (Django project settings)
│   ├── __init__.py
│   ├── settings.py                # Main settings file (production-ready)
│   ├── urls.py                    # Root URL configuration
│   ├── wsgi.py                    # WSGI configuration for production
│   └── asgi.py                    # ASGI configuration
│
├── fitter/                        # Main Django app
│   ├── __init__.py
│   ├── admin.py                   # Django admin configuration
│   ├── apps.py                    # App configuration
│   ├── models.py                  # Database models
│   ├── views.py                   # View functions
│   ├── tests.py                   # Unit tests
│   │
│   ├── static/                    # Static files (CSS, JS, images)
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── script.js
│   │
│   ├── templates/                 # HTML templates
│   │   └── fitter/
│   │       └── index.html
│   │
│   └── migrations/                # Database migrations
│       └── __init__.py
│
├── staticfiles/                   # Collected static files (created by collectstatic)
├── media/                         # User-uploaded media files
│
├── manage.py                      # Django management script
├── requirements.txt               # Python dependencies
├── .gitignore                     # Git ignore rules
├── README.md                      # Project documentation
├── DEPLOYMENT.md                  # Deployment guide
├── Procfile                       # Heroku deployment config
└── runtime.txt                    # Python version specification
```

## Key Changes Made

### 1. Template Organization
- **Before**: Templates in root `/templates/`
- **After**: Templates in app `/fitter/templates/fitter/`
- **Reason**: Follows Django best practices - templates belong to apps

### 2. Settings Configuration
- **Before**: Basic settings, duplicate settings.py in app
- **After**: Production-ready settings with:
  - Environment variable support
  - Proper static/media file configuration
  - Security settings for production
  - Removed duplicate settings.py

### 3. Static Files
- **Before**: Static files only in app directory
- **After**: Properly configured with:
  - `STATICFILES_DIRS` for development
  - `STATIC_ROOT` for production collection
  - `MEDIA_ROOT` and `MEDIA_URL` for user uploads

### 4. URL Configuration
- **Before**: Basic URL patterns
- **After**: Includes static/media file serving in development

### 5. Project Files
- **Before**: `req.txt` for dependencies
- **After**: `requirements.txt` (standard naming)
- **Added**: `.gitignore`, `README.md`, `DEPLOYMENT.md`, `Procfile`, `runtime.txt`

## File Locations

### Templates
- Template files: `fitter/templates/fitter/index.html`
- Template reference in views: `'fitter/index.html'`

### Static Files
- Static files: `fitter/static/css/` and `fitter/static/js/`
- Collected static files: `staticfiles/` (created on `collectstatic`)

### Media Files
- User uploads: `media/` (created automatically)

## Best Practices Followed

1. ✅ Templates organized by app
2. ✅ Static files properly configured
3. ✅ Environment variables for sensitive settings
4. ✅ Security settings for production
5. ✅ Proper .gitignore for Django projects
6. ✅ Documentation files included
7. ✅ Deployment-ready configuration

## Development vs Production

### Development
- `DEBUG = True`
- Static files served by Django
- SQLite database (default)

### Production
- `DEBUG = False`
- Static files collected and served by web server
- Use PostgreSQL or MySQL
- Environment variables for configuration
- Security headers enabled

