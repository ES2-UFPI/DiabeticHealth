# Generated by Django 4.1.13 on 2024-11-22 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Alimento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('calorias', models.FloatField(blank=True, null=True)),
                ('carboidratos', models.FloatField(blank=True, null=True)),
                ('proteinas', models.FloatField(blank=True, null=True)),
                ('gorduras', models.FloatField(blank=True, null=True)),
                ('categoria', models.CharField(blank=True, max_length=50, null=True)),
                ('indice_glicemico', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]