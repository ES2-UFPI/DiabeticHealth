from mongoengine import Document, EmbeddedDocument, fields, DateTimeField, IntField


class Glicemia(Document):
    date = DateTimeField(required=True)
    value = IntField(required=True)
    meta = {
        'ordering': ['-date'],
        'collection': 'glicemia'  
    }

class BloodPressure(EmbeddedDocument):
    systolic = IntField(required=True)
    diastolic = IntField(required=True)

class Pressao(Document):
    date = DateTimeField(required=True)
    value = fields.EmbeddedDocumentField(BloodPressure, required=True)
    meta = {
        'collection': 'pressao'  # Ensure the collection name is set
    }

