# -*- coding: utf-8 -*-
# Generated by Django 1.10.8 on 2017-11-18 17:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import mezzanine.core.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500, verbose_name='Title')),
            ],
            options={
                'verbose_name': 'Project Category',
                'verbose_name_plural': 'Project Categories',
                'ordering': ('title',),
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('_order', mezzanine.core.fields.OrderField(null=True, verbose_name='Order')),
                ('file', models.FileField(max_length=200, upload_to='galleries', verbose_name='File')),
                ('description', models.CharField(blank=True, max_length=1000, verbose_name='Description')),
            ],
            options={
                'verbose_name': 'Image',
                'verbose_name_plural': 'Images',
                'ordering': ('_order',),
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visible', models.BooleanField(default=False)),
                ('title_it', models.CharField(max_length=500, null=True, verbose_name='Title')),
                ('title_en', models.CharField(max_length=500, null=True, verbose_name='Title')),
                ('description_it', models.TextField(null=True)),
                ('description_en', models.TextField(null=True)),
                ('location', models.CharField(max_length=256, null=True)),
                ('date', models.DateField(null=True)),
                ('categories', models.ManyToManyField(blank=True, to='website.Category', verbose_name='Categories')),
            ],
            options={
                'verbose_name': 'Project',
                'verbose_name_plural': 'Projects',
                'ordering': ('-date',),
            },
        ),
        migrations.AddField(
            model_name='image',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='website.Project'),
        ),
    ]
