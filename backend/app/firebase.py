import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK with service account credentials
# The service account key provides authentication for server-side operations
cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Create a Firestore client instance to interact with the database
db = firestore.client()
