from mongoengine import Document, DateTimeField, IntField, StringField

class BaseHealthData(Document):
    date = DateTimeField(required=True)

    meta = {
        'abstract': True,
        'ordering': ['-date']
    }

class Insulina(BaseHealthData):
    value = IntField(required=True)
    
    meta = {
        'collection': 'insulina'
    }

class Pressao(BaseHealthData):
    momento = StringField(max_length=50, required=True)
    systolic = IntField(required=True, min_value=50, max_value=250)
    diastolic = IntField(required=True, min_value=30, max_value=150)
    pulso = IntField(required=True, min_value=30, max_value=200)
    
    meta = {
        'collection': 'pressao'
    }