# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('post', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dashboard', '0003_auto_20150225_1854'),
    ]

    operations = [
        migrations.CreateModel(
            name='CarPhoto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('photo', models.ImageField(upload_to=b'car_photos')),
                ('car', models.ForeignKey(to='dashboard.Car')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='HistoryPost',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date_add', models.DateTimeField(default=datetime.datetime(2015, 1, 1, 1, 0))),
                ('offer', models.ForeignKey(blank=True, to='post.Offer', null=True)),
                ('request', models.ForeignKey(blank=True, to='post.Request', null=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='HistoryRating',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date_add', models.DateTimeField(default=datetime.datetime(2015, 1, 1, 1, 0))),
                ('vote_count', models.FloatField(default=0)),
                ('comment', models.TextField(default=b'')),
                ('offer', models.ForeignKey(blank=True, to='post.Offer', null=True)),
                ('request', models.ForeignKey(blank=True, to='post.Request', null=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='UserLanguage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('lang_short', models.CharField(max_length=255, choices=[(b'en', b'English'), (b'de', b'German'), (b'pl', b'Polish')])),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RenameField(
            model_name='car',
            old_name='is_ski_boat',
            new_name='is_roof_rack',
        ),
    ]
