# app.py
import google.generativeai as genai
from flask import Flask, render_template, request, jsonify
import os

# Configure Gemini API (using environment variable is recommended)
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    # Fallback for development (replace with your actual key, but avoid committing this)
    GOOGLE_API_KEY = "YOUR_GEMINI_API_KEY"
    print("Warning: Using API key directly in code. Use environment variable in production.")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('models/gemini-1.5-pro-latest')

app = Flask(__name__)

def generate_response(prompt):
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating response: {e}"

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/get_response", methods=['POST'])
def get_response():
    user_query = request.form['user_query']
    prompt = f"""You are a helpful AI job portal chatbot. Respond to user queries related to job searching, career advice, and information typically found on a job portal.

    User Query: {user_query}
    """
    ai_response = generate_response(prompt)
    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(debug=True)