# Venture Planner 3 - Setup Guide

A Django-based business consulting website with an integrated blog platform, showcasing consulting services, hosting educational content, and generating leads through contact forms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Step 1: Clone the Repository](#step-1-clone-the-repository)
- [Step 2: Install Python](#step-2-install-python)
- [Step 3: Set Up Virtual Environment](#step-3-set-up-virtual-environment)
- [Step 4: Install Dependencies](#step-4-install-dependencies)
- [Step 5: Install PostgreSQL](#step-5-install-postgresql)
- [Step 6: Create Database](#step-6-create-database)
- [Step 7: Configure Environment Variables](#step-7-configure-environment-variables)
- [Step 8: Run Database Migrations](#step-8-run-database-migrations)
- [Step 9: Create Admin User](#step-9-create-admin-user)
- [Step 10: Install CORS Unblock Extension (for Stripe)](#step-10-install-cors-unblock-extension-for-stripe)
- [Step 11: Run the Development Server](#step-11-run-the-development-server)
- [Troubleshooting](#troubleshooting)
- [Common Commands](#common-commands)

---

## Prerequisites

Before you begin, make sure you have:
- A computer running Windows, macOS, or Linux
- Internet connection
- Basic familiarity with the command line/terminal
- A GitHub account (to clone the repository)

---

## Step 1: Clone the Repository

### 1.1 Install Git

If you don't have Git installed:

**Windows:**
- Download from [git-scm.com](https://git-scm.com/download/win)
- Run the installer with default settings

**macOS:**
```bash
# Install via Homebrew (install Homebrew first from brew.sh if needed)
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install git
```

### 1.2 Clone the Project

Open your terminal/command prompt and run:

```bash
# Navigate to where you want to store the project
cd ~/Documents  # or any directory you prefer

# Clone the repository
git clone https://github.com/DM-Software-Ltd/ventureplanner-website-v3.git

# Navigate into the project directory
cd ventureplanner-website-v3
```

---

## Step 2: Install Python

This project requires **Python 3.12** or higher.

### 2.1 Check if Python is Installed

```bash
python --version
# or
python3 --version
```

If you see `Python 3.12.x` or higher, you're good to go! Otherwise, install Python:

**Windows:**
1. Download from [python.org/downloads](https://www.python.org/downloads/)
2. **IMPORTANT:** Check "Add Python to PATH" during installation
3. Install with default settings

**macOS:**
```bash
# Using Homebrew
brew install python@3.12
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install python3.12 python3.12-venv python3-pip
```

---

## Step 3: Set Up Virtual Environment

A virtual environment keeps your project dependencies isolated from other Python projects.

### 3.1 Create Virtual Environment

**Windows:**
```bash
# Make sure you're in the project directory
python -m venv venv
```

**macOS/Linux:**
```bash
python3 -m venv venv
```

### 3.2 Activate Virtual Environment

**Windows (Command Prompt):**
```bash
venv\Scripts\activate
```

**Windows (PowerShell):**
```bash
venv\Scripts\Activate.ps1
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

You should see `(venv)` at the beginning of your command prompt, indicating the virtual environment is active.

> **Note:** You need to activate the virtual environment every time you open a new terminal window to work on this project.

---

## Step 4: Install Dependencies

With your virtual environment activated, install all required Python packages:

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

This will install:
- Django 4.2.18 (web framework)
- PostgreSQL adapter (psycopg2)
- AWS S3 storage (django-storages, boto3)
- Image processing (Pillow)
- Environment variables (python-dotenv)
- And other dependencies

**Expected time:** 2-5 minutes depending on your internet speed.

---

## Step 5: Install PostgreSQL

This project uses PostgreSQL as its database.

### 5.1 Download and Install PostgreSQL

**Windows:**
1. Download from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. Run the installer (recommended version: PostgreSQL 15 or 16)
3. During installation:
   - **Remember the password** you set for the `postgres` user (you'll need this!)
   - Default port: `5432` (keep this)
   - Install pgAdmin 4 (graphical interface - optional but helpful)

**macOS:**
```bash
# Using Homebrew
brew install postgresql@15
brew services start postgresql@15
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 5.2 Verify PostgreSQL is Running

**Windows:**
- Open "Services" app and look for "postgresql" - it should be "Running"

**macOS/Linux:**
```bash
# Check status
brew services list  # macOS
sudo systemctl status postgresql  # Linux
```

---

## Step 6: Create Database

### 6.1 Access PostgreSQL

**Windows:**
- Open "SQL Shell (psql)" from the Start menu
- Press Enter for default server, database, port, and username
- Enter the password you set during installation

**macOS/Linux:**
```bash
sudo -u postgres psql
```

### 6.2 Create Database and User

Once in the PostgreSQL shell (you'll see `postgres=#`), run these commands:

```sql
-- Create a new database
CREATE DATABASE ventureplanner3_db;

-- Create a new user with a password (change 'yourpassword' to something secure)
CREATE USER ventureplanner_user WITH PASSWORD 'yourpassword';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE ventureplanner3_db TO ventureplanner_user;

-- Exit PostgreSQL shell
\q
```

> **Important:** Remember the database name, username, and password - you'll need them in the next step!

---

## Step 7: Configure Environment Variables

The project uses a `.env` file to store sensitive configuration. This file is **not** tracked in version control for security.

### 7.1 Create .env File

In the root directory of the project (same level as `manage.py`), create a file named `.env`:

**Windows (Command Prompt):**
```bash
type nul > .env
notepad .env
```

**macOS/Linux:**
```bash
touch .env
nano .env
```

### 7.2 Add Configuration

Copy and paste the following into your `.env` file, **replacing the placeholder values** with your actual credentials:

```env
# Django Settings
SECRET_KEY=your-secret-key-here-make-it-long-and-random-12345678901234567890
DEBUG=True

# Database Configuration
DB_NAME=ventureplanner3_db
DB_USER=ventureplanner_user
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432

# AWS S3 Configuration (for media file storage)
# You'll need to create an AWS account and S3 bucket for this
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_STORAGE_BUCKET_NAME=your-s3-bucket-name
AWS_S3_REGION_NAME=us-east-1

# Cloudflare Turnstile (CAPTCHA)
# Sign up at https://www.cloudflare.com/products/turnstile/
TURNSTILE_SITE_KEY=your-turnstile-site-key
TURNSTILE_SECRET_KEY=your-turnstile-secret-key

# Email Configuration (for contact forms)
DEFAULT_FROM_EMAIL=noreply@yourdomain.com
CONTACT_US_EMAIL=contact@yourdomain.com
```

### 7.3 Generate a Secret Key

For the `SECRET_KEY`, you can generate a secure random key:

**Quick method (using Python):**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy the output and paste it as your `SECRET_KEY` value.

### 7.4 AWS S3 Setup (Optional for Development)

For local development, you can skip AWS S3 setup initially. However, blog images are stored on S3, so you'll need to:

**Option A:** Set up a free AWS account and create an S3 bucket
1. Go to [aws.amazon.com](https://aws.amazon.com/)
2. Create a free tier account
3. Create an S3 bucket
4. Create IAM credentials with S3 access
5. Add the credentials to your `.env` file

**Option B:** Use placeholder values for now (blog images won't load)

### 7.5 Cloudflare Turnstile Setup (Optional for Development)

The contact forms use Cloudflare Turnstile for CAPTCHA. For development:

**Option A:** Get free Turnstile keys
1. Go to [cloudflare.com/products/turnstile](https://www.cloudflare.com/products/turnstile/)
2. Sign up and create a site
3. Get your site key and secret key
4. Add them to your `.env` file

**Option B:** Use placeholder values (contact forms won't work)

---

## Step 8: Run Database Migrations

Migrations create the necessary database tables for the project.

### 8.1 Apply Migrations

Make sure your virtual environment is activated and you're in the project directory:

```bash
python manage.py migrate
```

You should see output like:
```
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying pages.0001_initial... OK
  ...
```

### 8.2 Verify Blog Tables

The blog uses specific table names (`blog_blog`, `blog_blogcategory`, etc.). Verify they were created:

```bash
python manage.py dbshell
```

Once in the database shell, run:
```sql
\dt
```

You should see tables like `blog_blog`, `blog_blogcategory`, `blog_blogtag`, etc.

Type `\q` to exit.

---

## Step 9: Create Admin User

Create a superuser account to access the Django admin panel:

```bash
python manage.py createsuperuser
```

You'll be prompted for:
- **Username:** (e.g., `admin`)
- **Email address:** (optional, press Enter to skip)
- **Password:** (you won't see characters as you type - this is normal)
- **Password confirmation**

Remember these credentials - you'll use them to log in to the admin panel!

---

## Step 10: Install CORS Unblock Extension (for Stripe)

If you plan to test Stripe payment integration locally, you'll need a CORS unblock extension.

### 10.1 For Chrome/Edge

1. Go to the Chrome Web Store
2. Search for "CORS Unblock" or "Allow CORS"
3. Install one of these extensions:
   - "Allow CORS: Access-Control-Allow-Origin"
   - "CORS Unblock"

### 10.2 For Firefox

1. Go to Firefox Add-ons
2. Search for "CORS Everywhere" or "CORS Unblock"
3. Install the extension

### 10.3 Usage

- Keep the extension **disabled** by default
- Only **enable it** when testing Stripe payment features locally
- **Disable it** when browsing other websites (security best practice)

---

## Step 11: Run the Development Server

You're ready to run the project!

### 11.1 Start the Server

```bash
python manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### 11.2 Access the Website

Open your web browser and visit:

- **Homepage:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- **Blog:** [http://127.0.0.1:8000/blog/](http://127.0.0.1:8000/blog/)
- **Admin Panel:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

Log in to the admin panel with the superuser credentials you created in Step 9.

### 11.3 Stop the Server

To stop the server, press:
- **Windows:** `Ctrl + Break` or `Ctrl + C`
- **macOS/Linux:** `Ctrl + C`

---

## Troubleshooting

### Problem: "No module named 'django'"

**Solution:** Make sure your virtual environment is activated. You should see `(venv)` at the start of your command prompt.

```bash
# Activate it again
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
```

---

### Problem: "FATAL: password authentication failed for user"

**Solution:** Check your database credentials in `.env` file match what you created in PostgreSQL.

```bash
# Test connection manually
psql -U ventureplanner_user -d ventureplanner3_db -h localhost
# Enter your password when prompted
```

---

### Problem: "django.db.utils.OperationalError: could not connect to server"

**Solution:** PostgreSQL service is not running.

**Windows:**
- Open Services app → Find PostgreSQL → Right-click → Start

**macOS:**
```bash
brew services start postgresql@15
```

**Linux:**
```bash
sudo systemctl start postgresql
```

---

### Problem: "Blog page loads but shows no posts"

**Solution:** You need to create blog posts via the admin panel.

1. Go to [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
2. Log in with your superuser credentials
3. Click "Blogs" → "Add Blog"
4. Fill in the fields (title, article, etc.)
5. **Important:** Uncheck "Draft" to publish the post
6. Save

---

### Problem: "Blog images not loading"

**Solution:** This happens if AWS S3 is not configured. You have two options:

**Option A:** Set up AWS S3 (see Step 7.4)

**Option B:** Configure local media storage (temporary workaround):
1. Edit `settings.py`
2. Comment out the S3 storage lines (lines 100-110)
3. Add: `MEDIA_ROOT = BASE_DIR / 'media'`

---

### Problem: "python: command not found"

**Solution:**
- **Windows:** Use `py` instead of `python`
- **macOS/Linux:** Use `python3` instead of `python`

---

### Problem: Port 8000 already in use

**Solution:** Either stop the other process using port 8000, or run Django on a different port:

```bash
python manage.py runserver 8080
```

Then visit [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

---

## Common Commands

Here's a quick reference of commands you'll use frequently:

### Activate Virtual Environment
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### Run Development Server
```bash
python manage.py runserver
```

### Create Database Migrations (after model changes)
```bash
python manage.py makemigrations
```

### Apply Migrations
```bash
python manage.py migrate
```

### Access Django Shell (Python shell with Django loaded)
```bash
python manage.py shell
```

### Access Database Shell (PostgreSQL command line)
```bash
python manage.py dbshell
```

### Create Superuser
```bash
python manage.py createsuperuser
```

### Collect Static Files (for production)
```bash
python manage.py collectstatic
```

---

## Project Structure

```
ventureplanner-website-v3/
│
├── manage.py                 # Django management script
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables (create this!)
├── .gitignore               # Files to ignore in version control
├── README.md                # This file
│
├── ventureplanner3/         # Main project settings
│   ├── settings.py          # Django settings
│   ├── urls.py              # URL routing
│   └── wsgi.py              # WSGI config for deployment
│
├── pages/                   # Main app
│   ├── models.py            # Database models (Blog, etc.)
│   ├── views.py             # View functions
│   ├── urls.py              # App URL routing
│   ├── forms.py             # Contact forms
│   ├── context_processors.py  # Template context
│   └── management/          # Custom management commands
│
├── templates/               # HTML templates
│   ├── base.html
│   ├── pages/               # Page templates
│   └── partials/            # Reusable components
│
└── static/                  # Static files (CSS, JS, images)
    ├── css/
    ├── js/
    ├── images/
    └── fonts/
```

---

## Next Steps

Now that you have the project running:

1. **Explore the Admin Panel:** Create blog posts, categories, tags, and authors
2. **Customize Content:** Update pages, images, and text to match your needs
3. **Read CLAUDE.md:** For detailed developer documentation
4. **Set up AWS S3:** For proper media file handling
5. **Configure Email:** Set up SMTP for contact form functionality

---

## Getting Help

- **Project Issues:** [GitHub Issues](https://github.com/DanielClarkeDM/ventureplanner-website-v3/issues)
- **Django Documentation:** [docs.djangoproject.com](https://docs.djangoproject.com/)
- **PostgreSQL Help:** [postgresql.org/docs](https://www.postgresql.org/docs/)

---

## License

[Add your license information here]

---

## Contributors

[Add contributor information here]

---

**Happy coding! 🚀**
