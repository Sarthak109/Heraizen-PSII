from flask import Flask,jsonify,request
from flask_restful import Api,Resource
from flask.json import JSONEncoder
import surveydb as dbs
from security import authenticate,identity
from flask_jwt import JWT, jwt_required,current_identity
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'app@123!'
jwt = JWT(app,authenticate,identity)
api = Api(app)
CORS(app)


@app.route('/addSurvey',methods=["POST"])
def add_new_survey():
    survey=request.json
    # print(request.json)
    dbs.add_survey(survey)
    return "done"

# app.run(port=5000)
