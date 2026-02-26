"""
URL configuration for base project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from health_api.views import HealthView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users_api.views import CookieTokenObtainPairView, CookieTokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', HealthView.as_view(), name="health_api"),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair_api'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh_api'),

    path('api/token/web/', CookieTokenObtainPairView.as_view(), name='cookie_token_obtain_pair_api'),
    path('api/token/refresh/web/', CookieTokenRefreshView.as_view(), name='cookie_token_refresh_api'),

    path('api/users/', include('users_api.urls')),
    path('api/todo/', include('todo_api.urls')),
]
