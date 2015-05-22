from django.http import HttpResponseRedirect
from django.utils import translation
from django.conf import settings


class SubdomainLanguageMiddleware(object):

    def get_template_domain(self, host):
        return 'http://' + settings.LANGUAGES_CODES[0]+'.'+ host

    def process_request(self, request):
        host = request.get_host().split('.')
        if len(host[0]) == 8:
            return HttpResponseRedirect(self.get_template_domain(request.get_host()))
        if host and host[0] in settings.LANGUAGES_CODES:
            lang = host[0]
            translation.activate(lang)
            request.LANGUAGE_CODE = lang


class ExtHeadersMiddleware(object):

    def process_response(self, request, response):
        response['Access-Control-Allow-Origin'] = '*'
        return response