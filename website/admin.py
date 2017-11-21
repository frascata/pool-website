from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.utils.safestring import mark_safe

from website.models import Project, Image, Category


class CategoryAdmin(ModelAdmin):
    class Meta:
        model = Category

    list_display = ('title_it', 'title_en',)


class ProjectAdmin(ModelAdmin):
    class Meta:
        model = Project

    # fields = []

    list_display = ('title_it', 'description_it', 'visible', 'location', 'date', 'categories_link', 'images_link')

    # list_filter = []

    # search_fields = []

    # readonly_fields = ['images_link']

    @staticmethod
    def categories_link(instance):
        return mark_safe(instance.admin_categories_link())

    @staticmethod
    def images_link(instance):
        return mark_safe(instance.admin_images_link())


# Register your models here.
admin.site.register(Image)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Project, ProjectAdmin)
