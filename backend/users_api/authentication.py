from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access = request.COOKIES.get("access")
        if access is None:
            return None
        validated = self.get_validated_token(access)
        user = self.get_user(validated)
        return (user, validated)