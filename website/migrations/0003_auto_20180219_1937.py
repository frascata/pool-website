# -*- coding: utf-8 -*-
# Generated by Django 1.10.8 on 2018-02-19 19:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_auto_20180114_1606'),
    ]

    operations = [
        migrations.AddField(
            model_name='partner',
            name='visible',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='phase',
            name='position',
            field=models.IntegerField(default=0),
        ),
    ]
