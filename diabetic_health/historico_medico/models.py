from mongoengine import Document, fields, DateTimeField, IntField

class File(Document):
    name = fields.StringField(required=True)
    file = fields.FileField(required=True)
    uploaded_at = fields.DateTimeField(required=True)

class Glicemia(Document):
    date = DateTimeField(required=True)
    value = IntField(required=True)
    meta = {
        'ordering': ['-date'],
        'collection': 'glicemia'  # Ensure the collection name is set
    }
