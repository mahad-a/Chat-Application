# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install dockerize
ADD https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz /tmp/dockerize.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/dockerize.tar.gz

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the current directory contents into the container
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Run the Django development server, waiting for the PostgreSQL service to be ready
CMD ["dockerize", "-wait", "tcp://db:5432", "-timeout", "60s", "python", "manage.py", "runserver", "0.0.0.0:8000"]
