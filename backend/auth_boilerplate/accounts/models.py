from django.db import models

# Create your models here.

from django.db import models

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)

# Custom User model needs to contain only auth stuff, extra profile data should be handled by a different model with foreign key attached to the user model



class CustomUserManager(BaseUserManager):
    # a custom user manager is required --> we inherit the BaseUserMangager as UserManager class is used by default django auth -> we can't inherit that
    def create_user(self, email, password=None, **extra_fields):
            if not email:
                raise ValueError('The Email field must be set')
            email = self.normalize_email(email)
            user = self.model(email=email, **extra_fields)
            user.set_password(password)
            user.save(using=self._db)  # ✅ FIXED
            return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)  # ✅ FORCE ACTIVE

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

# don't inherit from AbstractUser --> it has username as default
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField()
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)  # ✅ Add this!

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email