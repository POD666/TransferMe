# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0004_auto_20150226_1558'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='is_driver',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='userlanguage',
            name='lang_short',
            field=models.CharField(max_length=255, choices=[(b'en', b'English'), (b'ru', b'Russian'), (b'ua', b'Ukrainian'), (b'pl', b'Polish')]),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='description',
            field=models.TextField(default=b'', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='location',
            field=models.CharField(default=b'Kiev', max_length=50),
            preserve_default=True,
        ),
    ]
