# AIFitter - Smart Outfit Recommendations

A Django-based web application that uses AI to analyze body measurements and provide personalized clothing recommendations.

## Features

- AI-powered body measurement analysis using MediaPipe
- Skin tone detection and color recommendations
- Size recommendations based on body measurements
- Product recommendations with images
- Modern, responsive UI

## Project Structure

```
aifitter/
├── aifitter/          # Project settings and configuration
│   ├── __init__.py
│   ├── settings.py    # Django settings
│   ├── urls.py        # URL configuration
│   ├── wsgi.py        # WSGI configuration
│   └── asgi.py        # ASGI configuration
├── fitter/            # Main application
│   ├── __init__.py
│   ├── models.py
│   ├── views.py
│   ├── admin.py
│   ├── apps.py
│   ├── static/        # Static files (CSS, JS)
│   │   ├── css/
│   │   └── js/
│   └── templates/     # Templates
│       └── fitter/
│           └── index.html
├── manage.py
├── requirements.txt
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aifitter
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

7. Run the development server:
```bash
python manage.py runserver
```

## Environment Variables

For production, set the following environment variables:

- `SECRET_KEY`: Django secret key (generate a new one for production)
- `DEBUG`: Set to `False` for production
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts (e.g., `example.com,www.example.com`)

## Production Deployment

### Collect Static Files

Before deploying, collect all static files:

```bash
python manage.py collectstatic --noinput
```

### Settings for Production

The settings file is configured to:
- Use environment variables for sensitive settings
- Enable security features when `DEBUG=False`
- Properly configure static and media files

### Recommended Hosting Platforms

- **Heroku**: Use gunicorn as WSGI server
- **DigitalOcean**: Use gunicorn with nginx
- **AWS**: Use Elastic Beanstalk or EC2 with gunicorn
- **PythonAnywhere**: Direct Django deployment

### WSGI Server

For production, use a WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn aifitter.wsgi:application
```

## Dependencies

Key dependencies:
- Django 4.2.25
- OpenCV (opencv-contrib-python)
- MediaPipe
- NumPy

See `requirements.txt` for the complete list.

## License

This project is licensed under the MIT License.

