from django.conf import settings
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.template import TemplateDoesNotExist
from django.contrib import messages
from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
import json


class AdvancedAccountAdapter(DefaultAccountAdapter):

    def add_message(self, request, level, message_template,
                    message_context=None, extra_tags=''):
        """
        Wrapper of `django.contrib.messages.add_message`, that reads
        the message text from a template.
        """
        if 'django.contrib.messages' in settings.INSTALLED_APPS:
            try:
                if message_context is None:
                    message_context = {}
                message = render_to_string(message_template,
                                           message_context).strip()
                if message:
                    messages.add_message(request, level, message,
                                         extra_tags=extra_tags)
            except TemplateDoesNotExist:
                pass

    def ajax_response(self, request, response, redirect_to=None, form=None):
        data = {}
        if redirect_to:
            status = 200
            data['location'] = redirect_to
        if form:
            if form.is_valid():
                status = 200
            else:
                status = 400
                data['form_errors'] = form._errors
            if hasattr(response, 'render'):
                response.render()
            data['html'] = response.content.decode('utf8')

        response = HttpResponse(json.dumps(data), status=status, content_type='application/json')

        response.set_cookie(key='user_id', value=request.user.id) 

        return response


class AdvancedSocialAccountAdapter(DefaultSocialAccountAdapter):
    pass
