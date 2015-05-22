from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import urls, settings

from .api import v1_api

urls.handler404 = 'apps.core.views.index'

urlpatterns = patterns('',

    url(r'^admin/', include(admin.site.urls), name='admin-page'),

    url(r'^api/languages/', 'apps.core.views.languages', name='languages'),
    url(r'^api/car_types/', 'apps.core.views.car_types', name='car_types'),
    url(r'^api/', include(v1_api.urls), name='api-root'),

    url(r'^accounts/', include('allauth.urls')),

	url(r'^test/$', 'apps.core.views.test'),

    url(r'^$', 'apps.core.views.index', name='index'),

)


if 'rosetta' in settings.INSTALLED_APPS:
    urlpatterns += patterns('',
        url(r'^rosetta/', include('rosetta.urls')),
    )
