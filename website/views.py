import json

from django import http
from django.conf import settings
from django.http import HttpResponse
from django.urls import translate_url
from django.utils.http import is_safe_url, urlunquote
from django.utils.translation import (
    LANGUAGE_SESSION_KEY, check_for_language, )
from django.views.generic import ListView
from mezzanine.galleries.models import Gallery

from website.models import Category, Partner

LANGUAGE_QUERY_PARAMETER = 'language'


def set_language(request):
    """
    Redirect to a given url while setting the chosen language in the
    session or cookie. The url and the language code need to be
    specified in the request parameters.

    Since this view changes how the user will see the rest of the site, it must
    only be accessed as a POST request. If called as a GET request, it will
    redirect to the page in the request (the 'next' parameter) without changing
    any state.
    """
    next = request.POST.get('next', request.GET.get('next'))
    if (next or not request.is_ajax()) and not is_safe_url(url=next, host=request.get_host()):
        next = request.META.get('HTTP_REFERER')
        if next:
            next = urlunquote(next)  # HTTP_REFERER may be encoded.
        if not is_safe_url(url=next, host=request.get_host()):
            next = '/'
    response = http.HttpResponseRedirect(next) if next else http.HttpResponse(status=204)
    if request.method == 'POST':
        lang_code = request.POST.get(LANGUAGE_QUERY_PARAMETER)
        if lang_code and check_for_language(lang_code):
            if next:
                next_trans = translate_url(next, lang_code)
                if next_trans != next:
                    response = http.HttpResponseRedirect(next_trans)
            if hasattr(request, 'session'):
                request.session[LANGUAGE_SESSION_KEY] = lang_code

            response.set_cookie(
                settings.LANGUAGE_COOKIE_NAME, lang_code,
                max_age=settings.LANGUAGE_COOKIE_AGE,
                path=settings.LANGUAGE_COOKIE_PATH,
                domain=settings.LANGUAGE_COOKIE_DOMAIN,
            )
    return response


class ApiProjectsView(ListView):
    model = Gallery

    def get(self, *args, **kwargs):

        projects = self.get_queryset()

        # filters
        if not settings.DEBUG:
            projects = projects.filter(status__exact=2)

        current_language = self.request.GET.get('language', settings.LANGUAGE_CODE)

        home_visible = self.request.GET.get('home')
        if home_visible and home_visible in ['1', 'true']:
            projects = projects.filter(homepage_visible=True)

        category = self.request.GET.get('category')
        if category and category not in ['null']:
            projects = projects.filter(category__id__exact=int(category))

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

            try:
                preview_image = project.featured_image.url
            except ValueError:
                preview_image = None

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

        current_language = self.request.GET.get('language', settings.LANGUAGE_CODE)

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


class ApiPartnersView(ListView):
    model = Partner

    def get(self, *args, **kwargs):

        partners = self.get_queryset()

        current_language = self.request.GET.get('language', settings.LANGUAGE_CODE)

        partner_type = self.request.GET.get('type')
        if partner_type and partner_type in ['partner', 'collaborator']:
            partners = partners.filter(type__iexact=partner_type)

        response_data = []

        for partner in partners:
            description = None

            if current_language == 'it':
                if partner.description_it:
                    description = partner.description_it
            if current_language == 'en':
                if partner.description_en:
                    description = partner.description_en

            try:
                website_url = partner.website_url
            except ValueError:
                website_url = None

            response_data.append({
                "id": partner.id,
                "name": partner.name,
                "description": description,
                "url": website_url
            })

        return HttpResponse(json.dumps(response_data), content_type="application/json")
