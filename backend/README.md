# SCHEDULER_PROMPT_BACKEND

## Setting up the development environment

### 1. Create Virtual Environment

```bash
# Create Virtual Environment
python -m venv .venv

# Activate Virtual Environment
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
```

### 2. Install Dependencies

Install project and dev dependencies.

```bash
# Upgrade pip
pip install --upgrade pip

# Install required packages
pip install -r requirements.txt
```

### 3. Install Development Tools

Install additional tools for code quality and linting:

```bash
# Pre-commit hooks
pip install pre-commit
pre-commit install

# Ruff for linting and formatting
pip install ruff

# Mypy for type checking
pip install mypy
```

## 🗄️ Database Setup and Migration

Ensure your .env or config file has the correct database URL (e.g., DATABASE_URL=postgresql://user:password@localhost/dbname).

### 1. Run Alembic Migration

```bash
# Apply the latest database migrations
alembic upgrade head
```

### 2. Create a New Migration (if needed)

```bash
# Autogenerate migration script after model change
alembic revision --autogenerate -m "Add your message here"
```

## 🚀 Running the Server

Replace app.main with your actual app entry point if different.

```bash
uvicorn app.main:app --reload
```

## 📁 Project Structure

```bash
scheduler_prompt_backend/
├── alembic/
│   ├── versions/
│   └── env.py
├── modles/
├── routers/
├── schemas/
├── services/
├── alembic.ini
├── database.py
├── Dockerfile
├── logging_config.py
├── requirements.txt
└── README.md

```
