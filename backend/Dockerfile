# Use the official Python image as the base
FROM python:3.12.7-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements and application files
COPY requirements.txt .
COPY main.py .

# Install required Python packages
RUN pip install -r requirements.txt

# Expose port 8000
EXPOSE 8000

# Start the FastAPI app using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
