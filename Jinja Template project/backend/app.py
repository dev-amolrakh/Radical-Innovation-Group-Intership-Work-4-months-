from flask import Flask, render_template, request, jsonify
from models import db, Resume
from flask_cors import CORS
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/resume_builder'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()  # Initialize the database and create tables

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/resume', methods=['POST'])
def create_resume():
    data = request.get_json()
    new_resume = Resume(**data)
    db.session.add(new_resume)
    db.session.commit()
    return jsonify(new_resume.to_dict())

if __name__ == '__main__':
    app.run(debug=True)
