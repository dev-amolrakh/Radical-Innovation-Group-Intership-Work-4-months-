from flask import Blueprint, render_template
from models import Resume

resume_routes = Blueprint('resume_routes', __name__)

@resume_routes.route('/resume/<int:id>')
def view_resume(id):
    resume = Resume.query.get_or_404(id)
    return render_template('resume.html', resume=resume)
