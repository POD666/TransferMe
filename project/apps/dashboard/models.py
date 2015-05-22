from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils.encoding import python_2_unicode_compatible
from django.dispatch import receiver
try:
    from django.utils.encoding import force_text
except ImportError:
    from django.utils.encoding import force_unicode as force_text
from allauth.account.signals import user_signed_up
from apps.post.models import Offer, Request
import hashlib
import datetime


class Car(models.Model):
    user = models.ForeignKey('auth.User')
    main_photo = models.ImageField(upload_to='car_main_photo')
    car_type = models.CharField(max_length=255, default='Sport car')
    car_brand = models.CharField(max_length=255, default='BMW')
    car_model = models.CharField(max_length=255, default='i8')
    is_baby_seat = models.BooleanField(default=False)
    is_roof_rack = models.BooleanField(default=False)
    is_wifi = models.BooleanField(default=False)

    def __unicode__(self):
        return self.user.username + ': ' + self.car_brand + ' ' + self.car_model


class CarPhoto(models.Model):
    car = models.ForeignKey(Car)
    photo = models.ImageField(upload_to='car_photos')

    def __unicode__(self):
        return self.photo.name


class UserLanguage(models.Model):
    user = models.ForeignKey('auth.User')
    lang_short = models.CharField(max_length=255, choices=settings.LANGUAGES)

    def __unicode__(self):
        return self.lang_short


class UserHistory(models.Model):
    user = models.ForeignKey('auth.User')
    date_add = models.DateTimeField(default=datetime.datetime(2015, 1, 1, 1, 0, 0, 0))

    class Meta:
        abstract = True


class HistoryPost(UserHistory):
    request = models.ForeignKey(Request, null=True, blank=True)
    offer = models.ForeignKey(Offer, null=True, blank=True)

    def __unicode__(self):
        if self.request:
            return self.request
        else:
            return self.offer


class HistoryRating(UserHistory):
    request = models.ForeignKey(Request, null=True, blank=True)
    offer = models.ForeignKey(Offer, null=True, blank=True)
    vote_count = models.FloatField(default=0)
    comment = models.TextField(default='')

    def __unicode__(self):
        if self.request:
            return self.request
        else:
            return self.offer


@python_2_unicode_compatible
class UserProfile(models.Model):
    """Profile data about a user.
    Certain data makes sense to be in the User model itself, but some
    is more "profile" data than "user" data. I think this is things like
    date-of-birth, favourite colour, etc. If you have domain-specific
    profile information you might create additional profile classes, like
    say UserGeologistProfile.
    """
    user = models.OneToOneField(User, primary_key=True, verbose_name='user', related_name='profile')

    # I oscillate between whether the ``avatar_url`` should be
    # a) in the User model
    # b) in this UserProfile model
    # c) in a table of it's own to track multiple pictures, with the
    #    "current" avatar as a foreign key in User or UserProfile.
    avatar_url = models.CharField(max_length=256, blank=True, null=True)

    dob = models.DateField(verbose_name="dob", blank=True, null=True) #birthday

    is_driver = models.BooleanField(default=False) #role (by chois: driver, client, company etc)

    location = models.CharField(max_length=50, default='Kiev')

    description = models.TextField(default='', blank=True)

    def __str__(self):
        return force_text(self.user.email)

    class Meta():
        db_table = 'user_profile'


@receiver(user_signed_up)
def set_initial_user_names(request, user, sociallogin=None, **kwargs):
    """
    When a social account is created successfully and this signal is received,
    django-allauth passes in the sociallogin param, giving access to metadata on the remote account, e.g.:
 
    sociallogin.account.provider  # e.g. 'twitter' 
    sociallogin.account.get_avatar_url()
    sociallogin.account.get_profile_url()
    sociallogin.account.extra_data['screen_name']
 
    See the socialaccount_socialaccount table for more in the 'extra_data' field.

    From http://birdhouse.org/blog/2013/12/03/django-allauth-retrieve-firstlast-names-from-fb-twitter-google/comment-page-1/
    """

    preferred_avatar_size_pixels=256

    picture_url = "http://www.gravatar.com/avatar/{0}?s={1}".format(hashlib.md5(user.email.encode('UTF-8')).hexdigest(), preferred_avatar_size_pixels)
 
    if sociallogin:
        # Extract first / last names from social nets and store on User record
        if sociallogin.account.provider == 'twitter':
            name = sociallogin.account.extra_data['name']
            user.first_name = name.split()[0]
            user.last_name = name.split()[1]
 
        if sociallogin.account.provider == 'facebook':
            user.first_name = sociallogin.account.extra_data['first_name']
            user.last_name = sociallogin.account.extra_data['last_name']
            #verified = sociallogin.account.extra_data['verified']
            picture_url = "http://graph.facebook.com/{0}/picture?width={1}&height={1}".format(
                sociallogin.account.uid, preferred_avatar_size_pixels)
 
        if sociallogin.account.provider == 'google':
            user.first_name = sociallogin.account.extra_data['given_name']
            user.last_name = sociallogin.account.extra_data['family_name']
            #verified = sociallogin.account.extra_data['verified_email']
            picture_url = sociallogin.account.extra_data['picture']
 
    profile = UserProfile(user=user, avatar_url=picture_url)
    profile.save()

    user.save()
