from mongoengine import Document, EmbeddedDocument, fields, DateTimeField, IntField, StringField


class Insulina(Document):
    date = DateTimeField(required=True)
    value = IntField(required=True)
    meta = {
        'ordering': ['-date'],
        'collection': 'insulina'  
    }

class Pressao(Document):
    momento = StringField(max_length=50)
    systolic =IntField()
    diastolic = IntField()
    pulso = IntField()