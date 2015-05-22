from django.contrib import admin

from . import models

admin.site.register(models.Request)
admin.site.register(models.Offer)
admin.site.register(models.RequestTranstation)
admin.site.register(models.OfferTranstation)
