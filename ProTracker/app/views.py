from django.shortcuts import render, redirect
from .models import Task, Employee, Manager
from datetime import datetime
# Create your views here.

from django.http import HttpResponse, JsonResponse


def login(request):
    return render(request, 'app/login.html')


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
    print("context", context)
    return render(request, 'app/taskpage.html', context)


def verify(request):

    if request.method == 'GET':
        return redirect('/login')
    elif request.method == 'POST':
        if request.POST.get('roleType') == "employee":
            try:
                print("request", request.POST.get('username'))
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
                return redirect('/manager/'+request.POST.get('username'))

            else:
                return HttpResponse("Wrong password")


def assigntask(request, username, task):

    if request.method == 'GET':
        assignee = Employee.objects.get(username=username)
        obj = Task()
        obj.assigned_to = assignee
        obj.title = task
        obj.date_created = datetime.now()
        obj.save()
        return HttpResponse(f'task assigned succesfully to {assignee}')


def changeTask(request, username, task_id):
    status = Task.objects.get(pk=task_id[4:])
    status.completed = not(status.completed)
    status.save()
    return HttpResponse(f'Task number: {task_id[4:]} of User: {username} has been switched')


def deleteTask(request, username, task_id):

    task = Task.objects.get(pk=task_id[4:])
    task.delete()
    return HttpResponse(f'Task number: {task_id[4:]} of User: {username} has been deleted')


def refresh(request, username):
    set_of_tasks = Task.objects.filter(assigned_to=username).order_by(
        '-id')
    dict_of_tasks = {}

    for task in set_of_tasks:
        taskid = "task"+str(task.id)
        dict_of_tasks[taskid] = [task.title,
                                 task.date_created.strftime("%B %d, %Y, %I:%M %p")]

    return JsonResponse(dict_of_tasks)


def manager(request, username):
    employees = Employee.objects.filter(manager=username)
    data = []
    task = []

    for i in employees:
        data.append(i)

    employe = {
        "names": data,
        "task": task
    }
    return render(request, 'app/manager.html', employe)


def activetask(request, username):

    # user = Employee.objects.get(name=username)
    # set_of_tasks = Task.objects.filter(assigned_to=user.username)
    # tasks, completed = [], []
    # for name in set_of_tasks:
    #     if name.completed:
    #         completed.append(name)
    #     else:
    #         tasks.append(name)
    # context = {
    #     'tasks': tasks,
    #     'completed': completed,
    # }
    # print("context", context)
    # return render(request, 'app/manager.html', context)

    members = Employee.objects.filter(manager=username)
    context = {}
    for member in members:
        context[member.username] = []
        task_list = Task.objects.filter(assigned_to=member.username)
        for task in task_list:
            context[member.username] += [[task.title, task.completed]]

    return JsonResponse(context)
