#!/bin/bash
set -e

# Generate migrations (optional: only in development)
python manage.py makemigrations

# Apply migrations
python manage.py migrate --noinput

# # Collect static files (if needed)
# python manage.py collectstatic --noinput

# Start the application
exec "$@"