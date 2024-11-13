from pymongo import MongoClient

uri = "mongodb+srv://tanishpathania:qU3cjQIjvzZC9OpD@cluster0.ex8zy.mongodb.net/"
client = MongoClient(uri)

try:
    database = client.get_database("test")
    users = database.get_collection("users")

    # Query for a user that has the title 'Back to the Future'
    query = { "username": "ab0d3fcfad7f6e361b6755e76c58bf8c22f8755fa731108882a46710448993da" }
    user = users.find_one(query)

    print(user)

    client.close()

except Exception as e:
    raise Exception("Unable to find the document due to the following error: ", e)
