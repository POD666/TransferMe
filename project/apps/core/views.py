from django.http import HttpResponse
from django.shortcuts import render
from django.core.context_processors import csrf
from django.conf import settings
import json


def tuple_to_arr(tup):
	return [ { 'id': arr[0], 'content': arr[1] } for arr in tup ]


def index(request):
	response = render(request, 'index.html')
	response.set_cookie(key='user_id', value=request.user.id)
	response.set_cookie(key='csrftoken', value=unicode(csrf(request)['csrf_token']))
	return response


def languages(request):
	data = {'objects': tuple_to_arr(settings.LANGUAGES)}
	return HttpResponse(json.dumps(data), content_type='application/json')


def car_types(request):
	data = {'objects': tuple_to_arr(settings.CAR_TYPES)}
	return HttpResponse(json.dumps(data), content_type='application/json')


def test(request):
	return render(request, 'test.html')
