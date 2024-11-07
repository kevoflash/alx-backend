#!/usr/bin/env python3
"""
Mock loggin in
"""

from typing import Union, Dict
from flask import Flask, request, render_template, g
from flask_babel import Babel
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user(login_as) -> Union[Dict, None]:
    if login_as is None:
        return None
    user = users.get(login_as)
    if user is None:
        return None
    return user


@app.before_request
def before_request() -> None:
    user = get_user(request.args.get("login_as"))
    g.user = user


@app.route("/")
def index() -> str:
    """
    display a welcome message otherwise display a default
    """
    return render_template("5-index.html")
