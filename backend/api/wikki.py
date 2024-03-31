import pymongo

# Connect to MongoDB
client = pymongo.MongoClient("localhost", 27017)
db = client.test
collections = db["t2"]

collections.insert_one({"_id" : 1,"name" : "hello"})