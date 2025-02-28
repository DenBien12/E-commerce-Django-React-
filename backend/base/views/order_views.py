from django.shortcuts import render
from django.http import JsonResponse


from base.models import Product
from django.contrib.auth.models import User

from base.serializers import ProductSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status


from django.contrib.auth.hashers import make_password