#!/usr/bin/env python3
"""
Single route to display hello world
"""

from flask import Flask
from flask import render_template


app = Flask(__name__)


@app.route("/")
def index():
    """Returns a template"""
    return render_template("0-index.html", title="Home")
