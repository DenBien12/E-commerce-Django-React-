from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from base.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('<str:pk>/', views.getOrderbyID, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]