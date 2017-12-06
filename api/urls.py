from __future__ import unicode_literals
from django.conf.urls import url, include
from rest_framework import routers
from mezzanine_api.views import PageViewSet

from api.views import ProjectsViewSet

router = routers.DefaultRouter(trailing_slash=False)
# router.register(r'users', UserViewSet)
router.register(r'pages', PageViewSet)
router.register(r'projects', ProjectsViewSet)

urlpatterns = [
    url(r'^v1/', include(router.urls)),
    url(r'^oauth2/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
]
