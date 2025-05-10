# **Creator_Club**

## **Requirements**

**To run this project, you'll need the following:**

1. **Node.js and npm (or yarn):**

   - Download and install the latest version from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)
   - **Verification:**
     Open your terminal or command prompt and type the following commands. The output should indicate the installed versions:

     ```powershell
      node -v
      npm -v
     ```

2. **Python and pip:**
   - Download and install Python from [https://www.python.org/](https://www.python.org/)
   - Install `pip`, the Python package installer, which is usually included with Python.

## **Project Setup**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/DarshanHeble/Creator_Club.git
   ```

   I recommend you to clone this project using github desktop.

2. **Open the Project in Your IDE:**
   - Open the cloned repository in your preferred IDE (e.g., Visual Studio Code, PyCharm).

## **Running the Backend**

1. **Navigate to the `backend` directory within your IDE terminal.**

   ```powershell
   cd backend
   ```

2. **Create and Activate a Virtual Environment(Optional but recommended)**

   - On Windows:

     ```
      python -m venv venv
      venv\Scripts\activate
     ```

   - On macOS/Linux:

     ```
      python3 -m venv venv
      source venv/bin/activate
     ```

3. **Install dependencies:**

   ```powershell
   pip install -r requirements.txt
   ```

4. **Start the FastAPI server:**
   ```powershell
   uvicorn app.main:app --reload
   ```
   This will start the server on `http://127.0.0.1:8000` by default.

## **Running the Frontend**

1. **Navigate to the `frontend` directory within your IDE terminal.**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   This will start the development server and open your default browser.
