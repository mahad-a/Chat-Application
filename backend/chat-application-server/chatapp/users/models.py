from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    status = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        # Hash the password before saving
        if not self.pk:  # Only hash the password on first save (not on update)
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
