from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object('app.config.Config')
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

#app.config['JWT_SECRET_KEY']='kieranserra'
#jwt=JWTManager(app)


from app import routes
from flask_migrate import Migrate

migrate = Migrate(app, db)

from app.models import User
@login_manager.user_loader
def load_user(user_id):
    print("attempting to login!!")
    return User.query.get(int(user_id))