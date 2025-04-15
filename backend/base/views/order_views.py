from django.shortcuts import render
from django.http import JsonResponse


from base.models import Product, Order, OrderIterm, ShippingAddress
from django.contrib.auth.models import User
from base.serializers import ProductSerializer, ShippingAddressSerializer, OrderSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

@api_view(['POSt'])
@permission_classes(['IsAuthenticated'])
def addOrderItems(request):
    user = request.user 
    data = request.data

    OrderIterm = data['orderItems']

    if OrderIterm and len(OrderIterm) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_404_NOT_FOUND )
    else:
        #(1) Create order
        order = Order.objects.create(
            user =user,
            paymentMethod=data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice '],
            totalPrice = data['totalPrice']
        )
        #(2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country']
        )

        #(3) Create order items and set order to orderITem relationship
        for i in OrderIterm:
            product =  Product.objects.get(_id=i['product'])

            item  = OrderIterm.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty=i['price'],
                image = product.image.url,
            )
        #(4) Update stock
        product.countInStock -= item.qty
        product.save() 
        serializer = OrderSerializer(order, many=True)

    return Response(serializer.data)
