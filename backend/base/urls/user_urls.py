from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('register/', views.registerUser, name="register"),
    path('profile', views.getUsersProfile, name="users-profile"),
    path('', views.getUsers, name="users"),

    
]