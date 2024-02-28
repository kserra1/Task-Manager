from app import app, db
from flask import request, jsonify, session
from app.models import User, Task
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user
from app import login_manager
from flask_session import Session
#server_session = Session(app)


@app.route("/")
def index():
    return "Hello, World!"


@app.route('/create_user', methods=['POST'])
def create_user():
    print("received request")
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400


    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


@app.route("/@me")
def get_current_user():
   # user_id=session.get('user_id')
    if not user_id:
        return jsonify({'error': 'User not logged in'}), 400
   # user = User.query.filter_by(id=user_id).first()
    return jsonify({
        'id': user.id,
        'username': user.username
    }), 200



@app.route('/api/login', methods=['POST'])
def login():
    print("LOGIN RECIEVED")
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()
    print(current_user, "user")
    if user and check_password_hash(user.password, password):
     #   session['user_id'] = user.id
        login_user(user)
        print(current_user, "current user")
     #   print(session.get('user_id', "this one has to be right"))
        return jsonify({'message': 'User logged in successfully'}), 200
    
    else:
        return jsonify({'error': 'Invalid credentials'}), 401



@app.route('/api/tasks', methods=['GET'])
#@login_required
def get_tasks():
    print(current_user, "current get user")
    print(session.get('user_id', "usere didddd jeez"))
    tasks=Task.query.filter_by(user_id=session.get('user_id')).all()
    task_list = []
    for task in tasks:
        task_list.append({'id': task.id, 'text': task.text, 'completed': task.completed})
    return jsonify({'tasks': task_list}), 200

@app.route('/api/tasks', methods=['POST'])
#@login_required
def create_task():
    data = request.get_json()
    text = data.get('text')
    print(text)
    if not text:
        return jsonify({'error': 'Text required'}), 400
    new_task = Task(user_id=session.get('user_id'), text=text, completed=False)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task created successfully'}), 201
