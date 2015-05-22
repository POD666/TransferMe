# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('main_photo', models.ImageField(upload_to=b'car_main_photo')),
                ('car_type', models.CharField(default=b'Sport car', max_length=255)),
                ('car_brand', models.CharField(default=b'BMW', max_length=255)),
                ('car_model', models.CharField(default=b'i8', max_length=255)),
                ('is_baby_seat', models.BooleanField(default=False)),
                ('is_ski_boat', models.BooleanField(default=False)),
                ('is_wifi', models.BooleanField(default=False)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
