# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_offer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='offer',
            name='place_from',
        ),
        migrations.RemoveField(
            model_name='offer',
            name='place_to',
        ),
        migrations.RemoveField(
            model_name='offer',
            name='user',
        ),
        migrations.DeleteModel(
            name='Offer',
        ),
    ]
