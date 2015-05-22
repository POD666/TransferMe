from tastypie.api import Api
from apps.core import api as core_api
from apps.dashboard import api as dashboard_api
from apps.post import api as post_api

v1_api = Api(api_name='v1')

#v1_api.register(dashboard_api.SocialTokenResource())
v1_api.register(dashboard_api.SocialAccountResource())
v1_api.register(dashboard_api.EmailAddressResource())
v1_api.register(dashboard_api.UserProfileResource())
v1_api.register(dashboard_api.UserResource())
v1_api.register(dashboard_api.CarPhotoResource())
v1_api.register(dashboard_api.CarResource())

v1_api.register(core_api.PlaceResource())

v1_api.register(post_api.RequestResource())
v1_api.register(post_api.OfferResource())
