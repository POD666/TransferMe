# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user', models.OneToOneField(related_name='profile', primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL, verbose_name=b'user')),
                ('avatar_url', models.CharField(max_length=256, null=True, blank=True)),
                ('dob', models.DateField(null=True, verbose_name=b'dob', blank=True)),
            ],
            options={
                'db_table': 'user_profile',
            },
            bases=(models.Model,),
        ),
    ]
