from django.urls import path

from . import views

urlpatterns = [
    path('',views.redirection,name='redirect'),
    path('login/', views.login, name='login'),
    path('login/verify', views.verify, name='verify'),
    path('tasks/<int:id>/testing', views.testing, name='test'),
    path('tasks/<int:id>/', views.taskView, name='tasks'),
]