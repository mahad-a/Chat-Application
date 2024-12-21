from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"User: {self.username}, Status: {'Active' if self.status else 'Inactive'}"
