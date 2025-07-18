from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate

class CustomLoginView(APIView):
    def post(self, request):
        
        email = request.data.get('email')
        password = request.data.get('password')

        # authenticate checks in the db if the given email and password are correct or not
        #! why is request passed
        '''
        Some auth backends might check the request.META (headers).

        Some might check the request to rate-limit or log IP addresses.

        Some custom backends might even look for extra data in the request (like 2FA tokens).
        
        so for safer side pass it
        '''
        user = authenticate(request, email=email, password=password)
        if user is not None:
            res = Response({'message': 'Login successful'})
            # for user method is inherited from Token class --> returns a token here two tokens
            refresh = RefreshToken.for_user(user)
            res.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,
                secure=True,  # True in production
                samesite='Lax'
            )
            res.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite='Lax'
            )
            return res
        return Response({'error': 'Invalid credentials'}, status=400)

class CustomLogoutView(APIView):
    def post(self, request):
        res = Response({'message': 'Logged out'})
        res.delete_cookie('access_token')
        res.delete_cookie('refresh_token')
        return res

class CustomRefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({'error': 'No refresh token'}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            res = Response({'message': 'Token refreshed'})
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='Lax'
            )
            return res
        except Exception as e:
            return Response({'error': 'Invalid refresh token'}, status=400)
