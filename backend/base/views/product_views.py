from django.shortcuts import render

from base.models import Product
from django.contrib.auth.models import User

from base.serializers import ProductSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status


from django.contrib.auth.hashers import make_password


@api_view(['GET']) 
def getProducts(request):
    products = Product.objects.all()
    serialier = ProductSerializer(products, many=True)
    return Response(serialier.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serialier = ProductSerializer(product, many=False)
    return Response(serialier.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price = 0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description='',
    )
    serialier = ProductSerializer(product, many=False)
    return Response(serialier.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.save()
    serialier = ProductSerializer(product, many=False)
    return Response(serialier.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product was deleted!')

