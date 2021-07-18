from django.contrib import admin
from.models import Employee, Task, Manager
# Register your models here.


admin.site.register(Manager)
admin.site.register(Employee)
admin.site.register(Task)
