from django.shortcuts import render, redirect
from .models import Task, Employee, Manager
# Create your views here.

from django.http import HttpResponse, JsonResponse


def login(request):
    return render(request, 'app/login.html')




def logout(request, username):
    return redirect('/login')


def redirection(request):
    print("hiiiiiiii")
    return redirect('/login')


def taskView(request, username):
    print("Im in task")

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
    print("context",context)
    return render(request, 'app/taskpage.html', context)


def verify(request):

    if request.method == 'GET':
        return redirect('/login')
    elif request.method == 'POST':
        if request.POST.get('roleType') == "employee":
            try:
                print("request",request.POST.get('username'))
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

def assigntask(request,username):
    print("request",username)
    username=(list(username.split(",")))
    # print("request",username)
    if request.method == 'GET':
        print("im coming",request.POST.get('taskassign'))
        name=username[0]
        print("Employe",username[1])
        Employe=Employee.objects.get(name=username[1])
        
        obj=Task()
        obj.assigned_to=Employe
        obj.title=username[0]
        obj.save()
        return HttpResponse('task ')
    #     set_of_tasks = Task.objects.order_by(
    #     '-id').filter(assigned_to=Employe)
    #     dict_of_tasks = {}
    #     for task in set_of_tasks:
    #         taskid = "task"+str(task.id)
    #         dict_of_tasks[taskid] = [task.title,
    #                              task.date_created.strftime("%B %d, %Y, %I:%M %p")]

    # # July 19, 2021, 4:32 p.m
    #     print("k",dict_of_tasks)
    #     return JsonResponse(dict_of_tasks)

     



def changeTask(request, username, task_id):
    print("immmmmmmm")
    status = Task.objects.get(pk=task_id[4:])
    status.completed = not(status.completed)
    status.save()
    return HttpResponse('Task number: {task_id[4:]} of User: {username} has been switched')


def deleteTask(request, username, task_id):

    task = Task.objects.get(pk=task_id[4:])
    task.delete()
    return HttpResponse('Task number: {task_id[4:]} of User: {username} has been deleted')


def refresh(request, username):
    print("iiiiiiiiiiiiiiii")
    set_of_tasks = Task.objects.order_by(
        '-id').filter(assigned_to=username)
    dict_of_tasks = {}
    for task in set_of_tasks:
        taskid = "task"+str(task.id)
        dict_of_tasks[taskid] = [task.title,
                                 task.date_created.strftime("%B %d, %Y, %I:%M %p")]

    # July 19, 2021, 4:32 p.m
    print("k",dict_of_tasks)
    return JsonResponse(dict_of_tasks)


def manager(request, username):
    employees = Employee.objects.filter()
    data=[]
    task=[]
    # for i in employees:
    #     set_of_tasks = Task.objects.order_by(
    #     '-id').filter(assigned_to=i).values('title','assigned_to')
    #     res = {}
    #     for sub in set_of_tasks:
    #         for key, val in sub.items(): 
    #             res.setdefault(key, []).append(val)
    #     data.append(i)
    #     task.append(res)
    for i in employees:
        data.append(i)
        
    
    employe={
        "names":data,
        "task":task
    }
    print ("employees",employe)

    # employees = Employee.objects.filter()
    # print("em",employees)
    # for i in employees:
    
    #     set_of_tasks = [Task.objects.filter(assigned_to=i).values('assigned_to','title')]
    #     a=json.dumps(list(set_of_tasks))
    #     print("set_of_tasks",a)


    # employe={
    #     "names":set_of_tasks,
    # #     "task":task
    # }
    # print("hi",employe)

    return render(request, 'app/manager.html',employe)


def activetask(request,username):
    print("Im in task")
    user=Employee.objects.get(name=username)
    set_of_tasks = Task.objects.filter(assigned_to=user.username)
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
    print("context",context)
    return render(request, 'app/manager.html', context)
    
