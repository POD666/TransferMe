from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL
from tastypie.exceptions import Unauthorized
from tastypie.validation import Validation
from tastypie import fields

from django.contrib.auth.models import User
from allauth.account.models import EmailAddress
from allauth.socialaccount.models import SocialAccount, SocialToken
from .models import UserProfile, Car, CarPhoto
from apps.post.api import OfferResource, RequestResource

class UserResourceAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        return object_list

    def read_detail(self, object_list, bundle):
        return True

    def create_list(self, object_list, bundle):
        return Unauthorized("User cannt be created via api.")

    def create_detail(self, object_list, bundle):
        return Unauthorized("User cannt be created via api.")

    def update_list(self, object_list, bundle):
        allowed = []
        for obj in object_list:
            if obj.id == bundle.request.user.id:
                allowed.append(obj)
        return allowed

    def update_detail(self, object_list, bundle):
        if bundle.obj.id == bundle.request.user.id:
            return True
        else:
            return Unauthorized("You can edit only your user info.")

    def delete_list(self, object_list, bundle):
        raise Unauthorized("Sorry, no deletes.")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("Sorry, no deletes.")

class UserProfileAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        return object_list

    def read_detail(self, object_list, bundle):
        return True

    def create_list(self, object_list, bundle):
        return object_list

    def create_detail(self, object_list, bundle):
        if bundle.obj.user.id == bundle.request.user.id:
            return True
        else:
            return Unauthorized("You can create only your profile.")

    def update_list(self, object_list, bundle):
        allowed = []
        for obj in object_list:
            if obj.user.id == bundle.request.user.id:
                allowed.append(obj)
        return allowed

    def update_detail(self, object_list, bundle):
        if bundle.obj.user.id == bundle.request.user.id:
            return True
        else:
            return Unauthorized("You can edit only your profile.")

    def delete_list(self, object_list, bundle):
        raise Unauthorized("Sorry, no deletes.")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("Sorry, no deletes.")


####################################################################
################# Resource region ##################################
####################################################################

################# Allauth region ##################################
class EmailAddressResource(ModelResource):
    user = fields.ToOneField('apps.dashboard.api.UserResource', 'user')

    class Meta:
        queryset = EmailAddress.objects.all()
        resource_name = 'emails'


class SocialTokenResource(ModelResource):
    class Meta:
        queryset = SocialToken.objects.all()
        resource_name = 'socialtokens'


class SocialAccountResource(ModelResource):
    user = fields.ToOneField('apps.dashboard.api.UserResource', 'user')
    socialtoken = fields.ToManyField(SocialTokenResource, 'socialtoken_set', null=True, full=True )

    class Meta:
        queryset = SocialAccount.objects.all()
        resource_name = 'socialaccounts'
        allowed_methods = ['get']
        filtering = {
            'user': ALL,
        }

################# User profile region ##################################
class UserProfileResource(ModelResource):
    user = fields.ToOneField('apps.dashboard.api.UserResource', 'user')
    
    class Meta:
        queryset = UserProfile.objects.all()
        resource_name = 'userprofiles'
        allowed_methods = ['get', 'put', 'post']
        always_return_data = True
        authentication = Authentication()
        authorization = UserProfileAuthorization()
        validation = Validation()


class UserResource(ModelResource):
    emailaddress = fields.ToManyField(EmailAddressResource, 'emailaddress_set', null=True)
    socialaccount = fields.ToManyField(SocialAccountResource, 'socialaccount_set', null=True)
    profile = fields.ToOneField(UserProfileResource, 'profile', null=True, full=True)
    offers = fields.ToManyField(OfferResource, 'offer_set', null=True)
    requests = fields.ToManyField(RequestResource, 'request_set', null=True)

    class Meta:
        queryset = User.objects.all()
        resource_name = 'users'
        allowed_methods = ['get', 'put']
        always_return_data = True
        authentication = Authentication()
        authorization = UserResourceAuthorization()
        validation = Validation()
        excludes = ['password', 'is_active', 'is_staff', 'is_superuser']
        filtering = {
            'username': ALL,
        }

################# Cars region ##################################

class CarPhotoResource(ModelResource):
    class Meta:
        queryset = CarPhoto.objects.all()
        resource_name = 'carphotos'
        allowed_methods = ['get', 'put', 'post']
        always_return_data = True
        authentication = Authentication()
        authorization = UserProfileAuthorization()
        validation = Validation()

class CarResource(ModelResource):
    car_photos = fields.ToManyField(CarPhotoResource, 'carphoto_set', null=True, full=True)
    user = fields.ToOneField(UserResource, 'user')

    class Meta:
        queryset = Car.objects.all()
        resource_name = 'cars'
        allowed_methods = ['get', 'put', 'post']
        always_return_data = True
        authentication = Authentication()
        authorization = UserProfileAuthorization()
        validation = Validation()
        filtering = {
            'user': ALL,
        }