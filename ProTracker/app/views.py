from django.shortcuts import render
from .models import Task
# Create your views here.
from django.http import HttpResponse


def taskView(request, id):

    set_of_tasks = Task.objects.order_by('-id').filter(assigned_to=id)
    tasks, completed = [], []
    for name in set_of_tasks:
        if name.status:
            completed.append(name)
        else:
            tasks.append(name)
    context = {
        'tasks': tasks,
        'completed': completed,
    }
    return render(request, 'app/taskpage.html', context)