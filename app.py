from flask import Flask, render_template, request, redirect, url_for, session, flash
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

# MongoDB setup
MONGO_URI = os.getenv("MONGO_URI")  # set in Render environment
client = MongoClient(MONGO_URI)
db = client['user_db']
users_col = db['users']
contacts_col = db['contacts']

# Login route
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = users_col.find_one({'username': username})
        if user and check_password_hash(user['password'], password):
            session['user'] = username
            return redirect(url_for('dashboard'))
        else:
            flash("Invalid username or password")
    return render_template('login.html')

# Dashboard route
@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        action = request.form['action']
        name = request.form.get('name')
        email = request.form.get('email')

        if action == 'add':
            if name and email:
                contacts_col.insert_one({'name': name, 'email': email})
                flash("Contact added!")
        elif action == 'find':
            contact = contacts_col.find_one({'name': name})
            if contact:
                flash(f"Found: {contact}")
            else:
                flash("Contact not found")
        elif action == 'delete':
            result = contacts_col.delete_one({'name': name})
            if result.deleted_count:
                flash("Contact deleted!")
            else:
                flash("Contact not found")
    
    contacts = list(contacts_col.find())
    return render_template('dashboard.html', contacts=contacts)

# Logout
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
