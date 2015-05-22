from django.conf.urls import url
from tastypie.resources import ModelResource
from haystack.query import SearchQuerySet
from tastypie.utils import trailing_slash

from .models import Place


class PlaceResource(ModelResource):
    class Meta:
        queryset = Place.objects.all()
        resource_name = 'places'

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/autocomplete%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('get_autocomplete'), name="api_get_search"),
        ]

    def get_autocomplete(self, request, **kwargs):
        self.method_check(request, allowed=['get'])

        title = request.GET.get('title', '')
        count = request.GET.get('count', '')
        if title == '':
            title = '_'
        if count == '':
            count = 100
        sqs = SearchQuerySet().autocomplete(title=title)[:count]

        objects = []

        for result in sqs:
            bundle = self.build_bundle(obj=result.object, request=request)
            bundle = self.full_dehydrate(bundle)
            objects.append(bundle)

        object_list = {
            'objects': objects,
        }

        self.log_throttled_access(request)
        return self.create_response(request, object_list)
