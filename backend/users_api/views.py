from rest_framework import status, generics, views
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import authenticate

from .serializers import UserSerializer, UserReadSerializer
from .models import CustomUser

# Create your views here.
class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserReadSerializer

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message": "success", 
            "detail": "user registered"
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckUserLoggedInView(views.APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response({
                'user_id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'first_name': request.user.first_name,
                'last_name': request.user.last_name,
            })
        return Response({'detail': 'User is not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):
    def post(self, request, *args, **kwargs):
        response = Response({"content": "Logout Success"}, status=status.HTTP_200_OK)
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response

class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code != 200:
            return response
        
        data = response.data

        access = data.get("access")
        refresh = data.get("refresh")

        final_response = Response({"message": "success", "detail": "logged in"}, status=status.HTTP_200_OK)
        final_response.set_cookie(
            key="access",
            value=access,
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=60*60*24*7,
        )

        final_response.set_cookie(
            key="refresh",
            value=refresh,
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=60*60*24*30,
        )

        return final_response
    
class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get("refresh")
        if refresh is None:
            return Response({"detail": "No refresh token"}, status=401)
        
        request.data["refresh"] = refresh
        response = super().post(request, *args, **kwargs)

        if response.status_code != 200 or "access" not in response.data:
            return Response({
                "message": "failed",
                "detail": "refresh token expired",
            }, status=401)
        
        new_access = response.data["access"]

        final_response = Response({"message": "success", "detail": "refreshed"}, status=200)
        
        final_response.set_cookie(
            key="access",
            value=new_access,
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=60*60*24*7,
        )

        return final_response
