from django.db import models
from datetime import date

from users_api.models import CustomUser

# Create your models here.
class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.PROTECT,
        related_name='tasks_created',
        verbose_name='Created By'
    )

    assigned_to = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='tasks_assigned',
        verbose_name='Assigned To'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    due_date = models.DateField(
        default=date.today
    )

    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='medium'
    )

    comments = models.TextField(blank=True, null=True)
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} - {self.status} - {self.due_date}"
    
    class Meta:
        ordering = ['-created_at']
