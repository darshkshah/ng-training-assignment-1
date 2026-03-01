from django.urls import path

from .views import TaskCreateView, TaskDetailView

urlpatterns = [
    path('tasks/', TaskCreateView.as_view(), name='todo_task_api'),
    path("tasks/<int:pk>/", TaskDetailView.as_view(), name="todo_task_detail_api")
]