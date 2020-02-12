from django.db import models


# Create your models here.
class UserDetails(models.Model):
    name = models.CharField(max_length=50)
    email_id = models.EmailField()
    mobile_no = models.CharField(max_length=13, null=True)
    role_type = models.CharField(max_length=25)
