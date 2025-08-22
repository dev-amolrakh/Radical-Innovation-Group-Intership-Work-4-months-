from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    experience = db.Column(db.Text, nullable=False)
    education = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "summary": self.summary,
            "experience": self.experience,
            "education": self.education,
        }
