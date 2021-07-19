from django.shortcuts import render, redirect
from .models import Task, Employee, Manager
# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect


def login(request):
    return render(request, 'app/login.html')


def logout(request, username):
    return redirect('/login')


def redirection(request):
    return redirect('/login')


def taskView(request, username):

    set_of_tasks = Task.objects.order_by('-id').filter(assigned_to=username)
    tasks, completed = [], []
    for name in set_of_tasks:
        if name.completed:
            completed.append(name)
        else:
            tasks.append(name)
    context = {
        'tasks': tasks,
        'completed': completed,
    }
    return render(request, 'app/taskpage.html', context)


def verify(request):

    if request.method == 'GET':
        return redirect('/login')
    elif request.method == 'POST':
        if request.POST.get('roleType') == "employee":
            try:
                person = Employee.objects.get(pk=request.POST.get('username'))
            except:
                return HttpResponse("Wrong username")

            if person.password == request.POST.get(
                    'password'):
                return redirect('/tasks/'+request.POST.get('username'))
            else:
                return HttpResponse("Wrong password")

        elif request.POST.get('roleType') == "manager":
            try:
                person = Manager.objects.get(pk=request.POST.get('username'))
            except:
                return HttpResponse("Wrong username")

            if person.password == request.POST.get('password'):
                # TODO: change this link to the managerial link
                return redirect('/manager/'+request.POST.get('username'))
            else:
                return HttpResponse("Wrong password")


def changeTask(request, username, task_id):

    status = Task.objects.get(pk=task_id[4:])
    status.completed = not(status.completed)
    status.save()
    return HttpResponse(f'Task number: {task_id[4:]} of User: {username} has been switched')


def refresh(request, username):
    set_of_tasks = Task.objects.order_by(
        '-id').filter(assigned_to=username)
    dict_of_tasks = {}
    for task in set_of_tasks:
        taskid = "task"+str(task.id)
        dict_of_tasks[taskid] = [task.title,
                                 task.date_created.strftime("%B %d, %Y, %I:%M %p")]

    # July 19, 2021, 4:32 p.m
    return JsonResponse(dict_of_tasks)


def manager(request, username):
    return render(request, 'app/manager.html')
