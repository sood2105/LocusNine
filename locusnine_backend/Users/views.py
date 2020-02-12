from django.shortcuts import render
from rest_framework import viewsets

from .models import UserDetails
from .serializers import UserDetailsSerializer
# Create your views here.


class UserDetailsView(viewsets.ModelViewSet):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer
