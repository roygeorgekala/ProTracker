from django.db import models
from django.db.models.deletion import SET_NULL

# Create your models here.


class Manager(models.Model):
    name = models.CharField(max_length=50)
    username = models.CharField(
        max_length=50, primary_key=True)
    password = models.CharField(max_length=50, default='password')

    def __str__(self):
        return self.name


class Employee(models.Model):
    name = models.CharField(max_length=50)
    username = models.CharField(
        max_length=50, primary_key=True)
    password = models.CharField(max_length=50, default='password')
    manager = models.ForeignKey(Manager, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Task(models.Model):
    assigned_to = models.ForeignKey(
        Employee, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)
