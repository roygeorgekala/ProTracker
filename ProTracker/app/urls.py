from django.urls import path

from . import views

urlpatterns = [
    path('', views.redirection, name='redirect'),
    path('login/', views.login, name='login'),
    path('login/verify', views.verify, name='verify'),
    path('tasks/<str:username>/', views.taskView, name='tasks'),
    path('tasks/<str:username>/change/<str:task_id>',
         views.changeTask, name='changeTask'),
    path('tasks/<str:username>/refresh/', views.refresh, name='refresh'),
    path('tasks/<str:username>/logout', views.logout, name='logout'),
    path('manager/<str:username>', views.manager, name='manager'),
]
