from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

# Create your views here.
class HealthView(APIView):
    permission_classes = [AllowAny]

    def get(self, response):
        return Response({"status": "ok"}, status=status.HTTP_200_OK)