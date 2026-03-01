from django.urls import path

from .views import register_user, UserListView, CheckUserLoggedInView

urlpatterns = [
    path('register/', register_user, name='users_register_api'),
    path('', UserListView.as_view(), name="users_list_api"),
    path('check/me/', CheckUserLoggedInView.as_view(), name="check_me_api")
]