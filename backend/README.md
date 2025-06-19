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

### 2. Install Development Tool

Install tools below：

```bash
# pre-commit install
pip install pre-commit

# ruff install（linter/formatter）
pip install ruff

# mypy install（）
pip install mypy
```

### 2. Database Migration

Execute Command below：

```bash
# database migration
alembic upgrade head
```
