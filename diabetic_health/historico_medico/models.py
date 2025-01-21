from mongoengine import Document, EmbeddedDocument, fields, DateTimeField, IntField, StringField


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
    momento = StringField(max_length=200)
    pulso = IntField()  
    value = fields.EmbeddedDocumentField(BloodPressure, required=True)
    meta = {
        'collection': 'pressao' 
    }

