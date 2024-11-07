#!/usr/bin/env python3
"""
Parametrize Temlates
"""

from flask import Flask, render_template
from flask_babel import Babel, gettext, _


app = Flask(__name__)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """Get locale"""
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route("/")
def index() -> str:
    """Index page"""
    return render_template("3-index.html")
