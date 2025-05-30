from django.shortcuts import render
from django.contrib.auth.models import User

from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )
        seerializer = UserSerializerWithToken(user, many=False)
        return Response(seerializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsersProfile(request):
    user = request.user
    serialier = UserSerializer(user, many=False)
    return Response(serialier.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUsersProfile(request):
    user = request.user
    serialier = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
    
    user.save()
    return Response(serialier.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serialier = UserSerializer(users, many=True)
    return Response(serialier.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serialier = UserSerializer(user, many=False)
    return Response(serialier.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    data = request.data
    
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
    
    user.save()
    serialier = UserSerializer(user, many=False)
    return Response(serialier.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
    user.delete()
    return Response('User was deleted')