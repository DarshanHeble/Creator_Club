"""
Firebase Configuration Module

This module initializes the Firebase Admin SDK and provides a Firestore client
for database operations throughout the application. The SDK is initialized with
service account credentials stored in serviceAccountKey.json.
"""

import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK with service account credentials
# The service account key provides authentication for server-side operations
# and must be kept secure and never committed to version control
cred = credentials.Certificate("app/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Create a Firestore client instance to interact with the database
# This client is thread-safe and should be reused across the application
db = firestore.client()