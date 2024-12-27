FROM python:3.9-slim
WORKDIR /app
ADD https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz /tmp/dockerize.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/dockerize.tar.gz

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
ENV PYTHONUNBUFFERED=1

RUN python manage.py migrate
CMD ["dockerize", "-wait", "tcp://db:5432", "-timeout", "60s", "python", "manage.py", "runserver", "0.0.0.0:8000"]
