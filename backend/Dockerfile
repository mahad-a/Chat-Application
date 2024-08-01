FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code into the container
COPY src /app/src

# Set environment variables
ENV SECRET_KEY=abf3a7ab4a5583f7c49f4eda605172b6b986c0be5ca1363a

# Set the working directory for running the app
WORKDIR /app/src

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
