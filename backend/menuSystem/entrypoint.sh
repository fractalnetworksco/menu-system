#!/usr/bin/env bash

mkdir -p data

python3 manage.py makemigrations
python3 manage.py migrate
# python3 manage.py runserver 0.0.0.0:8000

if [[ "$DJANGO_ENV" = 'DEV' ]]; then
    echo "Running in Development mode"

    # python3 manage.py loaddata fixtures/app_categories.json
    # python3 manage.py loaddata fixtures/dev_data.json
    # python3 manage.py loaddata fixtures/device_version.json
    # python3 manage.py loaddata fixtures/plugin_version.json
    python3 manage.py loaddata initial_data.json
    python3 manage.py runserver 0.0.0.0:8080

elif [[ "$DJANGO_ENV" = 'TEST' ]]; then
    # runs Django in DEBUG mode
    #pip3 install -r requirements.txt
    #pip3 install -r requirements.test.txt
    python3 manage.py loaddata fixtures/app_categories.json
    python3 manage.py loaddata fixtures/test_data.json
    python3 manage.py loaddata fixtures/device_version.json
    python3 manage.py loaddata fixtures/plugin_version.json
    python3 manage.py runserver 0.0.0.0:8080

elif [[ "$DJANGO_ENV" = "PROD" ]]; then
    python3 manage.py loaddata fixtures/app_categories.json
    python3 manage.py loaddata fixtures/prod_data.json
    python3 manage.py loaddata fixtures/device_version.json
    python3 manage.py loaddata fixtures/plugin_version.json
    python manage.py collectstatic --no-input
    gunicorn -b 0.0.0.0:8080 hive_backend.wsgi

fi

