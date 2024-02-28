import redis
class Config:
    SECRET_KEY='kieranserra'
    SQLALCHEMY_DATABASE_URI='postgresql://kieranserra:@localhost/userloginDB'
    SQLALCHEMY_TRACK_MODIFICATIONS = False  
    #SESSION_COOKIE_HTTPONLY = False
  #  SESSION_TYPE = "redis"
  #  SESSION_PERMANENT = False
 #   SESSION_USE_SIGNER = True
   # SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")