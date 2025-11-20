"""
WSGI entry point for production deployment.

This file can be used as an entry point for WSGI servers like Gunicorn.
"""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aifitter.settings')

application = get_wsgi_application()

