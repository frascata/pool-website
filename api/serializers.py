from django.core.urlresolvers import NoReverseMatch
from django.template.defaultfilters import strip_tags
from django.contrib.auth.models import User
from django.contrib.sites.models import Site

from mezzanine.blog.models import BlogPost as Post, BlogCategory
from mezzanine.pages.models import Page
from mezzanine.generic.models import Comment
from mezzanine.conf import settings
from mezzanine.utils.sites import current_request

from rest_framework import serializers

from website.models import Project, Image, Category
from django.utils.translation import get_language


class ImageSerializer(serializers.Serializer):
    description_it = serializers.CharField()
    description_en = serializers.CharField()
    description = serializers.CharField(allow_null=True)
    src = serializers.CharField()

    class Meta:
        model = Image

    def to_representation(self, obj):
        current_language = get_language()
        description = None
        if current_language == 'it' and obj.description_it:
            description = obj.description_it
        if current_language == 'en' and obj.description_en:
            description = obj.description_en

        return {
            'description': description,
            'src': obj.file.url
        }


class ProjectCategorySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title_it = serializers.CharField()
    title_en = serializers.CharField()
    title = serializers.CharField(allow_null=True)

    class Meta:
        model = Category

    def to_representation(self, obj):
        current_language = get_language()
        title = None
        if current_language == 'it' and obj.title_it:
            title = obj.title_it
        if current_language == 'en' and obj.title_en:
            title = obj.title_en

        return {
            'title': title
        }


class ProjectSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    categories = ProjectCategorySerializer(many=True)

    class Meta:
        model = Project
        fields = ('id', 'visible', 'location', 'date', 'images', 'categories',)

    def to_representation(self, obj):
        result = super(ProjectSerializer, self).to_representation(obj)

        current_language = get_language()

        title = None
        description = None

        if current_language == 'it':
            if obj.title_it:
                title = obj.title_it
            if obj.description_it:
                description = obj.description_it

        if current_language == 'en':
            if obj.title_it:
                title = obj.title_en
            if obj.description_it:
                description = obj.description_en

        result['title'] = title
        result['description'] = description

        return result
