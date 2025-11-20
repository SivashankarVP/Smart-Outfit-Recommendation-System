# Deployment Guide for AIFitter

## Quick Start for Production

### 1. Environment Setup

Set the following environment variables:

```bash
export SECRET_KEY='your-secret-key-here'
export DEBUG='False'
export ALLOWED_HOSTS='yourdomain.com,www.yourdomain.com'
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
pip install gunicorn  # For production WSGI server
```

### 3. Database Setup

```bash
python manage.py migrate
python manage.py createsuperuser  # Optional
```

### 4. Collect Static Files

```bash
python manage.py collectstatic --noinput
```

### 5. Run with Gunicorn

```bash
gunicorn aifitter.wsgi:application --bind 0.0.0.0:8000
```

## Platform-Specific Deployment

### Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set config vars:
   ```bash
   heroku config:set SECRET_KEY='your-secret-key'
   heroku config:set DEBUG=False
   heroku config:set ALLOWED_HOSTS='your-app-name.herokuapp.com'
   ```
5. Deploy: `git push heroku main`
6. Run migrations: `heroku run python manage.py migrate`

### DigitalOcean App Platform

1. Connect your repository
2. Set environment variables in the dashboard
3. Build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
4. Run command: `gunicorn aifitter.wsgi:application`

### AWS Elastic Beanstalk

1. Install EB CLI: `pip install awsebcli`
2. Initialize: `eb init`
3. Create environment: `eb create`
4. Set environment variables in EB console
5. Deploy: `eb deploy`

### PythonAnywhere

1. Upload your project files
2. Set up a virtual environment
3. Install dependencies
4. Configure WSGI file to point to `aifitter.wsgi.application`
5. Set environment variables in the web app configuration
6. Reload the web app

## Nginx Configuration (for VPS)

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /static/ {
        alias /path/to/aifitter/staticfiles/;
    }

    location /media/ {
        alias /path/to/aifitter/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Security Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Use a strong, unique `SECRET_KEY`
- [ ] Set `ALLOWED_HOSTS` correctly
- [ ] Use HTTPS (SSL/TLS certificate)
- [ ] Keep dependencies updated
- [ ] Use environment variables for sensitive data
- [ ] Set up proper database backups
- [ ] Configure firewall rules
- [ ] Use a production-grade WSGI server (Gunicorn, uWSGI)

## Troubleshooting

### Static files not loading
- Run `python manage.py collectstatic`
- Check `STATIC_ROOT` and `STATIC_URL` in settings
- Verify web server configuration for static files

### Media files not uploading
- Check `MEDIA_ROOT` and `MEDIA_URL` in settings
- Ensure directory has write permissions
- Verify web server configuration for media files

### Database errors
- Run migrations: `python manage.py migrate`
- Check database connection settings
- Verify database user permissions

