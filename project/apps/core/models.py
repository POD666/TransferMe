import moneyed
from djmoney.models.fields import MoneyField
from django.db import models


class Place(models.Model):
    title = models.CharField(max_length=255, default='')

    def __unicode__(self):
        return self.title