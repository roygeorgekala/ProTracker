from django.db import models
from django.db.models.deletion import SET_NULL
import uuid
from datetime import datetime
import os


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('profiles/', filename)

# Create your models here.


class Manager(models.Model):
    name = models.CharField(max_length=50)
    username = models.CharField(
        max_length=50, primary_key=True)
    password = models.CharField(max_length=50, default='password')


class Employee(models.Model):
    name = models.CharField(max_length=50)
    username = models.CharField(
        max_length=50, primary_key=True)
    password = models.CharField(max_length=50, default='password')
    manager = models.ForeignKey(Manager, on_delete=models.CASCADE)
    profile_pic = models.ImageField(
        upload_to=get_file_path, blank='true')
    role = models.CharField(max_length=50, default="Software Engineer")
    skills = models.CharField(
        max_length=100, default="HTML, CSS, JavaScript, Django")


class Task(models.Model):
    assigned_to = models.ForeignKey(
        Employee, on_delete=models.CASCADE)
    date_created = models.DateTimeField(
        auto_now_add=True)
    title = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)
