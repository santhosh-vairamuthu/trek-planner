from app.configs.base_config import BaseConfig

class Configuration(BaseConfig):
    DEBUG = True

    DB_URI = 'mysql+pymysql://root:1234@localhost/trek' 
