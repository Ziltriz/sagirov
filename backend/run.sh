#!/bin/bash

set -e


echo "🔧 Выполняем миграции..."
python manage.py migrate --noinput

echo "📦 Собираем статику..."
python manage.py collectstatic --noinput

echo "✅ Миграции завершены. Запускаем uWSGI..."

exec uwsgi --ini /app/uwsgi.ini