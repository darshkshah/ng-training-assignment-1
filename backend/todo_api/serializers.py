from rest_framework import serializers
from .models import Task

from users_api.serializers import UserReadSerializer
from users_api.models import CustomUser

class TaskSerializer(serializers.ModelSerializer):
    created_by = UserReadSerializer(read_only=True)
    assigned_to = UserReadSerializer(read_only=True)

    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        source='assigned_to',
        write_only=True
    )

    class Meta:
        model = Task
        fields = '__all__'
