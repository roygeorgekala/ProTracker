from django.urls import path

from . import views

urlpatterns = [
    path('tasks/<int:id>/', views.taskView, name='tasks'),
]