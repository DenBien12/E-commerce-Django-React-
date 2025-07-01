from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from base.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),
    path('<str:pk>/', views.getOrderbyID, name='user-order'),
    path('', views.getOrders, name='orders'),

    path('<str:pk>/deliver/', views.updateOrderToDeliverd, name='deliver'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]