from django.db import models
from django.contrib.auth.models import User

# copied from drf_api lessons with minor adjustments
class Follower(models.Model):
    """
    Follower model, related to 'owner' and 'followed'.
    'owner' is a User that is following a User.
    'followed' is a User that is followed by 'owner'.
    We need the related_name attribute so that django can differentiate
    between 'owner' and 'followed' who both are User model instances.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed')
    created = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['-created']
        # 'unique_together' makes sure a user can't double follow the same user.
        unique_together = ['owner', 'followed']


    def __str__(self):
        return f'{self.owner} {self.followed}'
   
