from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


# following profile was based on drf_api lessons, but has been modified
class Profile(models.Model):
    # Profile model, related to User model
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    name = models.CharField(max_length=150, blank=True)
    # setting date on creation
    created = models.DateTimeField(auto_now_add=True)
    # setting date whenever modified
    modified = models.DateTimeField(auto_now=True)
    avatar = models.ImageField(
        upload_to='images/', default='../default_avatar_x7nup7'
    )

    # ordering
    class Meta:
        ordering = ['-created']

    # returning a human-readable form
    def __str__(self):
        return self.owner.username


# based on https://docs.djangoproject.com/en/3.2/ref/signals/
def create_profile(sender, instance, created, **kwargs):
    # If created evaluates to True, creates profile
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_profile, sender=User)