from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.exceptions import Unauthorized
from tastypie.validation import Validation
from tastypie import fields

from apps.core.api import PlaceResource
from .models import Request, Offer

class RequestNOfferResourceAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        return object_list

    def read_detail(self, object_list, bundle):
        return True

    def create_list(self, object_list, bundle):
        return object_list

    def create_detail(self, object_list, bundle):
        return bundle.request.user.is_authenticated()

    def update_list(self, object_list, bundle):
        allowed = []
        for obj in object_list:
            if obj.id == bundle.request.user.id:
                allowed.append(obj)
        return allowed

    def update_detail(self, object_list, bundle):
        print "check123"
        if bundle.obj.user.id == bundle.request.user.id:
            return True
        else:
            return Unauthorized("You can edit only your user info.")

    def delete_list(self, object_list, bundle):
        raise Unauthorized("Sorry, no deletes.")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("Sorry, no deletes.")

####################################################################
################# Resource region ##################################
####################################################################

class RequestResource(ModelResource):
    user = fields.ToOneField('apps.dashboard.api.UserResource', 'user', full=True)
    place_from = fields.ToOneField(PlaceResource, 'place_from', full = True)
    place_to = fields.ToOneField(PlaceResource, 'place_to', full = True)

    class Meta:
        queryset = Request.objects.all()
        resource_name = 'requests'
        allowed_methods = ['get', 'post', 'put']
        always_return_data = True

        authentication = Authentication()
        authorization = RequestNOfferResourceAuthorization()
        validation = Validation()

        filtering = {
            'place_from': ALL_WITH_RELATIONS,
            'place_to': ALL_WITH_RELATIONS,
            'user': ALL_WITH_RELATIONS,
            'car_type':ALL,
            'currency':ALL,
            'price':ALL,
            'date_from':ALL,
            'date_to':ALL,
            'is_baby_seat':ALL,
            'is_roof_rack':ALL,
            'is_closed':ALL,
            'is_wifi':ALL,
            'places_count':ALL,
        }
    def hydrate_user(self, bundle):
        bundle.obj.user = bundle.request.user
        return bundle

class OfferResource(ModelResource):
    user = fields.ToOneField('apps.dashboard.api.UserResource', 'user', full=True)
    place_from = fields.ToOneField(PlaceResource, 'place_from', full = True)
    place_to = fields.ToOneField(PlaceResource, 'place_to', full = True)

    class Meta:
        queryset = Offer.objects.all()
        resource_name = 'offers'
        allowed_methods = ['get', 'post', 'put']
        always_return_data = True
        
        authentication = Authentication()
        authorization = RequestNOfferResourceAuthorization()
        validation = Validation()

        filtering = {
            'place_from': ALL_WITH_RELATIONS,
            'place_to': ALL_WITH_RELATIONS,
            'user': ALL_WITH_RELATIONS,
            'car_type':ALL,
            'currency':ALL,
            'price':ALL,
            'date_from':ALL,
            'date_to':ALL,
            'is_baby_seat':ALL,
            'is_roof_rack':ALL,
            'is_closed':ALL,
            'is_wifi':ALL,
            'places_count':ALL,
        }
    def hydrate_user(self, bundle):
        bundle.obj.user = bundle.request.user
        return bundle