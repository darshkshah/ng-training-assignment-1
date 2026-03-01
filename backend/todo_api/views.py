from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.pagination import PageNumberPagination

from .serializers import TaskSerializer
from .models import Task

# Create your views here.
class TaskCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.order_by("id")
    serializer_class = TaskSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 16
    pagination_class.page_size_query_param = "size"
    pagination_class.max_page_size = 1000

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class IsOwnerOrSuperUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            obj.created_by == request.user
            or request.user.is_superuser
        )

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrSuperUser]
    queryset = Task.objects.all()

