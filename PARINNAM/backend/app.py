# app.py
from flask import Flask
from auth import auth_app

app = Flask(__name__)
app.config['SECRET_KEY'] = '7a748a71e7742a77d69052d1b122e25a'  # Replace with your secret key

# Register the auth blueprint
app.register_blueprint(auth_app)

if __name__ == '__main__':
    app.run(debug=True)
