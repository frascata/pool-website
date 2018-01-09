import json
from django.conf import settings
from django.http import HttpResponse
from django.utils.translation import get_language
from django.views.generic import ListView
from mezzanine.galleries.models import Gallery

from website.models import Category


class ApiProjectsView(ListView):
    model = Gallery

    def get(self, *args, **kwargs):

        projects = self.get_queryset()

        # filters
        if not settings.DEBUG:
            projects = projects.filter(status__exact=2)

        home_visible = self.request.GET.get('home')
        if home_visible and home_visible in ['1', 'true']:
            projects = projects.filter(homepage_visible=True)

        category = self.request.GET.get('category')
        if category and category not in ['null']:
            projects = projects.filter(category__id__exact=int(category))

        current_language = get_language()
        response_data = list()

        for project in projects:
            title = None
            description = None
            if current_language == 'it':
                if project.title_it:
                    title = project.title_it
                if project.description_it:
                    description = project.description_it
            if current_language == 'en':
                if project.title_en:
                    title = project.title_en
                if project.description_en:
                    description = project.description_en

            categories = [category.title(current_language) for category in project.category.get_queryset()]

            preview_image = project.featured_image.url

            images = []
            for image in project.images.get_queryset():
                image_description = None
                if current_language == 'it':
                    if project.description_it:
                        image_description = project.description_it
                if current_language == 'en':
                    if project.description_en:
                        image_description = project.description_en
                images.append({
                    'description': image_description,
                    'src': image.file.url
                })

            response_data.append({
                "id": project.id,
                "title": title,
                "description": description,
                "location": project.project_location,
                "date": project.project_date,
                "categories": categories,
                "previewImage": preview_image,
                "images": images,
                "url": project.slug
            })

        return HttpResponse(json.dumps(response_data), content_type="application/json")


class ApiCategoriesView(ListView):
    model = Category

    def get(self, *args, **kwargs):

        categories = self.get_queryset()

        current_language = get_language()

        title = None
        if current_language == 'it':
            title = "Tutti"
        if current_language == 'en':
            title = "All"

        response_data = [{
            "id": None,
            "title": title
        }]

        for category in categories:
            title = None

            if current_language == 'it':
                if category.title_it:
                    title = category.title_it
            if current_language == 'en':
                if category.title_en:
                    title = category.title_en

            response_data.append({
                "id": category.id,
                "title": title
            })

        return HttpResponse(json.dumps(response_data), content_type="application/json")
