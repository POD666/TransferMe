from .config import *
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

SECRET_KEY = 'zz$*1^bk(o5)^9f)y^qm=dysvap7a@1!24c-x&0+9ya(_mjltf'

DEBUG = True
TEMPLATE_DEBUG = True


INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.facebook',

    'tastypie',
    'haystack',

    'apps.core',
    'apps.guest',
    'apps.post',
    'apps.dashboard',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'apps.core.middleware.SubdomainLanguageMiddleware',
    'apps.core.middleware.ExtHeadersMiddleware'
)

ROOT_URLCONF = 'source.urls'

WSGI_APPLICATION = 'source.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.elasticsearch_backend.ElasticsearchSearchEngine',
        'URL': 'http://127.0.0.1:9200/',
        'INDEX_NAME': 'haystack',
    },
}

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

gettext = lambda s: s


MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "media"),
)

STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, "templates"),
)

LOCALE_PATHS = (
    os.path.join(BASE_DIR, "translate"),
)

TASTYPIE_DEFAULT_FORMATS = ['json']
TASTYPIE_DATETIME_FORMATTING = 'rfc-2822'
TASTYPIE_FULL_DEBUG = True


###### django-allauth
TEMPLATE_CONTEXT_PROCESSORS = (
    # Required by allauth template tags
    "django.core.context_processors.request",
    "django.contrib.auth.context_processors.auth",
    # allauth specific context processors
    "allauth.account.context_processors.account",
    "allauth.socialaccount.context_processors.socialaccount",
)

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of 'allauth'
    "django.contrib.auth.backends.ModelBackend",
    # 'allauth' specific authentication methods, such as login by e-mail
    "allauth.account.auth_backends.AuthenticationBackend",
)

SITE_ID = 1


#ACCOUNT_USER_MODEL_USERNAME_FIELD = None 
ACCOUNT_EMAIL_REQUIRED = True 
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False 
ACCOUNT_AUTHENTICATION_METHOD = 'email'
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

LOGIN_REDIRECT_URL = "/"

ACCOUNT_LOGOUT_ON_GET = True

ACCOUNT_CONFIRM_EMAIL_ON_GET = False#Determines whether or not an e-mail address is automatically confirmed by a mere GET request.
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 3#Determines the expiration date of email confirmation mails (# of days).

ACCOUNT_EMAIL_SUBJECT_PREFIX ="[Site] " #Subject-line prefix to use for email messages sent. By default, the name of the current Site (django.contrib.sites) is used.
ACCOUNT_FORMS ={}#Used to override forms, for example: {'login': 'myapp.forms.LoginForm'}
ACCOUNT_SIGNUP_FORM_CLASS =None#A string pointing to a custom form class (e.g. 'myapp.forms.SignupForm') that is used during signup to ask the user for additional input (e.g. newsletter signup, birth date). This class should implement a def signup(self, request, user) method, where user represents the newly signed up user.
ACCOUNT_SIGNUP_PASSWORD_VERIFICATION =True#When signing up, let the user type in their password twice to avoid typo's.
ACCOUNT_UNIQUE_EMAIL =True#Enforce uniqueness of e-mail addresses.

ACCOUNT_USERNAME_MIN_LENGTH =4#An integer specifying the minimum allowed length of a username.
ACCOUNT_USERNAME_BLACKLIST =[]#A list of usernames that can't be used by user.

ACCOUNT_SESSION_REMEMBER =True#Controls the life time of the session. Set to None to ask the user ("Remember me?"), False to not remember, and True to always remember.

ACCOUNT_ADAPTER = "apps.dashboard.adapter.AdvancedAccountAdapter"
SOCIALACCOUNT_ADAPTER = "apps.dashboard.adapter.AdvancedSocialAccountAdapter"

    #Specifies the adapter class to use, allowing you to alter certain default behaviour.
# SOCIALACCOUNT_EMAIL_REQUIRED =ACCOUNT_EMAIL_REQUIRED#The user is required to hand over an e-mail address when signing up using a social account.
# SOCIALACCOUNT_EMAIL_VERIFICATION =ACCOUNT_EMAIL_VERIFICATION#As ACCOUNT_EMAIL_VERIFICATION, but for social accounts.
