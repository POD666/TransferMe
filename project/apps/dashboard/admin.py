from django.contrib import admin

from . import models

admin.site.register(models.Car)
admin.site.register(models.CarPhoto)
admin.site.register(models.UserLanguage)
admin.site.register(models.HistoryPost)
admin.site.register(models.HistoryRating)
admin.site.register(models.UserProfile)
