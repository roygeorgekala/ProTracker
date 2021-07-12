from django.db import models

# Create your models here.


class Employee(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Task(models.Model):
    assigned_to = models.ForeignKey(Employee,on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50)
    status = models.BooleanField(default=False)

