import datetime
from django.db import models
from django.conf import settings


class Post(models.Model):
    user = models.ForeignKey('auth.User')
    
    title = models.CharField(max_length=40, default='Title')
    description = models.TextField(default='', blank=True)

    price = models.FloatField(default=0.0)
    currency = models.CharField(max_length=4, default='$')
    is_baby_seat = models.BooleanField(default=False)
    is_roof_rack = models.BooleanField(default=False)
    is_wifi = models.BooleanField(default=False)
    car_type = models.IntegerField(max_length=255, default=1, choices=settings.CAR_TYPES)

    place_from = models.ForeignKey('core.Place', related_name='%(class)s_place_from')
    place_to = models.ForeignKey('core.Place', related_name='%(class)s_place_to')
    
    is_closed = models.BooleanField(default=False)

    class Meta:
        abstract = True


class Request(Post):
    date_to = models.DateTimeField(default=datetime.datetime(2015, 1, 1, 1, 0, 0, 0))
    date_from = models.DateTimeField(default=datetime.datetime(2015, 1, 1, 1, 0, 0, 0))
    number_of_people = models.IntegerField(default=1)

    def __unicode__(self):
        return str(self.pk) + ': ' + self.place_from.title + ' - ' + self.place_to.title


class Offer(Post):
    car = models.ForeignKey('dashboard.Car', null=True, blank=True)
    
    car_brand = models.CharField(max_length=255, default='BMW')
    car_model = models.CharField(max_length=255, default='i8')

    places_count = models.IntegerField(default=4)
    places_last = models.IntegerField(default=0)

    def __unicode__(self):
        return str(self.pk) + ': ' + self.place_from.title + ' - ' + self.place_to.title


class PostTranstation(models.Model):
    language = models.CharField(max_length=4, choices=settings.LANGUAGES)
    title = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=255, default='')

    class Meta:
        abstract = True


class RequestTranstation(PostTranstation):
    post = models.ForeignKey(Request)

    def __unicode__(self):
        return str(self.language) + ': ' + self.title


class OfferTranstation(PostTranstation):
    post = models.ForeignKey(Offer)

    def __unicode__(self):
        return str(self.language) + ': ' + self.title


class PostReservation(models.Model):

    STATUS_CHOICES = (
        (1, 'Waiting'),
        (2, 'Confirmed'),
        (3, 'Rejected'),
    )

    user = models.ForeignKey('auth.User')
    number_of_people = models.IntegerField()
    status = models.IntegerField(choices=STATUS_CHOICES)

    class Meta:
        abstract = True

class RequestReservation(PostReservation):
    post = models.ForeignKey(Request)

    def __unicode__(self):
        return str(self.post) + ': ' + self.status


class OfferReservation(PostReservation):
    post = models.ForeignKey(Offer)

    def __unicode__(self):
        return str(self.post) + ': ' + self.status
