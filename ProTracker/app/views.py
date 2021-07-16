from django.shortcuts import render, redirect
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


def testing(request, id):
    return HttpResponse("Hello this is a test from " + str(id))


def login(request):
    return render(request,'app/login.html')


def redirection(request):
    return redirect('/login')
