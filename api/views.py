from mezzanine.pages.models import Page
from rest_framework import viewsets, filters

from website.models import Project
from .pagination import MezzaninePagination
from .serializers import ProjectSerializer


class ProjectsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    For listing or retrieving pages.
    ---
    list:
        parameters:
            - name: page
              type: integer
              description: Page number
              paramType: query
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = MezzaninePagination
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('id', 'title_it',)
    ordering = ('title_it',)

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user

        if not user.is_authenticated():
            queryset = queryset.filter()

        return queryset
