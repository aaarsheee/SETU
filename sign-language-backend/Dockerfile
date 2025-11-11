# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first for caching
COPY requirements.txt .

# Upgrade pip and install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy all backend files
COPY . .

# Expose internal container port (match app.py)
EXPOSE 8000

# Start app with Gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]
