# Generated by Django 3.2.5 on 2021-07-26 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_employee_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='profile_pic',
            field=models.ImageField(blank='true', upload_to='images/<django.db.models.fields.CharField>'),
        ),
    ]
